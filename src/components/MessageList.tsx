import { useState } from 'react'
import useTextStore from '../store/useTextStore';
import { Message } from '../types/language';
import { getLanguageName } from '../utils/language';
import Button from './ui/Button';

type Props = {
    messages: Message[]
}

const languages = {
    fr: 'French',
    es: 'Spanish',
    en: 'English',
    pt: 'Portuguese',
    ru: "Russian",
    tr: 'Turkish'

}

const MessageList = ({ messages }: Props) => {

    const [translationSelections, setTranslationSelections] = useState<{ [key: number]: string }>({});

    // const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({})



    const translate = useTextStore((state) => state.translate)
    const summarize = useTextStore((state) => state.summarize)

    const addTranslatedText = useTextStore((state) => state.addTranslatedText)
    const addSummarizedText = useTextStore((state) => state.addSummarizedText)


    const errors = useTextStore((state) => state.errors)
    const loadingStates = useTextStore((state) => state.isLoading)
    const setError = useTextStore((state) => state.setError)
    const downloadProgress = useTextStore(state => state.downloadProgress)

    const handleLanguageChange = (messageId: number, language: string) => {
        setTranslationSelections((prev) => ({ ...prev, [messageId]: language }))
    }

    const handleTranslate = async (id: number, text: string, source: string) => {

        // console.log(id, text, source, translateTo)
        // setLoadingStates((prev) => ({ ...prev, [id]: true }));

        try {

            const translatedText = await translate(id, text, source, translationSelections[id])

            if (translatedText) {
                console.log(translatedText)
                addTranslatedText(id, translatedText)
            }
        } catch (error) {
            console.error(error)
            setError(id, error.message)
        } finally {
            // setLoadingStates((prev) => ({ ...prev, [id]: false }));

        }
    }

    const handleSummarize = async (id: number, longText: string) => {

        try {
            const summarizedText = await summarize(id, longText)
            addSummarizedText(id, summarizedText)

        } catch (error) {
            alert("This feature hasn't been implemented, because the developer's  pc specs doesn't meet the requirement to set it up")
            console.error(error)
            setError(id, error.message)

        }
    }

    const handleCopyToClipboard = async (translatedText: string) => {

        try {
            await navigator.clipboard.writeText(translatedText)
            console.log('Async: Copying to clipboard was successful!');

            alert('Copied')

        } catch (error) {
            console.error('Async: Could not copy text: ', error);
            alert("Error in copying text")

        }
    }
    return (
        <div className=" w-full /h-screen /max-h-[800px] flex flex-col /bg-[#333]   pt-4">
            {/* Message List */}
            <div className="flex-1 /overflow-y-auto space-y-6 /p-4">
                {messages.length == 0 && (<div className='justify-center h-screen flex items-center /mt-[50%] md:mt-10'>
                    <p className='text-center text-3xl font-bold my-3'>What can I translate for you?</p>
                </div>)}
                {messages?.map((message: Message) => (
                    <div key={message.id} className="w-full  /md:w-[60%] md:flex flex-col space-y-6  /bg-[#212121] rounded-lg /p-5 justify-center items-center ">

                        <div className="ml-auto  w-3/4 md:w-[60%] /bg-[#1e1e1e]  bg-[#1a60bb] text-white p-4 rounded-b-2xl rounded-tl-2xl flex flex-col gap-3 shadow-2xl">
                            <div className="w-8 h-8 rounded-full bg-primary/45 flex justify-center  items-center self-center/"><p className="text-white text-[0.8rem]">You</p></div>
                            <p> {message.text}</p>
                        </div>


                        {(
                            <div className=" w-9/10 md:w-2/3  text-white p-4 rounded-b-2xl rounded-tr-2xl  bg-[#1e1e1e] flex /justify-center /items-center flex-col gap-3 mr-auto shadow-2xl">
                                <div className="w-8 h-8 rounded-full bg-primary/45 flex justify-center items-center self-center/"><p className="text-whitetext-[.8rem]">AI</p></div>

                                {message.detectedLanguage && <div>

                                    <p><span className="font-bold">Detected Language: </span>{getLanguageName(message.detectedLanguage.detectedLanguage)}</p>


                                    <div className="flex gap-2 flex-col sm:flex-row /w-full">

                                        <select
                                            onChange={(e) => handleLanguageChange(message.id, e.target.value)}
                                            value={translationSelections[message.id] || ""}
                                            className=" px-4 py-2 rounded placeholder-shown:text-white border-primary border bg-[#1e1e1e] "
                                        >
                                            <option value="">Select Language</option>
                                            {Object.entries(languages).filter(([key]) => key !== message.detectedLanguage.detectedLanguage).map(([key, value]) => {


                                                return <option value={key} key={key}>{value}</option>
                                            })}
                                        </select>

                                        <Button onClick={() => handleTranslate(message.id, message.text, message?.detectedLanguage.detectedLanguage)} disabled={!translationSelections[message.id]} className='/w-full'>{loadingStates[message.id] ? "Translating..." : "Translate"}</Button>
                                        {(message.text.length > 150 && message.detectedLanguage.detectedLanguage == 'en') && <Button variant='outline' className='/w-full' onClick={() => handleSummarize(message.id, message.text)}>Summarize</Button>}
                                    </div>
                                </div>}
                                {downloadProgress && (<p>{downloadProgress.loaded}/{downloadProgress.total}</p>)}
                                {errors[message.id] && <p className='text-red-600'>{errors[message.id]}</p>}
                                {loadingStates[message.id] && (
                                    <p className="mt-2">Loading...</p>
                                )}
                                {message.translatedText && <p className="mt-2"><span className="font-bold">Translated Text: </span>{message?.translatedText}</p>
                                }
                                {message.translatedText &&
                                    <button className='self-end cursor-pointer' onClick={() => handleCopyToClipboard(message.translatedText as string)}>

                                        <img src={'/copy.svg'} alt="Copy button" className='w-6 ' />
                                    </button>}
                            </div>
                        )}
                    </div>
                ))}

                {/* {showSummaryModal && <div className="p-10 bg-red-600 absolute /top-0 flex translate-x-1/2 -translate-y-1/2 ">Hi</div>} */}

            </div>
        </div>
    );
};


export default MessageList
