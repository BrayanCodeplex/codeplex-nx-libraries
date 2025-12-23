import React, { useState, useRef, useEffect } from 'react';
import { CodeplexUserInfo } from '../header/header';

export interface CodeplexNavbarLink {
    id: string;
    label: string;
    href?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export interface CodeplexNavbarProps {
    logoText?: string;
    logoSrc?: string;
    links?: CodeplexNavbarLink[];
    user?: CodeplexUserInfo;
    position?: 'fixed' | 'sticky' | 'static';
    className?: string;
    children?: React.ReactNode;
}

export const CodeplexNavbar = ({
    logoText = 'Codeplex',
    logoSrc,
    links = [],
    user,
    position = 'sticky',
    className = '',
    children,
}: CodeplexNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    const toggle = () => setIsOpen(!isOpen);
    const close = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                navRef.current &&
                !navRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const positionClass =
        position === 'fixed'
            ? 'fixed top-0 left-0 right-0 z-50'
            : position === 'sticky'
                ? 'sticky top-0 z-50'
                : 'relative z-50';

    return (
        <nav
            ref={navRef}
            className={`
        w-full
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-b border-gray-200 dark:border-gray-800
        transition-all duration-200
        ${positionClass}
        ${className}
      `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* LEFT: Logo & Desktop Links */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div
                            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
                            onClick={() => (window.location.href = '/')}
                        >
                            {logoSrc ? (
                                <img
                                    src={logoSrc}
                                    alt={logoText}
                                    className="w-8 h-8 rounded-lg object-cover shadow-sm"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                    {logoText.charAt(0)}
                                </div>
                            )}
                            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                                {logoText}
                            </span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {links.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => {
                                        if (link.disabled) return;
                                        if (link.onClick) link.onClick();
                                        if (link.href) window.location.href = link.href;
                                    }}
                                    disabled={link.disabled}
                                    className={`
                    px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${link.active
                                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                        }
                    ${link.disabled
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'cursor-pointer'
                                        }
                  `}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Actions & User & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        {/* Children for extra actions */}
                        <div className="flex items-center gap-2">{children}</div>

                        {/* User Profile (Desktop & Tablet) */}
                        {user && (
                            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <div className="text-right hidden lg:block">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                                        {user.name}
                                    </p>
                                    {user.role && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {user.role}
                                        </p>
                                    )}
                                </div>
                                <button className="relative group focus:outline-none">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700 shadow-sm group-hover:ring-2 ring-blue-500/50 transition-all"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:ring-2 ring-blue-500/50 transition-all">
                                            <span className="text-sm font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                onClick={toggle}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Abrir menú principal</span>
                                {isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Collapsible) */}
            <div
                className={`
          md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => {
                                if (link.disabled) return;
                                if (link.onClick) link.onClick();
                                if (link.href) window.location.href = link.href;
                                close();
                            }}
                            disabled={link.disabled}
                            className={`
                block w-full text-left px-3 py-2 rounded-md text-base font-medium
                ${link.active
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                                }
                ${link.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile User Profile Section */}
                {user && (
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                {user.avatar ? (
                                    <img
                                        className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                                        src={user.avatar}
                                        alt=""
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-gray-900 dark:text-white">
                                    {user.name}
                                </div>
                                {user.email && (
                                    <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400 mt-1">
                                        {user.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
