"use client";

import { useState, useRef, useCallback, useEffect, ReactNode } from "react";
import Image from "next/image";
import { BaseLayout } from "@/components/Layout";
import MentorCard from "./MentorCard";
import { mentors } from "./MentorList";
import { TopicCard, allContents } from "./TopicList";
import { PastConsultationCard, pastConsultations } from "./ConsultationList";
import TicketPage from "./TicketPage";
import MentorList from "./MentorList";
import TopicList from "./TopicList";
import ConsultationList from "./ConsultationList";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
  TicketIcon,
  CodeIcon,
  RocketIcon,
  CompassIcon,
  GridIcon,
  LifebuoyIcon,
  ChatSmileIcon,
  StarIcon,
  ChatIcon,
  ArticleIcon,
  FlaskIcon,
  TeamIcon,
} from "@/components/icons";

// ── メニューバー項目 ──
const menuItems = [
  { id: "reserve", label: "1on1を予約", mobileLabel: "予約", icon: <CalendarEventIcon size={16} filled={false} />, activeIcon: <CalendarEventIcon size={16} filled={true} /> },
  { id: "manage", label: "1on1管理", mobileLabel: "管理", icon: <ListUnorderedIcon size={16} />, activeIcon: <ListUnorderedIcon size={16} /> },
  { id: "feedback", label: "フィードバック一覧", mobileLabel: "FB一覧", icon: <ShareForwardIcon size={16} filled={false} />, activeIcon: <ShareForwardIcon size={16} filled={true} /> },
  { id: "ticket", label: "チケットを増やす", mobileLabel: "チケット", icon: <CouponLineIcon size={16} />, activeIcon: <TicketIcon size={16} /> },
];

// ── カテゴリサイドバー定義 ──
const problemCategories = [
  { id: "code-review", label: "コードレビュー", icon: <CodeIcon size={16} /> },
  { id: "career", label: "キャリア相談", icon: <RocketIcon size={16} /> },
  { id: "tech-selection", label: "技術選定", icon: <CompassIcon size={16} /> },
  { id: "design-review", label: "設計壁打ち", icon: <GridIcon size={16} /> },
  { id: "stuck", label: "業務で詰まっている", icon: <LifebuoyIcon size={16} /> },
  { id: "casual", label: "カジュアルに話したい", icon: <ChatSmileIcon size={16} /> },
];

// ── 話題のトレンド ──
const trendCategories = [
  { id: "trend-claude", label: "Claude Code の使いこなし" },
  { id: "trend-ai-career", label: "AI時代のキャリア戦略" },
  { id: "trend-react19", label: "React 19 / Next.js 15" },
  { id: "trend-indie", label: "個人開発で収益化" },
  { id: "trend-monolith", label: "モノリスからの脱却" },
  { id: "trend-auth", label: "認証・認可の設計" },
  { id: "trend-aws-cost", label: "AWS コスト最適化" },
  { id: "trend-techblog", label: "技術ブログの始め方" },
];

// ── 技術分野（階層構造） ──
const techCategories = [
  {
    id: "frontend", label: "フロントエンド",
    children: [
      { id: "html-css", label: "HTML / CSS" },
      { id: "javascript", label: "JavaScript" },
      { id: "typescript", label: "TypeScript" },
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
      { id: "vuejs", label: "Vue.js" },
    ],
  },
  {
    id: "backend", label: "バックエンド",
    children: [
      { id: "nodejs", label: "Node.js" },
      { id: "python", label: "Python" },
      { id: "go", label: "Go" },
      { id: "rust", label: "Rust" },
      { id: "java", label: "Java / Spring" },
      { id: "ruby", label: "Ruby / Rails" },
    ],
  },
  {
    id: "mobile", label: "モバイル",
    children: [
      { id: "swift", label: "Swift / iOS" },
      { id: "kotlin", label: "Kotlin / Android" },
      { id: "flutter", label: "Flutter" },
      { id: "react-native", label: "React Native" },
    ],
  },
  {
    id: "infra", label: "インフラ / DevOps",
    children: [
      { id: "aws", label: "AWS" },
      { id: "gcp", label: "GCP" },
      { id: "docker", label: "Docker" },
      { id: "kubernetes", label: "Kubernetes" },
      { id: "terraform", label: "Terraform" },
      { id: "cicd", label: "CI / CD" },
    ],
  },
  {
    id: "ai-ml", label: "AI / 機械学習",
    children: [
      { id: "llm", label: "LLM / 生成AI" },
      { id: "ml-ops", label: "MLOps" },
      { id: "data-science", label: "データサイエンス" },
      { id: "prompt-eng", label: "プロンプトエンジニアリング" },
    ],
  },
  {
    id: "security", label: "セキュリティ",
    children: [
      { id: "web-security", label: "Webセキュリティ" },
      { id: "auth-design", label: "認証・認可設計" },
      { id: "vulnerability", label: "脆弱性対策" },
    ],
  },
];

