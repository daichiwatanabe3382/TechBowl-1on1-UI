import ActionButton from "@/components/ActionButton";
import { CodeIcon } from "@/components/icons";

export default function DailyQuestion() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">今日の1問</h2>
        <ActionButton href="#">挑戦する</ActionButton>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Question Card */}
        <div className="rounded-lg border border-border-primary bg-bg-secondary p-4 mb-4">
          {/* Header with category and difficulty */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <CodeIcon size={14} className="text-brand-primary" />
                <span className="text-xs font-bold text-white bg-brand-primary px-2.5 py-1 rounded-full">
                  JavaScript
                </span>
              </div>
            </div>
            {/* Difficulty stars */}
            <div className="flex gap-0.5">
              <span className="text-sm text-[#FFA500]">★</span>
              <span className="text-sm text-[#FFA500]">★</span>
              <span className="text-sm text-text-description">★</span>
            </div>
          </div>

          {/* Question title */}
          <h3 className="text-sm font-bold text-text-body mb-2">
            配列の要素を効率的にフィルタリングする方法
          </h3>

          {/* Question description */}
          <p className="text-xs text-text-description leading-relaxed">
            JavaScriptで配列から条件に合致する要素のみを抽出するメソッドは何でしょう？
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1">
            <div className="bg-border-primary rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-primary h-full transition-all"
                style={{ width: "40%" }}
              />
            </div>
          </div>
        </div>

        {/* Progress text */}
        <p className="text-xs text-text-description">
          今月の回答数: <span className="font-bold text-text-body">12</span>/30
        </p>
      </div>
    </section>
  );
}
