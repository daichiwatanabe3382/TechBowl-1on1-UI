"use client";

import { ReactNode } from "react";

type HeaderButtonProps = {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
};

export default function HeaderButton({
  icon,
  label,
  isActive = false,
  href,
  onClick,
}: HeaderButtonProps) {
  const baseClasses =
    "flex items-center gap-1 px-3 py-2.5 rounded-full text-sm font-bold transition-colors cursor-pointer";

  const stateClasses = isActive
    ? "bg-icon-body text-text-on-fill"
    : "text-text-body hover:bg-bg-quaternary";

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
