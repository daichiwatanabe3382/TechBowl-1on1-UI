import { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

type ActionButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "px-2.5 py-1.5 text-[11px] gap-0.5",
  md: "px-3 py-2 text-xs gap-0.5",
} as const;

/**
 * 汎用アクションボタン（pill形状）
 * Figma: node-id=94-4065
 * - bg: #3D3D5C, text: white, rounded-full
 * - hover: opacity 80%
 * - size: sm (チケット内など) / md (デフォルト)
 */
export default function ActionButton({
  children,
  href,
  onClick,
  icon,
  size = "md",
  className = "",
}: ActionButtonProps) {
  const baseClasses = `inline-flex items-center bg-brand-primary text-white font-medium rounded-full hover:opacity-80 transition-opacity ${sizeClasses[size]}`;

  const arrowSize = size === "sm" ? 12 : 14;

  const content = (
    <>
      {icon}
      {children}
      <ArrowRightIcon size={arrowSize} />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${className}`}>
      {content}
    </button>
  );
}
