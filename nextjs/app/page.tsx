"use client";

/* ═══════════════════════════════════════════════════════════════
   HOME — quick nav to all prototype pages
═══════════════════════════════════════════════════════════════ */

const PAGES = [
  { href: "/register",     label: "会員登録",          sublabel: "Register" },
  { href: "/wallet",       label: "ウォレット",          sublabel: "Wallet" },
  { href: "/store",        label: "コイン購入",          sublabel: "Coin Store" },
  { href: "/offers",       label: "スペシャルオファー",   sublabel: "Special Offers" },
  { href: "/payment",      label: "お支払い",            sublabel: "Payment" },
  { href: "/kyc",          label: "本人確認",            sublabel: "KYC" },
  { href: "/faq",          label: "よくある質問",        sublabel: "FAQ" },
  { href: "/mypage",       label: "マイページ",          sublabel: "My Page" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0f1014] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎴</div>
          <h1 className="text-2xl font-black text-white">オリパロット</h1>
          <p className="text-[#8a9099] text-sm mt-1">OripaLot Prototype — Page Navigator</p>
        </div>
        <div className="space-y-2">
          {PAGES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="flex items-center justify-between rounded-xl bg-[#1b1c22] px-4 py-3.5 no-underline hover:bg-[#24252d] transition"
            >
              <div>
                <div className="text-[15px] font-bold text-white">{p.label}</div>
                <div className="text-[12px] text-[#8a9099]">{p.sublabel}</div>
              </div>
              <span className="text-[#E8002D] text-lg">→</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
