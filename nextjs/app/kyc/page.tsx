"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   KYC / IDENTITY VERIFICATION PAGE
   6-step flow: Trigger → Age → Doc Select → Upload → Selfie → Done
═══════════════════════════════════════════════════════════════ */

type Screen = "trigger" | "age" | "under18" | "doc" | "upload" | "selfie" | "processing" | "success";
type DocType = "mynumber" | "license" | "passport" | "residence" | null;

const STEPS = ["本人確認", "書類選択", "アップロード", "完了"];

function BottomNav() {
  return (
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
  );
}

export default function KycPage() {
  const [screen, setScreen] = useState<Screen>("trigger");
  const [step, setStep]     = useState(1);
  const [doc, setDoc]       = useState<DocType>(null);
  const [selfieOk, setSelfieOk] = useState(false);

  function go(s: Screen, stepNum?: number) {
    setScreen(s);
    if (stepNum) setStep(stepNum);
    window.scrollTo(0, 0);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <KycContent screen={screen} step={step} doc={doc} setDoc={setDoc} selfieOk={selfieOk} setSelfieOk={setSelfieOk} go={go} />
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <KycContent screen={screen} step={step} doc={doc} setDoc={setDoc} selfieOk={selfieOk} setSelfieOk={setSelfieOk} go={go} />
      </div>
    </main>
  );
}

