import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
      <main className="flex flex-1 justify-center w-full">{children}</main>
      <Footer />
    </div>
  );
}
