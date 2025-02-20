import { useState } from 'react'
import useTextStore from '../store/useTextStore'
import Button from './ui/Button'


const InputArea = () => {

    const { addMessage, detectLanguage } = useTextStore()
    const [input, setInput] = useState("")

    const handleSend = async () => {
        if (!input.trim()) return;

        const detectedLanguage = await detectLanguage(input)
        addMessage?.(input, detectedLanguage)
        setInput('')
    }
    return (
        <div className="w-full   ">

            <div className='fixed bottom-2 flex  justify-center left-0 right-0 gap-2 w-auto mx-auto px-5 md:px-36 lg:px-40 '>

                <textarea name='inputText' value={input} onChange={(e) => setInput?.(e.target.value)} className='/border  w-full /w-[60%] /md:w-1/2 bg-[#2b2b2b] rounded-lg text-white focus:ring-gray-200/50 focus:outline-0 focus:ring-2 p-3 border-2 border-gray-600 ' placeholder='Enter text to translate' />
                <Button onClick={() => handleSend()} className='w-auto self-end rounded-lg px-0 py-1 ' disabled={!input}>
                    <img src="/send.svg" alt="" className='w-9' />
                </Button>

            </div>
        </div>
    )
}

export default InputArea
