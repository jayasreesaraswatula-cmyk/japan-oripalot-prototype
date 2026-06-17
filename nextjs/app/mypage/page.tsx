"use client";

/* ═══════════════════════════════════════════════════════════════
   MY PAGE / PROFILE
   Rank card, menu grid, account + other links
═══════════════════════════════════════════════════════════════ */

const MENU_ITEMS = [
  { key: "quest",   icon: "🎯", label: "クエスト",   href: "#" },
  { key: "items",   icon: "📦", label: "獲得商品",   href: "/prize-history" },
  { key: "history", icon: "⭐", label: "当選履歴",   href: "/prize-history" },
  { key: "purchases",icon: "🧾",label: "購入履歴",   href: "#" },
  { key: "invite",  icon: "👥", label: "友達招待",   href: "#" },
  { key: "faq",     icon: "❓", label: "よくある質問",href: "/faq" },
  { key: "contact", icon: "💬", label: "お問い合わせ",href: "#" },
  { key: "notices", icon: "🔔", label: "お知らせ",   href: "#" },
];

export default function MyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <MyPageContent />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <MyPageContent />
      </div>
    </main>
  );
}

function MyPageContent() {
  return (
    <div className="flex h-full flex-col bg-[#F0F0F0]">
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

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {/* Profile card */}
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
            {/* Crown emblem */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E8002D] text-white text-3xl font-black shadow">
              🎴
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[19px] font-extrabold text-[#1A1A1A] truncate">Jayasree</p>
              <p className="text-[12px] text-[#8a9099] mt-0.5">ID: XXXXXX</p>
              <button className="mt-2 w-full rounded-lg border-2 border-[#E8002D] py-1.5 text-[13px] font-bold text-[#E8002D]">
                プロフィール編集 / Edit Profile
              </button>
            </div>
          </div>

          {/* Balance card */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
            <div className="flex items-stretch">
              <div className="flex-1 pr-3">
                <p className="text-[12px] font-semibold text-[#5b616b]">オリパコイン</p>
                <p className="mt-1 text-[20px] font-extrabold text-[#1A1A1A] flex items-center gap-1">
                  🟡 10,000
                  <button className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8002D] text-[13px] leading-none text-white ml-1">+</button>
                </p>
              </div>
              <div className="w-px bg-black/10" />
              <div className="flex-1 pl-3">
                <p className="text-[12px] font-semibold text-[#5b616b]">フリーポイント</p>
                <p className="mt-1 text-[20px] font-extrabold text-[#4A90D9]">💎 10,000</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F0F0F0]">
              <p className="text-[12px] font-bold text-[#E8002D]">コインの有効期限はあと3日です！</p>
              <a href="/wallet" className="shrink-0 rounded-lg border border-black/20 px-3 py-1.5 text-[11px] font-bold text-[#1A1A1A]">詳細を確認</a>
            </div>
          </div>

          {/* Rank card */}
          <div
            className="relative rounded-2xl border border-[#e7b98a] p-4 overflow-hidden"
            style={{ background: "linear-gradient(135deg,#fbe6cf,#f6d3ad)" }}
          >
            <span className="inline-block rounded-md bg-[#7a4a1e] px-2.5 py-1 text-[11px] font-bold text-white">現在ランク</span>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-3xl" style={{ background: "linear-gradient(135deg,#d79a5f,#a9692f)" }}>🏆</div>
              <div className="flex-1 min-w-0">
                <p className="text-[20px] font-extrabold text-[#4a3010]">ブロンズ / Bronze</p>
                <p className="text-[13px] font-semibold text-[#6b4a23]">次のレベルまで <span className="text-[#E8002D] font-extrabold text-[15px]">1,000pt</span></p>
                <button className="mt-2 w-full rounded-lg bg-[#E8002D] py-1.5 text-[13px] font-bold text-white">ランク特典を確認</button>
              </div>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/60">
              <span className="block h-full rounded-full bg-[#e08a2e]" style={{ width: "75%" }} />
            </div>
            <p className="text-right text-[12px] font-bold text-[#6b4a23] mt-1">3,000/4,000</p>
          </div>

          {/* My Menu */}
          <h3 className="text-[15px] font-extrabold text-[#1A1A1A] px-1 pt-2">マイメニュー</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] no-underline"
              >
                <span className="text-[22px]">{item.icon}</span>
                <span className="text-[13px] font-bold text-[#1A1A1A]">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Account section */}
          <h3 className="text-[15px] font-extrabold text-[#1A1A1A] px-1 pt-3">アカウント</h3>
          {["アカウント情報を変更", "ログアウト"].map((label) => (
            <div key={label} className="bg-white rounded-xl px-4 py-3.5 text-[14px] font-semibold text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">{label}</div>
          ))}

          {/* Other section */}
          <h3 className="text-[15px] font-extrabold text-[#1A1A1A] px-1 pt-3">その他</h3>
          {["利用規約", "プライバシーポリシー", "特定商取引法に基づく表記"].map((label) => (
            <div key={label} className="bg-white rounded-xl px-4 py-3.5 text-[14px] font-semibold text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">{label}</div>
          ))}

          <div className="pb-8" />
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
          <a key={item.label} href={item.href} className="flex flex-1 flex-col items-center gap-1 py-2 no-underline" style={{ color: (item as { active?: boolean }).active ? "#E8002D" : "#8a9099" }}>
            <span className="text-[20px]">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
