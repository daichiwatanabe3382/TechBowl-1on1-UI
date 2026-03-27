"use client";

import { ReactNode } from "react";

type SidebarButtonProps = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
};

/**
 * サイドバーメニューボタン
 * Figma: node-id=32-4917
 * - default: テキスト + アイコン、背景なし
 * - hover: 薄い背景色 (bg-bg-quaternary)
 * - active: bg-bg-quaternary + font-bold
 */
export default function SidebarButton({
  icon,
  label,
  isActive = false,
  href,
  onClick,
}: SidebarButtonProps) {
  const baseClasses =
    "flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer";

  const stateClasses = isActive
    ? "bg-bg-quaternary text-text-body font-bold"
    : "text-text-secondary hover:bg-bg-quaternary";

  const className = `${baseClasses} ${stateClasses}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {icon}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