const levelCategories = [
  { id: "beginner", label: "初心者OK" },
  { id: "advanced", label: "Rank3以上" },
  { id: "english", label: "English OK" },
];

// ── 技術子項目ID → MentorList filterOption マッピング ──
const techChildToSkill: Record<string, string> = {
  "javascript": "TypeScript", "typescript": "TypeScript", "react": "React", "nextjs": "React",
  "vuejs": "React", "nodejs": "TypeScript", "python": "Python", "go": "Go", "rust": "Go",
  "java": "Java", "ruby": "Ruby", "swift": "React", "kotlin": "Java", "flutter": "React",
  "react-native": "React", "aws": "AWS", "gcp": "AWS", "docker": "Docker",
  "kubernetes": "Kubernetes", "terraform": "AWS", "cicd": "Docker",
  "llm": "Python", "ml-ops": "Python", "data-science": "Python", "prompt-eng": "Python",
  "web-security": "TypeScript", "auth-design": "AWS", "vulnerability": "TypeScript",
  "html-css": "React",
};

// ── MentorList filterOption → 技術子項目ID 逆引き（最初にマッチするもの） ──
const skillToTechChild: Record<string, string> = {};
for (const [childId, skill] of Object.entries(techChildToSkill)) {
  if (!skillToTechChild[skill]) skillToTechChild[skill] = childId;
}

// ── 探し方タブ ──
const searchTabs = [
  { id: "consultation", label: "お悩みから予約", desc: "悩みや相談したいことから探す" },
  { id: "topic", label: "トピックから予約", desc: "気になる技術記事・書籍から探す" },
  { id: "mentor", label: "メンターから予約", desc: "メンターのプロフィールから探す" },
] as const;

// ── ジャンル別メンター ──
const mentorGenres = [
  {
    title: "初心者歓迎！はじめての1on1におすすめ",
    filter: (m: typeof mentors[number]) => m.level === "初心者OK" && m.availability === "available",
  },
  {
    title: "フロントエンド開発のプロ",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["React", "TypeScript", "Vue.js", "Next.js", "Angular", "Nuxt", "CSS"].includes(s)),
  },
  {
    title: "モバイルアプリ開発経験者",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["Flutter", "Swift", "iOS", "Kotlin", "Android", "React Native", "SwiftUI", "Dart", "Jetpack"].includes(s)),
  },
  {
    title: "AI・機械学習に精通しているメンター",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["Python", "PyTorch", "MLOps", "機械学習", "統計", "R"].includes(s)),
  },
  {
    title: "インフラ / DevOps のスペシャリスト",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions", "CloudFormation", "Lambda", "Azure"].includes(s)),
  },
  {
    title: "設計・アーキテクチャを語れるメンター",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["DDD", "マイクロサービス", "Agile", "Scrum", "PjM", "PdM"].includes(s)) || m.recentTopics?.some((t) => ["DDD相談", "設計レビュー", "設計相談", "システム設計"].includes(t)),
  },
  {
    title: "スタートアップ・個人開発の経験者",
    filter: (m: typeof mentors[number]) => m.company === "スタートアップ" || m.company === "フリーランス",
  },
  {
    title: "English OK！グローバルに活躍中",
    filter: (m: typeof mentors[number]) => m.englishOk === true,
  },
  {
    title: "セキュリティに強いメンター",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["セキュリティ", "ペネトレーション", "脆弱性診断", "ネットワーク"].includes(s)) || m.recentTopics?.some((t) => ["脆弱性診断", "セキュリティ"].includes(t)),
  },
  {
    title: "バックエンド開発を極めたいなら",
    filter: (m: typeof mentors[number]) => m.skills.some((s) => ["Go", "Rust", "Java", "Ruby", "Rails", "Spring", "Django", "FastAPI", "Express", "Phoenix", "Elixir", "gRPC", "Scala"].includes(s)),
  },
];

