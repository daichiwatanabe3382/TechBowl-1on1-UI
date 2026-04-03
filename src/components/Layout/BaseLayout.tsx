import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

type BaseLayoutProps = {
  children: React.ReactNode;
  activeNav?: string;
  ticketCount?: number;
  headerBanner?: React.ReactNode;
};

/** 1カラムレイアウト: ヘッダー固定 + コンテンツエリア全幅 */
export default function BaseLayout({
  children,
  activeNav,
  ticketCount,
  headerBanner,
}: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header activeNav={activeNav} ticketCount={ticketCount} />
      {headerBanner}
      <main className="flex-1 w-full pb-14 lg:pb-0">{children}</main>
      <Footer />
      <BottomNav activeNav={activeNav} />
    </div>
  );
}
