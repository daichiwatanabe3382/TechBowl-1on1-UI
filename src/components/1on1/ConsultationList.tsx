"use client";

import Image from "next/image";
import { ReactNode, useState } from "react";
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
  ArrowRightIcon,
} from "@/components/icons";

// ── カテゴリと課題・技術の関連マッピング ──

type ConsultationCategory = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  examples: string[];
  mentorCount: number;
  relatedProblems: string[]; // problemCategories の id
  relatedTech: string[]; // techFields の id
};

const categories: ConsultationCategory[] = [
  {
    id: "code-review",
    icon: <SearchIcon size={20} />,
    title: "コードレビューしてほしい",
    description: "書いたコードを見てもらい、改善点やベストプラクティスを教えてもらう",
    examples: ["このPR見てほしい", "リファクタリングのアドバイスが欲しい", "設計の妥当性を確認したい"],
    mentorCount: 82,
    relatedProblems: ["performance", "testing", "code-review"],
    relatedTech: ["javascript", "typescript", "react", "nextjs", "vue", "nodejs", "python", "go"],
  },
  {
    id: "career",
    icon: <RocketIcon size={20} />,
    title: "転職・キャリアの相談",
    description: "キャリアパスや転職活動について現役エンジニアの視点でアドバイス",
    examples: ["今の会社を続けるべきか", "年収交渉のコツ", "スキルアップの方向性"],
    mentorCount: 64,
    relatedProblems: ["team-dev"],
    relatedTech: [],
  },
  {
    id: "tech-selection",
    icon: <ScalesIcon size={20} />,
    title: "技術選定で迷っている",
    description: "フレームワークやライブラリの選定、アーキテクチャの判断を一緒に考える",
    examples: ["Next.js vs Remix", "状態管理どうすべき？", "DB選定のポイント"],
    mentorCount: 58,
    relatedProblems: ["design-system", "database", "ci-cd"],
    relatedTech: ["react", "nextjs", "vue", "nodejs", "python", "go", "rust", "aws", "docker"],
  },
  {
    id: "design-review",
    icon: <CompassIcon size={20} />,
    title: "設計の壁打ちをしたい",
    description: "システム設計やDB設計について、経験者の視点でレビュー・アドバイス",
    examples: ["このER図どう思う？", "マイクロサービス化すべき？", "APIの設計方針"],
    mentorCount: 45,
    relatedProblems: ["database", "design-system", "security"],
    relatedTech: ["typescript", "nodejs", "python", "go", "aws", "docker"],
  },
  {
    id: "stuck",
    icon: <LifebuoyIcon size={20} />,
    title: "業務で詰まっている",
    description: "エラーが解決できない、実装方法がわからないなど、具体的な課題を一緒に解決",
    examples: ["このエラーが解消できない", "パフォーマンス改善したい", "テストの書き方"],
    mentorCount: 96,
    relatedProblems: ["performance", "testing", "security", "ci-cd", "app-release"],
    relatedTech: ["javascript", "typescript", "react", "nextjs", "vue", "nodejs", "python", "go", "swift", "kotlin", "flutter"],
  },
  {
    id: "casual",
    icon: <ChatSmileIcon size={20} />,
    title: "なんとなく話を聞いてほしい",
    description: "明確な課題がなくてもOK。雑談ベースでエンジニアの先輩と話してみる",
    examples: ["エンジニアの働き方って？", "勉強のモチベーション", "業界の雰囲気を知りたい"],
    mentorCount: 120,
    relatedProblems: ["oss", "team-dev"],
    relatedTech: [],
  },
];

// 技術分野
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

// 解決したい課題別
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

// 相談事例（カテゴリIDで紐付け）
type PastConsultation = {
  id: string;
  title: string;
  categoryLabel: string;
  categoryId: string;
  mentorName: string;
  mentorAvatar: string;
  date: string;
};

