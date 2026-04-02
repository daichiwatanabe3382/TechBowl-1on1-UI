"use client";

import { useState } from "react";
import Image from "next/image";
import { TwoColumnLayout } from "@/components/Layout";
import SidebarButton from "@/components/SidebarButton";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
  TicketIcon,
} from "@/components/icons";
import { PastConsultationCard, type PastConsultation } from "@/components/1on1/ConsultationList";
import { TopicCard, type TopicContent } from "@/components/1on1/TopicList";

// --- Sidebar items (shared with other 1on1 pages) ---
const sidebarItems = [
  { id: "reserve", label: "1on1を予約", defaultIcon: <CalendarEventIcon size={18} filled={false} />, activeIcon: <CalendarEventIcon size={18} filled={true} /> },
  { id: "manage", label: "1on1管理", defaultIcon: <ListUnorderedIcon size={18} />, activeIcon: <ListUnorderedIcon size={18} /> },
  { id: "feedback", label: "フィードバック一覧", defaultIcon: <ShareForwardIcon size={18} filled={false} />, activeIcon: <ShareForwardIcon size={18} filled={true} /> },
  { id: "ticket", label: "チケットを増やす", defaultIcon: <CouponLineIcon size={18} />, activeIcon: <TicketIcon size={18} /> },
];

