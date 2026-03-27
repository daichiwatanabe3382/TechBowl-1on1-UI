import ActionButton from "@/components/ActionButton";

type DayViews = {
  day: string;
  views: number;
};

const weeklyViews: DayViews[] = [
  { day: "Mon", views: 3 },
  { day: "Tue", views: 5 },
  { day: "Wed", views: 2 },
  { day: "Thu", views: 6 },
  { day: "Fri", views: 4 },
  { day: "Sat", views: 2 },
  { day: "Sun", views: 1 },
];

const maxViews = Math.max(...weeklyViews.map((d) => d.views));

export default function CompanyAttention() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">企業からの注目度</h2>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Profile Views Count */}
        <div className="flex items-end gap-3 mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-text-body">23</span>
            <span className="text-lg font-bold text-text-body">回</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#E6F5EB] rounded-full">
            <span className="text-xs font-bold text-[#00B86F]">+5</span>
            <span className="text-xs text-[#00B86F]">先週比</span>
          </div>
        </div>

        <p className="text-xs text-text-description mb-5">
          この週のプロフィールビュー数
        </p>

        {/* Mini Bar Chart */}
        <div className="flex items-end justify-between gap-2 mb-6 h-20">
          {weeklyViews.map((item) => (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-brand-primary to-[#5B5B7E] rounded-t transition-all"
                  style={{
                    height: `${(item.views / maxViews) * 60}px`,
                  }}
                />
              </div>
              <span className="text-xs font-bold text-text-description">
                {item.day}
              </span>
            </div>
          ))}
        </div>

        {/* Company Save Info */}
        <div className="rounded-lg border border-border-primary bg-bg-secondary p-4 mb-5">
          <p className="text-sm text-text-body">
            <span className="font-bold text-brand-primary">3社</span>
            があなたのプロフィールを保存しました
          </p>
        </div>

        {/* Action Button */}
        <ActionButton href="#" className="w-full justify-center">
          詳細を見る
        </ActionButton>
      </div>
    </section>
  );
}
