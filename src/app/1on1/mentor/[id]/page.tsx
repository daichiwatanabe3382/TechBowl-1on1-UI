"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { PastConsultationCard, type PastConsultation } from "@/components/1on1/ConsultationList";
import { type TopicContent } from "@/components/1on1/TopicList";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
} from "@/components/icons";

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
  strongConsultations: [
    { emoji: "🧪", label: "テスト設計・自動化", description: "ユニットテストからE2Eまで、プロジェクトに合ったテスト戦略を一緒に考えます" },
    { emoji: "🔄", label: "CI/CDパイプライン構築", description: "GitHub Actionsを中心に、ビルド・デプロイの自動化と高速化をサポート" },
    { emoji: "📝", label: "コードレビュー・設計相談", description: "リファクタリングの進め方や設計の悩みを壁打ちしながら整理します" },
    { emoji: "🚀", label: "開発生産性の改善", description: "チームの開発フローのボトルネック特定から改善提案まで" },
  ],
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
  careerHistory: [
    { period: "2024 - 現在", company: "TechBowl Inc.", role: "ソフトウェアエンジニア", description: "テスト自動化基盤の設計・開発。CI/CDパイプラインの構築と運用改善をリード。OSSテストフレームワークのメンテナー。" },
    { period: "2021 - 2024", company: "株式会社メルカリ", role: "QAエンジニア → SET（Software Engineer in Test）", description: "E2Eテスト基盤の構築、テスト戦略の策定。チームのテスト文化醸成に貢献。GitHub Actionsを活用したCI/CD改善。" },
    { period: "2019 - 2021", company: "株式会社サイバーエージェント", role: "フロントエンドエンジニア", description: "React/TypeScriptでの新規プロダクト開発。コンポーネントテストの導入をリードし、チーム全体のテスト文化を定着。" },
  ],
  schedule: [
    { day: "月", slots: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
    { day: "火", slots: ["19:00", "19:30", "20:00", "20:30"] },
    { day: "水", slots: [] },
    { day: "木", slots: ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
    { day: "金", slots: ["20:00", "20:30", "21:00", "21:30"] },
    { day: "土", slots: ["10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30"] },
    { day: "日", slots: ["10:00", "10:30", "11:00", "11:30"] },
  ],
};

const availabilityConfig = {
  available: { label: "空いてる！", colors: "text-[#0fba68] bg-[#edfcf3] border-[#b6f2d0]" },
  few: { label: "まだいける", colors: "text-[#e8930c] bg-[#fff8eb] border-[#fde6b0]" },
  full: { label: "いっぱい", colors: "text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]" },
};

const menuItems = [
  { id: "reserve", label: "1on1を予約", mobileLabel: "予約", icon: <CalendarEventIcon size={16} filled={false} /> },
  { id: "manage", label: "1on1管理", mobileLabel: "管理", icon: <ListUnorderedIcon size={16} /> },
  { id: "feedback", label: "フィードバック一覧", mobileLabel: "FB一覧", icon: <ShareForwardIcon size={16} filled={false} /> },
  { id: "ticket", label: "チケットを増やす", mobileLabel: "チケット", icon: <CouponLineIcon size={16} /> },
];

const stanceOptions = [
  { id: "gentle", emoji: "🌱", label: "やさしく丁寧に" },
  { id: "honest", emoji: "🔥", label: "腹を割って本音で" },
  { id: "casual", emoji: "☕", label: "フランクに世間話" },
  { id: "logical", emoji: "🧠", label: "ロジカルに整理" },
  { id: "mentor", emoji: "🎯", label: "引っ張ってリード" },
];

// --- Section heading ---
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-text-body mb-4 flex items-center gap-2">
      {children}
    </h2>
  );
}

