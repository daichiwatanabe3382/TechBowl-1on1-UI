"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import MentorCard from "./MentorCard";
import { mentors } from "./MentorList";
import {
  SmartphoneIcon,
  PaletteIcon,
  RobotIcon,
  LoopIcon,
  FlaskIcon,
  SpeedIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  TeamIcon,
  EyeIcon,
  StarIcon,
  SearchIcon,
  RocketIcon,
  ScalesIcon,
  CompassIcon,
  LifebuoyIcon,
  ChatSmileIcon,
} from "@/components/icons";

// ── データ定義 ──

type ConsultationCategory = {
  id: string;
  icon: ReactNode;
  title: string;
  relatedTech: string[];
};

const categories: ConsultationCategory[] = [
  { id: "code-review", icon: <SearchIcon size={14} />, title: "コードレビューしてほしい", relatedTech: ["javascript", "typescript", "react", "nextjs", "vue", "nodejs", "python", "go"] },
  { id: "career", icon: <RocketIcon size={14} />, title: "転職・キャリアの相談", relatedTech: [] },
  { id: "tech-selection", icon: <ScalesIcon size={14} />, title: "技術選定で迷っている", relatedTech: ["react", "nextjs", "vue", "nodejs", "python", "go", "rust", "aws", "docker"] },
  { id: "design-review", icon: <CompassIcon size={14} />, title: "設計の壁打ちをしたい", relatedTech: ["typescript", "nodejs", "python", "go", "aws", "docker"] },
  { id: "stuck", icon: <LifebuoyIcon size={14} />, title: "業務で詰まっている", relatedTech: ["javascript", "typescript", "react", "nextjs", "vue", "nodejs", "python", "go", "swift", "kotlin", "flutter"] },
  { id: "casual", icon: <ChatSmileIcon size={14} />, title: "なんとなく話を聞いてほしい", relatedTech: [] },
];

const techFields = [
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "vue", label: "Vue.js" },
  { id: "nodejs", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  { id: "flutter", label: "Flutter" },
  { id: "aws", label: "AWS" },
  { id: "docker", label: "Docker" },
];

const problemCategories: { id: string; label: string; icon: ReactNode }[] = [
  { id: "app-release", label: "iOS/Androidアプリのリリース", icon: <SmartphoneIcon size={14} /> },
  { id: "design-system", label: "デザインシステム構築", icon: <PaletteIcon size={14} /> },
  { id: "ai-prompt", label: "AIプロンプトの作成", icon: <RobotIcon size={14} /> },
  { id: "claude-setup", label: "Claudeの運用設定", icon: <RobotIcon size={14} /> },
  { id: "ci-cd", label: "CI/CD環境の構築", icon: <LoopIcon size={14} /> },
  { id: "testing", label: "テスト戦略・設計", icon: <FlaskIcon size={14} /> },
  { id: "performance", label: "パフォーマンス改善", icon: <SpeedIcon size={14} /> },
  { id: "security", label: "セキュリティ対策", icon: <ShieldCheckIcon size={14} /> },
  { id: "database", label: "DB設計・移行", icon: <DatabaseIcon size={14} /> },
  { id: "team-dev", label: "チーム開発の進め方", icon: <TeamIcon size={14} /> },
  { id: "code-review", label: "コードレビュー文化", icon: <EyeIcon size={14} /> },
  { id: "oss", label: "OSS貢献の始め方", icon: <StarIcon size={14} /> },
];

// トレンドトピック（話のきっかけ）
const trendingTopics: { emoji: string; label: string; matchSkills: string[] }[] = [
  { emoji: "🤖", label: "Claude Code の使いこなし", matchSkills: ["python", "typescript", "go"] },
  { emoji: "⚡", label: "AI時代のキャリア戦略", matchSkills: [] },
  { emoji: "🚀", label: "React 19 / Next.js 15", matchSkills: ["react", "next.js", "typescript"] },
  { emoji: "📱", label: "個人開発で収益化", matchSkills: ["flutter", "swift", "react native", "firebase"] },
  { emoji: "🏗️", label: "モノリスからの脱却", matchSkills: ["go", "grpc", "kubernetes", "docker", "ddd", "マイクロサービス"] },
  { emoji: "🔐", label: "認証・認可の設計", matchSkills: ["aws", "node.js", "typescript", "セキュリティ"] },
  { emoji: "☁️", label: "AWS コスト最適化", matchSkills: ["aws", "terraform", "docker", "kubernetes"] },
  { emoji: "📝", label: "技術ブログの始め方", matchSkills: [] },
];

