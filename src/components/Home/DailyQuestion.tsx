"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

type QuestionState = "question" | "selected" | "win" | "lose";

const question = {
  text: "エンジニアとしてキャリアを積むなら、技術の深さと幅広さどちらを重視する？",
  choices: [
    { id: 1, label: "一つの技術を極めてスペシャリストになる", avatar: "/image/home/puru-image.png", activeAvatar: "/image/character/puru/TypeA_front-gao-.png" },
    { id: 2, label: "幅広い技術を学んでジェネラリストになる", avatar: "/image/home/riku-image.png", activeAvatar: "/image/character/riku/TypeA-Wink.png" },
  ],
};

export default function DailyQuestion() {
  const [state, setState] = useState<QuestionState>("question");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
    setState("selected");
  };

  const handleSubmit = () => {
    // ランダムで当たり/はずれを決定（デモ用）
    const isWin = Math.random() > 0.5;
    setState(isWin ? "win" : "lose");
  };

  const handleReset = () => {
    setState("question");
    setSelectedId(null);
  };

  return (
    <section className="rounded-xl border border-brand-primary bg-white overflow-hidden">
      {/* Header */}
      <div className="text-center pt-5 px-5">
        <h2 className="text-lg font-bold text-text-body">今日の1問</h2>
        <p className="text-xs text-text-description mt-0.5">
          毎日答えてチケットを当てよう
        </p>
      </div>

      {/* Question State */}
      {(state === "question" || state === "selected") && (
        <div className="px-5 pb-5 pt-3">
          {/* Question */}
          <div className="text-center mb-4">
            <span className="text-sm font-bold text-brand-primary">Q.</span>
            <h3 className="text-base font-bold text-text-body mt-1">
              {question.text}
            </h3>
          </div>

          {/* Choices */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {question.choices.map((choice) => {
              const isSelected = selectedId === choice.id;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelect(choice.id)}
                  className={`relative flex flex-col items-center rounded-xl p-4 pt-3 transition-all cursor-pointer border-2 ${
                    isSelected
                      ? choice.id === 1
                        ? "border-brand-primary bg-[#F5E066]"
                        : "border-brand-primary bg-[#8EC8DE]"
                      : choice.id === 1
                        ? "border-[#F9E88D] bg-[#FFF9DB] hover:border-brand-primary"
                        : "border-[#A8D8EA] bg-[#E3F4FA] hover:border-brand-primary"
                  }`}
                >
                  <span className="text-sm font-bold text-text-body mb-2 flex-1 flex items-center text-center">
                    {choice.label}
                  </span>
                  <img
                    src={isSelected ? choice.activeAvatar : choice.avatar}
                    alt=""
                    className={`object-contain mt-auto ${choice.id === 1 ? "w-10 h-9" : "w-7 h-6"}`}
                  />
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
                        <path d="M9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={state !== "selected"}
              className={`inline-flex items-center gap-1 text-xs font-medium rounded-full px-4 py-2 transition-colors ${
                state === "selected"
                  ? "bg-[#3d3d5c] text-white cursor-pointer hover:bg-[#2d2d4c]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              答えを送る
              <ArrowRightIcon size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Win State */}
      {state === "win" && (
        <div className="px-5 pb-5 pt-4 text-center">
          <div className="mb-3">
            <img
              src="/image/character/2character/ticket-get.png"
              alt="チケット獲得"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>
          <h3 className="text-lg font-bold text-text-body mb-1">
            おめでとう！
          </h3>
          <p className="text-sm text-text-body mb-1">
            チケット <span className="font-bold text-brand-primary text-lg">1枚</span> 獲得！
          </p>
          <p className="text-xs text-text-description mb-4">
            回答ありがとうございました。結果を運営に報告してチケットを受け取ろう！
          </p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1 bg-brand-primary text-white text-sm font-bold rounded-full px-5 py-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            >
              チケットを受け取る
              <ArrowRightIcon size={14} />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-text-description hover:text-text-body transition-colors cursor-pointer"
            >
              もう一度やる（デモ）
            </button>
          </div>
        </div>
      )}

      {/* Lose State */}
      {state === "lose" && (
        <div className="px-5 pb-5 pt-4 text-center">
          <div className="mb-3">
            <img
              src="/image/character/2character/apologize.png"
              alt="残念"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>
          <h3 className="text-base font-bold text-text-body mb-1">
            残念…！今日はハズレ
          </h3>
          <p className="text-xs text-text-description mb-1">
            回答ありがとうございました！
          </p>
          <p className="text-xs text-text-description mb-4">
            明日もチャレンジしてチケットを<br />ゲットしよう！
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-text-description hover:text-text-body transition-colors cursor-pointer"
          >
            もう一度やる（デモ）
          </button>
        </div>
      )}
    </section>
  );
}
