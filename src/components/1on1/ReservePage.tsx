"use client";

import { useState } from "react";
import MentorList from "./MentorList";
import TopicList from "./TopicList";
import ConsultationList from "./ConsultationList";

// ── ページモード ──
type PageMode = "consultation" | "topic" | "mentor";

// ── タブ定義 ──
const tabs = [
  { id: "consultation" as PageMode, label: "お悩みから予約", desc: "悩みや相談したいことから探す" },
  { id: "topic" as PageMode, label: "トピックから予約", desc: "気になる技術記事・書籍から探す" },
  { id: "mentor" as PageMode, label: "メンターから予約", desc: "メンターのプロフィールから探す" },
];

// ── メインコンポーネント ──
export default function ReservePage() {
  const [mode, setMode] = useState<PageMode>("consultation");

  return (
    <div>
      <h2 className="text-xl font-bold text-text-body mb-4">
        メンターを探して1on1予約
      </h2>

      {/* 共通タブ */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {tabs.map((tab) => {
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={`flex flex-col items-center gap-1.5 px-4 py-4 rounded-xl transition-all cursor-pointer border-2 ${
                isActive
                  ? "bg-brand-primary/5 border-brand-primary"
                  : "bg-white border-border-primary hover:border-brand-primary hover:bg-brand-primary/5"
              } group`}
            >
              <span className={`text-sm font-bold transition-colors ${
                isActive ? "text-brand-primary" : "text-text-body group-hover:text-brand-primary"
              }`}>{tab.label}</span>
              <span className="text-[11px] text-text-description">{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {mode === "consultation" && <ConsultationList />}
      {mode === "topic" && <TopicList />}
      {mode === "mentor" && <MentorList />}
    </div>
  );
}
