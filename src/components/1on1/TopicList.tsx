"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

type ViewMode = "grid" | "timeline";

type TopicContent = {
  id: string;
  title: string;
  mentorName: string;
  mentorAvatar: string;
  source: string;
  thumbnail: string;
  topics: string[];
  summary?: string;
  updatedAt?: string;
  category?: string;
};

const techArticles: TopicContent[] = [
  {
    id: "1",
    title: "AI時代のアーキテクチャ考 ① リポジトリ編",
    mentorName: "池内 孝啓 / Takahiro Ikeuchi",
    mentorAvatar: "/image/home/puru-image.png",
    source: "note",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["AI時代のリポジトリ設計ってどうすべき？", "モノレポとマルチレポどっちがいい？", "AI支援ツールで開発フローどう変わった？"],
    summary: "AIコーディングツールの台頭により、リポジトリ構成の考え方も変わりつつある。モノレポ・マルチレポそれぞれの利点を整理し、AI時代に適した設計指針を探る。",
    updatedAt: "2026-03-29",
    category: "技術記事",
  },
  {
    id: "2",
    title: "例外処理をどう使い分ける？\nResult型を使ったエラー設計",
    mentorName: "星川 佳瑠 / 4kstack",
    mentorAvatar: "/image/home/riku-image.png",
    source: "TechTrain",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["例外とResult型はどう使い分ける？", "実務でのエラーハンドリングどうしてる？", "エラー設計でやりがちな失敗って？"],
    summary: "try-catchによる例外処理とResult型を使ったエラー表現、それぞれの使い分けを実例をもとに解説。実務で安全なエラー設計を行うためのヒント。",
    updatedAt: "2026-03-25",
    category: "技術記事",
  },
  {
    id: "3",
    title: "【Flutter】API トークンを「適切」に管理する",
    mentorName: "中條 剛（ちゅーやん）",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Zenn",
    thumbnail: "/image/placeholder-article-3.svg",
    topics: ["トークン管理のベストプラクティスは？", "Flutterで認証ってどう設計する？", "セキュアストレージの選び方は？"],
    summary: "FlutterアプリでAPIトークンをセキュアに保存・更新する方法をflutter_secure_storageやRefresh Token戦略とともに紹介。",
    updatedAt: "2026-03-20",
    category: "技術記事",
  },
  {
    id: "4",
    title: "アーキテクチャモダナイゼーション\n組織とビジネスの未来を設計する",
    mentorName: "Nick Tune, Jean-Georges Perrin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-4.svg",
    topics: ["レガシーシステムの刷新どこから始める？", "組織構造とアーキテクチャの関係って？", "コンウェイの法則って実務でどう影響する？"],
    summary: "レガシーシステムのモダナイゼーションを組織・ビジネス視点から捉え直す。コンウェイの法則を踏まえた実践的な移行アプローチを解説。",
    updatedAt: "2026-03-14",
    category: "技術記事",
  },
  {
    id: "1-5",
    title: "TypeScriptで学ぶデザインパターン入門",
    mentorName: "山田 太郎",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Qiita",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["TSでデザインパターンどう使ってる？", "Strategyパターンの実務での活用例は？", "パターンを学ぶ順番のおすすめは？"],
    summary: "GoFデザインパターンをTypeScriptで実装しながら学ぶ入門記事。StrategyパターンやObserverパターンなど頻出パターンを実務に活かす方法。",
    updatedAt: "2026-03-08",
    category: "技術記事",
  },
  {
    id: "1-6",
    title: "マイクロサービスの境界設計",
    mentorName: "佐藤 次郎",
    mentorAvatar: "/image/home/riku-image.png",
    source: "note",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["サービスの境界ってどう決める？", "分割しすぎて失敗した経験ある？", "モノリスから段階的に切り出すコツは？"],
    summary: "マイクロサービスで最も難しい「サービスの分割境界」をどう決定するか。ドメイン境界の見極め方と失敗パターンを具体例で紹介。",
    updatedAt: "2026-03-02",
    category: "技術記事",
  },
];

