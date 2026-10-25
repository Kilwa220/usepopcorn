
const Container = ({ children, ...attr}) => {
    const {exStyle} = {...attr}
    return (
        <div className={"p-3 mr-auto ml-auto w-full md:w-[750px] lg:w-[970px] h-fit " + exStyle}>
            {children}
        </div>
    )
}

export default Container;