"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   FAQ PAGE — accordion with category tabs + live search
═══════════════════════════════════════════════════════════════ */

type FaqItem = { q: string; qEn: string; a: string; aEn: string };
type Category = { id: string; label: string; items: FaqItem[] };

const CATEGORIES: Category[] = [
  {
    id: "account",
    label: "会員登録・アカウント",
    items: [
      { q: "会員登録はどうすればいいですか？", qEn: "How do I register?", a: "メールアドレスとパスワードを入力して登録ボタンを押してください。その後、確認メールが届きますので、リンクをクリックして登録を完了させてください。", aEn: "Enter your email address and password, then click the register button. You'll receive a confirmation email — click the link to complete registration." },
      { q: "ログインができません", qEn: "I can't log in", a: "メールアドレスとパスワードをご確認ください。入力を忘れた場合は「パスワードを忘れた方はこちら」からリセットできます。それでも解決しない場合はサポートまでお問い合わせください。", aEn: "Please check your email address and password. If you've forgotten it, reset via 'Forgot Password'. If still unresolved, contact support." },
      { q: "パスワードを忘れました", qEn: "I forgot my password", a: "ログイン画面の「パスワードを忘れた方はこちら」をタップし、登録済みのメールアドレスを入力するとパスワードリセットメールが届きます。", aEn: "Tap 'Forgot Password' on the login screen and enter your registered email. You'll receive a password reset email." },
      { q: "アカウントを退会するには", qEn: "How to delete my account", a: "マイページ → 設定 → 退会申請から手続きを行ってください。残高コインは退会時に全て失効しますのでご注意ください。", aEn: "Go to My Page → Settings → Delete Account. Please note that any remaining coin balance will be forfeited upon deletion." },
    ],
  },
  {
    id: "coins",
    label: "コイン・ポイント・決済",
    items: [
      { q: "オリパコインとは何ですか？", qEn: "What are Oripa Coins?", a: "オリパコインは有料で購入できるコインです。オリパガチャを引くのに使用します。1コイン = 1円相当です。", aEn: "Oripa Coins are purchased coins used to draw Oripa Gacha. 1 coin = approximately ¥1." },
      { q: "フリーコインとは何ですか？", qEn: "What are Free Coins?", a: "フリーコインは無料で配布されるコインです。デイリーボーナスやキャンペーンで入手できます。一部のオリパガチャに使用できますが、換金・払い戻しはできません。", aEn: "Free Coins are distributed at no charge via daily bonuses and campaigns. They can be used on select Oripa Gacha but cannot be refunded or exchanged for cash." },
      { q: "コインに有効期限はありますか？", qEn: "Do coins expire?", a: "オリパコインは購入日から180日間、フリーコインは付与日から30日間が有効期限です。期限切れのコインは自動的に失効しますのでご注意ください。", aEn: "Oripa Coins are valid for 180 days from purchase; Free Coins are valid for 30 days from grant. Expired coins are forfeited automatically." },
      { q: "支払い方法は何が使えますか？", qEn: "What payment methods are available?", a: "クレジットカード（VISA / Mastercard / JCB / AMEX）、Google Pay、Apple Pay、コンビニ払い（ローソン・ファミリーマート・セブンイレブン・ミニストップ）がご利用いただけます。", aEn: "We accept credit cards (VISA/Mastercard/JCB/AMEX), Google Pay, Apple Pay, and convenience store payment (Lawson, FamilyMart, 7-Eleven, Ministop)." },
      { q: "未成年者の利用制限について", qEn: "Purchase limits for minors", a: "18歳未満の方はサービスをご利用いただけません。年齢確認（KYC）が必要です。", aEn: "Users under 18 cannot use this service. Age verification (KYC) is required." },
    ],
  },
  {
    id: "gacha",
    label: "オリパ・ガチャの利用方法",
    items: [
      { q: "オリパガチャとは？", qEn: "What is Oripa Gacha?", a: "オリパガチャとは、トレーディングカードやフィギュアなどのランダム商品を、コインを消費して引くことができるデジタルくじサービスです。当たりは発送リクエストを通じてお手元に届きます。", aEn: "Oripa Gacha is a digital lottery service where you spend coins to win random trading cards, figures, and other collectibles. Prizes are delivered via a shipping request." },
      { q: "当選確率（RTP）はどのくらい？", qEn: "What is the payout ratio?", a: "各オリパの商品詳細ページに当選確率（RTP）が記載されています。全てのオリパは消費者庁のガイドラインに従い、確率の開示が義務付けられています。", aEn: "Each Oripa's product detail page lists the payout ratio (RTP). All Oripa products are required to disclose odds in accordance with Consumer Affairs Agency guidelines." },
    ],
  },
  {
    id: "shipping",
    label: "商品発送・お届け",
    items: [
      { q: "商品はいつ届きますか？", qEn: "When will I receive my prize?", a: "発送リクエスト後、3〜7営業日でお届けします。離島や一部地域は追加で数日かかる場合があります。", aEn: "After submitting a shipping request, delivery takes 3–7 business days. Remote islands or select areas may take additional days." },
      { q: "発送リクエストの最低金額は？", qEn: "Minimum amount for shipping?", a: "発送リクエストは¥500相当以上の景品が溜まった時点でリクエスト可能です。¥500未満の景品はコインへの交換をご利用ください。", aEn: "Shipping requests are available once prizes worth ¥500 or more accumulate. Prizes below ¥500 can be exchanged for coins instead." },
      { q: "コインへの交換はできますか？", qEn: "Can I convert prizes to coins?", a: "はい、一部の景品は景品価値の一定割合（通常50〜80%）のオリパコインに交換できます。", aEn: "Yes, select prizes can be exchanged for Oripa Coins at a set percentage of the prize value (typically 50–80%)." },
    ],
  },
  {
    id: "trouble",
    label: "トラブル・その他",
    items: [
      { q: "決済が失敗しました", qEn: "My payment failed", a: "カード情報を再確認の上、別の決済方法もお試しください。カード会社側でブロックされている可能性もありますので、カード会社へもお問い合わせください。", aEn: "Please re-check your card details and try another payment method. Your card issuer may have blocked the transaction — contact them as well." },
      { q: "コインが反映されません", qEn: "My coins didn't appear", a: "購入後、最大5分ほどかかる場合があります。それ以上経過しても反映されない場合は、注文番号をご確認の上サポートまでお問い合わせください。", aEn: "It may take up to 5 minutes after purchase. If still not reflected after that, please contact support with your order number." },
    ],
  },
];

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState("account");
  const [openId, setOpenId]       = useState<string | null>(null);

  const cat = CATEGORIES.find((c) => c.id === activeCat) ?? CATEGORIES[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <FaqContent categories={CATEGORIES} activeCat={activeCat} setActiveCat={setActiveCat} cat={cat} openId={openId} setOpenId={setOpenId} />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <FaqContent categories={CATEGORIES} activeCat={activeCat} setActiveCat={setActiveCat} cat={cat} openId={openId} setOpenId={setOpenId} />
      </div>
    </main>
  );
}

