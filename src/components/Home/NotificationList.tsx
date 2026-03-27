import ActionButton from "@/components/ActionButton";

type Notification = {
  date: string;
  message: string;
  isRead: boolean;
};

const notifications: Notification[] = [
  {
    date: "2026.04.12",
    message:
      "お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文",
    isRead: false,
  },
  {
    date: "2026.04.12",
    message:
      "お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文お知らせ文",
    isRead: false,
  },
  {
    date: "2026.04.13",
    message: "新しい更新がありました。詳細をご確認ください。",
    isRead: false,
  },
  {
    date: "2026.04.14",
    message: "過去のお知らせをアーカイブしました。",
    isRead: false,
  },
  {
    date: "2026.04.15",
    message: "この通知は重要です。必ずお読みください。",
    isRead: false,
  },
];

export default function NotificationList() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">お知らせ</h2>
        <ActionButton href="#">一覧を見る</ActionButton>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white py-2">
        {notifications.map((item, index) => (
          <a
            key={index}
            href="#"
            className="group flex items-start gap-3 px-5 py-1.5 hover:bg-bg-secondary transition-colors"
          >
            {/* Unread dot + badge */}
            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#5B7FFF]" />
              <span className="text-xs font-bold text-[#5B7FFF]">未読</span>
            </div>

            {/* Date */}
            <span className="text-xs text-text-description shrink-0 pt-0.5">
              {item.date}
            </span>

            {/* Message */}
            <span className="text-sm text-text-body truncate group-hover:font-bold group-hover:underline transition-all">
              {item.message}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
