"use client";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   REGISTRATION / SIGN UP PAGE
   Matches Figma: OripaLot UI Creative Template — Register screen
   White/red theme · Noto Sans JP · bilingual JP/EN
═══════════════════════════════════════════════════════════════════ */

type Toast = { id: number; text: string; type: "success" | "danger" | "info" };

export default function RegisterPage() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]   = useState(false);
  const [dob, setDob]         = useState("");
  const [invite, setInvite]   = useState("");
  const [agreed, setAgreed]   = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toasts, setToasts]   = useState<Toast[]>([]);

  function pushToast(text: string, type: Toast["type"] = "info") {
    const id = Date.now();
    setToasts((p) => [...p, { id, text, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2800);
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwValid    = password.length >= 8;
  const dobValid   = dob !== "";

  function handleRegister() {
    if (!emailValid) { pushToast("有効なメールアドレスを入力してください", "danger"); return; }
    if (!pwValid)    { pushToast("パスワードは8文字以上で入力してください", "danger"); return; }
    if (!dobValid)   { pushToast("生年月日を入力してください", "danger"); return; }
    setShowSuccess(true);
  }

  const toastColors: Record<Toast["type"], string> = {
    success: "#27AE60", danger: "#E8002D", info: "#4A90D9",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,80,90,0.10),transparent_30%),linear-gradient(180deg,#16171c_0%,#0f1014_100%)] px-4 py-8">
      {/* Phone shell */}
      <div className="hidden sm:block rounded-[2.6rem] border border-white/12 bg-[#1b1c22] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.55)]">
        <div className="rounded-[2.1rem] border border-white/8 bg-black p-2">
          <div className="mx-auto mb-2 h-6 w-28 rounded-full bg-white/10" />
          <div className="relative h-[812px] w-[390px] overflow-hidden rounded-[1.7rem] bg-[#F5F5F5]">
            <RegisterContent
              email={email} setEmail={setEmail}
              password={password} setPassword={setPassword}
              showPw={showPw} setShowPw={setShowPw}
              dob={dob} setDob={setDob}
              invite={invite} setInvite={setInvite}
              agreed={agreed} setAgreed={setAgreed}
              emailValid={emailValid} pwValid={pwValid} dobValid={dobValid}
              onRegister={handleRegister}
              onToast={pushToast}
            />
          </div>
        </div>
      </div>
      {/* Mobile full bleed */}
      <div className="relative w-full max-w-[440px] flex-1 overflow-hidden rounded-2xl bg-[#F5F5F5] sm:hidden" style={{ height: "100svh" }}>
        <RegisterContent
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword}
          showPw={showPw} setShowPw={setShowPw}
          dob={dob} setDob={setDob}
          invite={invite} setInvite={setInvite}
          agreed={agreed} setAgreed={setAgreed}
          emailValid={emailValid} pwValid={pwValid} dobValid={dobValid}
          onRegister={handleRegister}
          onToast={pushToast}
        />
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-6">
          <div className="w-full max-w-[360px] rounded-2xl bg-white p-7 text-center shadow-2xl">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-[18px] font-black text-[#1A1A1A] mb-1">登録完了！</h2>
            <p className="text-[13px] text-[#666] mb-5">アカウントが作成されました。ウェルカムボーナスをプレゼント！</p>
            <div className="flex items-center justify-between bg-[#F5F5F5] rounded-xl px-4 py-3 mb-2">
              <span className="text-[14px]">💎 フリーコイン</span>
              <span className="text-[16px] font-bold text-[#4A90D9]">+500</span>
            </div>
            <div className="flex items-center justify-between bg-[#F5F5F5] rounded-xl px-4 py-3 mb-5">
              <span className="text-[14px]">🟡 オリパコイン</span>
              <span className="text-[16px] font-bold text-[#F5A623]">+0</span>
            </div>
            <button
              onClick={() => { setShowSuccess(false); }}
              className="w-full rounded-full bg-[#E8002D] py-4 text-[15px] font-bold text-white"
            >
              ゲームを始める / Start Playing
            </button>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-full px-4 py-2 text-[12px] font-semibold text-white shadow-lg"
            style={{ background: toastColors[t.type] }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </main>
  );
}

/* ── Inner scrollable content ───────────────────────────────────── */
function RegisterContent({
  email, setEmail, password, setPassword, showPw, setShowPw,
  dob, setDob, invite, setInvite, agreed, setAgreed,
  emailValid, pwValid, dobValid, onRegister, onToast,
}: {
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  showPw: boolean; setShowPw: (v: boolean) => void;
  dob: string; setDob: (v: string) => void;
  invite: string; setInvite: (v: string) => void;
  agreed: boolean; setAgreed: (v: boolean) => void;
  emailValid: boolean; pwValid: boolean; dobValid: boolean;
  onRegister: () => void;
  onToast: (text: string, type?: "success" | "danger" | "info") => void;
}) {
  const inputBase = "w-full rounded-lg border px-4 py-3 text-[14px] text-[#1A1A1A] outline-none transition focus:border-[#E8002D]";

  return (
    <div className="no-scrollbar h-full overflow-y-auto bg-[#F5F5F5]">
      {/* Auth header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-3 border-b border-[#E0E0E0]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎴</span>
          <span className="text-[15px] font-black text-[#1A1A1A]">オリパロット</span>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full bg-[#E8002D] px-4 py-1.5 text-[12px] font-bold text-white">登録</button>
          <button className="rounded-full border border-[#E8002D] px-4 py-1.5 text-[12px] font-bold text-[#E8002D]">ログイン</button>
        </div>
      </header>

      <div className="p-4">
        {/* Banner */}
        <div
          className="w-full h-[100px] rounded-xl flex items-center justify-center mb-5 text-[11px] font-semibold text-[#999] tracking-widest"
          style={{ background: "repeating-conic-gradient(#ccc 0% 25%, #e8e8e8 0% 50%) 0 0 / 20px 20px" }}
        >
          BANNER IMAGE
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-[0_1px_4px_rgba(0,0,0,0.07)]">
          {/* Email */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1">
              メールアドレス <span className="text-[#E8002D]">*</span>
              <span className="block text-[11px] font-normal text-[#999]">Email Address *</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className={`${inputBase} ${emailValid && email ? "border-[#27AE60]" : "border-[#CCC]"}`}
              />
              {emailValid && email && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#27AE60]">✅</span>}
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1">
              パスワード（半角英数字8文字以上）<span className="text-[#E8002D]">*</span>
              <span className="block text-[11px] font-normal text-[#999]">Password (At least 8 alphanumeric characters) *</span>
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8文字以上の英数字"
                className={`${inputBase} pr-10 ${pwValid && password ? "border-[#27AE60]" : "border-[#CCC]"}`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] text-[15px]"
              >
                {showPw ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* DOB */}
          <div className="mb-4">
            <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1">
              生年月日 <span className="text-[#E8002D]">*</span>
              <span className="block text-[11px] font-normal text-[#999]">Date of Birth *</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px]">📅</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`${inputBase} pl-9 ${dobValid ? "border-[#27AE60]" : "border-[#CCC]"}`}
              />
              {dobValid && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#27AE60]">✅</span>}
            </div>
          </div>

          {/* Invitation code */}
          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-[#1A1A1A] mb-1">
              招待コード（任意）
              <span className="block text-[11px] font-normal text-[#999]">Invitation Code (Optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="招待コードをお持ちの場合は入力"
                className={`${inputBase} ${invite ? "border-[#27AE60]" : "border-[#CCC]"}`}
              />
              {invite && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#27AE60]">✅</span>}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 mb-5">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#E8002D]"
            />
            <label htmlFor="agree" className="text-[12.5px] text-[#555] leading-relaxed">
              会員登録により<a href="#" className="text-[#E8002D] font-bold">利用規約</a>及び
              <a href="#" className="text-[#E8002D] font-bold">プライバシーポリシー</a>に同意します<br />
              <span className="text-[11px] text-[#999]">
                By registering, you agree to the{" "}
                <a href="#" className="text-[#E8002D] font-bold">Terms of Service</a> and{" "}
                <a href="#" className="text-[#E8002D] font-bold">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* CTA */}
          <button
            disabled={!agreed}
            onClick={onRegister}
            className="w-full rounded-full py-4 text-[15px] font-bold text-white transition disabled:cursor-not-allowed disabled:bg-[#C9C9C9]"
            style={{ background: agreed ? "#E8002D" : undefined }}
          >
            無料で新規登録する<br />
            <span className="text-[11px] font-normal opacity-85">Sign Up for Free</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 text-[11px] text-[#999]">
          <span className="flex-1 h-px bg-[#E0E0E0]" />
          他の方法で登録する / Sign up with other methods
          <span className="flex-1 h-px bg-[#E0E0E0]" />
        </div>

        {/* Apple */}
        <button
          onClick={() => onToast("Apple サインアップ — coming soon", "info")}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-black py-3.5 text-[14px] font-bold text-white mb-3"
        >
          🍎 Appleでサインアップ
          <span className="text-[11px] font-normal opacity-75">Sign up with Apple</span>
        </button>

        {/* Google */}
        <button
          onClick={() => onToast("Google 登録 — coming soon", "info")}
          className="flex w-full items-center justify-center gap-3 rounded-full border-[1.5px] border-[#CCC] bg-white py-3.5 text-[14px] font-bold text-[#1A1A1A] mb-3 hover:border-[#E8002D]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Googleで登録
          <span className="text-[11px] font-normal text-[#999]">Sign up with Google</span>
        </button>

        {/* LINE */}
        <button
          onClick={() => onToast("LINE 登録 — coming soon", "info")}
          className="flex w-full items-center justify-center gap-3 rounded-full py-3.5 text-[14px] font-bold text-white mb-4"
          style={{ background: "#06C755" }}
        >
          💬 LINEで登録
          <span className="text-[11px] font-normal opacity-85">Sign up with LINE</span>
        </button>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#666] pb-8">
          すでにアカウントをお持ちですか？<a href="#" className="text-[#E8002D] font-bold">ログイン</a><br />
          <span className="text-[11px] text-[#999]">Already have an account? <a href="#" className="text-[#E8002D] font-bold">Log In</a></span>
        </p>
      </div>
    </div>
  );
}
