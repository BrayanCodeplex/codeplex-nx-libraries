import React, { useState, useRef, useEffect, useId } from 'react';

export type CodeplexTooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface CodeplexTooltipProps {
    content: React.ReactNode;
    side?: CodeplexTooltipSide;
    delayMs?: number;
    arrow?: boolean;
    disabled?: boolean;
    className?: string;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}

export const CodeplexTooltip = ({
    content,
    side = 'top',
    delayMs = 200,
    arrow = true,
    disabled = false,
    className = '',
    onOpenChange,
    children,
}: CodeplexTooltipProps) => {
    const [open, setOpenState] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const tooltipId = useId();

    const setOpen = (next: boolean) => {
        setOpenState(next);
        if (onOpenChange) onOpenChange(next);
    };

    const scheduleOpen = () => {
        if (disabled) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = window.setTimeout(() => {
            setOpen(true);
        }, delayMs);
    };

    const scheduleClose = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpen(false);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowClasses = {
        top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r',
        bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-t border-l',
        left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r',
        right: 'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l',
    };

    return (
        <span
            className={`relative inline-flex ${className}`}
            onMouseEnter={scheduleOpen}
            onMouseLeave={scheduleClose}
            onFocus={scheduleOpen}
            onBlur={scheduleClose}
            aria-describedby={open ? tooltipId : undefined}
        >
            {children}

            {!disabled && open && (
                <div
                    id={tooltipId}
                    role="tooltip"
                    className={`
            absolute z-50
            ${positionClasses[side]}
            animate-in fade-in zoom-in-95 duration-200
            min-w-max
          `}
                >
                    <div
                        className={`
              relative
              px-3 py-2
              text-xs font-medium text-white
              bg-gray-900 dark:bg-gray-700
              rounded-md shadow-lg
              pointer-events-none
            `}
                    >
                        {content}

                        {arrow && (
                            <div
                                className={`
                  absolute w-2 h-2
                  bg-gray-900 dark:bg-gray-700
                  rotate-45
                  ${arrowClasses[side]}
                `}
                            />
                        )}
                    </div>
                </div>
            )}
        </span>
    );
};
