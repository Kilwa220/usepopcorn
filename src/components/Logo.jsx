import { LuPopcorn } from "react-icons/lu";

const Logo = ({ style }) => {
     return (
        <div className="logo inline pr-2">
            <div className="bg-[var(--accent-lime)] text-[var(--elevated-surface)] p-[6px] rounded-lg text-[20px] font-bold text-[#174D3A] inline-flex align-middle items-center justify-center w-fit ">
                <LuPopcorn />
            </div>

            <h2 className="text-[var(--primary-color)] inline font-bold ml-2" style={style}>usePopcorn</h2>
        </div>
     )
}

export default Logo