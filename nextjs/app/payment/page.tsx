"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   PSP / PAYMENT PAGE
   4 tabs: Credit Card · Google Pay · Apple Pay · Convenience Store
═══════════════════════════════════════════════════════════════ */

type PayTab = "card" | "gpay" | "apay" | "cvs";

const CVS_STORES = ["ローソン Lawson", "ファミリーマート FamilyMart", "セブンイレブン 7-Eleven", "ミニストップ Ministop"];

export default function PaymentPage() {
  const [tab, setTab] = useState<PayTab>("card");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <PaymentContent tab={tab} setTab={setTab} />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <PaymentContent tab={tab} setTab={setTab} />
      </div>
    </main>
  );
}

function PaymentContent({ tab, setTab }: { tab: PayTab; setTab: (t: PayTab) => void }) {
  const tabs: { key: PayTab; label: string; icon: string }[] = [
    { key: "card", label: "クレカ",   icon: "💳" },
    { key: "gpay", label: "G Pay",    icon: "G" },
    { key: "apay", label: "Apple Pay",icon: "" },
    { key: "cvs",  label: "コンビニ", icon: "🏪" },
  ];

  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Top nav */}
      <header className="shrink-0 flex items-center justify-between bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎴</span>
          <span className="text-[15px] font-black text-[#1A1A1A]">オリパロット</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold">
          <span className="text-[#4A90D9]">💎 10,000</span>
          <span className="text-[#F5A623]">🟡 10,000</span>
        </div>
      </header>

      {/* Back row */}
      <a href="/store" className="shrink-0 flex items-center gap-2 bg-white border-b border-[#E0E0E0] px-4 py-3 text-[14px] font-semibold text-[#1A1A1A]">
        <span className="text-[#E8002D]">←</span> お支払い / Payment
      </a>

      {/* Purchase summary */}
      <div className="shrink-0 bg-white border-b border-[#E0E0E0] px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#666]">購入内容 / Item</span>
          <span className="text-[13px] font-bold text-[#1A1A1A]">🟡 5,000 コイン</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[13px] text-[#666]">お支払い金額 / Total</span>
          <span className="text-[16px] font-black text-[#E8002D]">¥5,000</span>
        </div>
      </div>

      {/* Payment tabs */}
      <div className="shrink-0 flex bg-white border-b border-[#E0E0E0]">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition"
            style={{
              color: tab === t.key ? "#E8002D" : "#8a9099",
              borderBottom: tab === t.key ? "2px solid #E8002D" : "2px solid transparent",
            }}
          >
            <span className="text-[16px]">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto p-4 space-y-4">
        {/* CREDIT CARD */}
        {tab === "card" && <CreditCardTab />}

        {/* GOOGLE PAY */}
        {tab === "gpay" && (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-3xl font-extrabold text-[#1A1A1A] mx-auto mb-4 shadow border border-[#E0E0E0]">
              <span style={{ color: "#4285F4" }}>G</span><span style={{ color: "#EA4335" }}>o</span><span style={{ color: "#FBBC05" }}>o</span><span style={{ color: "#4285F4" }}>g</span><span style={{ color: "#34A853" }}>l</span><span style={{ color: "#EA4335" }}>e</span>
            </div>
            <p className="text-[14px] text-[#666] mb-2">Google Pay でお支払い</p>
            <p className="text-[12px] text-[#999] mb-5">Your saved Google Pay cards will be used.</p>
            <button className="w-full rounded-full py-4 text-[15px] font-bold text-white" style={{ background: "#1A1A1A" }}>
              Google Pay で支払う
            </button>
          </div>
        )}

        {/* APPLE PAY */}
        {tab === "apay" && (
          <div className="text-center py-6">
            <div className="w-24 h-24 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow">

            </div>
            <p className="text-[14px] text-[#666] mb-2">Apple Pay でお支払い</p>
            <p className="text-[12px] text-[#999] mb-5">Your saved Apple Pay cards will be used.</p>
            <button className="w-full rounded-full py-4 text-[15px] font-bold text-white bg-[#1A1A1A]">
               Apple Pay で支払う
            </button>
          </div>
        )}

        {/* CONVENIENCE STORE */}
        {tab === "cvs" && (
          <div>
            <div className="text-[13px] font-semibold text-[#1A1A1A] mb-3">コンビニを選択 / Select Store</div>
            <div className="space-y-2 mb-5">
              {CVS_STORES.map((store) => (
                <label key={store} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-[#E0E0E0] cursor-pointer hover:border-[#E8002D]">
                  <input type="radio" name="cvs" className="accent-[#E8002D]" /> <span className="text-[14px] font-semibold text-[#1A1A1A]">{store}</span>
                </label>
              ))}
            </div>
            <div className="bg-[#FFF8E7] rounded-xl p-4 mb-4 border border-[#F5A623]">
              <p className="text-[12px] text-[#666] leading-relaxed">
                支払い番号は次の画面に表示されます。コンビニのレジまたはマルチコピー機でお支払いください。<br />
                <span className="text-[11px] text-[#999]">A payment code will be shown on the next screen. Pay at the register or multi-copy machine.</span>
              </p>
            </div>
            <button className="w-full rounded-full bg-[#E8002D] py-4 text-[15px] font-bold text-white">
              支払い番号を発行 / Get Code
            </button>
          </div>
        )}

        {/* Security note */}
        <div className="flex items-center gap-2 text-[11px] text-[#999]">
          <span>🔒</span> このページはSSL/TLSで保護されています / Secured by SSL/TLS
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
          <a key={item.label} href={item.href} className="flex flex-1 flex-col items-center gap-1 py-2" style={{ color: (item as { active?: boolean }).active ? "#E8002D" : "#8a9099" }}>
            <span className="text-[20px]">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

function CreditCardTab() {
  const [num, setNum]     = useState("");
  const [name, setName]   = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv]     = useState("");

  const displayNum = num.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim() || "•••• •••• •••• ••••";

  const inputCls = "w-full border border-[#CCC] rounded-lg px-4 py-3 text-[14px] text-[#1A1A1A] outline-none focus:border-[#E8002D]";

  return (
    <div>
      {/* Live card preview */}
      <div
        className="rounded-2xl p-5 mb-5 text-white"
        style={{ background: "linear-gradient(135deg, #E8002D, #C0001F)", minHeight: 160 }}
      >
        <div className="text-[11px] font-semibold opacity-70 mb-4">ORIPALOT CARD</div>
        <div className="text-[20px] font-mono font-bold tracking-widest mb-5">{displayNum}</div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[10px] opacity-60 mb-0.5">CARDHOLDER</div>
            <div className="text-[13px] font-bold uppercase">{name || "YOUR NAME"}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] opacity-60 mb-0.5">EXPIRES</div>
            <div className="text-[13px] font-bold">{expiry || "MM/YY"}</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div>
          <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">カード番号 / Card Number</label>
          <input value={num} onChange={(e) => setNum(e.target.value.replace(/\D/g, "").slice(0, 16))} placeholder="0000 0000 0000 0000" className={inputCls} />
        </div>
        <div>
          <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">名義人 / Cardholder Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="TARO YAMADA" className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">有効期限 / Expiry</label>
            <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className={inputCls} />
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">セキュリティコード / CVV</label>
            <input value={cvv} onChange={(e) => setCvv(e.target.value.slice(0, 4))} placeholder="•••" type="password" className={inputCls} />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <input type="checkbox" id="save-card" className="accent-[#E8002D]" />
          <label htmlFor="save-card" className="text-[12px] text-[#666]">カードを保存する / Save card</label>
        </div>
        <button className="w-full rounded-full bg-[#E8002D] py-4 text-[15px] font-bold text-white mt-2">
          ¥5,000 を支払う / Pay ¥5,000
        </button>
        <div className="flex justify-center gap-2 mt-2">
          {["VISA", "MC", "JCB", "AMEX"].map((card) => (
            <span key={card} className="rounded-md border border-[#E0E0E0] bg-white px-2 py-1 text-[10px] font-bold text-[#666]">{card}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
