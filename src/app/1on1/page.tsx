"use client";

import { useState } from "react";
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

export default function OneOnOnePage() {
  const [activeItem, setActiveItem] = useState("reserve");

  return (
    <TwoColumnLayout
      activeNav="1on1"
      headerBanner={
        <div className="w-full h-[140px] overflow-hidden">
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
    >
      <div className="py-6">
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
