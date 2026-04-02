import { BaseLayout } from "@/components/Layout";

export default function LearnPage() {
  return (
    <BaseLayout activeNav="学ぶ">
      <div className="w-full max-w-[1440px] px-6 py-8">
        <h1 className="text-2xl font-bold text-text-body">学ぶ</h1>
        <p className="text-sm text-text-description mt-2">実装予定</p>
      </div>
    </BaseLayout>
  );
}
