"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   COIN PURCHASE / STORE PAGE
   Matches Figma: special offers + coin packages + confirmation
═══════════════════════════════════════════════════════════════ */

type Package = {
  id: string;
  coins: number;
  freeCoins?: number;
  price: number;
  origPrice?: number;
  badge?: string;
  isFirstOffer?: boolean;
};

const SPECIAL_OFFERS: Package[] = [
  { id: "so1", coins: 6000, freeCoins: 1000, price: 3000, origPrice: 6000, badge: "初回オファー 50%OFF", isFirstOffer: true },
  { id: "so2", coins: 5000, freeCoins: 500,  price: 3500, origPrice: 5000, badge: "30%OFF" },
];

const PACKAGES: Package[] = [
  { id: "p1", coins: 500,    price: 500 },
  { id: "p2", coins: 1000,   price: 1000 },
  { id: "p3", coins: 3000,   freeCoins: 100,  price: 3000 },
  { id: "p4", coins: 5000,   freeCoins: 300,  price: 5000 },
  { id: "p5", coins: 10000,  freeCoins: 800,  price: 10000 },
  { id: "p6", coins: 30000,  freeCoins: 3000, price: 30000 },
  { id: "p7", coins: 50000,  freeCoins: 6000, price: 50000 },
  { id: "p8", coins: 100000, freeCoins: 15000, price: 100000 },
];

