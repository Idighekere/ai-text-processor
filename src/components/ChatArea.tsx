import useTextStore from '../store/useTextStore'
import MessageList from './MessageList'

const ChatArea = () => {

    const { messages, } = useTextStore()


    return (
        <div className='bg-blacgk h-[] /mb-20 /overflow-y-auto text-white w-full '>

            {/* <p>{outputText}</p> */}
            <MessageList messages={messages} />

        </div>
    )
}

export default ChatArea
