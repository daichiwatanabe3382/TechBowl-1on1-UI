import ActionButton from "@/components/ActionButton";
import { ArrowRightIcon, TicketIcon } from "@/components/icons";

type ExpiringTicket = {
  date: string;
  count: number;
  daysLeft: number;
};

type TicketMethod = {
  label: string;
  reward: string;
};

const expiringTickets: ExpiringTicket[] = [
  { date: "2026年1月1日", count: 1, daysLeft: 1 },
  { date: "2026年1月7日", count: 2, daysLeft: 7 },
];

const ticketMethods: TicketMethod[] = [
  { label: "プロフィールの入力を100%にする", reward: "+1枚" },
  { label: "問題集をクリアする", reward: "+1枚" },
  { label: "キャンペーンやイベントの条件をクリアする", reward: "+1枚" },
  { label: "1on1での学びを技術記事に書いて発信する", reward: "+1枚" },
];

export default function TicketInfo() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">チケット情報</h2>
        <ActionButton href="#">チケットを増やす</ActionButton>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Current Ticket Count */}
        <p className="text-xs text-text-description mb-1">現在のチケット数</p>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-bold text-text-body">4</span>
          <span className="text-sm text-text-body">枚</span>
        </div>

        {/* Expiring Alert */}
        <div className="rounded-lg border-2 border-[#E8C766] bg-[#F9E88D] p-4 mb-5">
          <p className="text-sm font-bold text-text-body mb-2">
            有効期限が迫っているチケットがあります
          </p>
          <div className="flex flex-col gap-1.5">
            {expiringTickets.map((ticket) => (
              <div
                key={ticket.date}
                className="flex items-center justify-between"
              >
                <p className="text-sm font-bold text-text-body">
                  {ticket.date}まで {ticket.count}枚 (あと{ticket.daysLeft}日)
                </p>
                <ActionButton href="#" size="sm">予約する</ActionButton>
              </div>
            ))}
          </div>
        </div>

        {/* How to earn tickets */}
        <h3 className="text-sm font-bold text-text-body mb-3">
          チケットを増やす方法が {ticketMethods.length + 1} 種類あるよ！
        </h3>
        <div className="flex flex-col">
          {ticketMethods.map((method) => (
            <a
              key={method.label}
              href="#"
              className="group flex items-center justify-between py-2.5 border-b border-border-primary last:border-b-0 hover:border-brand-primary transition-colors"
            >
              <div className="flex items-center gap-2">
                <TicketIcon size={16} className="text-[#E8C766]" />
                <span className="text-sm text-text-body">{method.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-text-body">
                  {method.reward}
                </span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-bg-quaternary group-hover:bg-brand-primary transition-colors">
                  <ArrowRightIcon size={12} className="text-text-description group-hover:text-white transition-colors" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
