import Logo from "./Logo"
import { IoSearchOutline } from "react-icons/io5";


const Input = ({ targetMovie, onSearch }) => {
    return (
        <div className="input-search text-[var(--primary-color)] ml-auto mr-3 rounded-md bg-[var(--elevated-surface)] flex items-center gap-2">
            <label htmlFor="search" className="mr-[-8px] p-2"><IoSearchOutline /></label>
            <input className="transition-all p-0 w-0 border-none outline-none focus:w-50" type="search" value={targetMovie} name="search" id="search" onChange={(e) =>  onSearch(e.target.value)}/>
        </div>
    )
}

const Header = ({ targetMovie, onSearch }) => {
    // console.log(targetMovie)
    return (
        <header className="flex items-center ml-2 mr-2 pb-4 pt-4 border-b border-b-[var(--elevated-surface)]">
            <Logo />
            <Input 
                targetMovie={targetMovie}
                onSearch={onSearch} 
            />
        </header>
    )
}
export default Header