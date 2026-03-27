import ActionButton from "@/components/ActionButton";
import { CalendarEventIcon } from "@/components/icons";

type Event = {
  id: string;
  category: "キャンペーン" | "イベント";
  title: string;
  dateRange: string;
  description: string;
};

const events: Event[] = [
  {
    id: "1",
    category: "キャンペーン",
    title: "春の新規入会特別キャンペーン",
    dateRange: "2026.04.01 - 2026.04.30",
    description:
      "新規入会者限定で初月50%オフ＆ボーナスチケット3枚プレゼント！",
  },
  {
    id: "2",
    category: "イベント",
    title: "技術トレンド勉強会「Web3の今」",
    dateRange: "2026.04.25 (木) 19:00-20:30",
    description:
      "業界の第一人者によるWeb3の最新動向と実践的な学習方法についてのセミナー。",
  },
];

const categoryColors: Record<Event["category"], { bg: string; text: string }> =
  {
    キャンペーン: { bg: "#FFE4B5", text: "#FF8C00" },
    イベント: { bg: "#ADD8E6", text: "#0066CC" },
  };

export default function EventSection() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">
          イベント・キャンペーン
        </h2>
        <ActionButton href="#">すべて見る</ActionButton>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {events.map((event) => {
          const colors = categoryColors[event.category];
          return (
            <a
              key={event.id}
              href="#"
              className="group rounded-xl border border-brand-primary bg-white p-4 hover:border-opacity-80 hover:shadow-md transition-all"
            >
              {/* Category Tag */}
              <div className="flex items-center gap-2 mb-2">
                <CalendarEventIcon
                  size={14}
                  className="text-text-body opacity-60"
                />
                <span
                  className="inline-flex px-2 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {event.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-text-body mb-2 line-clamp-2 group-hover:underline group-hover:text-brand-primary transition-colors">
                {event.title}
              </h3>

              {/* Date Range */}
              <p className="text-xs text-text-description mb-2">
                {event.dateRange}
              </p>

              {/* Description */}
              <p className="text-xs text-text-body line-clamp-2 mb-3">
                {event.description}
              </p>

              {/* Action Link */}
              <a
                href="#"
                className="inline-flex text-xs font-bold text-brand-primary hover:underline transition-colors"
              >
                参加する →
              </a>
            </a>
          );
        })}
      </div>
    </section>
  );
}