export default function StorePage() {
  const [selected, setSelected] = useState<Package | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function buy(pkg: Package) { setSelected(pkg); }
  function confirm() { setConfirmed(true); setSelected(null); }
  function close() { setSelected(null); setConfirmed(false); }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <StoreContent onBuy={buy} />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <StoreContent onBuy={buy} />
      </div>

      {/* Confirmation sheet */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55" onClick={close}>
          <div className="w-full max-w-[480px] rounded-t-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/15" />
            <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4">購入確認 / Purchase Confirmation</h3>
            <div className="flex items-center justify-between bg-[#F5F5F5] rounded-xl px-4 py-3 mb-2">
              <span className="text-[14px] font-semibold">🟡 {selected.coins.toLocaleString()} オリパコイン</span>
              <span className="text-[15px] font-bold text-[#E8002D]">¥{selected.price.toLocaleString()}</span>
            </div>
            {selected.freeCoins && (
              <div className="flex items-center justify-between bg-[#EBF4FF] rounded-xl px-4 py-3 mb-4">
                <span className="text-[13px] font-semibold text-[#4A90D9]">💎 +{selected.freeCoins.toLocaleString()} フリーコインボーナス</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={close} className="rounded-full border border-[#E0E0E0] py-3 text-[14px] font-bold text-[#666]">キャンセル</button>
              <button onClick={confirm} className="rounded-full bg-[#E8002D] py-3 text-[14px] font-bold text-white">購入する</button>
            </div>
          </div>
        </div>
      )}

      {/* Success popup */}
      {confirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-6" onClick={close}>
          <div className="w-full max-w-[340px] rounded-2xl bg-white p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-[16px] font-bold mb-2">購入完了！ / Purchase Complete!</h3>
            <p className="text-[13px] text-[#666] mb-4">コインがウォレットに追加されました。</p>
            <button onClick={close} className="w-full rounded-full bg-[#E8002D] py-3 text-[14px] font-bold text-white">
              閉じる / Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function StoreContent({ onBuy }: { onBuy: (pkg: Package) => void }) {
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
      <a href="/mypage" className="shrink-0 flex items-center gap-2 bg-white border-b border-[#E0E0E0] px-4 py-3 text-[14px] font-semibold text-[#1A1A1A]">
        <span className="text-[#E8002D]">←</span> コイン購入 / Coin Purchase
      </a>

      {/* Subtitle */}
      <div className="shrink-0 bg-white border-b border-[#E0E0E0] px-4 py-2.5 text-[11.5px] text-[#666] leading-relaxed">
        購入前に<a href="#" className="text-[#E8002D] font-semibold">特定商取引法に基づく表記</a>をご確認ください。
        <br /><span className="text-[10.5px] text-[#999]">Please read the SCTA disclosure before purchasing.</span>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        {/* Special offers section */}
        <div className="flex items-center gap-2 bg-[#E8002D] px-4 py-3 mt-0">
          <span className="text-white text-[14px]">🔥</span>
          <span className="text-white text-[14px] font-black">スペシャルオファー</span>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 py-4 bg-white" style={{ scrollbarWidth: "none" }}>
          {SPECIAL_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="flex-shrink-0 w-[160px] border border-[#E0E0E0] rounded-xl p-3 text-center cursor-pointer hover:border-[#E8002D]"
            >
              <div
                className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-2xl"
                style={{ background: "repeating-conic-gradient(#ddd 0% 25%, #f0f0f0 0% 50%) 0 0 / 16px 16px" }}
              >
                🟡
              </div>
              <div className="text-[13px] font-bold text-[#1A1A1A] mb-1">
                🟡 {offer.coins.toLocaleString()}
              </div>
              {offer.freeCoins && (
                <div className="text-[11px] text-[#4A90D9] mb-2">💎 +{offer.freeCoins.toLocaleString()}</div>
              )}
              {offer.badge && (
                <span className="inline-block bg-[#E8002D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                  {offer.badge}
                </span>
              )}
              <button
                onClick={() => onBuy(offer)}
                className="block w-full rounded-full bg-[#E8002D] py-2 text-[13px] font-bold text-white"
              >
                ¥{offer.price.toLocaleString()}
              </button>
            </div>
          ))}
        </div>

        {/* Regular packages section */}
        <div className="flex items-center gap-2 bg-[#E8002D] px-4 py-3 mt-2">
          <span className="text-white text-[14px]">🟡</span>
          <span className="text-white text-[14px] font-black">コイン購入</span>
        </div>

        <div className="bg-white mt-0">
          {PACKAGES.map((pkg, i) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between px-4 py-3.5 border-b border-[#F0F0F0] cursor-pointer hover:bg-[#fafafa]"
            >
              <div className="flex items-center gap-3">
                <span className="text-[24px] w-9 text-center shrink-0">🟡</span>
                <div>
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    {pkg.coins.toLocaleString()} コイン
                    {i === 0 && (
                      <span className="ml-2 inline-block bg-[#E8002D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full align-middle">
                        初回オファー 50%OFF
                      </span>
                    )}
                  </div>
                  {pkg.freeCoins && (
                    <div className="text-[11px] text-[#4A90D9] mt-0.5">
                      💎 +{pkg.freeCoins.toLocaleString()} フリーコイン
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                {i === 0 && (
                  <div className="text-[11px] text-[#999] line-through">¥1,000</div>
                )}
                <button
                  onClick={() => onBuy(pkg)}
                  className="inline-block rounded-full bg-[#E8002D] px-4 py-2 text-[13px] font-bold text-white"
                >
                  ¥{pkg.price.toLocaleString()}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Promo banner */}
        <div
          className="text-white text-center px-4 py-5 mt-2 text-[13px] font-bold leading-relaxed"
          style={{ background: "linear-gradient(135deg, #FF6B00, #E8002D)" }}
        >
          <span className="inline-block border border-white/40 bg-white/20 rounded-full px-3 py-1 text-[11px] mb-2">キャンペーン</span>
          <br />
          初回購入で最大50%オフ！期間限定オファー
          <br /><span className="text-[11px] font-normal opacity-85">First purchase up to 50% off! Limited time offer.</span>
        </div>

        {/* Footer */}
        <footer className="bg-[#1A1A1A] text-[#ccc] px-4 py-6 pb-24">
          <div className="text-[14px] font-black text-white mb-3">
            🎴 <span className="text-[#E8002D]">オリパ</span>ロット
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
            {["利用規約", "プライバシーポリシー", "特定商取引法", "お問い合わせ"].map((l) => (
              <a key={l} href="#" className="text-[11px] text-[#aaa]">{l}</a>
            ))}
          </div>
          <p className="text-[10px] text-[#555] leading-relaxed">© 2026 Oripalot Japan. All rights reserved.</p>
        </footer>
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
