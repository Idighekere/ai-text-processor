import InputArea from '../components/InputArea'
import ChatArea from '../components/ChatArea'
import Header from '../components/Header'


const Home = () => {





    // const summarizeText = async () => {

    //     try {
    //         if ('ai' in self && 'summarizer' in self.ai) {
    //             // The Summarizer API is supported.
    //             console.log(self.ai.summarizer)
    //             const options = {
    //                 sharedContext: 'This is a scientific article',
    //                 type: 'key-points',
    //                 format: 'markdown',
    //                 length: 'medium',
    //             };
    //             const summarizerCapabilities = await self.ai.summarizer.capabilities()
    //             const available = summarizerCapabilities.available;
    //             let summarizer;
    //             console.log(summarizerCapabilities)
    //             if (available === 'no') {
    //                 // The Summarizer API isn't usable.
    //                 console.error("The summarizer API isn't usable")
    //                 return;
    //             }
    //             if (available === 'readily') {
    //                 // The Summarizer API can be used immediately .
    //                 summarizer = await self.ai.summarizer.create(options);
    //             } else {
    //                 // The Summarizer API can be used after the model is downloaded.
    //                 summarizer = await self.ai.summarizer.create(options);
    //                 summarizer.addEventListener('downloadprogress', (e) => {
    //                     console.log(e.loaded, e.total);
    //                 });
    //                 await summarizer.ready;

    //                 const longText = `The create() function lets you configure a new summarizer object to your needs. It takes an optional options object with the following parameters:
    //                 sharedContext: Additional shared context that can help the summarizer.
    //                     type: The type of the summarization, with the allowed values key - points(default ), tl; dr, teaser, and headline.
    //                         format: The format of the summarization, with the allowed values markdown(default ), and plain - text.
    //                             length: The length of the summarization, with the allowed values short, medium(default ), and long.The meanings of these lengths vary depending on the type requested.For example, in Chrome's implementation, a short key-points summary consists of three bullet points, and a short summary is one sentence; a long key-points summary is seven bullet points, and a long summary is a paragraph.`;
    //                 const summary = await summarizer.summarize(longText, {
    //                     context: 'This article is intended for a tech-savvy audience.',
    //                 });

    //                 console.log(summary);

    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);

    //     }


    // }
    // useEffect(() => {
    //     detectLanguage()
    //     translateLanguage()
    //     summarizeText()

    //     return () => {

    //     }
    // }, [])

    return (
        <>
            <Header />
            <div className='bg-[#151515]  px-5 md:px-16 lg:px-40'>
                <ChatArea />
                <InputArea />
            </div>
        </>
    )
}

export default Home
