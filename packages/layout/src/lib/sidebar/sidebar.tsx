import React, { useState, useEffect } from 'react';
import { CodeplexUserInfo } from '../header/header';

export interface CodeplexMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    active?: boolean;
    disabled?: boolean;
    badge?: string;
    children?: CodeplexMenuItem[];
    onClick?: () => void;
}

export interface CodeplexSidebarProps {
    items: CodeplexMenuItem[];
    user?: CodeplexUserInfo;
    logo?: string;
    logoText?: string;
    collapsed?: boolean;
    autoCloseOnNavigate?: boolean;
    onToggle?: (collapsed: boolean) => void;
    onNavigate?: (href: string) => void;
    onLogout?: () => void;
    footer?: boolean;
    children?: React.ReactNode;
}

export const CodeplexSidebar = ({
    items,
    user,
    logo,
    logoText = 'Codeplex',
    collapsed = false,
    autoCloseOnNavigate = true,
    onToggle,
    onNavigate,
    onLogout,
    footer = true,
    children,
}: CodeplexSidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    // Sincronizar ítems activos con la expansión inicial
    useEffect(() => {
        const activeParents = items
            .filter((i) => i.active && i.children && i.children.length > 0)
            .map((i) => i.id);

        if (activeParents.length > 0) {
            setExpandedItems((prev) => [...new Set([...prev, ...activeParents])]);
        }
    }, [items]);

    useEffect(() => {
        setIsCollapsed(collapsed);
    }, [collapsed]);

    const toggleCollapse = () => {
        const newVal = !isCollapsed;
        setIsCollapsed(newVal);
        if (onToggle) onToggle(newVal);
    };

    const toggleMobile = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    const closeMobile = () => {
        setIsMobileOpen(false);
    };

    const toggleItem = (itemId: string) => {
        if (expandedItems.includes(itemId)) {
            setExpandedItems(expandedItems.filter((id) => id !== itemId));
        } else {
            setExpandedItems([...expandedItems, itemId]);
        }
    };

    const handleNavigate = (href?: string) => {
        if (!href) return;

        if (onNavigate) {
            onNavigate(href);
        }

        if (autoCloseOnNavigate && typeof window !== 'undefined') {
            if (window.innerWidth < 1024) {
                setIsMobileOpen(false);
            }
        }
    };

    return (
        <>
            {/* Botón hamburguesa MOBILE */}
            <button
                type="button"
                className="fixed top-3 left-3 z-50 p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleMobile}
                aria-label={isMobileOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isMobileOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </button>

            {/* Backdrop MOBILE */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={closeMobile}
                    aria-hidden="true"
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
          fixed top-0 left-0 z-40 h-screen
          bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700
          transition-transform duration-300
          flex flex-col
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'lg:w-16 w-64' : 'w-64'}
        `}
            >
                {/* HEADER CON LOGO / TOGGLE */}
                <div
                    className="
            flex items-center justify-between
            h-14 flex-shrink-0
            pr-4 lg:px-4
            pl-14 lg:pl-4
            border-b border-gray-200 dark:border-gray-700
          "
                >
                    {!isCollapsed && (
                        <div className="flex items-center gap-3 overflow-hidden">
                            {logo && <img src={logo} alt="Logo" className="w-8 h-8" />}
                            <span className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                {logoText}
                            </span>
                        </div>
                    )}

                    {/* Botón colapsar SOLO DESKTOP */}
                    <button
                        type="button"
                        className="hidden lg:inline-flex p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={toggleCollapse}
                        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isCollapsed ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* MENU CON SCROLL OCULTO */}
                <nav
                    className="
            flex-1 px-3 py-4 overflow-y-auto
            [&::-webkit-scrollbar]:hidden
          "
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <ul className="space-y-2">
                        {items.map((item) => {
                            const hasChildren = !!item.children && item.children.length > 0;
                            const isExpanded = expandedItems.includes(item.id);

                            const baseItemClasses = `
                flex items-center w-full p-2 rounded-lg
                text-gray-900 dark:text-white
                hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors duration-200
                ${item.active
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                                    : ''
                                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              `;

                            return (
                                <li key={item.id}>
                                    {hasChildren ? (
                                        <>
                                            <button
                                                type="button"
                                                className={baseItemClasses}
                                                onClick={() => {
                                                    if (item.disabled) return;
                                                    toggleItem(item.id);
                                                }}
                                                disabled={item.disabled}
                                            >
                                                {item.icon && (
                                                    <span className="text-xl flex-shrink-0">
                                                        {item.icon}
                                                    </span>
                                                )}
                                                {!isCollapsed && (
                                                    <>
                                                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                                                            {item.label}
                                                        </span>
                                                        {item.badge && (
                                                            <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                        <svg
                                                            className={`
                                w-5 h-5 transition-transform duration-200
                                ${isExpanded ? 'rotate-180' : ''}
                              `}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>

                                            {/* Submenú */}
                                            {!isCollapsed && isExpanded && (
                                                <ul className="py-2 space-y-1 pl-6 animate-fade-in">
                                                    {item.children!.map((child) => (
                                                        <li key={child.id}>
                                                            <a
                                                                href={child.href}
                                                                className={`
                                  flex items-center p-2 rounded-lg
                                  text-gray-900 dark:text-white
                                  hover:bg-gray-100 dark:hover:bg-gray-700
                                  transition-colors duration-200
                                  ${child.active
                                                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200'
                                                                        : ''
                                                                    }
                                `}
                                                                onClick={(e) => {
                                                                    if (onNavigate && child.href) {
                                                                        e.preventDefault();
                                                                        handleNavigate(child.href);
                                                                    } else if (child.onClick) {
                                                                        child.onClick();
                                                                        handleNavigate();
                                                                    }
                                                                }}
                                                            >
                                                                {child.icon && (
                                                                    <span className="text-lg flex-shrink-0">
                                                                        {child.icon}
                                                                    </span>
                                                                )}
                                                                <span className="ml-3">{child.label}</span>
                                                                {child.badge && (
                                                                    <span className="inline-flex items-center justify-center px-2 ml-auto text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                                        {child.badge}
                                                                    </span>
                                                                )}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className={baseItemClasses}
                                            onClick={(e) => {
                                                if (item.disabled) {
                                                    e.preventDefault();
                                                    return;
                                                }
                                                if (onNavigate && item.href) {
                                                    e.preventDefault();
                                                    handleNavigate(item.href);
                                                } else {
                                                    if (item.onClick) item.onClick();
                                                    handleNavigate();
                                                }
                                            }}
                                        >
                                            {item.icon && (
                                                <span className="text-xl flex-shrink-0">
                                                    {item.icon}
                                                </span>
                                            )}
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                                        {item.label}
                                                    </span>
                                                    {item.badge && (
                                                        <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* FOOTER USUARIO */}
                {footer && user && (
                    <div className="border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                        <div className="flex items-center p-4">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full dark:bg-gray-600">
                                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}

                            {!isCollapsed && (
                                <div className="flex-1 ml-3 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {user.name}
                                    </p>
                                    {user.email && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    )}
                                    {user.role && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {user.role}
                                        </p>
                                    )}
                                </div>
                            )}

                            {!isCollapsed && onLogout && (
                                <button
                                    type="button"
                                    className="p-2 ml-1 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={onLogout}
                                    aria-label="Cerrar sesión"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Slot extra */}
                {children}
            </aside>
        </>
    );
};
