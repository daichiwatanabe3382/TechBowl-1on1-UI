import { BaseLayout } from "@/components/Layout";
import {
  FlowStepContainer,
  HomeContentLayout,
  TicketInfo,
  NotificationList,
  ServiceSection,
  EventSection,
  DailyQuestion,
} from "@/components/Home";

export default function Home() {
  return (
    <BaseLayout
      activeNav="マイページ"
      headerBanner={
        <div className="w-full overflow-hidden">
          <img
            src="/image/home/mypage.jpg?v=4"
            alt="あなただけの魅力や差別化要素を発見しよう"
            className="w-full h-[80px] object-cover lg:h-auto lg:object-contain"
          />
        </div>
      }
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <FlowStepContainer />

        <HomeContentLayout
          mainContent={
            <>
              {/* チケット情報 */}
              <TicketInfo />

              {/* お知らせ */}
              <NotificationList />

              {/* 1on1 */}
              <section className="rounded-xl border border-brand-primary bg-white p-5">
                <p className="text-sm text-text-description">1on1（実装予定）</p>
              </section>

              {/* スカウト */}
              <section className="rounded-xl border border-brand-primary bg-white p-5">
                <p className="text-sm text-text-description">スカウト（実装予定）</p>
              </section>

              {/* イベント・キャンペーン */}
              <EventSection />

              {/* 機能・サービス */}
              <ServiceSection />
            </>
          }
          sideContent={
            <>
              {/* 今日の1問 */}
              <DailyQuestion />

              {/* プロフィール完成度 */}
              <section className="rounded-xl border border-brand-primary bg-white p-5">
                <p className="text-sm text-text-description">プロフィール完成度（実装予定）</p>
              </section>

              {/* 企業からの注目度 */}
              <section className="rounded-xl border border-brand-primary bg-white p-5">
                <p className="text-sm text-text-description">企業からの注目度（実装予定）</p>
              </section>
            </>
          }
        />
      </div>
    </BaseLayout>
  );
}
