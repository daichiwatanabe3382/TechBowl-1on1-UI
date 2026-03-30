import { Header } from "@/components/Header";

type TwoColumnLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  activeNav?: string;
  ticketCount?: number;
  headerBanner?: React.ReactNode;
};

/** 2カラムレイアウト: ヘッダー固定 + サイドバー(240px) + メインコンテンツ */
export default function TwoColumnLayout({
  sidebar,
  children,
  activeNav,
  ticketCount,
  headerBanner,
}: TwoColumnLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeNav={activeNav} ticketCount={ticketCount} />
      <div className="flex flex-1">
        {/* サイドバー: ヘッダー下に追従、罫線がバナー横からシームレスに繋がる */}
        <div className="w-60 shrink-0 border-r border-border-primary bg-bg-primary">
          <div className="sticky top-[65px] max-h-[calc(100vh-65px)] overflow-y-auto px-2 pt-2 pb-4">
            {sidebar}
          </div>
        </div>
        {/* メインコンテンツ: バナー + コンテンツ */}
        <main className="flex-1 min-w-0">
          {headerBanner}
          <div className="px-6">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
