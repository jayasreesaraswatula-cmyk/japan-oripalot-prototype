"use client";
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   SPECIAL OFFERS PAGE — countdown timer + 4 offer cards
═══════════════════════════════════════════════════════════════ */

type Offer = { id: string; coins: number; freeCoins: number; price: number; origPrice: number; discount: string; color: string };

const OFFERS: Offer[] = [
  { id: "o1", coins: 6000, freeCoins: 1000, price: 2990, origPrice: 5980, discount: "50%OFF", color: "#E8002D" },
  { id: "o2", coins: 3000, freeCoins: 500,  price: 2090, origPrice: 2990, discount: "30%OFF", color: "#FF6B00" },
  { id: "o3", coins: 5000, freeCoins: 800,  price: 4000, origPrice: 5000, discount: "20%OFF", color: "#7B5EA7" },
  { id: "o4", coins: 10000, freeCoins: 2500, price: 7490, origPrice: 9990, discount: "25%OFF", color: "#0B7EC5" },
];

function useCountdown(targetMs: number) {
  const [remaining, setRemaining] = useState(Math.max(0, targetMs - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, targetMs - Date.now())), 1000);
    return () => clearInterval(id);
  }, [targetMs]);
  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function OffersPage() {
  const [selected, setSelected] = useState<Offer | null>(null);
  const [bought, setBought]     = useState<Set<string>>(new Set());
  // 2 hours from now
  const target = Date.now() + 2 * 60 * 60 * 1000;
  const countdown = useCountdown(target);

  function confirm() {
    if (!selected) return;
    setBought((prev) => new Set([...prev, selected.id]));
    setSelected(null);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <OffersContent offers={OFFERS} countdown={countdown} bought={bought} onSelect={setSelected} />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <OffersContent offers={OFFERS} countdown={countdown} bought={bought} onSelect={setSelected} />
      </div>

      {/* Confirmation sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55" onClick={() => setSelected(null)}>
          <div className="w-full max-w-[480px] rounded-t-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/15" />
            <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4">特別オファー購入確認</h3>
            <div className="flex items-center justify-between bg-[#F5F5F5] rounded-xl px-4 py-3 mb-2">
              <span className="text-[14px] font-semibold">🟡 {selected.coins.toLocaleString()} オリパコイン</span>
              <div className="text-right">
                <div className="text-[11px] text-[#999] line-through">¥{selected.origPrice.toLocaleString()}</div>
                <div className="text-[16px] font-black text-[#E8002D]">¥{selected.price.toLocaleString()}</div>
              </div>
            </div>
            {selected.freeCoins > 0 && (
              <div className="flex items-center bg-[#EBF4FF] rounded-xl px-4 py-2.5 mb-4">
                <span className="text-[13px] font-semibold text-[#4A90D9]">💎 +{selected.freeCoins.toLocaleString()} フリーコインボーナス</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setSelected(null)} className="rounded-full border border-[#E0E0E0] py-3 text-[14px] font-bold text-[#666]">キャンセル</button>
              <button onClick={confirm} className="rounded-full bg-[#E8002D] py-3 text-[14px] font-bold text-white">購入する</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function OffersContent({ offers, countdown, bought, onSelect }: {
  offers: Offer[]; countdown: string; bought: Set<string>;
  onSelect: (o: Offer) => void;
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
        </div>
      </header>

      {/* Back row */}
      <a href="/store" className="shrink-0 flex items-center gap-2 bg-white border-b border-[#E0E0E0] px-4 py-3 text-[14px] font-semibold text-[#1A1A1A]">
        <span className="text-[#E8002D]">←</span> スペシャルオファー / Special Offers
      </a>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        {/* Countdown banner */}
        <div
          className="flex items-center justify-between px-5 py-4 text-white"
          style={{ background: "linear-gradient(135deg, #E8002D, #FF6B00)" }}
        >
          <div>
            <div className="text-[11px] font-semibold opacity-80">期間限定オファー / Limited Time Offer</div>
            <div className="text-[13px] font-bold mt-0.5">このオファーが終了するまで</div>
          </div>
          <div
            className="rounded-xl px-4 py-2 text-[22px] font-black tabular-nums"
            style={{ background: "rgba(0,0,0,0.25)", letterSpacing: "0.05em" }}
          >
            {countdown}
          </div>
        </div>

        {/* Offer cards */}
        <div className="p-4 space-y-3">
          {offers.map((offer) => {
            const isPurchased = bought.has(offer.id);
            return (
              <div key={offer.id} className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-4 py-2" style={{ background: offer.color }}>
                  <span className="text-[13px] font-black text-white">{offer.discount} スペシャルオファー</span>
                  <span className="text-[11px] font-bold text-white opacity-80">Limited</span>
                </div>

                {/* Card body */}
                <div className="flex items-center gap-4 px-4 py-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
                    style={{ background: "repeating-conic-gradient(#ddd 0% 25%, #f0f0f0 0% 50%) 0 0 / 16px 16px" }}
                  >
                    🟡
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[16px] font-black text-[#1A1A1A]">🟡 {offer.coins.toLocaleString()}</span>
                      <span className="text-[12px] text-[#4A90D9]">+ 💎{offer.freeCoins.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-[#999] line-through">¥{offer.origPrice.toLocaleString()}</span>
                      <span className="text-[18px] font-black text-[#E8002D]">¥{offer.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    disabled={isPurchased}
                    onClick={() => !isPurchased && onSelect(offer)}
                    className="shrink-0 rounded-full px-4 py-2.5 text-[13px] font-bold text-white transition disabled:opacity-60"
                    style={{ background: isPurchased ? "#CCC" : offer.color }}
                  >
                    {isPurchased ? "購入済" : "購入"}
                  </button>
                </div>

                {/* Progress bar — remaining */}
                <div className="px-4 pb-3">
                  <div className="flex justify-between text-[10px] text-[#999] mb-1">
                    <span>残り / Remaining</span>
                    <span>23/50</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#F0F0F0]">
                    <div className="h-full rounded-full" style={{ width: "46%", background: offer.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="mx-4 mb-6 text-[11px] text-[#999] leading-relaxed text-center">
          スペシャルオファーは1人1回限りです。<br />
          Special offers are limited to one purchase per user.
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="shrink-0 flex border-t border-[#E0E0E0] bg-white">
        {[
          { icon: "🎴", label: "オリパ",    href: "/", active: false },
          { icon: "📦", label: "MY LOOT",   href: "/prize-history", active: false },
          { icon: "🎯", label: "クエスト",   href: "#", active: false },
          { icon: "👤", label: "マイページ", href: "/mypage", active: true },
        ].map((item) => (
          <a key={item.label} href={item.href} className="flex flex-1 flex-col items-center gap-1 py-2" style={{ color: item.active ? "#E8002D" : "#8a9099" }}>
            <span className="text-[20px]">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