const books: TopicContent[] = [
  {
    id: "5",
    title: "AI時代のアーキテクチャ考 ① リポジトリ編",
    mentorName: "池内 孝啓 / Takahiro Ikeuchi",
    mentorAvatar: "/image/home/puru-image.png",
    source: "note",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["AI時代の開発フローってどう変わる？", "チーム開発でAIツールどう導入してる？", "コードレビューの役割は変わる？"],
    summary: "AI支援ツールが開発ワークフローに与える影響をリポジトリ構成の観点から考察。今後のチーム開発に必要な視点を提供。",
    updatedAt: "2026-03-28",
    category: "書籍・雑誌",
  },
  {
    id: "6",
    title: "例外処理をどう使い分ける？\nResult型を使ったエラー設計",
    mentorName: "星川 佳瑠 / 4kstack",
    mentorAvatar: "/image/home/riku-image.png",
    source: "TechTrain",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["エラー設計の考え方ってどう深める？", "小規模と大規模で戦略は変わる？", "この本の読み方のおすすめは？"],
    summary: "例外とResult型のメリット・デメリットを比較し、プロジェクト規模に応じたエラーハンドリング戦略を提案する一冊。",
    updatedAt: "2026-03-22",
    category: "書籍・雑誌",
  },
  {
    id: "7",
    title: "【Flutter】API トークンを「適切」に管理する",
    mentorName: "中條 剛（ちゅーやん）",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Zenn",
    thumbnail: "/image/placeholder-article-3.svg",
    topics: ["モバイルアプリのセキュリティどう考える？", "暗号化ってどのレイヤーでやるべき？", "セキュリティ対策の優先順位は？"],
    summary: "モバイルアプリにおけるトークン管理やデータ暗号化など、開発者が押さえるべきセキュリティの基本をFlutterを例に解説。",
    updatedAt: "2026-03-16",
    category: "書籍・雑誌",
  },
  {
    id: "8",
    title: "アーキテクチャモダナイゼーション\n組織とビジネスの未来を設計する",
    mentorName: "Nick Tune, Jean-Georges Perrin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-4.svg",
    topics: ["モダナイゼーションって何から始める？", "段階的移行と一括移行どっちがいい？", "経営層への説得材料ってどう作る？"],
    summary: "組織の構造とシステムアーキテクチャの関係に着目し、段階的なモダナイゼーション戦略を具体的なケーススタディで紹介。",
    updatedAt: "2026-03-10",
    category: "書籍・雑誌",
  },
  {
    id: "2-5",
    title: "実践ドメイン駆動設計",
    mentorName: "ヴァーン・ヴァーノン",
    mentorAvatar: "/image/home/puru-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["DDDって実務でどう活かす？", "集約の境界ってどう決めてる？", "ユビキタス言語をチームに浸透させるコツは？"],
    summary: "ドメイン駆動設計の理論を実務に落とし込む方法を、集約・境界づけられたコンテキスト・ユビキタス言語などの概念とともに解説。",
    updatedAt: "2026-03-05",
    category: "書籍・雑誌",
  },
  {
    id: "2-6",
    title: "Clean Architecture 達人に学ぶソフトウェアの構造と設計",
    mentorName: "Robert C. Martin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["クリーンアーキテクチャって本当に必要？", "依存性逆転ってどう実践する？", "小さいプロジェクトでも適用すべき？"],
    summary: "ソフトウェア設計の原則を体系的にまとめた名著。依存性逆転やレイヤー分離の考え方を通じ、保守しやすいコードの構造を学ぶ。",
    updatedAt: "2026-02-28",
    category: "書籍・雑誌",
  },
];

