import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface TopbarProps {
  title: string;
  roleLabel?: string;
  onMenuClick?: () => void;
}

export function Topbar({ title, roleLabel, onMenuClick }: TopbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 right-0 left-0 z-30 h-16",
        "bg-white/80 backdrop-blur-md border-b border-slate-200/80",
        "lg:left-72", // Push right on large screens to account for sidebar
        "transition-all duration-300"
      )}
    >
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-3">
          {/* Hamburger menu button - visible on mobile only */}
          <button
            onClick={onMenuClick}
            className={clsx(
              "lg:hidden p-2 -ml-2 rounded-xl",
              "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page title and breadcrumb */}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              {title}
            </h1>
            {roleLabel && (
              <p className="text-xs text-slate-500 hidden sm:block">{roleLabel}</p>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search button - hidden on very small screens */}
          <button
            className={clsx(
              "hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl",
              "bg-slate-100 text-slate-500 text-sm",
              "hover:bg-slate-200 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium bg-white rounded border border-slate-200 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button
            className={clsx(
              "relative p-2 rounded-xl",
              "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
              "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            )}
            aria-label="Notifications"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Notification badge */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={clsx(
                "flex items-center gap-2 p-1.5 pr-3 rounded-xl",
                "hover:bg-slate-100 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary/20"
              )}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                G
              </div>
              <svg
                className={clsx(
                  "w-4 h-4 text-slate-400 transition-transform hidden sm:block",
                  isProfileOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div
                className={clsx(
                  "absolute right-0 mt-2 w-56 origin-top-right",
                  "bg-white rounded-xl shadow-lg border border-slate-200",
                  "py-1 z-50",
                  "animate-fade-in"
                )}
                role="menu"
              >
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">Guest User</p>
                  <p className="text-xs text-slate-500 mt-0.5">guest@example.com</p>
                </div>
                <div className="py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors" role="menuitem">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors" role="menuitem">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors" role="menuitem">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