function FaqContent({ categories, activeCat, setActiveCat, cat, openId, setOpenId }: {
  categories: Category[]; activeCat: string;
  setActiveCat: (id: string) => void;
  cat: Category;
  openId: string | null;
  setOpenId: (id: string | null) => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#F5F5F5]">
      {/* Top nav */}
      <header className="shrink-0 flex items-center justify-between bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎴</span>
          <span className="text-[15px] font-black text-[#1A1A1A]">オリパロット</span>
        </div>
        <div className="text-[13px] font-bold text-[#F5A623]">🟡 10,000</div>
      </header>

      {/* Back row */}
      <a href="/mypage" className="shrink-0 flex items-center gap-2 bg-white border-b border-[#E0E0E0] px-4 py-3 text-[14px] font-semibold text-[#1A1A1A]">
        <span className="text-[#E8002D]">←</span> よくある質問 / FAQ
      </a>

      {/* Category tabs */}
      <div className="shrink-0 overflow-x-auto bg-white border-b border-[#E0E0E0]" style={{ scrollbarWidth: "none" }}>
        <div className="flex whitespace-nowrap px-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setActiveCat(c.id); setOpenId(null); }}
              className="inline-block px-3 py-3 text-[12px] font-semibold transition"
              style={{
                color: activeCat === c.id ? "#E8002D" : "#8a9099",
                borderBottom: activeCat === c.id ? "3px solid #E8002D" : "3px solid transparent",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto">
        <div className="bg-[#F5F5F5] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#8a9099]">{cat.label}</div>

        {cat.items.map((item, i) => {
          const id = `${activeCat}-${i}`;
          const open = openId === id;
          return (
            <div key={id} className="bg-white border-b border-[#E0E0E0] overflow-hidden">
              <button
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                onClick={() => setOpenId(open ? null : id)}
              >
                <div className="flex-1">
                  <span className="text-[#E8002D] font-bold">Q. </span>
                  <span className={`text-[14px] font-medium ${open ? "text-[#E8002D]" : "text-[#1A1A1A]"}`}>{item.q}</span>
                  <div className="text-[11px] text-[#999] mt-0.5">{item.qEn}</div>
                </div>
                <span
                  className="shrink-0 text-[#E8002D] text-[12px] transition-transform"
                  style={{ transform: open ? "rotate(180deg)" : "none" }}
                >▼</span>
              </button>
              {open && (
                <div className="px-4 pb-4">
                  <div className="border-t border-[#E0E0E0] pt-3 text-[13px] text-[#666] leading-relaxed">
                    {item.a}
                    <div className="text-[12px] text-[#999] mt-2">{item.aEn}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Contact CTA */}
        <div className="mx-4 my-5 bg-white rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-5 text-center">
          <div className="text-3xl mb-2">💬</div>
          <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-1">解決しない場合はサポートへ</h3>
          <p className="text-[12px] text-[#666] mb-4 leading-relaxed">
            上記で解決しない場合は、お気軽にカスタマーサポートまでお問い合わせください。<br />
            <span className="text-[11px] text-[#999]">If your question wasn&apos;t answered, contact our customer support team.</span>
          </p>
          <button className="w-full rounded-full bg-[#E8002D] py-3 text-[14px] font-bold text-white">
            お問い合わせ / Contact Support
          </button>
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