const slides: TopicContent[] = [
  {
    id: "3-1",
    title: "実践ハーネスエンジニアリング",
    mentorName: "Takuma Kajikawa",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-1.jpg",
    topics: ["ハーネスエンジニアリングって何？", "テスト自動化の設計どうしてる？", "CI/CDに組み込むコツは？"],
    summary: "テストハーネスの設計と運用を実践的に解説。CI/CDパイプラインに組み込むための具体的なアプローチを紹介。",
    updatedAt: "2026-03-30",
    category: "登壇資料・スライド",
  },
  {
    id: "3-2",
    title: "良い機能を作るためにAIと壁打ちをしたら実装も快適になってしまった話",
    mentorName: "dachi",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-2.jpg",
    topics: ["AIとの壁打ちで機能開発どう変わる？", "仕様の壁打ちに使えるプロンプトは？", "AI活用で気をつけるべき点は？"],
    summary: "機能設計の段階からAIと対話し、仕様の壁打ちから実装まで一気通貫で進めた体験談。生産性が劇的に向上した実例を共有。",
    updatedAt: "2026-03-27",
    category: "登壇資料・スライド",
  },
  {
    id: "3-3",
    title: "Alternatives to JPA 2026",
    mentorName: "Sunghyouk Bae",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-3.jpg",
    topics: ["JPA以外の選択肢って何がある？", "jOOQとMyBatisどう使い分ける？", "Kotlinだとどのライブラリがおすすめ？"],
    summary: "Java/Kotlinのデータアクセス層でJPA以外に選べるライブラリを比較。jOOQ、Exposed、MyBatisなどの特徴と使い分け。",
    updatedAt: "2026-03-18",
    category: "登壇資料・スライド",
  },
  {
    id: "3-4",
    title: "PHPでの .gitattributes",
    mentorName: "kazusuke sasezaki",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-4.jpg",
    topics: [".gitattributesってPHPでどう使う？", "export-ignoreの設定どうしてる？", "チーム開発でのGit運用のコツは？"],
    summary: "PHPプロジェクトにおける.gitattributesの活用法。export-ignoreやdiff設定でリポジトリ管理を効率化するテクニック。",
    updatedAt: "2026-03-12",
    category: "登壇資料・スライド",
  },
  {
    id: "3-5",
    title: "夢の無限スパゲッティ製造機 -実装篇-",
    mentorName: "hideki kinjyo",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-5.jpg",
    topics: ["スパゲッティコードとどう向き合う？", "リファクタリングの優先順位どうつける？", "技術的負債の説明どうしてる？"],
    summary: "複雑に絡み合ったコードベースをどう解きほぐすか。リファクタリングの戦略と、現実的に技術的負債と付き合う方法論。",
    updatedAt: "2026-03-06",
    category: "登壇資料・スライド",
  },
  {
    id: "3-6",
    title: "connpassのMCPを作ってみた",
    mentorName: "akase244",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-6.jpg",
    topics: ["MCPサーバーってどう作る？", "connpass APIの活用法は？", "Claude Codeとの連携どうやる？"],
    summary: "connpassのAPIを活用してMCPサーバーを実装した事例。Claude Codeとの連携でイベント検索を自動化する方法を紹介。",
    updatedAt: "2026-02-26",
    category: "登壇資料・スライド",
  },
];

