import ActionButton from "@/components/ActionButton";

type CompletionItem = {
  label: string;
  completed: boolean;
};

const completionItems: CompletionItem[] = [
  { label: "基本情報", completed: true },
  { label: "スキル", completed: true },
  { label: "自己PR", completed: true },
  { label: "ポートフォリオ", completed: false },
  { label: "希望条件", completed: false },
];

export default function ProfileCompletion() {
  const completedCount = completionItems.filter((item) => item.completed).length;
  const completionPercentage = Math.round(
    (completedCount / completionItems.length) * 100
  );

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">プロフィール完成度</h2>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E9E9F5"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3D3D5C"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - completionPercentage / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="transition-all duration-300"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-text-body">
                {completionPercentage}%
              </span>
              <span className="text-xs text-text-description">完成度</span>
            </div>
          </div>
        </div>

        {/* Completion Items */}
        <div className="space-y-2.5">
          {completionItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-colors ${
                item.completed ? "bg-bg-secondary" : "bg-bg-secondary"
              }`}
            >
              <div
                className={`flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center ${
                  item.completed
                    ? "bg-[#00B86F] border-[#00B86F]"
                    : "border-border-secondary"
                }`}
              >
                {item.completed && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 15.172L19.192 5.98l1.415 1.414L10 18l-7.07-7.07 1.415-1.415z" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  item.completed ? "text-text-body" : "text-text-description"
                }`}
              >
                {item.label}
              </span>
              {item.completed && (
                <span className="ml-auto text-xs font-bold text-[#00B86F]">
                  完了
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <ActionButton href="#" className="w-full justify-center">
            プロフィールを編集
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
