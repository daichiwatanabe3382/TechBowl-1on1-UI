"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TwoColumnLayout } from "@/components/Layout";
import SidebarButton from "@/components/SidebarButton";
import { ReservePage, TicketPage } from "@/components/1on1";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
  TicketIcon,
} from "@/components/icons";

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

  return (
    <TwoColumnLayout
      activeNav="1on1"
      headerBanner={
        <div className="w-full h-[100px] md:h-[140px] overflow-hidden">
          <img
            src="/image/1on1/headerbanner-1on1.png"
            alt="1on1 - メンターと話しながら技術やキャリアについて思考を深めよう"
            className="w-full h-full object-cover"
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
      <div className="py-4 md:py-6">
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
  );
}
