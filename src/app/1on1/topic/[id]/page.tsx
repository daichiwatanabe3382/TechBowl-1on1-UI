"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { TwoColumnLayout } from "@/components/Layout";
import SidebarButton from "@/components/SidebarButton";
import {
  CalendarEventIcon,
  ListUnorderedIcon,
  ShareForwardIcon,
  CouponLineIcon,
  TicketIcon,
} from "@/components/icons";
import {
  allContents,
  categoryColors,
  formatDate,
} from "@/components/1on1/TopicList";

const sidebarItems = [
  { id: "reserve", label: "1on1を予約", defaultIcon: <CalendarEventIcon size={18} filled={false} />, activeIcon: <CalendarEventIcon size={18} filled={true} /> },
  { id: "manage", label: "1on1管理", defaultIcon: <ListUnorderedIcon size={18} />, activeIcon: <ListUnorderedIcon size={18} /> },
  { id: "feedback", label: "フィードバック一覧", defaultIcon: <ShareForwardIcon size={18} filled={false} />, activeIcon: <ShareForwardIcon size={18} filled={true} /> },
  { id: "ticket", label: "チケットを増やす", defaultIcon: <CouponLineIcon size={18} />, activeIcon: <TicketIcon size={18} /> },
];

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = params.id as string;
  const topic = allContents.find((c) => c.id === topicId);

  if (!topic) {
    return (
      <TwoColumnLayout
        activeNav="1on1"

        headerBanner={
          <div className="w-full overflow-hidden">
            <img
              src="/image/1on1/1on1.png"
              alt="1on1"
              className="w-full h-[80px] object-cover lg:h-auto lg:object-contain"
            />
          </div>
        }
        sidebar={sidebarItems.map((item) => (
          <SidebarButton key={item.id} icon={item.id === "reserve" ? item.activeIcon : item.defaultIcon} label={item.label} isActive={item.id === "reserve"} />
        ))}
      >
        <div className="py-12 text-center">
          <p className="text-text-description">トピックが見つかりませんでした</p>
          <a href="/1on1" className="text-brand-primary text-sm mt-4 inline-block hover:underline">← 1on1トップに戻る</a>
        </div>
      </TwoColumnLayout>
    );
  }

  const catColor = categoryColors[topic.category ?? ""] ?? "bg-gray-50 text-gray-600";

  return (
    <TwoColumnLayout
      activeNav="1on1"

      headerBanner={
        <div className="w-full overflow-hidden">
          <img
            src="/image/1on1/1on1.png"
            alt="1on1"
            className="w-full h-[80px] object-cover lg:h-auto lg:object-contain"
          />
        </div>
      }
      sidebar={sidebarItems.map((item) => (
        <SidebarButton key={item.id} icon={item.id === "reserve" ? item.activeIcon : item.defaultIcon} label={item.label} isActive={item.id === "reserve"} />
      ))}
    >
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-description mb-4 flex-wrap">
          <a href="/1on1" className="hover:text-brand-primary transition-colors">1on1を予約</a>
          <span>/</span>
          <a href="/1on1" className="hover:text-brand-primary transition-colors">トピックから予約</a>
          {topic.category && (
            <>
              <span>/</span>
              <span className="text-text-body font-medium">{topic.category}</span>
            </>
          )}
        </nav>

        {/* Large Thumbnail */}
        <div className="relative aspect-[16/9] bg-bg-quaternary rounded-xl overflow-hidden">
          {topic.thumbnail.startsWith("/image/placeholder") ? (
            <div className="w-full h-full flex items-center justify-center">
              <svg width={48} height={48} viewBox="0 0 24 24" fill="none" className="text-text-description">
                <path d="M5 21V3h14v18l-7-3-7 3Z" stroke="currentColor" strokeWidth={1.5} />
              </svg>
            </div>
          ) : (
            <Image
              src={topic.thumbnail}
              alt={topic.title}
              fill
              className="object-cover"
            />
          )}
        </div>

        {/* Title + Metadata */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            {topic.category && (
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${catColor}`}>
                {topic.category}
              </span>
            )}
            {topic.updatedAt && (
              <span className="text-xs text-text-description">{formatDate(topic.updatedAt)}</span>
            )}
            <span className="text-xs text-text-secondary bg-bg-quaternary px-2 py-0.5 rounded">
              {topic.source}
            </span>
          </div>
          <h1 className="text-xl font-bold text-text-body mt-2 whitespace-pre-line leading-snug">
            {topic.title}
          </h1>
        </div>

        {/* Source Link */}
        {topic.sourceUrl && (
          <a
            href={topic.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-sm text-brand-primary hover:underline"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z" />
            </svg>
            元の記事を読む
          </a>
        )}

        {/* AI Summary */}
        {topic.summary && (
          <section className="mt-6 p-4 lg:p-5 bg-bg-secondary rounded-xl border border-border-primary">
            <h2 className="text-base font-bold text-text-body mb-2 flex items-center gap-2">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="text-brand-primary">
                <path d="M14 4.4375C15.3462 4.4375 16.4375 3.34619 16.4375 2H17.5625C17.5625 3.34619 18.6538 4.4375 20 4.4375V5.5625C18.6538 5.5625 17.5625 6.65381 17.5625 8H16.4375C16.4375 6.65381 15.3462 5.5625 14 5.5625V4.4375ZM1 11C4.31371 11 7 8.31371 7 5H9C9 8.31371 11.6863 11 15 11V13C11.6863 13 9 15.6863 9 19H7C7 15.6863 4.31371 13 1 13V11ZM17.5 14C17.5 15.7949 16.2949 17.2718 14.6389 17.6376L14.5 18C14.5 19.3462 15.6538 20.4375 17 20.4375V21.5625C15.6538 21.5625 14.5 22.6538 14.5 24H13.5C13.5 22.6538 12.3462 21.5625 11 21.5625V20.4375C12.3462 20.4375 13.5 19.3462 13.5 18L13.3611 17.6376C11.7051 17.2718 10.5 15.7949 10.5 14H12.5C12.5 15.1046 13.3954 16 14.5 16C15.6046 16 16.5 15.1046 16.5 14H17.5Z" />
              </svg>
              AI要約
            </h2>
            <p className="text-sm text-text-body leading-relaxed">{topic.summary}</p>
          </section>
        )}

        {/* Discussion Questions */}
        {topic.topics.length > 0 && (
          <section className="mt-6">
            <h2 className="text-base font-bold text-text-body mb-3">こんなことを聞いてみよう</h2>
            <div className="flex flex-wrap gap-2">
              {topic.topics.map((q) => (
                <span
                  key={q}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-brand-primary bg-[#E9E9F5] rounded-full leading-tight border border-transparent hover:border-brand-primary hover:bg-[#DDDDF0] transition-colors cursor-pointer"
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
                  </svg>
                  {q}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Mentor Info */}
        <section className="mt-6 mb-16 p-4 lg:p-5 rounded-xl border border-border-primary">
          <h2 className="text-base font-bold text-text-body mb-3">トピックを作成したメンター</h2>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-bg-quaternary flex-shrink-0">
              <Image
                src={topic.mentorAvatar}
                alt={topic.mentorName}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-body truncate">{topic.mentorName}</p>
              <span className="text-xs text-green-600 font-medium">予約受付中</span>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href="/1on1/mentor/demo"
              className="w-full text-center py-2.5 text-sm font-bold text-white bg-brand-primary rounded-full hover:opacity-90 transition-opacity block"
            >
              このメンターに聞く →
            </a>
            <a
              href="/1on1/mentor/demo"
              className="w-full text-center py-2 text-sm font-bold text-brand-primary border border-brand-primary rounded-full hover:bg-brand-primary/5 transition-colors block"
            >
              メンター詳細を見る
            </a>
          </div>
        </section>
      </div>
    </TwoColumnLayout>
  );
}
