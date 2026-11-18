import { useState } from "react";
import { useLang } from "./AuthLayout";

export function Field({ id, label, error, hint, children }) {
  return (
    <div className="ax-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <div className="ax-err" role="alert">{error}</div> : hint ? <div className="ax-hint">{hint}</div> : null}
    </div>
  );
}

const Eye = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

export function PasswordInput({ value, onChange, autoComplete }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  return (
    <div className="ax-pw">
      <input id="pw" dir="ltr" type={show ? "text" : "password"} value={value} onChange={onChange}
        placeholder="••••••••••••" autoComplete={autoComplete} />
      <button type="button" className="ax-eye" onClick={() => setShow(!show)} aria-label={show ? t.hide : t.show}>
        <Eye off={show} />
      </button>
    </div>
  );
}