// 相談事例（Before/After形式）
type PastConsultation = {
  id: string;
  before: string;
  after: string;
  caption: string;
  categoryLabel: string;
  categoryId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorId: string;
  date: string;
};

export const pastConsultations: PastConsultation[] = [
  {
    id: "1",
    before: "一覧画面の描画が遅くて原因がわからない",
    after: "再レンダリングの原因を特定し、体感できるレベルで高速化",
    caption: "useMemoやコンポーネント分割のコツも教わり、自分では気づけなかった視点をもらえました",
    categoryLabel: "コードレビュー",
    categoryId: "code-review",
    mentorName: "スー",
    mentorAvatar: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/ac10e6800b649ae3b024fe07ab2ce787.jpg",
    mentorId: "sue",
    date: "2026.03.20",
  },
  {
    id: "2",
    before: "SIerからWeb系に転職したいけど何から始めれば…",
    after: "評価されるスキルが明確になり、行動計画が立てられた",
    caption: "現場目線でどんなスキルが評価されるか具体的に教えてもらい、ポートフォリオの方向性も決まりました",
    categoryLabel: "キャリア相談",
    categoryId: "career",
    mentorName: "武田 憲太郎",
    mentorAvatar: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/7e6f7810e6282307454bfe3168f4744f.jpg",
    mentorId: "takeda",
    date: "2026.03.18",
  },
  {
    id: "3",
    before: "REST APIのエンドポイントが増えすぎて辛い",
    after: "GraphQL段階的移行のロードマップが描けた",
    caption: "チームの規模感に合わせてメリット・デメリットを整理してもらい、判断に自信が持てました",
    categoryLabel: "技術選定",
    categoryId: "tech-selection",
    mentorName: "sho_yamane",
    mentorAvatar: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/0f1afe66ee296ae506ec20175f7fc365.jpg",
    mentorId: "sho_yamane",
    date: "2026.03.15",
  },
  {
    id: "4",
    before: "新卒1年目、周りのペースについていけず焦っている",
    after: "成長は人それぞれと気づき、今やるべきことが明確に",
    caption: "温かく励ましてもらい、今の時期にやっておくといいことを教えてもらえました",
    categoryLabel: "カジュアル",
    categoryId: "casual",
    mentorName: "ちゅーやん",
    mentorAvatar: "https://techbowl.s3-ap-northeast-1.amazonaws.com/techbowl/DzjceQsAg9HShbr1706187471.jpg_1.jpg",
    mentorId: "chuyan",
    date: "2026.03.12",
  },
  {
    id: "5",
    before: "モノリスを分割したいが、どこから手をつけるべきか迷う",
    after: "境界の考え方を学び、最初に切り出すサービスが決まった",
    caption: "境界づけられたコンテキストをベースに優先順位を整理してもらいました",
    categoryLabel: "設計壁打ち",
    categoryId: "design-review",
    mentorName: "西谷 圭介",
    mentorAvatar: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/b6be831e277c7a465ea73907b119d7e2.jpg",
    mentorId: "nishitani",
    date: "2026.03.10",
  },
  {
    id: "6",
    before: "Dockerのビルドが通らず、エラーの読み方もわからない",
    after: "画面共有で一緒にデバッグし、原因を10分で特定",
    caption: "環境変数の設定ミスをすぐ見つけてくれて、デバッグの進め方自体も学べました",
    categoryLabel: "業務で詰まっている",
    categoryId: "stuck",
    mentorName: "keigo",
    mentorAvatar: "https://techbowl.s3.ap-northeast-1.amazonaws.com/mentor-profile-image/1c28eb74d6e9a7c6edbbfcee6fcd8950.jpg",
    mentorId: "keigo",
    date: "2026.03.08",
  },
];

// ── サブコンポーネント ──

