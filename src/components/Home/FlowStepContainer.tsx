import ActionButton from "@/components/ActionButton";

type FlowStep = {
  image: string;
  title: string;
  description: string;
  borderColor: string;
};

const flowSteps: FlowStep[] = [
  {
    image: "/image/home/Flow step image.png",
    title: "メンターと1on1で話そう",
    description:
      "経験豊富なメンターと30分の1on1。対話を通して、あなたの技術的な強みを引き出します。",
    borderColor: "#F67A8C",
  },
  {
    image: "/image/home/Flow step image-1.png",
    title: "強みを可視化しよう",
    description:
      "1on1で見つかった強みがプロフィールに蓄積。回数を重ねるほど、あなたの実力が明確になります。",
    borderColor: "#4FB18B",
  },
  {
    image: "/image/home/Flow step image-2.png",
    title: "企業からスカウトが届く",
    description:
      "可視化されたプロフィールを企業が閲覧。あなたに合ったスカウトが届きます。",
    borderColor: "#5AA6D9",
  },
];

export default function FlowStepContainer() {
  return (
    <section className="mx-4 mt-10">
      <div className="rounded-2xl border-2 border-brand-primary bg-white p-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <img
              src="/image/home/puru-image.png"
              alt=""
              className="w-9 h-8 object-contain"
            />
            <h2 className="text-xl font-bold text-text-body">
              TechTrainへようこそ
            </h2>
            <img
              src="/image/home/riku-image.png"
              alt=""
              className="w-7 h-6 object-contain"
            />
          </div>
          <p className="text-xs text-text-description text-center">
            経験豊富なメンターとの30分の1on1で、あなたの思考を言語化し、市場価値を最大化する新しいキャリア支援サービスです
          </p>
        </div>

        {/* Flow Steps */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {flowSteps.map((step) => (
            <div key={step.title} className="flex gap-3 items-start min-w-0">
              <img
                src={step.image}
                alt={step.title}
                className="w-2/5 aspect-[208/120] rounded-lg object-cover shrink-0 border-2"
                style={{ borderColor: step.borderColor }}
              />
              <div className="flex flex-col gap-1 pt-1 min-w-0">
                <h3 className="text-sm font-bold text-text-body">
                  {step.title}
                </h3>
                <p className="text-xs text-text-description leading-[1.5]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <ActionButton href="#">使い方ガイド</ActionButton>
        </div>
      </div>
    </section>
  );
}
