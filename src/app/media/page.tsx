import { BaseLayout } from "@/components/Layout";

export default function MediaPage() {
  return (
    <BaseLayout activeNav="メディア">
      <div className="w-full max-w-[1440px] mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-text-body">メディア</h1>
        <p className="text-sm text-text-description mt-2">実装予定</p>
      </div>
    </BaseLayout>
  );
}
