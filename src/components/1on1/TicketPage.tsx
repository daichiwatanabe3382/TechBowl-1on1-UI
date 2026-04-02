"use client";

import { useState } from "react";

// --- チケット有効期限データ ---
const ticketExpiry = [
  { count: "1枚", expiry: "残り1日" },
  { count: "1枚", expiry: "残り2日" },
  { count: "1枚", expiry: "残り7日" },
  { count: "1枚", expiry: "2025/06/14まで" },
  { count: "15枚", expiry: "2025/07/14まで" },
];

// --- 条件達成アイテム ---
const achievementItems = [
  "初回登録をする",
  "プロフィールの入力を100%にする",
  "運営から届くキャリアアンケートに答える",
  "問題集をクリアする",
  "キャンペーンやイベントの条件をクリアする",
  "1on1での学びを技術記事に書いて発信する",
];

// チケットアイコン
function TicketEmoji() {
  return <img src="/image/1on1/image 121.png" alt="" className="w-8 h-8 shrink-0" />;
}

// チェックアイコン
function CheckCircleIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" />
    </svg>
  );
}

// 矢印アイコン
function ArrowRightIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-white shrink-0">
      <path d="M13.9999 12.0001L8.99988 17.0001L10.4141 18.4143L16.8283 12.0001L10.4141 5.58594L8.99988 7.00015L13.9999 12.0001Z" />
    </svg>
  );
}

// ?アイコン
function QuestionIcon() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" className="text-[#116abf] shrink-0">
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM13 13.3551C14.4457 12.9248 15.5 11.5855 15.5 10C15.5 8.067 13.933 6.5 12 6.5C10.302 6.5 8.8924 7.7068 8.5627 9.3135L10.5186 9.7081C10.6477 9.0677 11.2676 8.5 12 8.5C12.8284 8.5 13.5 9.1716 13.5 10C13.5 10.8284 12.8284 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5V14H13V13.3551Z" />
    </svg>
  );
}

// 下矢印アイコン
function ChevronDownIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className="text-text-description shrink-0">
      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
    </svg>
  );
}