// --- Mock mentor data ---
const mentorData = {
  name: "Takuma Kajikawa",
  company: "TechBowl Inc.",
  role: "ソフトウェアエンジニア",
  avatarUrl: "/image/home/puru-image.png",
  availability: "available" as const,
  level: "初心者OK" as const,
  englishOk: false,
  catchphrase: "テストハーネスの設計から運用まで、実践的に解説します。一緒にCI/CDパイプラインを改善しましょう！",
  bio: "TechBowl Inc.でソフトウェアエンジニアとして従事。テスト自動化やCI/CDの設計・運用に強みを持ち、個人でもOSSのテストフレームワーク開発に取り組んでいる。TechTrainではテスト設計やCI/CD構築をテーマに1on1を行い、初心者から中級者まで幅広く対応。",
  skills: ["TypeScript", "React", "Next.js", "CI/CD", "テスト自動化", "GitHub Actions"],
  stats: { totalSessions: 128, repeatRate: 84, avgRating: 4.8 },
  topicContents: [
    { id: "1", title: "実践ハーネスエンジニアリング", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", category: "登壇資料・スライド", source: "Speaker Deck", thumbnail: "/image/placeholder-article-1.svg", topics: ["テストハーネスの設計パターン", "E2Eテストの自動化戦略"], summary: "テストハーネスの設計から運用までを体系的に解説。実プロジェクトでの導入事例を交えながら、持続可能なテスト基盤の構築方法を紹介。", updatedAt: "2026-03-30" },
    { id: "2", title: "テスト自動化のベストプラクティス", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", category: "技術記事", source: "Zenn", thumbnail: "/image/placeholder-article-2.svg", topics: ["テスト戦略の立て方", "CI/CDでの自動テスト"], summary: "ユニットテスト・統合テスト・E2Eテストの使い分けと、チームで回すための自動化のコツ。", updatedAt: "2026-03-25" },
    { id: "3", title: "CI/CDパイプライン設計入門", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", category: "技術記事", source: "Qiita", thumbnail: "/image/placeholder-article-1.svg", topics: ["GitHub Actionsの活用", "デプロイ自動化"], summary: "GitHub Actionsを使ったCI/CDパイプラインの設計と、段階的な自動化の進め方を解説。", updatedAt: "2026-03-18" },
  ] satisfies TopicContent[],
  consultations: [
    { id: "c1", before: "テストを書く習慣がなく、リファクタリングが怖い", after: "テスト戦略が明確になり、安心してコードを変えられるように", caption: "どこからテストを書き始めるか、優先順位を一緒に整理してもらえました", categoryLabel: "コードレビュー", categoryId: "code-review", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", mentorId: "demo", date: "2026.03.20" },
    { id: "c2", before: "CI/CDのビルドが毎回10分以上かかって辛い", after: "キャッシュ戦略とステージ分割で3分に短縮", caption: "ボトルネックの特定方法から教えてもらい、自分でも改善を続けられるようになりました", categoryLabel: "業務で詰まっている", categoryId: "stuck", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", mentorId: "demo", date: "2026.03.15" },
    { id: "c3", before: "GitHub Actionsのワークフロー、何が正解かわからない", after: "チーム規模に合った現実的な構成が決まった", caption: "理想と現実のバランスを考慮して提案してくれたのが助かりました", categoryLabel: "技術選定", categoryId: "tech-selection", mentorName: "Takuma Kajikawa", mentorAvatar: "/image/home/puru-image.png", mentorId: "demo", date: "2026.03.10" },
  ] satisfies PastConsultation[],
  reviews: [
    { id: "1", userName: "ユーザーA", rating: 5, comment: "テスト設計について非常にわかりやすく教えていただけました。実務にすぐ活かせる内容でした。", date: "2026-03-20" },
    { id: "2", userName: "ユーザーB", rating: 5, comment: "CI/CDの構築で悩んでいたところを的確にアドバイスしてもらえました。", date: "2026-03-15" },
    { id: "3", userName: "ユーザーC", rating: 4, comment: "初心者の自分にも丁寧に説明してくれて、とても助かりました。次回もお願いしたいです。", date: "2026-03-10" },
  ],
  schedule: [
    { day: "月", slots: ["19:00", "20:00", "21:00"] },
    { day: "火", slots: ["19:00", "20:00"] },
    { day: "水", slots: [] },
    { day: "木", slots: ["19:00", "20:00", "21:00"] },
    { day: "金", slots: ["20:00", "21:00"] },
    { day: "土", slots: ["10:00", "11:00", "14:00", "15:00"] },
    { day: "日", slots: ["10:00", "11:00"] },
  ],
};

const availabilityConfig = {
  available: { label: "空いてる！", colors: "text-[#0fba68] bg-[#edfcf3] border-[#b6f2d0]" },
  few: { label: "まだいける", colors: "text-[#e8930c] bg-[#fff8eb] border-[#fde6b0]" },
  full: { label: "いっぱい", colors: "text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]" },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={16} height={16} viewBox="0 0 24 24" fill={i <= rating ? "#f59e0b" : "none"} stroke={i <= rating ? "#f59e0b" : "#d1d5db"} strokeWidth={2}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function MentorDetailPage() {
  const [activeTab, setActiveTab] = useState<"about" | "topics" | "consultations" | "reviews">("about");
  const mentor = mentorData;
  const avail = availabilityConfig[mentor.availability];

  return (
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
            const isActive = item.id === "reserve";
            return (
              <SidebarButton
                key={item.id}
                icon={isActive ? item.activeIcon : item.defaultIcon}
                label={item.label}
                isActive={isActive}
                onClick={() => {}}
              />
            );
          })}
        </nav>
      }
    >
      <div className="py-6 max-w-3xl">
        {/* Back link */}
        <a href="/1on1" className="inline-flex items-center gap-1 text-sm text-text-description hover:text-brand-primary transition-colors mb-6">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
          </svg>
          戻る
        </a>

        {/* Profile header */}
        <div className="flex items-start gap-5">
          <div className="shrink-0 size-20 rounded-full overflow-hidden bg-bg-quaternary">
            <Image src={mentor.avatarUrl} alt={mentor.name} width={80} height={80} className="size-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-text-body">{mentor.name}</h1>
              <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${avail.colors}`}>
                {avail.label}
              </span>
            </div>
            <p className="text-sm text-text-description mt-1">{mentor.company} / {mentor.role}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs">
                <span className={`inline-block size-2 rounded-full ${mentor.level === "初心者OK" ? "bg-green-500" : "bg-red-500"}`} />
                <span className={mentor.level === "初心者OK" ? "text-green-600" : "text-red-500"}>{mentor.level}</span>
              </span>
              {mentor.englishOk && (
                <span className="flex items-center gap-1 text-xs">
                  <span className="inline-block size-2 rounded-full bg-green-500" />
                  <span className="text-green-600">English OK</span>
                </span>
              )}
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mentor.skills.map((skill) => (
                <span key={skill} className="inline-block px-2 py-0.5 text-xs text-text-body bg-bg-quaternary rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Catchphrase bubble */}
        <div className="mt-4 relative">
          <div className="absolute -top-1.5 left-8 w-3 h-3 bg-bg-quaternary rotate-45" />
          <div className="px-4 py-3 bg-bg-quaternary rounded-lg relative">
            <p className="text-sm text-brand-primary leading-relaxed">{mentor.catchphrase}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-bg-secondary rounded-xl border border-border-primary">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-body">{mentor.stats.totalSessions}</p>
            <p className="text-xs text-text-description mt-0.5">累計セッション</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-body">{mentor.stats.repeatRate}%</p>
            <p className="text-xs text-text-description mt-0.5">リピート率</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="#f59e0b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-2xl font-bold text-text-body">{mentor.stats.avgRating}</span>
            </div>
            <p className="text-xs text-text-description mt-0.5">平均評価</p>
          </div>
        </div>

        {/* Reserve CTA */}
        <button className="w-full mt-6 py-3 px-6 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
          このメンターに相談する
        </button>

        {/* Tabs */}
        <div className="flex border-b border-border-primary mt-8">
          {([
            { key: "about", label: "プロフィール" },
            { key: "topics", label: "トピック" },
            { key: "consultations", label: "相談履歴" },
            { key: "reviews", label: "レビュー" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? "text-brand-primary"
                  : "text-text-description hover:text-text-body"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {activeTab === "about" && (
            <div className="space-y-6">
              {/* Bio */}
              <div>
                <h2 className="text-base font-bold text-text-body mb-2">自己紹介</h2>
                <p className="text-sm text-text-body leading-relaxed">{mentor.bio}</p>
              </div>

              {/* Schedule */}
              <div>
                <h2 className="text-base font-bold text-text-body mb-3">対応スケジュール</h2>
                <div className="grid grid-cols-7 gap-2">
                  {mentor.schedule.map((day) => (
                    <div key={day.day} className="text-center">
                      <p className="text-xs font-medium text-text-description mb-2">{day.day}</p>
                      {day.slots.length === 0 ? (
                        <p className="text-xs text-text-description">-</p>
                      ) : (
                        <div className="space-y-1">
                          {day.slots.map((slot) => (
                            <span key={slot} className="block text-[11px] px-1 py-0.5 bg-green-50 text-green-600 rounded">
                              {slot}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "topics" && (
            <div className="grid grid-cols-3 gap-3">
              {mentor.topicContents.map((topic) => (
                <TopicCard key={topic.id} content={topic} />
              ))}
            </div>
          )}

          {activeTab === "consultations" && (
            <div className="flex flex-col gap-2">
              {mentor.consultations.map((consultation) => (
                <PastConsultationCard key={consultation.id} consultation={consultation} />
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {mentor.reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-xl border border-border-primary">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-8 rounded-full bg-bg-quaternary flex items-center justify-center">
                      <span className="text-xs font-medium text-text-description">{review.userName.charAt(review.userName.length - 1)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-body">{review.userName}</p>
                      <p className="text-xs text-text-description">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-text-body leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TwoColumnLayout>
  );
}
