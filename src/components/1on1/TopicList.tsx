"use client";

import Image from "next/image";

type TopicContent = {
  id: string;
  title: string;
  mentorName: string;
  mentorAvatar: string;
  source: string;
  thumbnail: string;
  topics: string[];
};

const techArticles: TopicContent[] = [
  {
    id: "1",
    title: "AI時代のアーキテクチャ考 ① リポジトリ編",
    mentorName: "池内 孝啓 / Takahiro Ikeuchi",
    mentorAvatar: "/image/home/puru-image.png",
    source: "note",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["AI時代のリポジトリ設計ってどうすべき？", "モノレポとマルチレポどっちがいい？"],
  },
  {
    id: "2",
    title: "例外処理をどう使い分ける？\nResult型を使ったエラー設計",
    mentorName: "星川 佳瑠 / 4kstack",
    mentorAvatar: "/image/home/riku-image.png",
    source: "TechTrain",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["例外とResult型はどう使い分ける？", "実務でのエラーハンドリングどうしてる？"],
  },
  {
    id: "3",
    title: "【Flutter】API トークンを「適切」に管理する",
    mentorName: "中條 剛（ちゅーやん）",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Zenn",
    thumbnail: "/image/placeholder-article-3.svg",
    topics: ["トークン管理のベストプラクティスは？", "Flutterで認証ってどう設計する？"],
  },
  {
    id: "4",
    title: "アーキテクチャモダナイゼーション\n組織とビジネスの未来を設計する",
    mentorName: "Nick Tune, Jean-Georges Perrin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-4.svg",
    topics: ["レガシーシステムの刷新どこから始める？", "組織構造とアーキテクチャの関係って？"],
  },
  {
    id: "1-5",
    title: "TypeScriptで学ぶデザインパターン入門",
    mentorName: "山田 太郎",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Qiita",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["TSでデザインパターンどう使ってる？"],
  },
  {
    id: "1-6",
    title: "マイクロサービスの境界設計",
    mentorName: "佐藤 次郎",
    mentorAvatar: "/image/home/riku-image.png",
    source: "note",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["サービスの境界ってどう決める？"],
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
    topics: ["AI時代の開発フローってどう変わる？"],
  },
  {
    id: "6",
    title: "例外処理をどう使い分ける？\nResult型を使ったエラー設計",
    mentorName: "星川 佳瑠 / 4kstack",
    mentorAvatar: "/image/home/riku-image.png",
    source: "TechTrain",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["エラー設計の考え方ってどう深める？"],
  },
  {
    id: "7",
    title: "【Flutter】API トークンを「適切」に管理する",
    mentorName: "中條 剛（ちゅーやん）",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Zenn",
    thumbnail: "/image/placeholder-article-3.svg",
    topics: ["モバイルアプリのセキュリティどう考える？"],
  },
  {
    id: "8",
    title: "アーキテクチャモダナイゼーション\n組織とビジネスの未来を設計する",
    mentorName: "Nick Tune, Jean-Georges Perrin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-4.svg",
    topics: ["モダナイゼーションって何から始める？"],
  },
  {
    id: "2-5",
    title: "実践ドメイン駆動設計",
    mentorName: "ヴァーン・ヴァーノン",
    mentorAvatar: "/image/home/puru-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-1.svg",
    topics: ["DDDって実務でどう活かす？"],
  },
  {
    id: "2-6",
    title: "Clean Architecture 達人に学ぶソフトウェアの構造と設計",
    mentorName: "Robert C. Martin",
    mentorAvatar: "/image/home/riku-image.png",
    source: "書籍",
    thumbnail: "/image/placeholder-article-2.svg",
    topics: ["クリーンアーキテクチャって本当に必要？"],
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
    topics: ["ハーネスエンジニアリングって何？"],
  },
  {
    id: "3-2",
    title: "良い機能を作るためにAIと壁打ちをしたら実装も快適になってしまった話",
    mentorName: "dachi",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-2.jpg",
    topics: ["AIとの壁打ちで機能開発どう変わる？"],
  },
  {
    id: "3-3",
    title: "Alternatives to JPA 2026",
    mentorName: "Sunghyouk Bae",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-3.jpg",
    topics: ["JPA以外の選択肢って何がある？"],
  },
  {
    id: "3-4",
    title: "PHPでの .gitattributes",
    mentorName: "kazusuke sasezaki",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-4.jpg",
    topics: [".gitattributesってPHPでどう使う？"],
  },
  {
    id: "3-5",
    title: "夢の無限スパゲッティ製造機 -実装篇-",
    mentorName: "hideki kinjyo",
    mentorAvatar: "/image/home/puru-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-5.jpg",
    topics: ["スパゲッティコードとどう向き合う？"],
  },
  {
    id: "3-6",
    title: "connpassのMCPを作ってみた",
    mentorName: "akase244",
    mentorAvatar: "/image/home/riku-image.png",
    source: "Speaker Deck",
    thumbnail: "/image/slides/slide-6.jpg",
    topics: ["MCPサーバーってどう作る？"],
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
    topics: ["LaravelでTDDってどう進める？", "artisanコマンドの使いこなし方は？"],
  },
  {
    id: "4-2",
    title: "「伝えること」にこだわる武田憲太郎さんが貫くエンジニアの流儀",
    mentorName: "武田 憲太郎",
    mentorAvatar: "/image/home/puru-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-2.png",
    topics: ["シンプルなコードを書くコツって？"],
  },
  {
    id: "4-3",
    title: "Fluttercon EUに登壇するちゅーやんさん直前インタビュー",
    mentorName: "中城 翼（ちゅーやん）",
    mentorAvatar: "/image/home/riku-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-3.png",
    topics: ["海外カンファレンス登壇ってどう準備する？"],
  },
  {
    id: "4-4",
    title: "『FoodGram』で挑む、\u201Cやりたいこと\u201Dだけじゃない価値の作り方",
    mentorName: "いせりゅー",
    mentorAvatar: "/image/home/riku-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-4.png",
    topics: ["個人開発アプリのマネタイズどうする？"],
  },
  {
    id: "4-5",
    title: "「Yes」と言える準備で、広がるチャンス。Taketoさんが語る\u201C貢献力\u201Dの高め方",
    mentorName: "Taketo",
    mentorAvatar: "/image/home/puru-image.png",
    source: "インタビュー",
    thumbnail: "/image/media/media-5.png",
    topics: ["グローバルで活躍するために必要なことは？"],
  },
  {
    id: "4-6",
    title: "GitHubのTemplate Repositoryを活用し、Vibe Codingの初速をつける",
    mentorName: "Keigo",
    mentorAvatar: "/image/home/riku-image.png",
    source: "メンター執筆",
    thumbnail: "/image/media/media-6.png",
    topics: ["テンプレートリポジトリってどう活用する？"],
  },
];

