const baseStyles = "rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-secundary-700 dark:bg-secundary-950 dark:text-secundary-200"

export const Tag = ({ as: Component = "li", className = "", children }) => {
    return (
        <Component className={`${baseStyles} ${className}`.trim()}>
            {children}
        </Component>
    )
}