const media: TopicContent[] = [
  {
    id: "4-1",
    title: "Laravelを使い倒す1時間 - ライブコーディング【アーカイブ】",
    mentorName: "武田 憲太郎",
    mentorAvatar: "/image/home/puru-image.png",
    source: "YouTube",
    thumbnail: "/image/media/media-1.jpg",
    topics: ["LaravelでTDDってどう進める？", "artisanコマンドの使いこなし方は？", "Eloquentのパフォーマンス注意点は？"],
    summary: "Laravelの機能をライブコーディングで実演。TDD・artisanコマンド・Eloquentの実践的な使い方を1時間で一気に体験できるアーカイブ。",
    updatedAt: "2026-03-26",
    category: "メディア",
  },
  {
    id: "4-2",
    title: "「伝えること」にこだわる武田憲太郎さんが貫くエンジニアの流儀",
    mentorName: "武田 憲太郎",
    mentorAvatar: "/image/home/puru-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-2.png",
    topics: ["シンプルなコードを書くコツって？", "技術発信を続けるモチベーションは？", "伝えるスキルってどう磨く？"],
    summary: "「伝えること」を軸にキャリアを築いてきた武田憲太郎さんのエンジニア哲学。コードも文章も、シンプルであることの価値を語る。",
    updatedAt: "2026-03-23",
    category: "メディア",
  },
  {
    id: "4-3",
    title: "Fluttercon EUに登壇するちゅーやんさん直前インタビュー",
    mentorName: "中城 翼（ちゅーやん）",
    mentorAvatar: "/image/home/riku-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-3.png",
    topics: ["海外カンファレンス登壇ってどう準備する？", "英語でのプレゼンのコツは？", "プロポーザルの書き方教えて？"],
    summary: "Fluttercon EU登壇直前のちゅーやんさんに聞いた、海外カンファレンスへの挑戦とプロポーザルの書き方、英語登壇のコツ。",
    updatedAt: "2026-03-17",
    category: "メディア",
  },
  {
    id: "4-4",
    title: "『FoodGram』で挑む、\u201Cやりたいこと\u201Dだけじゃない価値の作り方",
    mentorName: "いせりゅー",
    mentorAvatar: "/image/home/riku-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-4.png",
    topics: ["個人開発アプリのマネタイズどうする？", "ユーザーの声をどう拾ってる？", "やりたいことと市場ニーズのバランスは？"],
    summary: "個人開発アプリFoodGramを通じて「やりたいこと」だけに頼らないプロダクトの価値づくりに挑んだ、いせりゅーさんの体験記。",
    updatedAt: "2026-03-11",
    category: "メディア",
  },
  {
    id: "4-5",
    title: "「Yes」と言える準備で、広がるチャンス。Taketoさんが語る\u201C貢献力\u201Dの高め方",
    mentorName: "Taketo",
    mentorAvatar: "/image/home/puru-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-5.png",
    topics: ["グローバルで活躍するために必要なことは？", "英語力以外に大事なスキルは？", "チャンスを掴むための準備って？"],
    summary: "チャンスが来たときに「Yes」と言える準備の大切さ。Taketoさんが語る、グローバル環境で貢献力を高めるためのマインドセット。",
    updatedAt: "2026-03-04",
    category: "メディア",
  },
  {
    id: "4-6",
    title: "GitHubのTemplate Repositoryを活用し、Vibe Codingの初速をつける",
    mentorName: "Keigo",
    mentorAvatar: "/image/home/riku-image.png",
    source: "メンター執筆",
    thumbnail: "/image/media/media-6.png",
    topics: ["テンプレートリポジトリってどう活用する？", "Vibe Codingの始め方は？", "ボイラープレート管理のベストプラクティスは？"],
    summary: "GitHub Template Repositoryを活用してVibe Codingの初速を上げるテクニック。ボイラープレート管理とプロジェクト立ち上げの効率化。",
    updatedAt: "2026-02-24",
    category: "メディア",
  },
];

