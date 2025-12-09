import { useState } from "react";

interface TopbarProps {
  title: string;
  rolelabel?:string;
}

export function Topbar({ title }: TopbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0f172a] text-white border-b border-slate-700 pl-72 pr-6 flex items-center justify-between fixed top-0 left-0 right-0 z-10">
      
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-sm hover:bg-slate-100 transition"
        >
          G
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg border border-slate-200 py-2">
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100">Profile</button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100">Settings</button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
