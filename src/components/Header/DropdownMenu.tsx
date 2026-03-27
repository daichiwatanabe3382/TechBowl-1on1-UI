"use client";

import { ReactNode } from "react";

export type DropdownItem = {
  icon: ReactNode;
  label: string;
  href: string;
};

type DropdownMenuProps = {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
};

export default function DropdownMenu({
  items,
  isOpen,
  onClose,
}: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="absolute top-full left-0 mt-2 z-50 backdrop-blur-[10px] bg-white/90 border border-border-secondary rounded-2xl shadow-[0px_8px_12px_0px_rgba(0,0,0,0.04)] p-2 flex flex-col gap-0.5 min-w-[180px]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-1 p-2 rounded-xl text-sm font-bold text-text-body hover:bg-bg-quaternary transition-colors"
            onClick={onClose}
          >
            <span className="size-4">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </>
  );
}
