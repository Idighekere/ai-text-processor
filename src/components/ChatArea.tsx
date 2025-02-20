import useTextStore from '../store/useTextStore'
import MessageList from './MessageList'

const ChatArea = () => {

    const { messages, } = useTextStore()


    return (
        <div className=' h-[] /mb-20 /overflow-y-auto text-white min-h-screen pb-27 '>

            {/* <p>{outputText}</p> */}
            <MessageList messages={messages} />

        </div>
    )
}

export default ChatArea
