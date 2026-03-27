import { ReactNode } from "react";

type HomeContentLayoutProps = {
  mainContent?: ReactNode;
  sideContent?: ReactNode;
};

/**
 * HOME画面のFlowStepContainer下の2カラムレイアウト
 * - 左（メイン）: チケット情報、お知らせ、1on1、スカウト etc.
 * - 右（サイドバー）: 今日の1問、プロフィール完成度、企業からの注目度
 */
export default function HomeContentLayout({
  mainContent,
  sideContent,
}: HomeContentLayoutProps) {
  return (
    <div className="mx-4 mt-6 flex gap-6">
      {/* Main Column */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">{mainContent}</div>

      {/* Sidebar */}
      <div className="w-[320px] shrink-0 flex flex-col gap-6">{sideContent}</div>
    </div>
  );
}
