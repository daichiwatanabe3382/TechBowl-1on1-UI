"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TwoColumnLayout } from "@/components/Layout";
import SidebarButton from "@/components/SidebarButton";
import { ReservePage, TicketPage } from "@/components/1on1";
import MarketplacePage from "@/components/1on1/MarketplacePage";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
  TicketIcon,
} from "@/components/icons";

type LayoutPattern = "A" | "B";

const sidebarItems = [
  {
    id: "reserve",
    label: "1on1を予約",
    defaultIcon: <CalendarEventIcon size={18} filled={false} />,
    activeIcon: <CalendarEventIcon size={18} filled={true} />,
  },
  {
    id: "manage",
    label: "1on1管理",
    defaultIcon: <ListUnorderedIcon size={18} />,
    activeIcon: <ListUnorderedIcon size={18} />,
  },
  {
    id: "feedback",
    label: "フィードバック一覧",
    defaultIcon: <ShareForwardIcon size={18} filled={false} />,
    activeIcon: <ShareForwardIcon size={18} filled={true} />,
  },
  {
    id: "ticket",
    label: "チケットを増やす",
    defaultIcon: <CouponLineIcon size={18} />,
    activeIcon: <TicketIcon size={18} />,
  },
] as const;

const mobileLabels: Record<string, string> = {
  reserve: "予約",
  manage: "管理",
  feedback: "FB一覧",
  ticket: "チケット",
};

const validTabs = ["reserve", "manage", "feedback", "ticket"] as const;

function LayoutToggle({ pattern, onChange }: { pattern: LayoutPattern; onChange: (p: LayoutPattern) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(pattern === "A" ? "B" : "A")}
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity cursor-pointer"
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
      </svg>
      Pattern {pattern === "A" ? "B" : "A"} に切替
    </button>
  );
}

export default function OneOnOnePage() {
  return (
    <Suspense fallback={null}>
      <OneOnOnePageContent />
    </Suspense>
  );
}

function OneOnOnePageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = validTabs.includes(tabParam as (typeof validTabs)[number]) ? tabParam! : "reserve";
  const [activeItem, setActiveItem] = useState(initialTab);

  const layoutParam = searchParams.get("layout");
  const [layoutPattern, setLayoutPattern] = useState<LayoutPattern>(
    layoutParam === "B" ? "B" : "A"
  );
  useEffect(() => {
    if (layoutParam === "A" || layoutParam === "B") return; // URLパラメータ優先
    const saved = localStorage.getItem("1on1-layout-pattern");
    if (saved === "A" || saved === "B") setLayoutPattern(saved);
  }, [layoutParam]);
  const handlePatternChange = (p: LayoutPattern) => {
    setLayoutPattern(p);
    localStorage.setItem("1on1-layout-pattern", p);
  };

  if (layoutPattern === "B") {
    return (
      <>
        <MarketplacePage />
        <LayoutToggle pattern={layoutPattern} onChange={handlePatternChange} />
      </>
    );
  }

  return (
    <>
    <LayoutToggle pattern={layoutPattern} onChange={handlePatternChange} />
    <TwoColumnLayout
      activeNav="1on1"
      headerBanner={
        <div className="w-full overflow-hidden">
          <img
            src="/image/1on1/headerbanner-1on1.png"
            alt="1on1 - メンターと話しながら技術やキャリアについて思考を深めよう"
            className="w-full h-[80px] object-cover lg:h-auto lg:object-contain"
          />
        </div>
      }
      sidebar={
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <SidebarButton
                key={item.id}
                icon={isActive ? item.activeIcon : item.defaultIcon}
                label={item.label}
                isActive={isActive}
                onClick={() => setActiveItem(item.id)}
              />
            );
          })}
        </nav>
      }
      mobileTabs={
        <div className="flex border-b border-border-primary bg-bg-primary overflow-x-auto">
          {sidebarItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? "text-brand-primary border-b-2 border-brand-primary"
                    : "text-text-description"
                }`}
              >
                {isActive ? item.activeIcon : item.defaultIcon}
                <span>{mobileLabels[item.id] ?? item.label}</span>
              </button>
            );
          })}
        </div>
      }
    >
      <div className="py-4 lg:py-6">
        {activeItem === "reserve" && <ReservePage />}
        {activeItem === "manage" && (
          <div>
            <h2 className="text-xl font-bold text-text-body">1on1管理</h2>
          </div>
        )}
        {activeItem === "feedback" && (
          <div>
            <h2 className="text-xl font-bold text-text-body">
              フィードバック一覧
            </h2>
          </div>
        )}
        {activeItem === "ticket" && <TicketPage />}
      </div>
    </TwoColumnLayout>
    </>
  );
}
