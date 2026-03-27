import { BaseLayout } from "@/components/Layout";

export default function ScoutPage() {
  return (
    <BaseLayout
      activeNav="スカウト"
      headerBanner={
        <div className="w-full h-[140px] overflow-hidden">
          <img
            src="/image/scout/scout.png"
            alt="思考が伝えて、興味のある企業と話そう"
            className="w-full h-full object-cover"
          />
        </div>
      }
    >
      <div className="w-full max-w-[1440px] px-6 py-8">
        <h1 className="text-2xl font-bold text-text-body mb-6">スカウト</h1>

        <div className="grid gap-6">
          <section className="rounded-xl border border-brand-primary bg-white p-5">
            <p className="text-sm text-text-description">スカウト一覧（実装予定）</p>
          </section>

          <section className="rounded-xl border border-brand-primary bg-white p-5">
            <p className="text-sm text-text-description">企業からのメッセージ（実装予定）</p>
          </section>

          <section className="rounded-xl border border-brand-primary bg-white p-5">
            <p className="text-sm text-text-description">マッチング履歴（実装予定）</p>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
}
