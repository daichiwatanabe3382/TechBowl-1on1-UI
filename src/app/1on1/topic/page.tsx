"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

// カテゴリ情報
const categories: Record<string, { title: string; description: string }> = {
  "tech-articles": {
    title: "技術記事",
    description: "メンターの技術記事について気になることを聞いてみよう",
  },
  books: {
    title: "書籍・雑誌",
    description: "メンターの著書や推薦書籍について議論しよう",
  },
  slides: {
    title: "登壇資料・スライド",
    description: "カンファレンスや勉強会の登壇内容について深堀りしよう",
  },
  media: {
    title: "メディア",
    description: "Podcast・YouTube・音声配信など、メンターのメディア出演について聞いてみよう",
  },
};

// フィルタータグ
const filterTags = [
  "すべて",
  "フロントエンド",
  "バックエンド",
  "インフラ",
  "モバイル",
  "AI/ML",
  "設計・アーキテクチャ",
  "キャリア",
];

// ダミーデータ
const allTopics = Array.from({ length: 24 }, (_, i) => ({
  id: `topic-${i + 1}`,
  title: [
    "AI時代のアーキテクチャ考 ① リポジトリ編",
    "例外処理をどう使い分ける？Result型を使ったエラー設計",
    "【Flutter】API トークンを「適切」に管理する",
    "アーキテクチャモダナイゼーション",
    "TypeScriptで学ぶデザインパターン入門",
    "マイクロサービスの境界設計",
    "GraphQL vs REST：どちらを選ぶべきか",
    "Kubernetes入門：本番環境への道",
  ][i % 8],
  mentorName: [
    "池内 孝啓",
    "星川 佳瑠",
    "中條 剛",
    "Nick Tune",
    "山田 太郎",
    "佐藤 次郎",
    "鈴木 三郎",
    "田中 四郎",
  ][i % 8],
  mentorAvatar: i % 2 === 0 ? "/image/home/puru-image.png" : "/image/home/riku-image.png",
  source: ["note", "Zenn", "Qiita", "TechTrain", "書籍"][i % 5],
  tags: [
    ["フロントエンド", "設計・アーキテクチャ"],
    ["バックエンド", "設計・アーキテクチャ"],
    ["モバイル", "Flutter"],
    ["設計・アーキテクチャ"],
    ["フロントエンド", "TypeScript"],
    ["バックエンド", "設計・アーキテクチャ"],
    ["バックエンド", "API設計"],
    ["インフラ", "Kubernetes"],
  ][i % 8],
  topics: [
    "AI時代のリポジトリ設計ってどうすべき？",
    "例外とResult型はどう使い分ける？",
    "トークン管理のベストプラクティスは？",
    "レガシーシステムの刷新どこから始める？",
  ][i % 4],
}));

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

function TopicCard({ topic }: { topic: (typeof allTopics)[0] }) {
  return (
    <a
      href={`/1on1/topic/${topic.id}`}
      className="group flex flex-col bg-white border border-border-primary rounded-xl overflow-hidden hover:shadow-md hover:border-brand-primary transition-all cursor-pointer text-left"
    >
      {/* Thumbnail */}
      <div className="p-1.5 pb-0">
        <div className="relative aspect-[16/9] bg-bg-quaternary rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" className="text-text-description">
              <path d="M5 21V3h14v18l-7-3-7 3Z" stroke="currentColor" strokeWidth={1.5} />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h4 className="text-lg font-bold text-text-body leading-snug line-clamp-2">
          {topic.title}
        </h4>

        {/* Source badge */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-secondary bg-bg-quaternary px-2 py-0.5 rounded">
            {topic.source}
          </span>
        </div>

        {/* Question topic */}
        <div className="mt-1">
          <p className="text-xs text-text-description mb-1.5">こんなことを聞いてみよう！</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-brand-primary bg-[#E9E9F5] rounded-full leading-tight border border-transparent hover:border-brand-primary hover:bg-[#DDDDF0] transition-colors cursor-pointer">
              <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
              </svg>
              {topic.topics}
            </span>
          </div>
        </div>

        {/* Mentor - bottom (links to mentor detail) */}
        <a
          href={`/1on1/mentor/${topic.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 mt-auto pt-2.5 border-t border-border-primary hover:bg-bg-quaternary -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl transition-colors"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
            <Image
              src={topic.mentorAvatar}
              alt={topic.mentorName}
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm text-text-description truncate flex-1">
            {topic.mentorName}
          </span>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="text-text-description shrink-0">
            <path d="M13.1717 12.0007L8.22168 7.05072L9.63589 5.63651L15.9999 12.0005L9.63589 18.3645L8.22168 16.9503L13.1717 12.0007Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </a>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-text-description hover:bg-bg-quaternary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        前へ
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 text-sm rounded-md transition-colors ${
            currentPage === page
              ? "bg-brand-primary text-white"
              : "text-text-body hover:bg-bg-quaternary"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-text-description hover:bg-bg-quaternary rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        次へ
      </button>
    </div>
  );
}

function TopicCategoryPageContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") || "tech-articles";
  const category = categories[categoryId] || categories["tech-articles"];

  const [selectedTag, setSelectedTag] = useState("すべて");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // フィルタリング
  const filteredTopics =
    selectedTag === "すべて"
      ? allTopics
      : allTopics.filter((topic) => topic.tags.includes(selectedTag));

  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
  const paginatedTopics = filteredTopics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredTopics.length);

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
      <div className="py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-description mb-4">
          <a href="/1on1" className="hover:text-brand-primary transition-colors">
            1on1を予約
          </a>
          <span>/</span>
          <a href="/1on1" className="hover:text-brand-primary transition-colors">
            トピックから予約
          </a>
          <span>/</span>
          <span className="text-text-body font-medium">{category.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-bold text-text-body mb-2">{category.title}</h1>
        <p className="text-sm text-text-description mb-6">{category.description}</p>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(tag);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                selectedTag === tag
                  ? "bg-brand-primary text-white"
                  : "bg-bg-quaternary text-text-body hover:bg-border-secondary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-text-description">
            {startIndex}-{endIndex}件 / {filteredTopics.length}件
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-5">
          {paginatedTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </TwoColumnLayout>
  );
}

export default function TopicCategoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-description">読み込み中...</div>}>
      <TopicCategoryPageContent />
    </Suspense>
  );
}
