import {
  ChatIcon,
  BriefcaseIcon,
  TerminalBoxIcon,
  ArticleIcon,
  ArrowRightIcon,
} from "@/components/icons";

type Service = {
  icon: React.ReactNode;
  name: string;
  description: string;
  buttonLabel: string;
  href: string;
};

const services: Service[] = [
  {
    icon: <ChatIcon size={20} />,
    name: "1on1",
    description:
      "メンターとのディスカッションで思考力を深めたり、キャリアについてアドバイスを受ける",
    buttonLabel: "予約する",
    href: "/1on1",
  },
  {
    icon: <BriefcaseIcon size={20} />,
    name: "スカウト",
    description:
      "意欲変更やプロフィールを充実させて、企業からのスカウトを受けとる",
    buttonLabel: "確認する",
    href: "/scout",
  },
  {
    icon: <TerminalBoxIcon size={20} />,
    name: "学ぶ",
    description:
      "実務に即した問題集に挑戦して、基礎的なエンジニアリング力を身につける",
    buttonLabel: "挑戦する",
    href: "/learn",
  },
  {
    icon: <ArticleIcon size={20} />,
    name: "メディア",
    description:
      "メンターの経験談や現場でしか得られない知見が集約されている記事を読み知識をつける",
    buttonLabel: "閲覧する",
    href: "/media",
  },
];

export default function ServiceSection() {
  return (
    <section className="mb-16">
      <h2 className="text-base font-bold text-text-body mb-3">
        機能・サービス
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {services.map((service) => (
          <a
            key={service.name}
            href={service.href}
            className="flex flex-col border border-border-secondary rounded bg-white p-4 lg:p-6 hover:shadow-sm transition-shadow"
          >
            <div className="text-text-body mb-2">{service.icon}</div>
            <h3 className="text-base font-bold text-text-body mb-2">
              {service.name}
            </h3>
            <p className="text-xs text-text-description leading-[1.25] mb-3 flex-1">
              {service.description}
            </p>
            <div>
              <span className="inline-flex items-center gap-1 bg-[#3d3d5c] text-white text-xs font-medium rounded-full px-3 py-2">
                {service.buttonLabel}
                <ArrowRightIcon size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
