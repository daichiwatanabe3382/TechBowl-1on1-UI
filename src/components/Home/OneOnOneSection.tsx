import ActionButton from "@/components/ActionButton";
import { ChatIcon, StarIcon } from "@/components/icons";

type Mentor = {
  id: string;
  name: string;
  avatarColor: string;
  specialty: string[];
  rating: number;
};

type Reservation = {
  date: string;
  time: string;
  mentor: Mentor;
  topic: string;
  status: "確定" | "変更" | "キャンセル待ち";
};

const nextReservation: Reservation = {
  date: "2026.04.20",
  time: "19:00 - 19:30",
  mentor: {
    id: "1",
    name: "田中太郎",
    avatarColor: "#FF6B6B",
    specialty: ["React", "TypeScript"],
    rating: 4.8,
  },
  topic: "Reactでのパフォーマンス最適化について",
  status: "確定",
};

const recommendedMentors: Mentor[] = [
  {
    id: "2",
    name: "佐藤花子",
    avatarColor: "#4ECDC4",
    specialty: ["Vue.js", "CSS"],
    rating: 4.9,
  },
  {
    id: "3",
    name: "鈴木健一",
    avatarColor: "#FFD93D",
    specialty: ["Node.js", "PostgreSQL"],
    rating: 4.7,
  },
];

export default function OneOnOneSection() {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-text-body">1on1</h2>
        <ActionButton href="#">予約する</ActionButton>
      </div>

      {/* Card */}
      <div className="rounded-xl border border-brand-primary bg-white p-5">
        {/* Next Reservation */}
        <div className="mb-6 pb-6 border-b border-border-primary">
          <h3 className="text-xs text-text-description mb-3">次回の予約</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                {/* Mentor Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: nextReservation.mentor.avatarColor }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-text-body">
                    {nextReservation.mentor.name}
                  </p>
                  <p className="text-xs text-text-description">
                    {nextReservation.date} {nextReservation.time}
                  </p>
                </div>
              </div>
              {/* Status Badge */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#D4EDDA] text-[#155724] text-xs font-bold ml-2 flex-shrink-0">
                {nextReservation.status}
              </span>
            </div>
            <p className="text-sm text-text-body">{nextReservation.topic}</p>
          </div>
        </div>

        {/* Recommended Mentors */}
        <div>
          <h3 className="text-xs text-text-description mb-3">おすすめメンター</h3>
          <div className="grid grid-cols-2 gap-3">
            {recommendedMentors.map((mentor) => (
              <a
                key={mentor.id}
                href="#"
                className="group p-3 rounded-lg border border-border-primary hover:border-brand-primary bg-bg-secondary hover:bg-white transition-colors"
              >
                {/* Mentor Avatar */}
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: mentor.avatarColor }}
                  />
                </div>

                {/* Mentor Name */}
                <p className="text-sm font-bold text-text-body text-center mb-1.5 group-hover:underline">
                  {mentor.name}
                </p>

                {/* Specialty Tags */}
                <div className="flex flex-wrap gap-1 mb-2 justify-center">
                  {mentor.specialty.map((spec) => (
                    <span
                      key={spec}
                      className="inline-block px-2 py-0.5 text-xs bg-brand-primary text-white rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs font-bold text-text-body">
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-[#FFB800]">★</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