const pastConsultations: PastConsultation[] = [
  {
    id: "1",
    title: "Reactのパフォーマンス改善について相談しました",
    categoryLabel: "コードレビュー",
    categoryId: "code-review",
    mentorName: "池内 孝啓",
    mentorAvatar: "/image/home/puru-image.png",
    date: "2026.03.20",
  },
  {
    id: "2",
    title: "SIerからWeb系への転職について話を聞いてもらいました",
    categoryLabel: "キャリア相談",
    categoryId: "career",
    mentorName: "星川 佳瑠",
    mentorAvatar: "/image/home/riku-image.png",
    date: "2026.03.18",
  },
  {
    id: "3",
    title: "GraphQLを導入すべきか一緒に考えてもらいました",
    categoryLabel: "技術選定",
    categoryId: "tech-selection",
    mentorName: "中條 剛",
    mentorAvatar: "/image/home/puru-image.png",
    date: "2026.03.15",
  },
  {
    id: "4",
    title: "新卒1年目の不安を聞いてもらいました",
    categoryLabel: "カジュアル",
    categoryId: "casual",
    mentorName: "山田 太郎",
    mentorAvatar: "/image/home/riku-image.png",
    date: "2026.03.12",
  },
  {
    id: "5",
    title: "マイクロサービスの設計方針をレビューしてもらいました",
    categoryLabel: "設計壁打ち",
    categoryId: "design-review",
    mentorName: "池内 孝啓",
    mentorAvatar: "/image/home/puru-image.png",
    date: "2026.03.10",
  },
  {
    id: "6",
    title: "Dockerが動かなくてずっと詰まってた問題を解決できた",
    categoryLabel: "業務で詰まっている",
    categoryId: "stuck",
    mentorName: "星川 佳瑠",
    mentorAvatar: "/image/home/riku-image.png",
    date: "2026.03.08",
  },
];

// ── コンポーネント ──

function CategoryCard({
  category,
  isSelected,
  onToggle,
}: {
  category: ConsultationCategory;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group flex flex-col bg-white rounded-xl p-4 transition-all cursor-pointer text-left border-2 ${
        isSelected
          ? "border-brand-primary shadow-md ring-1 ring-brand-primary/20"
          : "border-border-primary hover:shadow-md hover:border-brand-primary"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <span
          className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
            isSelected
              ? "bg-brand-primary text-white"
              : "bg-bg-quaternary text-brand-primary"
          }`}
        >
          {category.icon}
        </span>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-text-body mb-1">{category.title}</h4>
          <p className="text-xs text-text-description leading-relaxed">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {category.examples.map((example) => (
          <span
            key={example}
            className="text-[10px] text-text-description bg-bg-secondary px-2 py-0.5 rounded-full"
          >
            {example}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-primary">
        <span className="text-xs text-text-description">
          対応可能メンター <span className="font-bold text-brand-primary">{category.mentorCount}名</span>
        </span>
        {isSelected ? (
          <span className="text-xs font-bold text-brand-primary">
            ✓ 選択中
          </span>
        ) : (
          <span className="text-xs font-bold text-brand-primary group-hover:underline">
            選ぶ →
          </span>
        )}
      </div>
    </button>
  );
}

function FilterTagButton({
  label,
  icon,
  isSelected,
  isHighlighted,
  onToggle,
}: {
  label: string;
  icon?: ReactNode;
  isSelected: boolean;
  isHighlighted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer border ${
        isSelected
          ? "bg-brand-primary text-white border-brand-primary"
          : isHighlighted
          ? "bg-bg-quaternary text-text-body border-brand-primary font-medium"
          : "bg-white text-text-body border-border-primary hover:bg-bg-quaternary hover:border-brand-primary"
      }`}
    >
      {icon && <span className={isSelected ? "text-white" : "text-text-description"}>{icon}</span>}
      {!icon && (
        <span
          className={`w-2 h-2 rounded-full ${
            isSelected ? "bg-white" : "bg-brand-primary"
          }`}
        />
      )}
      <span>{label}</span>
    </button>
  );
}

function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  count,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  count?: number;
  children: ReactNode;
}) {
  return (
    <div className="border border-border-primary rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-bg-secondary transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-text-body">{title}</h3>
          {count !== undefined && count > 0 && (
            <span className="text-[10px] font-bold text-white bg-brand-primary px-1.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`text-text-description transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1">{children}</div>
      </div>
    </div>
  );
}

function PastConsultationCard({ consultation }: { consultation: PastConsultation }) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 bg-white border border-border-primary rounded-lg p-3 hover:bg-bg-secondary transition-colors cursor-pointer text-left w-full"
    >
      <div className="w-8 h-8 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
        <Image
          src={consultation.mentorAvatar}
          alt={consultation.mentorName}
          width={32}
          height={32}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-text-body line-clamp-1">{consultation.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-brand-primary bg-bg-quaternary px-1.5 py-0.5 rounded">
            {consultation.categoryLabel}
          </span>
          <span className="text-[10px] text-text-description">{consultation.mentorName}</span>
          <span className="text-[10px] text-text-description">{consultation.date}</span>
        </div>
      </div>
      <span className="text-xs text-brand-primary shrink-0">同じ内容で相談 →</span>
    </button>
  );
}

