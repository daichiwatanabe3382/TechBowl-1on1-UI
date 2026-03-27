"use client";

import { useState } from "react";
import MentorList from "./MentorList";
import TopicList from "./TopicList";
import ConsultationList from "./ConsultationList";

const tabs = [
  { id: "consultation", label: "お悩みから予約" },
  { id: "topic", label: "トピックから予約" },
  { id: "mentor", label: "メンターから予約" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ReservePage() {
  const [activeTab, setActiveTab] = useState<TabId>("consultation");

  return (
    <div>
      <h2 className="text-xl font-bold text-text-body mb-4">
        メンターを探して1on1予約
      </h2>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 bg-bg-quaternary rounded-lg p-1 w-fit mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-brand-primary shadow-sm"
                  : "text-text-description hover:text-text-body"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === "topic" && <TopicList />}
      {activeTab === "consultation" && <ConsultationList />}
      {activeTab === "mentor" && <MentorList />}
    </div>
  );
}
