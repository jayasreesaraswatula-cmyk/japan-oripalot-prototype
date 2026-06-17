"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   COIN WALLET / HISTORY PAGE
   Matches Figma: coin history with filter tabs + balance card
═══════════════════════════════════════════════════════════════ */

type CoinType = "all" | "oripa" | "free";

type TxRow = {
  id: string;
  coin: "oripa" | "free";
  icon: string;
  iconBg: string;
  title: string;
  sub: string;
  amount: number;
  date: string;
};

const TRANSACTIONS: { date: string; rows: TxRow[] }[] = [
  {
    date: "2026年6月17日（今日）",
    rows: [
      { id: "t1", coin: "oripa", icon: "🛒", iconBg: "#FFE8EC", title: "スペシャルオファー購入", sub: "Special Offer Purchase · 14:32", amount: 5000, date: "2026年6月17日" },
      { id: "t2", coin: "oripa", icon: "🎴", iconBg: "#EBF4FF", title: "オリパガチャ", sub: "Oripa Gacha Draw · 13:10", amount: -1000, date: "2026年6月17日" },
      { id: "t3", coin: "free",  icon: "🎁", iconBg: "#E8F8EF", title: "1日1回チャンス", sub: "Daily Free Chance · 09:01", amount: 50, date: "2026年6月17日" },
    ],
  },
  {
    date: "2026年6月15日",
    rows: [
      { id: "t4", coin: "oripa", icon: "💳", iconBg: "#FFF3E6", title: "オリパコイン購入", sub: "Oripa Coin Purchase · 11:22", amount: 10000, date: "2026年6月15日" },
    ],
  },
  {
    date: "2026年6月14日",
    rows: [
      { id: "t5", coin: "free", icon: "💎", iconBg: "#F3EEFF", title: "フリーコイン付与", sub: "Free Coin Grant · 20:14", amount: -500, date: "2026年6月14日" },
      { id: "t6", coin: "free", icon: "🎯", iconBg: "#E8F8EF", title: "フリーポイント", sub: "Free Point Award · 18:55", amount: 200, date: "2026年6月14日" },
    ],
  },
  {
    date: "2026年6月10日",
    rows: [
      { id: "t7", coin: "oripa", icon: "🛒", iconBg: "#FFE8EC", title: "スペシャルオファー購入", sub: "Special Offer Purchase · 16:05", amount: 3000, date: "2026年6月10日" },
      { id: "t8", coin: "oripa", icon: "🎴", iconBg: "#EBF4FF", title: "オリパガチャ", sub: "Oripa Gacha Draw ×5 · 15:30", amount: -5000, date: "2026年6月10日" },
    ],
  },
  {
    date: "2026年6月7日",
    rows: [
      { id: "t9",  coin: "free", icon: "🎁", iconBg: "#E8F8EF", title: "1日1回チャンス", sub: "Daily Free Chance · 08:45", amount: 50, date: "2026年6月7日" },
      { id: "t10", coin: "free", icon: "⏰", iconBg: "#F0F0F0", title: "フリーコイン有効期限切れ", sub: "Free Coins Expired · 00:00", amount: -150, date: "2026年6月7日" },
    ],
  },
];

