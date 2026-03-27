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
      {headerBanner}
      <div className="flex flex-1">
        <aside className="w-60 shrink-0 border-r border-border-primary bg-bg-primary px-2 py-4 overflow-y-auto">
          {sidebar}
        </aside>
        <main className="flex-1 px-6 overflow-y-auto">
          <div className="max-w-[1440px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
