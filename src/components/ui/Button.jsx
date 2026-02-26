export const Button = ({ type = "button", disabled = false, onClick = null, inside = "", byside = "", insideStyle = "", bysideStyle = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="group relative cursor-pointer w-full flex items-center text-slate-800 dark:text-slate-400 gap-2 m-2"
        >
            <span
                className={`flex items-center justify-center border border-b-8 border-slate-300 rounded-xl py-2 px-3 shadow-lg group-hover:shadow-medium/40 transition-all duration-200 backdrop-blur-md cursor-pointer
                bg-background-light/50
                dark:bg-background-dark/70 dark:border-slate-800 dark:group-hover:shadow-secundary/50
                ${insideStyle}`}
            >
                {inside}
            </span>
            {byside !== "" && <p className={`pr-3 font-semibold group-hover:underline underline-offset-5 ${bysideStyle}`}>{byside}</p>}
        </button>
    )
}