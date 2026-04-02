import { ArrowRightIcon } from "@/components/icons";

export default function EventSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">
          イベント・キャンペーン
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-1 bg-[#3d3d5c] text-white text-xs font-medium rounded-full px-3 py-2"
        >
          一覧を見る
          <ArrowRightIcon size={14} />
        </a>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="shrink-0 w-[70%] lg:w-auto aspect-video rounded-lg bg-[#e8e5f0] flex items-center justify-center"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#c4c0d0]"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M3 16l5-5 4 4 3-3 6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
