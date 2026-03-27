import ActionButton from "@/components/ActionButton";
import { BriefcaseIcon } from "@/components/icons";

type ScoutMessage = {
  id: string;
  companyName: string;
  message: string;
  date: string;
  isRead: boolean;
};

const scoutMessages: ScoutMessage[] = [
  {
    id: "1",
    companyName: "Tech Solutions Inc.",
    message:
      "あなたのプロフィールを拝見させていただき、弊社でご活躍いただけるのではと思い、ご連絡させていただきました。",
    date: "2026.04.18",
    isRead: false,
  },
  {
    id: "2",
    companyName: "Digital Innovate",
    message:
      "フロントエンド開発者として、あなたの経験やスキルに興味を持っています。ぜひお話ししましょう。",
    date: "2026.04.17",
    isRead: false,
  },
  {
    id: "3",
    companyName: "Cloud Systems Corp",
    message: "当社の新規プロジェクトでご協力いただける方を探しています。",
    date: "2026.04.15",
    isRead: true,
  },
];

export default function ScoutSection() {
  const unreadCount = scoutMessages.filter((m) => !m.isRead).length;

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">スカウト</h2>
        <ActionButton href="#">一覧を見る</ActionButton>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Unread Summary */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border-primary">
          <BriefcaseIcon size={16} className="text-text-body" />
          <span className="text-sm font-bold text-text-body">
            未読スカウト
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#5B7FFF] text-white text-xs font-bold">
            {unreadCount}件
          </span>
        </div>

        {/* Scout Messages List */}
        <div className="space-y-3">
          {scoutMessages.map((scout) => (
            <a
              key={scout.id}
              href="#"
              className="group block p-3 rounded-lg border border-border-primary hover:border-brand-primary hover:bg-bg-secondary transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-text-body group-hover:text-brand-primary transition-colors">
                      {scout.companyName}
                    </p>
                    {!scout.isRead && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[#5B7FFF] text-white text-xs font-bold flex-shrink-0">
                        未読
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-description line-clamp-2">
                    {scout.message}
                  </p>
                </div>
              </div>
              <p className="text-xs text-text-description">{scout.date}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