export default function TicketPage() {
  const [couponOpen, setCouponOpen] = useState(false);

  return (
    <div className="max-w-[800px] mx-auto">
      {/* === 現在のチケット数 === */}
      <div className="mt-6 lg:mt-10">
        <div className="border border-[#3d3d5c] rounded-2xl p-4 lg:p-6 flex flex-col gap-3">
          {/* チケット数 */}
          <div>
            <p className="text-sm font-bold text-[#3d3d5c]">現在のチケット数</p>
            <div className="flex items-end gap-1">
              <span className="text-[32px] font-bold leading-tight text-[#3d3d5c]">4</span>
              <span className="text-base font-bold text-[#3d3d5c] leading-[1.75]">枚</span>
            </div>
          </div>

          {/* 有効期限 */}
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex flex-col gap-4 text-text-description">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold leading-tight">有効期限</p>
              <p className="text-xs leading-relaxed">
                チケットの有効期限は180日です。期限の近いものから消費されます。
              </p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              {ticketExpiry.map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-10 shrink-0">{item.count}</span>
                  <span className="flex-1">{item.expiry}</span>
                </div>
              ))}
            </div>
          </div>

          {/* チケットとは */}
          <div className="flex justify-end">
            <a href="#" className="flex items-center gap-1 text-xs text-[#116abf] underline">
              <QuestionIcon />
              チケットとは
            </a>
          </div>
        </div>
      </div>

      {/* === 条件を達成してチケットを増やす === */}
      <div className="pt-6 lg:pt-10">
        <h2 className="text-2xl font-bold text-text-body leading-tight">条件を達成してチケットを増やす</h2>
        <p className="text-sm text-text-description leading-[1.75] mt-1">
          用意された方法を行って、チケットをゲットしよう！
        </p>
      </div>

      <div className="pt-3">
        <div className="border border-[#3d3d5c] rounded-2xl px-4 py-3 lg:px-6 lg:py-4 flex flex-col items-center">
          {achievementItems.map((label, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-2 py-3 w-full border-b border-border-primary last:border-b-0"
            >
              <TicketEmoji />
              <p className="flex-1 text-base font-bold text-text-body leading-[1.75] min-w-0">
                {label}
              </p>
              <button className="flex items-center gap-1 bg-[#232334] text-white text-sm font-bold px-4 py-2.5 rounded-full shrink-0 hover:bg-[#3d3d5c] transition-colors">
                チケットを1枚獲得する
                <ArrowRightIcon />
              </button>
            </div>
          ))}
          {/* キャラクター画像 */}
          <div className="py-4">
            <img src="/image/1on1/image 122.png" alt="" className="w-[150px] h-[150px] object-cover" />
          </div>
        </div>
      </div>

      {/* === チケットを購入して増やす === */}
      <div className="pt-6 lg:pt-10">
        <h2 className="text-2xl font-bold text-text-body leading-tight">チケットを購入して増やす</h2>
        <p className="text-sm text-text-description leading-[1.75] mt-1">
          1回のセッション(30分)につき、1枚のチケットが必要です。
        </p>
      </div>

      <div className="pt-3 pb-16">
        <div className="border border-[#3d3d5c] rounded-2xl p-4 lg:p-6 flex flex-col gap-6">
          {/* 購入する枚数 */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-text-body leading-[1.75]">購入する枚数</p>
            <div className="border border-[#e5e7eb] rounded-md p-4 flex items-center gap-4">
              {/* Radio button */}
              <div className="w-6 h-6 rounded-full border-2 border-border-primary bg-white shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold text-text-body leading-[1.75]">1枚</p>
                    <span className="inline-flex items-center px-2 py-1 bg-[#ffeeb4] text-[#b48c00] text-xs font-medium rounded leading-tight w-fit">
                      お得なクーポン付き
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <p className="text-base font-bold text-[#147adb] leading-[1.75]">¥5,500</p>
                    <p className="text-sm text-[#6b7280] leading-tight">税込</p>
                  </div>
                </div>
                <p className="text-sm text-text-description leading-tight mt-0.5">
                  有効期限：購入から180日間
                </p>
              </div>
            </div>
          </div>

          {/* お支払い方法 */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-text-body leading-[1.75]">お支払い方法</p>
            <div className="border border-border-primary rounded p-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-[#1a1f71] text-white text-[10px] font-bold rounded-sm">VISA</span>
                <span className="px-1.5 py-0.5 bg-[#eb001b] text-white text-[10px] font-bold rounded-sm">
                  <span className="text-[#f79e1b]">●</span>●
                </span>
                <span className="px-1.5 py-0.5 bg-[#0e4c96] text-white text-[10px] font-bold rounded-sm">JCB</span>
                <span className="px-1.5 py-0.5 bg-[#006fcf] text-white text-[10px] font-bold rounded-sm tracking-tight">≡</span>
              </div>
              <p className="text-sm text-text-body">クレジットカードのみ</p>
            </div>

            {/* カード番号 */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-text-description leading-tight">カード番号</label>
              <input
                type="text"
                placeholder="カード番号"
                className="w-full bg-[#f9f9f9] border border-border-primary rounded-md px-4 py-2 text-base text-text-body placeholder:text-[#bcc4d3] leading-[1.75] outline-none focus:border-[#116abf] transition-colors"
              />
            </div>

            {/* 有効期限 + セキュリティコード */}
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm text-text-description leading-tight">有効期限</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full h-11 bg-[#f9f9f9] border border-border-primary rounded-md px-4 text-base text-text-body placeholder:text-[#bcc4d3] leading-[1.75] outline-none focus:border-[#116abf] transition-colors"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm text-text-description leading-tight">セキュリティコード</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full h-11 bg-[#f9f9f9] border border-border-primary rounded-md px-4 text-base text-text-body placeholder:text-[#bcc4d3] leading-[1.75] outline-none focus:border-[#116abf] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* クーポンを利用する */}
          <button
            onClick={() => setCouponOpen(!couponOpen)}
            className="flex items-center gap-2 w-full py-2 px-2 border-b border-border-primary text-sm text-text-description"
          >
            <span className="flex-1 text-left">クーポンを利用する</span>
            <ChevronDownIcon />
          </button>

          {/* 注文内容 */}
          <div className="border border-border-primary rounded-md p-5 flex flex-col gap-2">
            <p className="text-base font-bold text-text-body leading-[1.75]">注文内容</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-body leading-[1.75]">1on1チケット</span>
                <span className="text-lg font-bold text-text-body leading-tight">¥6,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-body leading-[1.75]">クーポン割引</span>
                <span className="text-lg font-bold text-[#63c178] leading-tight">-¥1,000</span>
              </div>
              <hr className="border-border-primary" />
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-text-body leading-[1.75]">合計</span>
                <span className="text-lg font-bold text-text-body leading-tight">¥5,000</span>
              </div>
            </div>
          </div>

          {/* 決済ボタン */}
          <button className="w-full h-10 bg-[#147adb] text-white font-bold text-base rounded-md flex items-center justify-center gap-1 hover:bg-[#1068c0] transition-colors">
            <CheckCircleIcon />
            決済に進む
          </button>

          {/* 注意書き */}
          <div className="text-xs text-text-description leading-tight">
            <p>&quot;決済に進む&quot;ボタンをクリックすることで、利用規約に同意したことになります。</p>
            <p>すべての決済はSSL暗号化され、保護されています。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
