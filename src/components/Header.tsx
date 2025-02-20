import useTextStore from "../store/useTextStore"
import Button from "./ui/Button"


const Header = () => {

    const { clearChats } = useTextStore()
    return (
        <header className='bg-[#0d0b13] p-10 text-white sticky top-0'>
            <nav className='flex justify-evenly items-center'>
                <h2 className="text-2xl font-black">Ai Text Processor</h2>
                <Button variant="danger" onClick={() => clearChats()} className="flex items-center gap-1 "><img src="/trash.svg" alt="Trash icon" className="w-5" /> <p>Clear Chat</p></Button>
            </nav>
        </header>
    )
}

export default Header