function showToast(msg: string) {
  const existing = document.querySelector(".tw-toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "tw-toast";
  Object.assign(el.style, {
    position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)",
    background: "#333", color: "#fff", borderRadius: "20px", padding: "8px 16px",
    fontSize: "12px", fontWeight: "600", zIndex: "9999", whiteSpace: "nowrap",
  });
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

export default function WalletPage() {
  const [filter, setFilter] = useState<CoinType>("all");

  const tabs: { key: CoinType; label: string }[] = [
    { key: "all",   label: "すべて" },
    { key: "oripa", label: "オリパコイン" },
    { key: "free",  label: "フリーコイン" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      {/* Desktop phone shell */}
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <WalletContent filter={filter} setFilter={setFilter} tabs={tabs} />
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <WalletContent filter={filter} setFilter={setFilter} tabs={tabs} />
      </div>
    </main>
  );
}

function WalletContent({
  filter, setFilter, tabs,
}: {
  filter: CoinType;
  setFilter: (f: CoinType) => void;
  tabs: { key: CoinType; label: string }[];
}) {
  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Top nav */}
      <header className="shrink-0 flex items-center justify-between bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎴</span>
          <span className="text-[15px] font-black text-[#1A1A1A]">オリパロット</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] font-bold">
          <span className="text-[#4A90D9]">💎 10,000</span>
          <span className="text-[#F5A623]">🟡 10,000</span>
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8002D] text-white text-[18px] leading-none">+</button>
        </div>
      </header>

      {/* Back row */}
      <a href="/mypage" className="shrink-0 flex items-center gap-2 bg-white border-b border-[#E0E0E0] px-4 py-3 text-[14px] font-semibold text-[#1A1A1A]">
        <span className="text-[#E8002D]">←</span> コイン履歴 / Coin History
      </a>

      {/* Filter tabs */}
      <div className="shrink-0 flex bg-white border-b border-[#E0E0E0]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className="flex-1 py-3 text-[13px] font-semibold transition"
            style={{
              color: filter === tab.key ? "#E8002D" : "#8a9099",
              borderBottom: filter === tab.key ? "2px solid #E8002D" : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="no-scrollbar flex-1 overflow-y-auto">
        {/* Balance card */}
        <div className="mx-4 mt-4 mb-2 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
          <div className="text-[32px] font-black text-[#F5A623] flex items-center gap-2">🟡 10,000</div>
          <div className="text-[18px] font-bold text-[#4A90D9] mt-1 flex items-center gap-2">💎 10,000</div>
          <div className="flex items-center justify-between gap-2 bg-[#fff0f2] rounded-xl px-3 py-2.5 mt-3">
            <span className="text-[12px] font-semibold text-[#E8002D] leading-snug flex-1">
              ⚠️ コインの有効期限はあと3日です！<br />
              <span className="font-normal text-[11px]">Your coins expire in 3 days!</span>
            </span>
            <button
              onClick={() => showToast("有効期限の詳細を確認しています")}
              className="shrink-0 rounded-full border border-[#E8002D] px-3 py-1 text-[11px] font-bold text-[#E8002D]"
            >
              詳細を確認
            </button>
          </div>
        </div>

        {/* Transactions */}
        {TRANSACTIONS.map((group) => {
          const visibleRows = group.rows.filter(
            (r) => filter === "all" || r.coin === filter
          );
          if (visibleRows.length === 0) return null;
          return (
            <div key={group.date}>
              <div className="px-4 py-2 bg-[#F5F5F5] text-[11px] font-bold text-[#8a9099]">{group.date}</div>
              {visibleRows.map((row) => (
                <div key={row.id} className="flex items-center gap-3 bg-white px-4 py-3.5 border-b border-[#F0F0F0]">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[18px]"
                    style={{ background: row.iconBg }}
                  >
                    {row.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-[#1A1A1A] truncate">{row.title}</div>
                    <div className="text-[11px] text-[#8a9099] mt-0.5">{row.sub}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className="text-[14px] font-bold"
                      style={{ color: row.amount > 0 ? "#27AE60" : "#E8002D" }}
                    >
                      {row.amount > 0 ? "+" : ""}{row.amount.toLocaleString()}
                    </div>
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: row.coin === "oripa" ? "#F5A623" : "#4A90D9" }}
                    >
                      {row.coin === "oripa" ? "🟡 オリパコイン" : "💎 フリーコイン"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {/* Footer */}
        <div className="bg-white border-t border-[#E0E0E0] px-4 py-5 mt-2 text-center pb-24">
          <div className="text-[14px] font-black text-[#E8002D] mb-2">🎴 オリパロット</div>
          <div className="flex justify-center gap-3 flex-wrap mb-2">
            {["利用規約", "プライバシーポリシー", "特定商取引法", "お問い合わせ"].map((l) => (
              <a key={l} href="#" className="text-[11px] text-[#8a9099]">{l}</a>
            ))}
          </div>
          <p className="text-[10px] text-[#bbb] leading-relaxed">
            © 2026 Oripalot Japan. All rights reserved.<br />
            18歳未満の方はご利用いただけません。
          </p>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="shrink-0 flex border-t border-[#E0E0E0] bg-white">
        {[
          { icon: "🎴", label: "オリパ",    href: "/" },
          { icon: "📦", label: "MY LOOT",   href: "/prize-history" },
          { icon: "🎯", label: "クエスト",   href: "#" },
          { icon: "👤", label: "マイページ", href: "/mypage", active: true },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-1 flex-col items-center gap-1 py-2"
            style={{ color: item.active ? "#E8002D" : "#8a9099" }}
          >
            <span className="text-[20px]">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
