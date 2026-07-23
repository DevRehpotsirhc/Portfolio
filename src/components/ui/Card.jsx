export const Card = ({
    as: Component = "div",
    className = "",
    children,
    imageSrc,
    imageAlt = "",
    text,
    lightModeTextColor = "#0f172a",
    darkModeTextColor = "#f8fafc",
    lightModeBgColor = "transparent",
    darkModeBgColor = "transparent",
    style,
    ...props
}) => {
    const buttonStyles = Component === "button" ? "border border-b-8 rounded-xl py-2 px-3 cursor-pointer bg-background-light border-slate-300 hover:bg-medium-400 hover:border-medium-500 text-slate-700 dark:text-slate-300 hover:text-white dark:bg-slate-700 dark:border-dark/60 dark:hover:border-secundary-700 dark:hover:bg-secundary-600 font-bold dark:hover:text-dark" : ""
    const baseCardStyles = Component === "button" ? "" : "w-full flex flex-col items-center text-center bg-[color:var(--card-light-bg)] dark:bg-[color:var(--card-dark-bg)] text-[color:var(--card-light-text)] dark:text-[color:var(--card-dark-text)] border border-slate-300 dark:border-dark"
    const classes = `${buttonStyles} ${baseCardStyles} ${className}`.trim()
    const mergedStyle = Component === "button"
        ? style
        : {
            ...style,
            "--card-light-text": lightModeTextColor,
            "--card-dark-text": darkModeTextColor,
            "--card-light-bg": lightModeBgColor,
            "--card-dark-bg": darkModeBgColor,
        }

    return (
        <Component className={classes} style={mergedStyle} {...props}>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto object-contain mx-auto"
                />
            )}
            {text && <p className="w-full text-center">{text}</p>}
            {children}
        </Component>
    )
}
