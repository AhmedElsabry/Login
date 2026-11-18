import { createContext, useContext, useEffect, useState } from "react";
import { TEXT } from "./i18n";
import "./auth.css";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("aegix-lang") || "en"; } catch { return "en"; }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = TEXT[lang].dir;
    try { localStorage.setItem("aegix-lang", lang); } catch { /* ignore */ }
  }, [lang]);
  const value = { lang, setLang, t: TEXT[lang] };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

const Shield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const Tick = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export default function AuthLayout({ children }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`ax ${lang === "ar" ? "ax-ar" : ""}`}>
      <aside className="ax-brand">
        <div className="ax-logo">
          <div className="ax-mark"><Shield /></div>
          <div>
            <div className="ax-name">AEGIX</div>
            <div className="ax-sub" dir="ltr">AI FACTORY SAFETY INTELLIGENCE</div>
          </div>
        </div>
        <div>
          <h2>{t.tag}</h2>
          <ul>{t.points.map((p) => <li key={p}><Tick /><span>{p}</span></li>)}</ul>
        </div>
        <div className="ax-foot">{t.foot}</div>
      </aside>
      <main className="ax-main">
        <div className="ax-lang">
          <button type="button" className="ax-link" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
            {t.switchLang}
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