function KycContent({ screen, step, doc, setDoc, selfieOk, setSelfieOk, go }: {
  screen: Screen; step: number; doc: DocType;
  setDoc: (d: DocType) => void;
  selfieOk: boolean; setSelfieOk: (v: boolean) => void;
  go: (s: Screen, stepNum?: number) => void;
}) {
  const btnPrimary = "block w-full rounded-lg bg-[#E8002D] py-3.5 text-center text-[15px] font-bold text-white mt-4 hover:bg-[#C0001F]";
  const btnSecondary = "block w-full rounded-lg border-2 border-[#E0E0E0] py-3.5 text-center text-[15px] font-semibold text-[#1A1A1A] mt-3";

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
        <span className="text-[#E8002D]">←</span> 本人確認 / Identity Verification
      </a>

      {/* Step indicator */}
      <div className="shrink-0 flex items-center justify-between bg-white border-b border-[#E0E0E0] px-4 py-3">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const done   = num < step;
          const active = num === step;
          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white mb-1"
                  style={{ background: done ? "#27AE60" : active ? "#E8002D" : "#CCC" }}
                >
                  {done ? "✓" : num}
                </div>
                <span className="text-[9px] font-semibold" style={{ color: active ? "#E8002D" : done ? "#27AE60" : "#999" }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="h-px flex-1 mx-1" style={{ background: num < step ? "#27AE60" : "#E0E0E0" }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto pb-4">
        {/* TRIGGER */}
        {screen === "trigger" && (
          <div>
            <div className="mx-4 mt-4 border-2 border-[#E8002D] rounded-xl bg-white p-4">
              <div className="text-[15px] font-bold text-[#E8002D] mb-2">
                ⚠️ 本人確認が必要です<br />
                <span className="text-[12px] font-normal">Identity Verification Required</span>
              </div>
              <p className="text-[12px] text-[#666] leading-relaxed">
                累計入金額が50,000円を超えたため、本人確認が必要です。<br />
                <span className="text-[11px] text-[#999]">Identity verification is required as your total deposits exceeded ¥50,000.</span>
              </p>
            </div>
            <div className="mx-4 mt-3 bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-4">
              <div className="text-[12px] font-bold text-[#1A1A1A] mb-3">本人確認を完了すると / Complete KYC to receive:</div>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-[18px]">🟡</span>
                <div>
                  <div className="text-[13px] font-bold text-[#1A1A1A]">+500 オリパコインをプレゼント</div>
                  <div className="text-[11px] text-[#999]">+500 Oripa Coins reward</div>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-[18px]">🔓</span>
                <div>
                  <div className="text-[13px] font-bold text-[#1A1A1A]">入金制限の解除</div>
                  <div className="text-[11px] text-[#999]">Deposit limit lifted</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-lg px-3 py-2 text-[12px] text-[#666]">
                🕐 審査期間：1〜2営業日 / Review: 1-2 business days
              </div>
            </div>
            <div className="px-4">
              <button className={btnPrimary} onClick={() => go("age", 1)}>本人確認を開始する / Start Verification</button>
              <button className="block text-center text-[13px] text-[#E8002D] underline mt-4 w-full" onClick={() => go("under18")}>
                18歳未満の方はこちら / Under 18? Click here
              </button>
            </div>
          </div>
        )}

        {/* AGE */}
        {screen === "age" && (
          <div className="px-4">
            <div className="mt-4 text-[17px] font-bold text-[#1A1A1A] mb-1">18歳以上ですか？</div>
            <div className="text-[13px] text-[#666] mb-5">Are you 18 or over?</div>
            <button className={btnPrimary} onClick={() => go("doc", 2)}>はい（18歳以上） / Yes, I am 18+</button>
            <button className={btnSecondary} onClick={() => go("under18")}>いいえ（18歳未満） / No, I am under 18</button>
            <button className="block text-center text-[12px] text-[#999] mt-4 w-full" onClick={() => go("trigger")}>← 戻る / Back</button>
          </div>
        )}

        {/* UNDER-18 */}
        {screen === "under18" && (
          <div>
            <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)] text-[13px] text-[#666] leading-relaxed mb-3">
              <strong className="text-[#1A1A1A]">18歳未満の方へ</strong><br />
              未成年の方の本人確認は、保護者の方が手続きを行う必要があります。<br />
              <em className="text-[11px] text-[#999]">For users under 18, a parent or guardian must complete KYC.</em>
            </div>
            <div className="px-4 space-y-3">
              {[
                { label: "保護者氏名 *", en: "Guardian Full Name", type: "text", ph: "山田 花子" },
                { label: "メールアドレス *", en: "Email", type: "email", ph: "guardian@example.com" },
                { label: "電話番号 *", en: "Phone Number", type: "tel", ph: "090-0000-0000" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">
                    {f.label}<br /><span className="font-normal text-[#999]">{f.en}</span>
                  </label>
                  <input type={f.type} placeholder={f.ph} className="w-full border border-[#CCC] rounded-lg px-4 py-2.5 text-[14px] outline-none focus:border-[#E8002D]" />
                </div>
              ))}
              <button className={btnPrimary}>送信する / Submit</button>
              <button className="block text-center text-[12px] text-[#999] mt-3 w-full" onClick={() => go("trigger")}>← 戻る / Back</button>
            </div>
          </div>
        )}

        {/* DOC SELECT */}
        {screen === "doc" && (
          <div>
            <div className="px-4 mt-4 mb-3">
              <div className="text-[17px] font-bold text-[#1A1A1A]">書類を選択してください</div>
              <div className="text-[13px] text-[#666]">Select your document type</div>
            </div>
            <div className="grid grid-cols-2 gap-3 px-4">
              {[
                { id: "mynumber" as DocType, icon: "🪪", label: "マイナンバーカード", en: "My Number Card" },
                { id: "license"  as DocType, icon: "🚗", label: "運転免許証",         en: "Driver's License" },
                { id: "passport" as DocType, icon: "📘", label: "パスポート",         en: "Passport" },
                { id: "residence"as DocType, icon: "🏠", label: "在留カード",         en: "Residence Card" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDoc(d.id)}
                  className="border-2 rounded-xl p-4 text-center transition"
                  style={{ borderColor: doc === d.id ? "#E8002D" : "#E0E0E0", boxShadow: doc === d.id ? "0 0 0 3px rgba(232,0,45,0.08)" : "none", background: "white" }}
                >
                  <span className="text-3xl block mb-2">{d.icon}</span>
                  <div className="text-[12px] font-semibold text-[#1A1A1A]">{d.label}</div>
                  <div className="text-[10px] text-[#999]">{d.en}</div>
                </button>
              ))}
            </div>
            <div className="px-4">
              <button
                disabled={!doc}
                className={`${btnPrimary} disabled:opacity-40`}
                onClick={() => go("upload", 3)}
              >
                次へ / Next
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD */}
        {screen === "upload" && (
          <div>
            <div className="px-4 mt-4 mb-4">
              <div className="text-[17px] font-bold text-[#1A1A1A]">書類をアップロード</div>
              <div className="text-[13px] text-[#666]">Upload your document</div>
            </div>
            <div className="px-4 space-y-3">
              {(doc !== "passport" ? ["表面 / Front *", "裏面 / Back *"] : ["表面 / Front *"]).map((side) => (
                <div key={side}>
                  <label className="block text-[12px] font-semibold text-[#1A1A1A] mb-1">{side}</label>
                  <div className="border-2 border-dashed border-[#CCC] rounded-xl p-6 text-center cursor-pointer hover:border-[#E8002D] hover:bg-white">
                    <span className="text-3xl block mb-2">📷</span>
                    <div className="text-[13px] font-semibold text-[#1A1A1A]">アップロード</div>
                    <div className="text-[10px] text-[#999] mt-1">JPG・PNG・HEIC 対応 / Max 10MB</div>
                  </div>
                </div>
              ))}
              <button className={btnPrimary} onClick={() => go("selfie", 3)}>次へ / Next</button>
            </div>
          </div>
        )}

        {/* SELFIE */}
        {screen === "selfie" && (
          <div>
            <div className="px-4 mt-4 mb-3">
              <div className="text-[17px] font-bold text-[#1A1A1A]">セルフィー確認</div>
              <div className="text-[13px] text-[#666]">Selfie with Document</div>
            </div>
            <div
              className="mx-auto my-4 flex items-center justify-center text-5xl"
              style={{
                width: 200, height: 240,
                border: `3px dashed ${selfieOk ? "#27AE60" : "#CCC"}`,
                borderRadius: "50% / 45%",
                background: selfieOk ? "#E8F8EF" : "#F5F5F5",
              }}
            >
              {selfieOk ? "✅" : "👤"}
            </div>
            <p className="text-center text-[12.5px] text-[#666] mx-6 leading-relaxed mb-4">
              身分証明書をお顔の横に持ち、カメラに向けて撮影してください。<br />
              <span className="text-[11px] text-[#999]">Hold your ID next to your face and look at the camera.</span>
            </p>
            <div className="px-4">
              {!selfieOk ? (
                <button className={btnPrimary} onClick={() => setSelfieOk(true)}>📸 撮影する / Take Photo</button>
              ) : (
                <button className={btnPrimary} onClick={() => go("processing", 4)}>次へ / Next</button>
              )}
            </div>
          </div>
        )}

        {/* PROCESSING */}
        {screen === "processing" && (
          <ProcessingScreen onDone={() => go("success", 4)} />
        )}

        {/* SUCCESS */}
        {screen === "success" && (
          <div className="text-center px-6 pt-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#27AE60] text-3xl text-white mx-auto mb-5 shadow-[0_4px_16px_rgba(39,174,96,0.3)]">✓</div>
            <div className="text-[17px] font-bold text-[#1A1A1A] mb-2">本人確認書類を受け付けました</div>
            <div className="text-[13px] text-[#666] leading-relaxed mb-6">
              Identity verification submitted.<br />
              1〜2営業日以内に審査いたします。<br />
              <span className="text-[11px]">We will review within 1-2 business days.</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#FFF8E7] border border-[#F5A623] rounded-xl px-5 py-3 text-[15px] font-bold text-[#F5A623] mb-6">
              🟡 +500 オリパコイン プレゼント！
            </div>
            <a href="/mypage" className={btnPrimary + " no-underline"}>マイページへ戻る / Return to My Page</a>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);
  if (!done) {
    setTimeout(() => setDone(true), 2000);
  }
  if (done) { onDone(); return null; }
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="h-14 w-14 rounded-full border-4 border-[#E0E0E0] border-t-[#E8002D] mb-5" style={{ animation: "spin 0.9s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="text-[16px] font-bold text-[#1A1A1A] mb-2">確認中... / Verifying...</div>
      <div className="text-[12px] text-[#666]">書類を審査しています。<br /><span className="text-[11px]">Reviewing your documents, please wait.</span></div>
    </div>
  );
}
