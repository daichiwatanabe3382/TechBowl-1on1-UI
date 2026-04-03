import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

type TwoColumnLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  activeNav?: string;
  ticketCount?: number;
  headerBanner?: React.ReactNode;
  mobileTabs?: React.ReactNode;
};

/** 2カラムレイアウト: ヘッダー固定 + サイドバー(240px) + メインコンテンツ */
export default function TwoColumnLayout({
  sidebar,
  children,
  activeNav,
  ticketCount,
  headerBanner,
  mobileTabs,
}: TwoColumnLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeNav={activeNav} ticketCount={ticketCount} />
      <div className="flex flex-1">
        {/* サイドバー: デスクトップのみ表示 */}
        <div className="hidden lg:block w-60 shrink-0 border-r border-border-primary bg-bg-primary">
          <div className="sticky top-[65px] max-h-[calc(100vh-65px)] overflow-y-auto px-2 pt-2 pb-4">
            {sidebar}
          </div>
        </div>
        {/* メインコンテンツ: バナー + モバイルタブ + コンテンツ + フッター */}
        <main className="flex-1 min-w-0 flex flex-col pb-14 lg:pb-0">
          {headerBanner}
          {mobileTabs && (
            <div className="lg:hidden sticky top-[61px] z-30">{mobileTabs}</div>
          )}
          <div className="px-3 lg:px-6 flex-1">
            <div className="max-w-[1440px] mx-auto">{children}</div>
          </div>
          <Footer />
        </main>
      </div>
      <BottomNav activeNav={activeNav} />
    </div>
  );
}