function TopicCard({ content }: { content: TopicContent }) {
  return (
    <a
      href={`/1on1/topic/${content.id}`}
      className="group flex flex-col bg-white border border-border-primary rounded-xl overflow-hidden hover:border-brand-primary transition-colors cursor-pointer text-left"
    >
      {/* Thumbnail */}
      <div className="p-1.5 pb-0">
        <div className="relative aspect-[16/9] bg-bg-quaternary rounded-lg overflow-hidden">
          {content.thumbnail.startsWith("/image/placeholder") ? (
            <div className="w-full h-full flex items-center justify-center">
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" className="text-text-description">
                <path d="M5 21V3h14v18l-7-3-7 3Z" stroke="currentColor" strokeWidth={1.5} />
              </svg>
            </div>
          ) : (
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h4 className="text-lg font-bold text-text-body leading-snug line-clamp-2 whitespace-pre-line">
          {content.title}
        </h4>

        {/* Source badge */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-text-secondary bg-bg-quaternary px-2 py-0.5 rounded">
            {content.source}
          </span>
        </div>

        {/* Question topics */}
        {content.topics.length > 0 && (
          <div className="mt-1">
            <p className="text-xs text-text-description mb-1.5">こんなことを聞いてみよう！</p>
            <div className="flex flex-wrap gap-1.5">
              {content.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-brand-primary bg-[#E9E9F5] rounded-full leading-tight border border-transparent hover:border-brand-primary hover:bg-[#DDDDF0] transition-colors cursor-pointer"
                >
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
                  </svg>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Mentor - bottom (links to mentor detail) */}
        <a
          href={`/1on1/mentor/${content.id}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-3 mt-auto pt-3 border-t border-border-primary -mx-4 -mb-4 px-4 py-3 rounded-b-xl transition-colors hover:bg-bg-secondary group/mentor"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0 ring-2 ring-white">
            <Image
              src={content.mentorAvatar}
              alt={content.mentorName}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium text-text-body truncate block">
              {content.mentorName}
            </span>
          </div>
          <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-primary bg-brand-primary/5 border border-brand-primary/20 rounded-full group-hover/mentor:bg-brand-primary group-hover/mentor:text-white transition-colors">
            メンターを見る
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.1717 12.0007L8.22168 7.05072L9.63589 5.63651L15.9999 12.0005L9.63589 18.3645L8.22168 16.9503L13.1717 12.0007Z" />
            </svg>
          </span>
        </a>
      </div>
    </a>
  );
}

const categoryColors: Record<string, string> = {
  "技術記事": "bg-blue-50 text-blue-600",
  "書籍・雑誌": "bg-amber-50 text-amber-600",
  "登壇資料・スライド": "bg-emerald-50 text-emerald-600",
  "メディア": "bg-purple-50 text-purple-600",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "今日";
  if (diff === 1) return "昨日";
  if (diff < 7) return `${diff}日前`;
  if (diff < 30) return `${Math.floor(diff / 7)}週間前`;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/** 全カテゴリ統合・更新日順のソート済みリスト */
const allContents: TopicContent[] = [
  ...techArticles,
  ...books,
  ...slides,
  ...media,
].sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));

const TIMELINE_PAGE_SIZE = 8;

/** タイムライン用カード — 横並びコンパクト + カテゴリバッジ + 日付 */
function TimelineCard({ content }: { content: TopicContent }) {
  const catColor = categoryColors[content.category ?? ""] ?? "bg-gray-50 text-gray-600";
  return (
    <div className="bg-white border border-border-primary rounded-xl overflow-hidden hover:border-brand-primary transition-colors">
      <a
        href={`/1on1/topic/${content.id}`}
        className="flex gap-5 p-4 cursor-pointer"
      >
        {/* Thumbnail — 16:9 */}
        <div className="shrink-0 w-72">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-bg-quaternary">
            {content.thumbnail.startsWith("/image/placeholder") ? (
              <div className="w-full h-full flex items-center justify-center">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" className="text-text-description">
                  <path d="M5 21V3h14v18l-7-3-7 3Z" stroke="currentColor" strokeWidth={1.5} />
                </svg>
              </div>
            ) : (
              <Image src={content.thumbnail} alt={content.title} fill className="object-cover" />
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Category + Date */}
          <div className="flex items-center gap-2">
            {content.category && (
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${catColor}`}>
                {content.category}
              </span>
            )}
            <span className="text-xs text-text-description">{formatDate(content.updatedAt)}</span>
          </div>
          <h4 className="text-base font-bold text-text-body leading-snug line-clamp-2 whitespace-pre-line">
            {content.title}
          </h4>
          <span className="text-sm text-text-secondary bg-bg-quaternary px-2.5 py-0.5 rounded w-fit">
            {content.source}
          </span>
          {content.summary && (
            <p className="text-sm text-text-description leading-relaxed line-clamp-2">{content.summary}</p>
          )}
          {content.topics.length > 0 && (
            <div className="mt-0.5">
              <p className="text-xs text-text-description mb-1.5">こんなことを聞いてみよう！</p>
              <div className="flex flex-wrap gap-1.5">
                {content.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-sm text-brand-primary bg-[#E9E9F5] rounded-full leading-tight border border-transparent hover:border-brand-primary hover:bg-[#DDDDF0] transition-colors cursor-pointer"
                  >
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                      <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
                    </svg>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </a>
      {/* Mentor - links to mentor detail (outside of card link, full width) */}
      <a
        href={`/1on1/mentor/${content.id}`}
        className="flex items-center gap-3 px-4 py-2.5 border-t border-border-primary hover:bg-bg-secondary transition-colors group/mentor"
      >
        <div className="w-7 h-7 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
          <Image src={content.mentorAvatar} alt={content.mentorName} width={28} height={28} className="object-cover w-full h-full" />
        </div>
        <span className="text-sm font-medium text-text-body truncate flex-1">{content.mentorName}</span>
        <span className="shrink-0 flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-primary bg-brand-primary/5 border border-brand-primary/20 rounded-full group-hover/mentor:bg-brand-primary group-hover/mentor:text-white transition-colors">
          メンターを見る
          <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.1717 12.0007L8.22168 7.05072L9.63589 5.63651L15.9999 12.0005L9.63589 18.3645L8.22168 16.9503L13.1717 12.0007Z" />
          </svg>
        </span>
      </a>
    </div>
  );
}

/** 統合タイムライン — 無限スクロール */
function UnifiedTimeline() {
  const [visibleCount, setVisibleCount] = useState(TIMELINE_PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < allContents.length;

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount((prev) => Math.min(prev + TIMELINE_PAGE_SIZE, allContents.length));
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore]);

  const visible = allContents.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-3">
      {visible.map((content) => (
        <TimelineCard key={content.id} content={content} />
      ))}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-6">
          <span className="text-sm text-text-description animate-pulse">読み込み中...</span>
        </div>
      )}
    </div>
  );
}

/** ビュー切り替えアイコン */
function ViewToggle({ viewMode, onChange }: { viewMode: ViewMode; onChange: (v: ViewMode) => void }) {
  return (
    <div className="flex items-center gap-1 bg-bg-quaternary rounded-lg p-1">
      <button
        type="button"
        onClick={() => onChange("timeline")}
        className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === "timeline" ? "bg-white shadow-sm text-brand-primary" : "text-text-description hover:text-text-body"}`}
        title="タイムライン表示"
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`p-1.5 rounded-md transition-colors cursor-pointer ${viewMode === "grid" ? "bg-white shadow-sm text-brand-primary" : "text-text-description hover:text-text-body"}`}
        title="グリッド表示"
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13ZM5 5V9H9V5H5ZM5 15V19H9V15H5ZM15 5V9H19V5H15ZM15 15V19H19V15H15Z" />
        </svg>
      </button>
    </div>
  );
}

type CategorySectionProps = {
  title: string;
  categoryId: string;
  contents: TopicContent[];
  viewMode: ViewMode;
};

function CategorySection({ title, categoryId, contents }: CategorySectionProps) {
  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold text-text-body mb-5">{title}</h3>
      <div className="grid grid-cols-3 gap-5">
        {contents.map((content) => (
          <TopicCard key={content.id} content={content} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <a
          href={`/1on1/topic?category=${categoryId}`}
          className="px-6 py-2 text-sm font-bold text-text-body border border-border-secondary rounded-full hover:bg-bg-quaternary transition-colors"
        >
          もっと見る
        </a>
      </div>
    </section>
  );
}

export default function TopicList() {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-base text-text-description">
          メンターの著書や技術発信について気になることを聞いてみよう
        </p>
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      {viewMode === "timeline" ? (
        <UnifiedTimeline />
      ) : (
        <>
          <CategorySection title="技術記事" categoryId="tech-articles" contents={techArticles} viewMode={viewMode} />
          <CategorySection title="書籍・雑誌" categoryId="books" contents={books} viewMode={viewMode} />
          <CategorySection title="登壇資料・スライド" categoryId="slides" contents={slides} viewMode={viewMode} />
          <CategorySection title="メディア" categoryId="media" contents={media} viewMode={viewMode} />
        </>
      )}
    </div>
  );
}
