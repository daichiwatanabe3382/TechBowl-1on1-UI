import { TerminalBoxIcon, ArticleIcon, ChatIcon, ScalesIcon } from "@/components/icons";

type Service = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
};

const services: Service[] = [
  {
    id: "1",
    name: "実践問題集",
    description: "実務レベルの問題でスキルを磨く",
    icon: <TerminalBoxIcon size={24} />,
    iconColor: "#FF6B6B",
  },
  {
    id: "2",
    name: "テックメディア",
    description: "最新技術トレンドの情報配信",
    icon: <ArticleIcon size={24} />,
    iconColor: "#4ECDC4",
  },
  {
    id: "3",
    name: "メンターマッチング",
    description: "専門家との1on1相談サポート",
    icon: <ChatIcon size={24} />,
    iconColor: "#FFD93D",
  },
  {
    id: "4",
    name: "キャリア相談",
    description: "キャリアプランニング支援",
    icon: <ScalesIcon size={24} />,
    iconColor: "#A78BFA",
  },
];

export default function ServiceSection() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">機能・サービス</h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <a
            key={service.id}
            href="#"
            className="group rounded-xl border border-brand-primary bg-white p-4 hover:border-opacity-80 hover:shadow-md transition-all"
          >
            {/* Icon Circle */}
            <div
              className="relative w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-15"
                style={{ backgroundColor: service.iconColor }}
              />
              <div className="relative" style={{ color: service.iconColor }}>
                {service.icon}
              </div>
            </div>

            {/* Service Name */}
            <h3 className="text-sm font-bold text-text-body mb-1 group-hover:text-brand-primary transition-colors">
              {service.name}
            </h3>

            {/* Service Description */}
            <p className="text-xs text-text-description line-clamp-2">
              {service.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
