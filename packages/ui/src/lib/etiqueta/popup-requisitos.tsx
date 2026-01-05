import React, { useState, useRef, useEffect } from 'react';

export interface CodeplexPopupRequisitosProps {
    requisitos?: string[];
    className?: string;
}

export const CodeplexPopupRequisitos = ({
    requisitos = [],
    className = '',
}: CodeplexPopupRequisitosProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const popupId = React.useId();

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const openHover = () => setIsOpen(true);
    const closeHover = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            className={`relative inline-flex items-center ml-0.5 align-top ${className}`}
            onMouseEnter={openHover}
            onMouseLeave={closeHover}
        >
            {/* TRIGGER: Asterisco Minimalista */}
            <button
                type="button"
                onClick={toggle}
                aria-expanded={isOpen}
                aria-controls={popupId}
                aria-label="Ver requisitos"
                className={`
          group flex items-center justify-center
          text-red-500 dark:text-red-400
          font-bold text-lg leading-none
          cursor-help select-none
          transition-transform duration-200
          focus:outline-none focus:text-red-600 dark:focus:text-red-300
          ${isOpen ? 'scale-110' : 'hover:scale-110'}
        `}
            >
                *
            </button>

            {/* POPUP: Lista de Requisitos */}
            {isOpen && (
                <div
                    id={popupId}
                    className="
            absolute bottom-full left-0 mb-1.5 z-[100]
            /* Responsive Width: Fijo en desktop, limitado al viewport en móvil */
            w-64 max-w-[85vw] sm:max-w-xs
            bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-xl
            animate-in fade-in zoom-in-95 slide-in-from-bottom-1 duration-150
            origin-bottom-left
          "
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header compacto */}
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/80 dark:bg-gray-800/80 rounded-t-lg backdrop-blur-sm">
                        <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Requisitos
                        </h4>
                    </div>

                    {/* Lista limpia */}
                    <ul className="p-1.5 space-y-0.5">
                        {requisitos.map((req, i) => (
                            <li
                                key={i}
                                className="
                  flex items-start gap-2 px-2 py-1.5 rounded
                  text-xs text-gray-600 dark:text-gray-300
                  hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                "
                            >
                                <span className="text-blue-500 dark:text-blue-400 mt-[2px]">•</span>
                                <span className="leading-snug">{req}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Flecha decorativa minimalista */}
                    <div className="absolute -bottom-1 left-1.5 w-2 h-2 bg-white dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700 rotate-45"></div>
                </div>
            )}
        </div>
    );
};

export const CodeplexRequirementsPopup = CodeplexPopupRequisitos;