// ── ピックアップメンター（availability:availableのメンターを先頭に） ──
const pickupMentors = mentors.filter((m) => m.availability === "available").slice(0, 8);

// ── 注目トピック ──
const featuredTopics = allContents.slice(0, 6);

// ── 新着トピック ──
const newTopics = allContents.slice(0, 4);

// ── セクションヘッダー ──
function SectionHeader({ icon, title, moreHref, moreLabel = "もっと見る →", onMoreClick }: { icon?: ReactNode; title: string; moreHref?: string; moreLabel?: string; onMoreClick?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-text-body flex items-center gap-2">
        {icon && <span className="text-brand-primary">{icon}</span>}
        {title}
      </h3>
      {onMoreClick ? (
        <button type="button" onClick={onMoreClick} className="text-sm text-brand-primary hover:underline shrink-0 cursor-pointer">
          {moreLabel}
        </button>
      ) : moreHref ? (
        <a href={moreHref} className="text-sm text-brand-primary hover:underline shrink-0">
          {moreLabel}
        </a>
      ) : null}
    </div>
  );
}

// ── デスクトップカルーセル（スライドアニメーション付き） ──
function Carousel({ children, itemWidth, gap = 12 }: { children: ReactNode[]; itemWidth: number; gap?: number }) {
  const [page, setPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = children.length;

  // コンテナ幅から表示数を計算
  useEffect(() => {
    const updateVisibleCount = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setVisibleCount(Math.max(1, Math.floor((w + gap) / (itemWidth + gap))));
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [itemWidth, gap]);

  const maxPage = Math.max(0, Math.ceil(totalItems / visibleCount) - 1);
  // ページ数が変わったら範囲内に収める
  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [maxPage, page]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(maxPage, p + 1));

  // 各アイテムの幅(%) = 100 / visibleCount、gap分を考慮
  const itemPercent = 100 / visibleCount;
  const translateX = -(page * visibleCount * itemPercent);

  return (
    <div className="relative group lg:px-5" ref={containerRef}>
      {/* デスクトップ: スライドアニメーション */}
      <div className="hidden lg:block overflow-hidden">
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{
            transform: `translateX(${translateX}%)`,
            gap: `${gap}px`,
          }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className="shrink-0 [&>*]:h-full"
              style={{ width: `calc(${itemPercent}% - ${gap * (visibleCount - 1) / visibleCount + 2}px)` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* SP: 横スクロール */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 -mx-1 px-1 lg:hidden [&>*]:h-auto">
        {children.map((child, i) => (
          <div key={i} className="shrink-0" style={{ width: itemWidth }}>
            {child}
          </div>
        ))}
      </div>

      {/* 左ボタン */}
      {page > 0 && (
        <button
          type="button"
          onClick={handlePrev}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-border-primary shadow-md hover:bg-bg-tertiary transition-colors cursor-pointer z-10"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
          </svg>
        </button>
      )}

      {/* 右ボタン */}
      {page < maxPage && (
        <button
          type="button"
          onClick={handleNext}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-border-primary shadow-md hover:bg-bg-tertiary transition-colors cursor-pointer z-10"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ── メインコンポーネント ──
export default function MarketplacePage() {
  const [activeMenu, setActiveMenu] = useState("reserve");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchMode, setSearchMode] = useState<"consultation" | "topic" | "mentor" | null>(null);
  const [consultationTab, setConsultationTab] = useState<"find" | "examples">("find");
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  return (
    <BaseLayout activeNav="1on1">
      {/* ヘッダーバナー */}
      <div className="w-full overflow-hidden">
        <img
          src="/image/1on1/headerbanner-1on1.png"
          alt="1on1 - メンターと話しながら技術やキャリアについて思考を深めよう"
          className="w-full h-[80px] object-cover lg:h-auto lg:object-contain"
        />
      </div>
      {/* メニューバー */}
      <div className="w-full border-b border-border-primary bg-white sticky top-[61px] lg:top-[65px] z-30">
          <div className="max-w-[1440px] mx-auto px-3 lg:px-6">
            <div className="flex overflow-x-auto">
              {menuItems.map((item) => {
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                      isActive
                        ? "text-brand-primary border-brand-primary"
                        : "text-text-description border-transparent hover:text-text-body"
                    }`}
                  >
                    {isActive ? item.activeIcon : item.icon}
                    <span className="hidden lg:inline">{item.label}</span>
                    <span className="lg:hidden">{item.mobileLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        {activeMenu === "ticket" ? (
          <div className="w-full max-w-[1440px] mx-auto px-3 lg:px-6 py-5 lg:py-8">
            <TicketPage />
          </div>
        ) : (
        <div className="w-full max-w-[1440px] mx-auto px-3 lg:px-6 py-5 lg:py-8">
          {/* 探し方タブ（サイドバーの上に配置） */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-text-body mb-4">メンターを探して1on1予約</h2>
            <div className="grid grid-cols-3 gap-3">
              {searchTabs.map((tab) => {
                const isActive = searchMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => { if (tab.id === "consultation") setConsultationTab("find"); setSearchMode(tab.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
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
          </section>

          <div className="flex gap-6">
          {/* 左カテゴリサイドバー（デスクトップのみ、searchMode時は非表示） */}
          <aside className={`${searchMode !== null ? "hidden" : "hidden lg:block"} w-[220px] shrink-0`}>
            <div className="space-y-5">
              {/* お悩みから探す */}
              <div>
                <h4 className="text-xs font-bold text-text-description uppercase tracking-wider mb-2">お悩みから探す</h4>
                <div className="space-y-0.5">
                  {problemCategories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(isActive ? null : cat.id);
                          if (!isActive) { setConsultationTab("find"); setSearchMode("consultation"); }
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer text-left ${
                          isActive
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-text-body hover:bg-bg-tertiary"
                        }`}
                      >
                        <span className="shrink-0">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 話題のトレンド */}
              <div>
                <h4 className="text-xs font-bold text-text-description uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
                    <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13C19 13 18.5 14 17.5 14C17.5 11.5 16.5 8.5 13.5 6.5C13.5 9.5 12 11 10 11C10 8 9.5 5.5 7 3C6.5 5 5.5 7.5 5.5 10C3.5 10 4 13 4 13C3.5 14 3.5 14.6345 3.5 15.5C3.5 19.6421 7.85786 23 12 23ZM12.5 20C10.567 20 9 18.433 9 16.5C9 15.7 9.4 14.8 9.9 14.2C10.4 14.8 11.1 15 12 15C12.5 13.5 12 12 12 12C14 13 15 15 15 16.5C15 18.433 14.433 20 12.5 20Z" />
                  </svg>
                  話題のトレンド
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {trendCategories.map((cat, i) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(isActive ? null : cat.id);
                          if (!isActive) { setConsultationTab("find"); setSearchMode("consultation"); }
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] rounded-full transition-colors cursor-pointer border ${
                          isActive
                            ? "bg-brand-primary text-white border-brand-primary font-bold"
                            : "bg-white text-text-body border-border-primary hover:border-brand-primary hover:text-brand-primary"
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${isActive ? "text-white/80" : "text-red-400"}`}>{i + 1}</span>
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 技術分野（階層トグル） */}
              <div>
                <h4 className="text-xs font-bold text-text-description uppercase tracking-wider mb-2">技術分野</h4>
                <div className="space-y-0.5">
                  {techCategories.map((cat) => {
                    const isExpanded = expandedTech === cat.id;
                    const isParentActive = selectedCategory === cat.id;
                    const hasActiveChild = cat.children.some((c) => selectedCategory === c.id);
                    return (
                      <div key={cat.id}>
                        <button
                          type="button"
                          onClick={() => setExpandedTech(isExpanded ? null : cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer text-left ${
                            isParentActive || hasActiveChild
                              ? "text-brand-primary font-bold"
                              : "text-text-body hover:bg-bg-tertiary"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <svg
                            width={14} height={14} viewBox="0 0 24 24" fill="currentColor"
                            className={`shrink-0 text-text-description transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                          >
                            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                          </svg>
                        </button>
                        {isExpanded && (
                          <div className="ml-2 pl-2 border-l border-border-primary space-y-0.5 mt-0.5">
                            {cat.children.map((child) => {
                              const isChildActive = selectedCategory === child.id;
                              return (
                                <button
                                  key={child.id}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCategory(isChildActive ? null : child.id);
                                    if (!isChildActive) setSearchMode("mentor");
                                  }}
                                  className={`w-full flex items-center px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer text-left ${
                                    isChildActive
                                      ? "bg-brand-primary/10 text-brand-primary font-bold"
                                      : "text-text-description hover:bg-bg-tertiary hover:text-text-body"
                                  }`}
                                >
                                  {child.label}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* レベル */}
              <div>
                <h4 className="text-xs font-bold text-text-description uppercase tracking-wider mb-2">レベル</h4>
                <div className="space-y-0.5">
                  {levelCategories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(isActive ? null : cat.id);
                          if (!isActive) setSearchMode("mentor");
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer text-left ${
                          isActive
                            ? "bg-brand-primary/10 text-brand-primary font-bold"
                            : "text-text-body hover:bg-bg-tertiary"
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* コンテンツエリア */}
          <div className="flex-1 min-w-0 overflow-hidden space-y-10">
            {/* サブページ（探し方を選択した場合） */}
            {searchMode !== null ? (
              <section>
                <button
                  type="button"
                  onClick={() => setSearchMode(null)}
                  className="flex items-center gap-1 text-sm text-brand-primary hover:underline cursor-pointer mb-4"
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                  </svg>
                  トップに戻る
                </button>
                {searchMode === "consultation" && <ConsultationList
                  key={`consultation-${selectedCategory}-${consultationTab}`}
                  onNavigateToMentors={() => { setSearchMode("mentor"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  initialCategory={selectedCategory && !selectedCategory.startsWith("trend-") ? selectedCategory : null}
                  initialTrend={selectedCategory?.startsWith("trend-") ? trendCategories.find((t) => t.id === selectedCategory)?.label ?? null : null}
                  initialTab={consultationTab}
                />}
                {searchMode === "topic" && <TopicList />}
                {searchMode === "mentor" && <MentorList
                  key={`mentor-${selectedCategory}`}
                  initialFilter={selectedCategory ? (techChildToSkill[selectedCategory] ?? null) : null}
                  initialLevel={["beginner", "advanced", "english"].includes(selectedCategory ?? "") ? selectedCategory : null}
                  onFilterChange={(filter) => {
                    if (filter === "すべて") {
                      setSelectedCategory(null);
                    } else {
                      const childId = skillToTechChild[filter];
                      if (childId) {
                        setSelectedCategory(childId);
                        // 親カテゴリも展開
                        const parent = techCategories.find((t) => t.children.some((c) => c.id === childId));
                        if (parent) setExpandedTech(parent.id);
                      }
                    }
                  }}
                />}
              </section>
            ) : (
            <>
            {/* ① ピックアップメンター */}
            <section>
              <SectionHeader icon={<StarIcon size={20} />} title="ピックアップメンター" moreLabel="すべてのメンターを見る →" onMoreClick={() => { setSearchMode("mentor"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              <Carousel itemWidth={260}>
                {pickupMentors.map((m) => (
                  <MentorCard key={m.name} {...m} />
                ))}
              </Carousel>
            </section>

            {/* ② みんなの相談事例 */}
            <section>
              <SectionHeader icon={<ChatIcon size={20} />} title="みんなの相談事例" moreLabel="もっと見る →" onMoreClick={() => { setConsultationTab("examples"); setSearchMode("consultation"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              <Carousel itemWidth={320}>
                {pastConsultations.map((c) => (
                  <PastConsultationCard key={c.id} consultation={c} />
                ))}
              </Carousel>
            </section>

            {/* ③ 注目のトピック */}
            <section>
              <SectionHeader icon={<ArticleIcon size={20} />} title="注目のトピック" moreLabel="もっと見る →" onMoreClick={() => { setSearchMode("topic"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
              <Carousel itemWidth={220}>
                {featuredTopics.map((t) => (
                  <TopicCard key={t.id} content={t} />
                ))}
              </Carousel>
            </section>

            {/* ④ 新着トピック */}
            <section>
              <SectionHeader icon={<FlaskIcon size={20} />} title="新着トピック" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {newTopics.map((t) => (
                  <TopicCard key={t.id} content={t} />
                ))}
              </div>
            </section>

            {/* ⑤ ジャンル別メンター */}
            {mentorGenres.map((genre) => {
              const matched = mentors.filter(genre.filter).slice(0, 4);
              if (matched.length === 0) return null;
              return (
                <section key={genre.title}>
                  <SectionHeader icon={<TeamIcon size={20} />} title={genre.title} />
                  <Carousel itemWidth={260}>
                    {matched.map((m) => (
                      <MentorCard key={m.name} {...m} />
                    ))}
                  </Carousel>
                </section>
              );
            })}
            </>
            )}
          </div>
        </div>
        </div>
        )}
    </BaseLayout>
  );
}
