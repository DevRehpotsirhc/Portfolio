export const Button = ({ style = "", type = "button", disabled = false, onClick = null, inside = "", byside = "", insideStyle = "", bysideStyle = "" }) => {
    const variantStyles = {
        primary: "border-primary-700 bg-primary-600 text-primary-50 group-hover:shadow-primary-500/90 dark:bg-primary-600 dark:text-primary-50 dark:border-primary-700 dark:group-hover:shadow-primary-500/90",
        secundary: "border-secundary-600 bg-secundary-500 text-secundary-900 group-hover:shadow-secundary-500/90 dark:bg-secundary-600! dark:text-black dark:border-secundary-700 dark:group-hover:shadow-secundary-500/90",
        medium: "border-medium-500 bg-medium-400 text-medium-50 group-hover:shadow-medium-500/90 dark:bg-medium-500! dark:text-white dark:border-medium-600 dark:group-hover:shadow-medium-500/90",
        complementary: "border-complementary-600 bg-complementary-500 text-complementary-900 group-hover:shadow-complementary-500/90! dark:bg-complementary-600! dark:text-black dark:border-complementary-700 dark:group-hover:shadow-complementary-500/80",
        danger: "border-danger-600 bg-danger-500 text-white group-hover:shadow-danger-500/90! dark:border-danger-700 dark:group-hover:shadow-danger-500/90 bg-danger-200 dark:bg-danger-600 dark:text-danger-50",
        warning: "border-warning-600 bg-warning-500 text-warning-900 group-hover:shadow-warning-600/90 dark:border-warning-800 dark:group-hover:shadow-warning-500/50 dark:bg-warning-700! dark:text-black",
    };

    const appliedVariant = variantStyles[style] || "border-slate-300 dark:border-slate-700 dark:group-hover:shadow-secundary-500/50";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="group relative cursor-pointer w-full flex items-center text-slate-800 dark:text-slate-400 gap-2 p-2"
        >
            <span
                className={`flex w-full font-semibold items-center justify-center border border-b-8 rounded-xl py-2 px-3 shadow-lg group-hover:shadow-medium-500/40 transition-all duration-200 backdrop-blur-md cursor-pointer
                bg-background-light/50
                dark:bg-background-dark/70
                ${appliedVariant}
                ${insideStyle}`}
            >
                {inside}
            </span>
            {byside !== "" && (
                <p className={`pr-3 font-semibold group-hover:underline underline-offset-4 ${bysideStyle}`}>
                    {byside}
                </p>
            )}
        </button>
    );
};