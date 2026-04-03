"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { PastConsultationCard, type PastConsultation } from "@/components/1on1/ConsultationList";
import { type TopicContent } from "@/components/1on1/TopicList";

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
  careerHistory: [
    { period: "2024 - 現在", company: "TechBowl Inc.", role: "ソフトウェアエンジニア", description: "テスト自動化基盤の設計・開発。CI/CDパイプラインの構築と運用改善をリード。OSSテストフレームワークのメンテナー。" },
    { period: "2021 - 2024", company: "株式会社メルカリ", role: "QAエンジニア → SET（Software Engineer in Test）", description: "E2Eテスト基盤の構築、テスト戦略の策定。チームのテスト文化醸成に貢献。GitHub Actionsを活用したCI/CD改善。" },
    { period: "2019 - 2021", company: "株式会社サイバーエージェント", role: "フロントエンドエンジニア", description: "React/TypeScriptでの新規プロダクト開発。コンポーネントテストの導入をリードし、チーム全体のテスト文化を定着。" },
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeNav="1on1" />

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
                        <p className="text-[10px] font-bold text-text-description mb-1.5">💬 こんなことを聞いてみよう</p>
                        <div className="flex flex-col gap-1">
                          {topic.topics.map((t) => (
                            <span key={t} className="text-[11px] text-brand-primary">・{t}</span>
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
                  <PastConsultationCard key={consultation.id} consultation={consultation} />
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column (1/3): Schedule + sticky CTA */}
          <div className="space-y-6">
            {/* Schedule */}
            <div className="rounded-xl border-2 border-[#3d3d5c] p-5 lg:sticky lg:top-20">
              <h3 className="text-sm font-bold text-text-body mb-4">対応スケジュール</h3>
              <div className="grid grid-cols-7 gap-1.5">
                {mentor.schedule.map((day) => (
                  <div key={day.day} className="text-center">
                    <p className="text-[11px] font-bold text-text-description mb-2">{day.day}</p>
                    {day.slots.length === 0 ? (
                      <p className="text-xs text-text-description/50">-</p>
                    ) : (
                      <div className="space-y-1">
                        {day.slots.map((slot) => (
                          <span key={slot} className="block text-[10px] px-0.5 py-0.5 bg-green-50 text-green-600 rounded font-medium">
                            {slot}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2.5 bg-brand-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm">
                このメンターに相談する
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav activeNav="1on1" />
    </div>
  );
}
