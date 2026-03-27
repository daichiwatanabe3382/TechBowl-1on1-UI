import { TwoColumnLayout } from "@/components/Layout";

export default function TwoColumnPage() {
  return (
    <TwoColumnLayout
      activeNav="1on1"
      sidebar={
        <div className="flex flex-1 items-center justify-center text-text-body">
          <p>Menu area</p>
        </div>
      }
    >
      <div className="flex flex-1 items-center justify-center text-text-body">
        <p>Menu area（2カラムレイアウト）</p>
      </div>
    </TwoColumnLayout>
  );
}
