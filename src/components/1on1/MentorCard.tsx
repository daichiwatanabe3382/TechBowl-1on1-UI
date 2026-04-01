type Availability = "available" | "few" | "full";

type MentorCardProps = {
  name: string;
  company: string;
  level: "初心者OK" | "Rank3以上";
  englishOk?: boolean;
  skills: string[];
  catchphrase?: string;
  avatarSeed?: string;
  avatarUrl?: string;
  availability?: Availability;
  recentTopics?: string[];
};

/**
 * メンターカード
 * 参考: techtrain.dev/mentors
 */
/** Remix Icon: emotion-laugh-line / emotion-line / emotion-sad-line */
const availabilityConfig: Record<Availability, { label: string; icon: React.ReactNode; colors: string }> = {
  available: {
    label: "空いてる！",
    icon: (
      /* ri-emotion-laugh-line */
      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM7 13H17C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13ZM8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8ZM15.5 8C16.3284 8 17 8.67157 17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8Z" />
      </svg>
    ),
    colors: "text-[#0fba68] bg-[#edfcf3] border-[#b6f2d0]",
  },
  few: {
    label: "まだいける",
    icon: (
      /* ri-emotion-line */
      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM7.00009 14H8.60009C9.24012 15.7659 10.4849 17 12.0001 17C13.5152 17 14.76 15.7659 15.4001 14H17.0001C16.2001 16.8915 14.2963 19 12.0001 19C9.70383 19 7.80009 16.8915 7.00009 14ZM8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8ZM15.5 8C16.3284 8 17 8.67157 17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8Z" />
      </svg>
    ),
    colors: "text-[#e8930c] bg-[#fff8eb] border-[#fde6b0]",
  },
  full: {
    label: "いっぱい",
    icon: (
      /* ri-emotion-sad-line */
      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM7.00009 16C7.80009 13.1085 9.70383 11 12.0001 11C14.2963 11 16.2001 13.1085 17.0001 16H15.4001C14.76 14.2341 13.5152 13 12.0001 13C10.4849 13 9.24012 14.2341 8.60009 16H7.00009ZM8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8ZM15.5 8C16.3284 8 17 8.67157 17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8Z" />
      </svg>
    ),
    colors: "text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]",
  },
};

export default function MentorCard({
  name,
  company,
  level,
  englishOk,
  skills,
  catchphrase,
  avatarSeed,
  avatarUrl,
  availability = "available",
  recentTopics,
}: MentorCardProps) {
  const avail = availabilityConfig[availability];
  return (
    <a
      href="/1on1/mentor/demo"
      className="block p-4 rounded-lg border border-border-primary hover:border-brand-primary hover:bg-bg-secondary transition-colors cursor-pointer"
    >
      {/* Top: Avatar + Name + Availability */}
      <div className="flex items-center gap-3">
        <div className="shrink-0 size-12 rounded-full bg-bg-quaternary overflow-hidden">
          <img
            src={avatarUrl || `https://api.dicebear.com/9.x/thumbs/svg?seed=${avatarSeed || name}`}
            alt={name}
            className="size-full object-cover"
          />
        </div>
        <p className="flex-1 text-sm font-bold text-text-body truncate">{name}</p>
        <span className={`shrink-0 flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full border ${avail.colors}`}>
          {avail.icon}
          {avail.label}
        </span>
      </div>

      {/* Catchphrase (speech bubble under avatar) */}
      {catchphrase && (
        <div className="mt-3 relative">
          <div className="absolute -top-1.5 left-[18px] w-3 h-3 bg-bg-quaternary rotate-45" />
          <div className="px-3 py-2 bg-bg-quaternary rounded-lg relative">
            <p className="text-xs text-brand-primary leading-relaxed">
              {catchphrase}
            </p>
          </div>
        </div>
      )}

      {/* Labels: Company + Level + English */}
      <div className="flex items-center gap-2 mt-2.5 flex-wrap">
        <span className="text-xs text-text-description">{company}</span>
        <span className="flex items-center gap-1 text-xs">
          <span className={`inline-block size-2 rounded-full ${level === "初心者OK" ? "bg-green-500" : "bg-red-500"}`} />
          <span className={level === "初心者OK" ? "text-green-600" : "text-red-500"}>{level}</span>
        </span>
        {englishOk && (
          <span className="flex items-center gap-1 text-xs">
            <span className="inline-block size-2 rounded-full bg-green-500" />
            <span className="text-green-600">English OK</span>
          </span>
        )}
      </div>

      {/* Specialty + Skills */}
      <div className="flex flex-wrap items-center gap-1 mt-2">
        {skills.length > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-brand-primary bg-brand-primary/8 border border-brand-primary/20 rounded-full">
            <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" />
            </svg>
            {skills[0]}
          </span>
        )}
        {skills.slice(1).map((skill) => (
          <span
            key={skill}
            className="inline-block px-1.5 py-0.5 text-[11px] text-text-body bg-bg-quaternary rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Recent consultation topics */}
      {recentTopics && recentTopics.length > 0 && (
        <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-border-primary">
          <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-text-description">
            <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z" />
          </svg>
          <div className="flex flex-wrap gap-1">
            {recentTopics.map((topic) => (
              <span
                key={topic}
                className="inline-block px-2 py-0.5 text-[11px] font-medium text-brand-primary bg-brand-primary/5 rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </a>
  );
}