function TopicCard({ content }: { content: TopicContent }) {
  return (
    <a
      href={`/1on1/topic/${content.id}`}
      className="group flex flex-col bg-white border border-border-primary rounded-xl overflow-hidden hover:shadow-md hover:border-brand-primary transition-all cursor-pointer text-left"
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
          className="flex items-center gap-2 mt-auto pt-2.5 border-t border-border-primary hover:bg-bg-quaternary -mx-4 -mb-4 px-4 py-2.5 rounded-b-xl transition-colors"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
            <Image
              src={content.mentorAvatar}
              alt={content.mentorName}
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm text-text-description truncate flex-1">
            {content.mentorName}
          </span>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="text-text-description shrink-0">
            <path d="M13.1717 12.0007L8.22168 7.05072L9.63589 5.63651L15.9999 12.0005L9.63589 18.3645L8.22168 16.9503L13.1717 12.0007Z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </a>
  );
}

type CategorySectionProps = {
  title: string;
  categoryId: string;
  contents: TopicContent[];
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
  return (
    <div>
      <p className="text-base text-text-description mb-8">
        メンターの著書や技術発信について気になることを聞いてみよう
      </p>

      <CategorySection title="技術記事" categoryId="tech-articles" contents={techArticles} />
      <CategorySection title="書籍・雑誌" categoryId="books" contents={books} />
      <CategorySection title="登壇資料・スライド" categoryId="slides" contents={slides} />
      <CategorySection title="メディア" categoryId="media" contents={media} />
    </div>
  );
}