function FilterTag({
  label,
  icon,
  isSelected,
  onToggle,
}: {
  label: string;
  icon?: ReactNode;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
        isSelected
          ? "bg-brand-primary text-white border-brand-primary"
          : "bg-white text-text-body border-border-primary hover:bg-bg-quaternary hover:border-brand-primary"
      }`}
    >
      {icon && <span className={isSelected ? "text-white" : "text-text-description"}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export { type PastConsultation };
export function PastConsultationCard({ consultation }: { consultation: PastConsultation }) {
  return (
    <div className="bg-white border border-border-primary rounded-xl p-4 hover:border-brand-primary transition-colors h-full flex flex-col">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full mt-0.5">悩み</span>
          <p className="text-sm font-bold text-text-body">{consultation.before}</p>
        </div>
        <div className="ml-[13px] border-l-2 border-brand-primary h-2.5" />
        <div className="flex items-start gap-2">
          <span className="shrink-0 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-0.5">結果</span>
          <p className="text-sm font-bold text-brand-primary">{consultation.after}</p>
        </div>
      </div>
      <p className="text-xs text-text-description leading-relaxed mt-2.5 line-clamp-2 flex-1">{consultation.caption}</p>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-primary">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
            <img src={consultation.mentorAvatar} alt={consultation.mentorName} className="object-cover w-full h-full" />
          </div>
          <span className="text-xs font-medium text-text-body">{consultation.mentorName}</span>
          <span className="text-[10px] text-text-description">{consultation.date}</span>
        </div>
        <a
          href="/1on1/mentor/demo"
          className="text-xs font-bold text-brand-primary hover:underline shrink-0"
        >
          相談してみる →
        </a>
      </div>
    </div>
  );
}

// ── フィルターに合致するメンターを計算 ──

const DISPLAY_COUNT = 3;

function useFilteredMentors(
  selectedCategory: string | null,
  selectedTech: Set<string>,
  selectedTrend: string | null,
  showAll: boolean,
): { displayed: typeof mentors; totalCount: number } {
  return useMemo(() => {
    const sortByAvailability = (list: typeof mentors) =>
      [...list].sort((a, b) => {
        const order = { available: 0, few: 1, full: 2 } as const;
        return order[a.availability] - order[b.availability];
      });

    const limit = (list: typeof mentors) =>
      showAll ? list : list.slice(0, DISPLAY_COUNT);

    // トレンドトピックが選択されている場合
    if (selectedTrend) {
      const trend = trendingTopics.find((t) => t.label === selectedTrend);
      if (!trend) return { displayed: [], totalCount: 0 };
      if (trend.matchSkills.length === 0) {
        const all = mentors.filter((m) => m.availability !== "full");
        return { displayed: limit(all), totalCount: all.length };
      }
      const skillSet = new Set(trend.matchSkills.map((s) => s.toLowerCase()));
      const matched = sortByAvailability(
        mentors.filter((m) => m.skills.some((s) => skillSet.has(s.toLowerCase())))
      );
      return { displayed: limit(matched), totalCount: matched.length };
    }

    // カテゴリから relatedTech を取得
    const catTech = selectedCategory
      ? (categories.find((c) => c.id === selectedCategory)?.relatedTech ?? [])
      : [];

    const allTech = new Set([
      ...catTech.map((t) => t.toLowerCase()),
      ...[...selectedTech].map((t) => t.toLowerCase()),
    ]);

    if (!selectedCategory && selectedTech.size === 0) return { displayed: [], totalCount: 0 };

    if (allTech.size === 0) {
      const all = mentors.filter((m) => m.availability !== "full");
      return { displayed: limit(all), totalCount: all.length };
    }

    const matched = sortByAvailability(
      mentors.filter((m) => m.skills.some((s) => allTech.has(s.toLowerCase())))
    );
    return { displayed: limit(matched), totalCount: matched.length };
  }, [selectedCategory, selectedTech, selectedTrend, showAll]);
}

// ── タブ切り替え ──

type ConsultationTab = "find" | "examples";

function TabToggle({ tab, onChange }: { tab: ConsultationTab; onChange: (t: ConsultationTab) => void }) {
  const tabs: { id: ConsultationTab; label: string }[] = [
    { id: "find", label: "メンターを探す" },
    { id: "examples", label: "みんなの相談事例" },
  ];
  return (
    <div className="flex border-b border-border-primary mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2.5 text-sm font-bold text-center transition-colors cursor-pointer ${
            tab === t.id
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-text-description hover:text-text-body"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── メインコンポーネント ──

export default function ConsultationList({ onNavigateToMentors, initialCategory, initialTrend }: { onNavigateToMentors?: () => void; initialCategory?: string | null; initialTrend?: string | null }) {
  const [activeTab, setActiveTab] = useState<ConsultationTab>("find");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory ?? null);
  const [selectedProblems, setSelectedProblems] = useState<Set<string>>(new Set());
  const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set());
  const [selectedTrend, setSelectedTrend] = useState<string | null>(initialTrend ?? null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showAllMentors, setShowAllMentors] = useState(false);
  const [visibleConsultations, setVisibleConsultations] = useState(4);

  // 外部からの初期値変更に追従
  useEffect(() => {
    setSelectedCategory(initialCategory ?? null);
    if (initialCategory) setSelectedTrend(null);
  }, [initialCategory]);
  useEffect(() => {
    setSelectedTrend(initialTrend ?? null);
    if (initialTrend) setSelectedCategory(null);
  }, [initialTrend]);

  const toggleCategory = (id: string) => {
    setSelectedCategory((prev) => (prev === id ? null : id));
    setSelectedTrend(null); // カテゴリ選択でトレンド解除
    setShowAllMentors(false);
  };
  const toggleProblem = (id: string) => {
    setSelectedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleTech = (id: string) => {
    setSelectedTech((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedProblems(new Set());
    setSelectedTech(new Set());
    setSelectedTrend(null);
    setShowAllMentors(false);
  };

  const hasActiveFilters = !!selectedCategory || selectedProblems.size > 0 || selectedTech.size > 0 || !!selectedTrend;
  const { displayed: filteredMentors, totalCount: totalMentorCount } = useFilteredMentors(selectedCategory, selectedTech, selectedTrend, showAllMentors);

  // 相談事例のフィルタリング
  const filteredConsultations = hasActiveFilters
    ? pastConsultations.filter((c) => {
        if (selectedCategory && c.categoryId !== selectedCategory) return false;
        return true;
      })
    : pastConsultations;

  return (
    <div>
      <TabToggle tab={activeTab} onChange={setActiveTab} />

      {activeTab === "find" && (
      <>
      {/* ── お悩みカテゴリ ── */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-text-body mb-1">
          どんなことを話したいですか？
        </h3>
        <p className="text-xs text-text-description mb-4">
          気になるテーマをタップすると、対応できるメンターが見つかります
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 transition-all cursor-pointer text-left border group ${
                selectedCategory === cat.id
                  ? "bg-brand-primary/5 border-brand-primary"
                  : "bg-white border-border-primary hover:border-brand-primary hover:shadow-sm"
              }`}
            >
              <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-xs transition-colors ${
                selectedCategory === cat.id
                  ? "bg-brand-primary text-white"
                  : "bg-bg-quaternary text-brand-primary group-hover:bg-brand-primary group-hover:text-white"
              }`}>
                {cat.icon}
              </span>
              <span className={`flex-1 text-xs font-bold transition-colors ${
                selectedCategory === cat.id ? "text-brand-primary" : "text-text-body group-hover:text-brand-primary"
              }`}>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* 今みんなが話してること */}
        <div className="mt-4 pt-4 border-t border-border-primary">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold text-text-description">今みんなが話してること</span>
            <span className="text-[10px] text-text-description bg-bg-quaternary px-1.5 py-0.5 rounded">🔥 トレンド</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {trendingTopics.map((topic) => (
              <button
                key={topic.label}
                type="button"
                onClick={() => {
                  setSelectedTrend(selectedTrend === topic.label ? null : topic.label);
                  setSelectedCategory(null); // トレンド選択でカテゴリ解除
                  setShowAllMentors(false);
                }}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer border ${
                  selectedTrend === topic.label
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-bg-secondary text-text-body border-border-primary hover:bg-brand-primary/5 hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                <span>{topic.emoji}</span>
                <span>{topic.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 詳細に絞り込む（折りたたみ） ── */}
      <section className="mb-6">
        <button
          type="button"
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className="flex items-center gap-2 text-sm font-bold text-text-body hover:text-brand-primary cursor-pointer transition-colors mb-3"
        >
          <span>詳細に絞り込む</span>
          {(selectedProblems.size > 0 || selectedTech.size > 0) && (
            <span className="text-[10px] font-bold text-white bg-brand-primary px-1.5 py-0.5 rounded-full">
              {selectedProblems.size + selectedTech.size}
            </span>
          )}
          <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`transition-transform duration-200 ${isDetailOpen ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isDetailOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-white border border-border-primary rounded-xl p-4 flex flex-col gap-4">
            {/* 課題 */}
            <div>
              <h4 className="text-xs font-bold text-text-description mb-2">解決したい課題</h4>
              <div className="flex flex-wrap gap-2">
                {problemCategories.map((problem) => (
                  <FilterTag
                    key={problem.id}
                    label={problem.label}
                    icon={problem.icon}
                    isSelected={selectedProblems.has(problem.id)}
                    onToggle={() => toggleProblem(problem.id)}
                  />
                ))}
              </div>
            </div>
            {/* 技術分野 */}
            <div>
              <h4 className="text-xs font-bold text-text-description mb-2">技術分野</h4>
              <div className="flex flex-wrap gap-2">
                {techFields.map((field) => (
                  <FilterTag
                    key={field.id}
                    label={field.label}
                    isSelected={selectedTech.has(field.id)}
                    onToggle={() => toggleTech(field.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── フィルターサマリー ── */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-brand-primary/5 rounded-xl px-4 py-3 mb-6 border border-brand-primary/10">
          <span className="text-sm text-text-body">
            🎯 あなたにおすすめのメンターを<span className="font-bold text-brand-primary"> {DISPLAY_COUNT}名 </span>厳選しました！
          </span>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-text-description hover:text-brand-primary cursor-pointer transition-colors"
          >
            条件をリセット
          </button>
        </div>
      )}

      {/* ── 対応できるメンター ── */}
      <section className="mb-8">
        {filteredMentors.length > 0 ? (
          <>
            <h3 className="text-lg font-bold text-text-body mb-4">
              {selectedTrend
                ? `「${selectedTrend}」を話せるメンター`
                : selectedCategory
                ? `「${categories.find((c) => c.id === selectedCategory)?.title}」に対応できるメンター`
                : "対応できるメンター"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
              {filteredMentors.map((mentor) => (
                <MentorCard key={mentor.name} {...mentor} />
              ))}
            </div>
            {!showAllMentors && totalMentorCount > DISPLAY_COUNT && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllMentors(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:underline cursor-pointer"
                >
                  <span>対応可能なメンターをもっと見る（他{totalMentorCount - DISPLAY_COUNT}名）</span>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="mt-px">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}
            {/* すべてのメンターを見る（タブ遷移） */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={onNavigateToMentors}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-brand-primary bg-brand-primary/5 border border-brand-primary/20 rounded-lg hover:bg-brand-primary/10 cursor-pointer transition-colors"
              >
                160名以上のメンターからもっと探してみる 🔍
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 border border-dashed border-border-primary rounded-xl text-center">
            <img src="/image/1on1/praise.png" alt="" className="w-20 h-20 object-contain mb-3" />
            <p className="text-sm text-text-description">
              上のカテゴリやトレンドを選ぶと、ここにメンターが表示されます
            </p>
          </div>
        )}
      </section>
      </>
      )}

      {/* ── みんなの相談事例タブ ── */}
      {activeTab === "examples" && (
      <section>
        <p className="text-sm text-text-description mb-6">
          実際に1on1を利用した方の相談事例です。「こんなこと聞いていいのかな？」→{" "}
          <span className="font-bold text-brand-primary">大丈夫です！</span>
        </p>
        <div className="flex flex-col gap-2">
          {pastConsultations.slice(0, visibleConsultations).map((consultation) => (
            <PastConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </div>
        {pastConsultations.length > visibleConsultations && (
          <button
            type="button"
            onClick={() => setVisibleConsultations((prev) => prev + 4)}
            className="mt-3 w-full py-2.5 text-sm font-medium text-brand-primary bg-bg-secondary hover:bg-bg-quaternary border border-border-primary rounded-lg transition-colors cursor-pointer"
          >
            もっと見る（残り{pastConsultations.length - visibleConsultations}件）
          </button>
        )}
      </section>
      )}
    </div>
  );
}