export default function MentorDetailPage() {
  const mentor = mentorData;
  const avail = availabilityConfig[mentor.availability];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultationText, setConsultationText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedStance, setSelectedStance] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const calendarScrollRef = useRef<HTMLDivElement>(null);

  const scrollCalendar = (dir: "left" | "right") => {
    const el = calendarScrollRef.current;
    if (el) {
      // 日付ボタン1つ分の幅(40px) + gap(6px) = 46px × 7日 = 322px
      const scrollAmount = 46 * 7;
      el.scrollBy({ left: dir === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const fillConsultation = (text: string) => {
    setConsultationText(text);
    setShowConfirm(false);
    setTimeout(() => {
      autoResize();
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  // 2週間分のカレンダーデータを生成
  const dayLabels = ["日", "月", "火", "水", "木", "金", "土"];
  const calendarDays = useMemo(() => {
    const today = new Date();
    const days: { date: Date; dateStr: string; dayLabel: string; slots: string[] }[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayLabel = dayLabels[d.getDay()];
      const scheduleForDay = mentor.schedule.find(s => s.day === dayLabel);
      days.push({
        date: d,
        dateStr: `${d.getMonth() + 1}/${d.getDate()}`,
        dayLabel,
        slots: scheduleForDay?.slots ?? [],
      });
    }
    return days;
  }, []);

  const selectedDayData = calendarDays.find(d => d.dateStr === selectedDate);
  const selectedDateLabel = selectedDayData ? `${selectedDayData.dateStr}(${selectedDayData.dayLabel})` : "";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeNav="1on1" />

      {/* メニューバー */}
      <div className="w-full border-b border-border-primary bg-white sticky top-[61px] lg:top-[65px] z-30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="flex overflow-x-auto">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.id === "reserve" ? "/1on1" : `/1on1#${item.id}`}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  item.id === "reserve"
                    ? "text-brand-primary border-brand-primary"
                    : "text-text-description border-transparent hover:text-text-body"
                }`}
              >
                {item.icon}
                <span className="lg:hidden">{item.mobileLabel}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-8 py-6 pb-24 lg:pb-8">
        {/* Back link */}
        <a href="/1on1" className="inline-flex items-center gap-1 text-sm text-text-description hover:text-brand-primary transition-colors mb-6">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
          </svg>
          メンター一覧に戻る
        </a>

        {/* ── Hero: Profile + CTA ── */}
        <div className="rounded-2xl border-2 border-[#3d3d5c] p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left: Avatar */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="shrink-0 size-24 lg:size-28 rounded-full overflow-hidden bg-bg-quaternary ring-4 ring-bg-quaternary">
                <Image src={mentor.avatarUrl} alt={mentor.name} width={112} height={112} className="size-full object-cover" />
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${avail.colors}`}>
                <span className="relative flex size-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mentor.availability === "available" ? "bg-green-400" : mentor.availability === "few" ? "bg-orange-400" : "bg-gray-400"}`} />
                  <span className={`relative inline-flex rounded-full size-2 ${mentor.availability === "available" ? "bg-green-500" : mentor.availability === "few" ? "bg-orange-500" : "bg-gray-500"}`} />
                </span>
                {avail.label}
              </span>
            </div>

            {/* Right: Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-text-body">{mentor.name}</h1>
              <p className="text-sm text-text-description mt-1">{mentor.company} / {mentor.role}</p>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-green-50 text-green-700 border border-green-200">
                  {mentor.level}
                </span>
                {mentor.englishOk && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    English OK
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {mentor.skills.map((skill) => (
                  <span key={skill} className="inline-block px-2.5 py-1 text-xs text-text-body bg-bg-quaternary rounded-md font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Catchphrase */}
              <div className="mt-4 px-4 py-3 bg-brand-primary/5 border border-brand-primary/10 rounded-lg">
                <p className="text-sm text-text-body leading-relaxed">{mentor.catchphrase}</p>
              </div>

            </div>
          </div>
        </div>

        {/* ── Content sections ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left column (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 自己紹介 */}
            <section>
              <SectionTitle>自己紹介</SectionTitle>
              <div className="rounded-xl border-2 border-[#3d3d5c] p-5">
                <p className="text-sm text-text-body leading-relaxed whitespace-pre-wrap">{mentor.bio}</p>
              </div>
            </section>

            {/* 得意な相談 */}
            <section>
              <SectionTitle>得意な相談</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mentor.strongConsultations.map((item) => (
                  <div key={item.label} className="rounded-xl border-2 border-[#3d3d5c] p-4 flex flex-col gap-2">
                    <div className="flex gap-3">
                      <span className="text-2xl shrink-0">{item.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-text-body">{item.label}</p>
                        <p className="text-xs text-text-description leading-relaxed mt-1">{item.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillConsultation(`${item.label}について相談したいです。\n${item.description}`)}
                      className="self-end text-[11px] text-brand-primary font-bold hover:underline cursor-pointer"
                    >
                      💬 この話を聞いてみる
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* トピック一覧 */}
            <section>
              <SectionTitle>トピック</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mentor.topicContents.map((topic) => (
                  <div key={topic.id} className="border-2 border-[#3d3d5c] rounded-xl overflow-hidden hover:border-brand-primary transition-colors flex flex-col">
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] bg-bg-quaternary flex items-center justify-center">
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-text-description/30">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      {/* Category + source */}
                      <div className="flex items-center gap-2 text-[10px] mb-1.5">
                        {topic.category && (
                          <span className="font-bold text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">{topic.category}</span>
                        )}
                        <span className="text-text-description">{topic.source}</span>
                      </div>
                      <h4 className="text-sm font-bold text-text-body line-clamp-2">{topic.title}</h4>
                      {topic.summary && (
                        <p className="text-xs text-text-description leading-relaxed mt-1.5 line-clamp-2">{topic.summary}</p>
                      )}
                      {/* こんなことを聞いてみよう */}
                      <div className="mt-auto pt-3 border-t border-border-primary mt-3">
                        <p className="text-[10px] font-bold text-text-description mb-2">💬 こんなことを聞いてみよう</p>
                        <div className="flex flex-col gap-1.5">
                          {topic.topics.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => fillConsultation(`「${topic.title}」について質問です。\n${t}について詳しく教えていただきたいです。`)}
                              className="flex items-center justify-between gap-1 w-full text-left text-xs text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 rounded-lg px-3 py-2 transition-colors cursor-pointer group"
                            >
                              <span>{t}</span>
                              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 相談履歴 */}
            <section>
              <SectionTitle>相談履歴</SectionTitle>
              <div className="flex flex-col gap-3">
                {mentor.consultations.map((consultation) => (
                  <PastConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    hideMentor
                    actionButton={
                      <button
                        type="button"
                        onClick={() => fillConsultation(`自分も似た悩みがあります。\n「${consultation.before}」という状態なのですが、どう進めるのが良いか相談させてください。`)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        💬 聞いてみる
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                        </svg>
                      </button>
                    }
                  />
                ))}
              </div>
            </section>

            {/* 職歴 */}
            <section>
              <SectionTitle>職歴</SectionTitle>
              <div className="rounded-xl border-2 border-[#3d3d5c] p-5">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-border-primary" />
                  <div className="space-y-6">
                    {mentor.careerHistory.map((career, i) => (
                      <div key={i} className="flex gap-4 relative">
                        {/* Dot */}
                        <div className={`shrink-0 mt-1.5 size-[11px] rounded-full border-2 z-10 ${i === 0 ? "bg-brand-primary border-brand-primary" : "bg-white border-border-primary"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-text-description font-medium">{career.period}</span>
                          </div>
                          <p className="text-sm font-bold text-text-body mt-0.5">{career.company}</p>
                          <p className="text-xs text-brand-primary font-medium mt-0.5">{career.role}</p>
                          <p className="text-xs text-text-description leading-relaxed mt-1.5">{career.description}</p>
                          <button
                            type="button"
                            onClick={() => fillConsultation(`${career.company}での${career.role}のご経験について聞きたいです。\n${career.description.slice(0, 40)}…に関連して、実務でのポイントを教えていただけますか？`)}
                            className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-bold text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            💬 この経歴について聞いてみる
                            <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column (1/3): Reservation form */}
          <div className="space-y-6">
            <div ref={formRef} className="rounded-xl border-2 border-[#3d3d5c] p-5 lg:sticky lg:top-[124px]">
              {/* メンター情報 */}
              <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-border-primary">
                <div className="size-10 rounded-full overflow-hidden bg-bg-quaternary shrink-0">
                  <Image src={mentor.avatarUrl} alt={mentor.name} width={40} height={40} className="size-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-text-body">{mentor.name}</p>
                  <p className="text-[10px] text-text-description">{mentor.company}</p>
                </div>
              </div>
              <h3 className="text-sm font-bold text-text-body mb-4">1on1を予約する</h3>

              {isCompleted ? (
                /* 完了画面 */
                <div className="text-center py-4">
                  <div className="size-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                    <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-text-body">予約が完了しました！</h4>
                  <p className="text-sm text-text-description mt-2 leading-relaxed">
                    {selectedDateLabel} {selectedSlot}〜<br />
                    {mentor.name}さんとの1on1
                  </p>
                  <p className="text-xs text-text-description mt-3">
                    メンターに相談内容が共有されました。<br />
                    当日をお楽しみに！
                  </p>
                  <div className="flex gap-2 mt-6">
                    <a
                      href="/1on1"
                      className="flex-1 py-2.5 border border-border-primary text-text-body font-bold rounded-lg hover:bg-bg-quaternary transition-colors text-sm text-center"
                    >
                      1on1トップへ
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCompleted(false);
                        setShowConfirm(false);
                        setConsultationText("");
                        setSelectedDate(null);
                        setSelectedSlot(null);
                        setSelectedStance(null);
                      }}
                      className="flex-1 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm"
                    >
                      続けて予約する
                    </button>
                  </div>
                </div>
              ) : !showConfirm ? (
                <>
                  {/* 聞いてみたいこと */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-text-body mb-1.5">
                      聞いてみたいこと
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <textarea
                      ref={textareaRef}
                      value={consultationText}
                      onChange={(e) => { setConsultationText(e.target.value); autoResize(); }}
                      placeholder="例）テスト設計の進め方について聞きたいです。現在のプロジェクトではテストがほとんどなく、どこから手をつけるべきか悩んでいます。"
                      rows={3}
                      className="w-full text-sm border border-border-primary rounded-lg px-3 py-2.5 resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary placeholder:text-text-description/40 overflow-hidden"
                    />
                    <p className="text-[10px] text-text-description mt-1">メンターが事前に準備できるよう、具体的に書くと効果的です</p>
                  </div>

                  {/* スタンス選択 */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-text-body mb-1.5">
                      メンターに求めるスタンス
                    </label>
                    <select
                      value={selectedStance ?? ""}
                      onChange={(e) => setSelectedStance(e.target.value || null)}
                      className="w-full text-sm border border-border-primary rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-text-body cursor-pointer"
                    >
                      <option value="">選択してください</option>
                      {stanceOptions.map((stance) => (
                        <option key={stance.id} value={stance.id}>
                          {stance.emoji} {stance.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 日付選択 */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-text-body">
                        日付を選択
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="hidden lg:flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => scrollCalendar("left")}
                          className="size-6 flex items-center justify-center rounded-full bg-white border border-border-primary shadow-sm hover:bg-bg-quaternary transition-colors cursor-pointer"
                        >
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="text-text-body">
                            <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollCalendar("right")}
                          className="size-6 flex items-center justify-center rounded-full bg-white border border-border-primary shadow-sm hover:bg-bg-quaternary transition-colors cursor-pointer"
                        >
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="text-text-body">
                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div ref={calendarScrollRef} className="flex gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-hide">
                        {calendarDays.map((day) => {
                          const isSelected = selectedDate === day.dateStr;
                          const hasSlots = day.slots.length > 0;
                          return (
                            <button
                              key={day.dateStr}
                              type="button"
                              disabled={!hasSlots}
                              onClick={() => { setSelectedDate(day.dateStr); setSelectedSlot(null); }}
                              className={`shrink-0 flex flex-col items-center px-2 py-1.5 rounded-lg text-center transition-colors cursor-pointer min-w-[40px] ${
                                isSelected
                                  ? "bg-brand-primary text-white"
                                  : hasSlots
                                    ? "bg-white border border-border-primary hover:border-brand-primary/50 text-text-body"
                                    : "bg-bg-quaternary text-text-description/40 cursor-not-allowed"
                              }`}
                            >
                              <span className={`text-[10px] font-bold ${day.dayLabel === "土" && !isSelected ? "text-blue-500" : day.dayLabel === "日" && !isSelected ? "text-red-500" : ""}`}>{day.dayLabel}</span>
                              <span className="text-xs font-bold">{day.dateStr}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 時間選択 */}
                  {selectedDate && selectedDayData && (
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-text-body mb-1.5">
                        時間を選択
                        <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="grid grid-cols-4 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                        {selectedDayData.slots.map((slot) => {
                          const isSelected = selectedSlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`text-[11px] font-medium py-1.5 rounded-lg transition-colors cursor-pointer ${
                                isSelected
                                  ? "bg-brand-primary text-white"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                            >
                              {slot}〜
                            </button>
                          );
                        })}
                      </div>
                      {selectedSlot && (
                        <p className="text-xs text-brand-primary font-medium mt-2">
                          {selectedDateLabel} {selectedSlot}〜 を選択中
                        </p>
                      )}
                    </div>
                  )}

                  {/* チケット消費 */}
                  <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-gray-50/70">
                    <img src="/image/1on1/image 121.png" alt="チケット" className="size-5 shrink-0" />
                    <span className="text-xs font-bold text-text-body">消費チケット: 1枚</span>
                    <span className="text-[10px] text-text-description ml-auto">残り 4枚</span>
                  </div>

                  {/* 予約ボタン */}
                  <button
                    type="button"
                    onClick={() => setShowConfirm(true)}
                    disabled={!selectedDate || !selectedSlot || !consultationText.trim()}
                    className="w-full py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    予約内容を確認する
                  </button>
                </>
              ) : (
                /* 確認画面 */
                <div>
                  <div className="rounded-lg bg-gray-50/60 p-4 space-y-3 mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-text-description">メンター</p>
                      <p className="text-sm font-bold text-text-body mt-0.5">{mentor.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-description">日時</p>
                      <p className="text-sm font-bold text-text-body mt-0.5">{selectedDateLabel} {selectedSlot}〜（30分）</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-description">聞いてみたいこと</p>
                      <p className="text-xs text-text-body mt-0.5 leading-relaxed whitespace-pre-wrap">{consultationText}</p>
                    </div>
                    {selectedStance && (
                      <div>
                        <p className="text-[10px] font-bold text-text-description">希望スタンス</p>
                        <p className="text-xs text-text-body mt-0.5">
                          {stanceOptions.find(s => s.id === selectedStance)?.emoji} {stanceOptions.find(s => s.id === selectedStance)?.label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* チケット消費の確認 */}
                  <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 mb-4">
                    <div className="flex items-center gap-2">
                      <img src="/image/1on1/image 121.png" alt="チケット" className="size-5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-amber-800">チケットを1枚消費します</p>
                        <p className="text-[10px] text-amber-700 mt-0.5">現在の残り: 4枚 → 予約後: 3枚</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-2.5 border border-border-primary text-text-body font-bold rounded-lg hover:bg-bg-quaternary transition-colors cursor-pointer text-sm"
                    >
                      戻る
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCompleted(true)}
                      className="flex-1 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm"
                    >
                      予約を確定する
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav activeNav="1on1" />
    </div>
  );
}