function ActiveFilters({
  selectedCategory,
  selectedProblems,
  selectedTech,
  onClearCategory,
  onClearProblem,
  onClearTech,
  onClearAll,
}: {
  selectedCategory: string | null;
  selectedProblems: Set<string>;
  selectedTech: Set<string>;
  onClearCategory: () => void;
  onClearProblem: (id: string) => void;
  onClearTech: (id: string) => void;
  onClearAll: () => void;
}) {
  const categoryObj = categories.find((c) => c.id === selectedCategory);
  const hasAny = selectedCategory || selectedProblems.size > 0 || selectedTech.size > 0;
  if (!hasAny) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap bg-bg-secondary rounded-xl px-4 py-3">
      <span className="text-xs font-bold text-text-description mr-1">絞り込み中:</span>

      {categoryObj && (
        <button
          type="button"
          onClick={onClearCategory}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-primary text-white text-xs font-medium rounded-full cursor-pointer hover:opacity-80 transition-opacity"
        >
          {categoryObj.title}
          <span className="text-white/70">×</span>
        </button>
      )}

      {[...selectedProblems].map((id) => {
        const p = problemCategories.find((x) => x.id === id);
        if (!p) return null;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onClearProblem(id)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-primary text-white text-xs font-medium rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          >
            {p.label}
            <span className="text-white/70">×</span>
          </button>
        );
      })}

      {[...selectedTech].map((id) => {
        const t = techFields.find((x) => x.id === id);
        if (!t) return null;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onClearTech(id)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-primary text-white text-xs font-medium rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          >
            {t.label}
            <span className="text-white/70">×</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-text-description hover:text-brand-primary ml-auto cursor-pointer transition-colors"
      >
        すべて解除
      </button>
    </div>
  );
}

function MentorResult({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between bg-white border-2 border-brand-primary rounded-xl px-5 py-4">
      <div>
        <p className="text-sm text-text-description">条件に合うメンター</p>
        <p className="text-2xl font-bold text-text-body">
          {count}<span className="text-sm font-medium ml-0.5">名</span>
        </p>
      </div>
      <a
        href="#"
        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-primary text-white text-sm font-bold rounded-full hover:opacity-80 transition-opacity"
      >
        メンターを見る
        <ArrowRightIcon size={14} />
      </a>
    </div>
  );
}

// ── メインコンポーネント ──

export default function ConsultationList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProblems, setSelectedProblems] = useState<Set<string>>(new Set());
  const [selectedTech, setSelectedTech] = useState<Set<string>>(new Set());
  const [isProblemOpen, setIsProblemOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [visibleConsultations, setVisibleConsultations] = useState(4);

  // カテゴリ選択で関連タグをハイライト
  const activeCat = categories.find((c) => c.id === selectedCategory);
  const highlightedProblems = new Set(activeCat?.relatedProblems ?? []);
  const highlightedTech = new Set(activeCat?.relatedTech ?? []);

  // フィルタ操作
  const toggleCategory = (id: string) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
      // カテゴリを選んだら絞り込みセクションを開く（関連タグがある場合）
      const cat = categories.find((c) => c.id === id);
      if (cat && cat.relatedProblems.length > 0) setIsProblemOpen(true);
      if (cat && cat.relatedTech.length > 0) setIsTechOpen(true);
    }
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
  };

  const hasActiveFilters = selectedCategory || selectedProblems.size > 0 || selectedTech.size > 0;

  // 相談事例のフィルタリング
  const filteredConsultations = hasActiveFilters
    ? pastConsultations.filter((c) => {
        if (selectedCategory && c.categoryId !== selectedCategory) return false;
        return true;
      })
    : pastConsultations;

  // メンター数（仮計算：160名が母数）
  const mentorCount = hasActiveFilters
    ? (activeCat?.mentorCount ?? 160) - selectedProblems.size * 5 - selectedTech.size * 3
    : 0;

  // 表示するカテゴリ数
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 6);

  return (
    <div>
      <p className="text-sm text-text-description mb-6">
        「こんなこと聞いていいのかな？」→{" "}
        <span className="font-bold text-brand-primary">大丈夫です！</span>
        気軽に相談してみましょう
      </p>

      {/* 1. みんなの相談事例（フィルタ連動） */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-body">みんなの相談事例</h3>
            {hasActiveFilters && (
              <span className="text-xs text-text-description bg-bg-secondary px-2 py-1 rounded-full">
                {filteredConsultations.length}件
              </span>
            )}
          </div>
          <a href="/1on1/consultations" className="text-sm text-brand-primary hover:underline">
            すべて見る →
          </a>
        </div>
        {filteredConsultations.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {filteredConsultations.slice(0, visibleConsultations).map((consultation) => (
                <PastConsultationCard key={consultation.id} consultation={consultation} />
              ))}
            </div>
            {filteredConsultations.length > visibleConsultations && (
              <button
                type="button"
                onClick={() => setVisibleConsultations((prev) => prev + 4)}
                className="mt-3 w-full py-2.5 text-sm font-medium text-brand-primary bg-bg-secondary hover:bg-bg-quaternary border border-border-primary rounded-lg transition-colors cursor-pointer"
              >
                もっと見る（残り{filteredConsultations.length - visibleConsultations}件）
              </button>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-text-description text-sm">
            この条件に一致する相談事例はまだありません
          </div>
        )}
      </section>

      {/* 区切り */}
      <div className="border-t border-border-primary mb-8" />

      {/* 2. お悩みカテゴリ */}
      <section className="mb-6">
        <h3 className="text-lg font-bold text-text-body mb-4">お悩みカテゴリから選ぶ</h3>
        <div className="grid grid-cols-3 gap-4">
          {visibleCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onToggle={() => toggleCategory(category.id)}
            />
          ))}
        </div>
        {categories.length > 6 && (
          <button
            type="button"
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-4 mx-auto flex items-center gap-1 text-sm text-brand-primary hover:underline cursor-pointer"
          >
            {showAllCategories ? "閉じる" : `他${categories.length - 6}件を見る`}
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={`transition-transform ${showAllCategories ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </section>

      {/* 3. 絞り込みフィルタ（折りたたみ） */}
      <section className="flex flex-col gap-3 mb-6">
        <CollapsibleSection
          title="課題で絞り込む"
          isOpen={isProblemOpen}
          onToggle={() => setIsProblemOpen(!isProblemOpen)}
          count={selectedProblems.size}
        >
          <div className="flex flex-wrap gap-2">
            {problemCategories.map((problem) => (
              <FilterTagButton
                key={problem.id}
                label={problem.label}
                icon={problem.icon}
                isSelected={selectedProblems.has(problem.id)}
                isHighlighted={highlightedProblems.has(problem.id)}
                onToggle={() => toggleProblem(problem.id)}
              />
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="技術分野で絞り込む"
          isOpen={isTechOpen}
          onToggle={() => setIsTechOpen(!isTechOpen)}
          count={selectedTech.size}
        >
          <div className="flex flex-wrap gap-2">
            {techFields.map((field) => (
              <FilterTagButton
                key={field.id}
                label={field.label}
                isSelected={selectedTech.has(field.id)}
                isHighlighted={highlightedTech.has(field.id)}
                onToggle={() => toggleTech(field.id)}
              />
            ))}
          </div>
        </CollapsibleSection>
      </section>

      {/* 4. アクティブフィルタ表示 + 結果 */}
      {hasActiveFilters && (
        <section className="flex flex-col gap-4 mb-8">
          <ActiveFilters
            selectedCategory={selectedCategory}
            selectedProblems={selectedProblems}
            selectedTech={selectedTech}
            onClearCategory={() => setSelectedCategory(null)}
            onClearProblem={(id) => toggleProblem(id)}
            onClearTech={(id) => toggleTech(id)}
            onClearAll={clearAll}
          />
          <MentorResult count={Math.max(mentorCount, 3)} />
        </section>
      )}

    </div>
  );
}
