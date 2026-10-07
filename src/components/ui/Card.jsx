import React, { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_FADE_FROM = "from-[color:var(--card-light-bg,white)] dark:from-[color:var(--card-dark-bg)";

const ScrollFade = ({ children, className = "", maxHeight = "max-h-24", fadeFrom = DEFAULT_FADE_FROM, as: Tag = "div" }) => {
    const rollRef = useRef(null);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    const checkScroll = useCallback(() => {
        const roll = rollRef.current;
        if (!roll) return;

        setShowTop(roll.scrollTop > 0);
        // -1 para evitar errores de redondeo en pantallas con zoom/subpíxeles
        setShowBottom(roll.scrollTop + roll.clientHeight < roll.scrollHeight - 1);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);

        // Recalcula si cambia el contenido o el tamaño del contenedor
        const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(checkScroll) : null;
        if (observer && rollRef.current) observer.observe(rollRef.current);

        return () => {
            window.removeEventListener("resize", checkScroll);
            observer?.disconnect();
        };
    }, [checkScroll, children]);

    return (
        <div className="relative w-full">
            <Tag
                ref={rollRef}
                onScroll={checkScroll}
                className={`${maxHeight} pr-2 overflow-y-auto custom-scrollbar ${className}`}
            >
                {children}
            </Tag>

            <div
                aria-hidden="true"
                className={`absolute top-0 left-0 w-full h-6 bg-linear-to-b ${fadeFrom} to-transparent pointer-events-none transition-opacity duration-300 ${showTop ? "opacity-100" : "opacity-0"}`}
            />
            <div
                aria-hidden="true"
                className={`absolute bottom-0 left-0 w-full h-6 bg-linear-to-t ${fadeFrom} to-transparent pointer-events-none transition-opacity duration-300 ${showBottom ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
};

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
    scrollMaxHeight = "max-h-24",
    fadeFrom = DEFAULT_FADE_FROM,
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

            {text && (
                <ScrollFade
                    as="p"
                    maxHeight={scrollMaxHeight}
                    fadeFrom={fadeFrom}
                    className="w-full text-center"
                >
                    {text}
                </ScrollFade>
            )}
            {children}
        </Component>
    )
}