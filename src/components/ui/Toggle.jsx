import { useState } from 'react';

export const Toggle = ({ value = false, onChange, activeStyle = "", inactiveStyle = "", squareStyle = "", activeIcon = null, inactiveIcon = null, title = "" }) => {
    const [isOn, setIsOn] = useState(value);

    const toggleStatus = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onChange?.(newValue);
    };

    return (
        <button
            onClick={toggleStatus}
            className="group/tgl relative w-20 h-10 overflow-hidden border-2 border-slate-300 dark:border-slate-700 rounded-lg transition-all duration-300 ease-in-out cursor-pointer"
            title={title}
        >
            <div
                className={`absolute inset-0 w-[200%] h-full flex transition-transform duration-230 ease-in-out ${isOn ? 'translate-x-0' : '-translate-x-1/2'
                    }`}
            >
                <div className={`w-1/2 h-full flex items-center pl-1 bg-primary-600 dark:bg-primary-400 ${activeStyle}`}>
                    <div className="w-7.5 flex justify-center text-white">
                        {activeIcon}
                    </div>
                </div>

                <div className={`w-1/2 h-full flex items-center justify-end pr-1 bg-slate-400 dark:bg-slate-500 ${inactiveStyle}`}>
                    <div className="w-7.5 flex justify-center text-slate-200">
                        {inactiveIcon}
                    </div>
                </div>
            </div>

            <div
                className={`relative bg-background-light dark:bg-background-dark dark:border-dark size-7.5 rounded-sm border border-b-7 rounded-b-md group-hover/tgl:size-8.5 border-slate-300 shadow-md transform transition-all duration-340 ease-in-out ${isOn ? 'translate-x-10' : 'translate-x-1.5'} ${squareStyle}`}
            />
        </button>
    );
};