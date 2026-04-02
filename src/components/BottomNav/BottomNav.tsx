"use client";

import {
  ChatIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FileListIcon,
  AccountCircleIcon,
} from "@/components/icons";

type BottomNavProps = {
  activeNav?: string;
};

const navItems = [
  { Icon: ChatIcon, label: "1on1", href: "/1on1" },
  { Icon: BriefcaseIcon, label: "スカウト", href: "/scout" },
  { Icon: GraduationCapIcon, label: "学ぶ", href: "/learn" },
  { Icon: FileListIcon, label: "メディア", href: "/media" },
  { Icon: AccountCircleIcon, label: "マイページ", href: "/" },
];

export default function BottomNav({ activeNav }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-primary border-t border-border-primary pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const isActive = activeNav === item.label;
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                isActive ? "text-brand-primary" : "text-text-description"
              }`}
            >
              <item.Icon size={22} filled={isActive} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
