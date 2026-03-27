"use client";

import { useState } from "react";
import HeaderButton from "./HeaderButton";
import DropdownMenu, { DropdownItem } from "./DropdownMenu";
import {
  ChatIcon,
  BriefcaseIcon,
  AccountCircleIcon,
  GridIcon,
  NotificationIcon,
  TicketIcon,
  AddIcon,
  TerminalBoxIcon,
  ArticleIcon,
} from "@/components/icons";

type NavItem = {
  Icon: React.ComponentType<{ size?: number; filled?: boolean }>;
  label: string;
  href?: string;
  hasDropdown?: boolean;
};

type HeaderProps = {
  ticketCount?: number;
  activeNav?: string;
};

const navItems: NavItem[] = [
  { Icon: ChatIcon, label: "1on1", href: "/1on1" },
  { Icon: BriefcaseIcon, label: "スカウト", href: "/scout" },
  { Icon: AccountCircleIcon, label: "マイページ", href: "/" },
  { Icon: GridIcon, label: "その他", hasDropdown: true },
];

const dropdownItems: DropdownItem[] = [
  {
    icon: <TerminalBoxIcon size={16} />,
    label: "実践問題集",
    href: "/practice",
  },
  {
    icon: <ArticleIcon size={16} />,
    label: "テックメディア",
    href: "/media",
  },
];

export default function Header({ ticketCount = 4, activeNav }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center gap-4 bg-bg-primary border-b border-border-primary pl-4 pr-6 py-3 w-full">
      {/* Logo */}
      <div className="shrink-0">
        <img
          src="/image/techtrain_logo.svg"
          alt="TechTrain"
          width={109}
          height={24}
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 gap-2 items-center">
        {navItems.map((item) => {
          const isActive =
            activeNav === item.label || (item.hasDropdown && isDropdownOpen);

          if (item.hasDropdown) {
            return (
              <div key={item.label} className="relative">
                <HeaderButton
                  icon={<item.Icon filled={isActive} />}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <DropdownMenu
                  items={dropdownItems}
                  isOpen={isDropdownOpen}
                  onClose={() => setIsDropdownOpen(false)}
                />
              </div>
            );
          }

          return (
            <HeaderButton
              key={item.label}
              icon={<item.Icon filled={isActive} />}
              label={item.label}
              href={item.href}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Notification */}
      <button
        type="button"
        className="flex items-center justify-center size-7 rounded-xs text-text-body hover:bg-bg-quaternary transition-colors cursor-pointer"
      >
        <NotificationIcon size={20} />
      </button>

      {/* Ticket Counter */}
      <a
        href="/tickets"
        className="flex items-center border border-border-secondary rounded-full overflow-hidden shrink-0"
      >
        <div className="flex items-center gap-1 pl-4 pr-3 py-1 border-r border-border-secondary">
          <TicketIcon size={14} className="text-text-body" />
          <span className="text-xs font-medium text-text-body leading-tight">
            チケット数
          </span>
          <span className="text-[21px] font-bold text-text-body leading-tight">
            {ticketCount}
          </span>
        </div>
        <div className="flex items-center gap-1 px-3 h-9 bg-bg-tertiary">
          <span className="text-sm font-bold text-text-description">追加</span>
          <AddIcon size={16} className="text-text-description" />
        </div>
      </a>

      {/* User Avatar */}
      <div className="size-7 rounded-lg bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 shrink-0 overflow-hidden cursor-pointer" />
    </header>
  );
}
