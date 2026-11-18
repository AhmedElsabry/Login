import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout, { useLang } from "./AuthLayout";
import { Field, PasswordInput } from "./fields";

export default function LoginPage() {
  const { t } = useLang();
  const c = t.login;
  const [f, setF] = useState({ id: "", pw: "", remember: false });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.id.trim()) er.id = t.err.required;
    if (!f.pw.trim()) er.pw = t.err.required;
    setErrors(er);
    setMsg(Object.keys(er).length ? "" : c.done);
    // TODO: POST to your backend (e.g. /api/auth/login), then navigate to the dashboard
  };

  return (
    <AuthLayout>
      <form className="ax-card" onSubmit={submit} noValidate>
        <h1>{c.title}</h1>
        <p className="ax-lead">{c.sub}</p>

        <Field id="id" label={c.id} error={errors.id}>
          <input id="id" dir="ltr" value={f.id} onChange={set("id")} placeholder="name@company.com" autoComplete="username" />
        </Field>
        <Field id="pw" label={c.pw} error={errors.pw}>
          <PasswordInput value={f.pw} onChange={set("pw")} autoComplete="current-password" />
        </Field>

        <div className="ax-row">
          <label className="ax-check"><input type="checkbox" checked={f.remember} onChange={set("remember")} />{c.remember}</label>
          <Link to="/forgot-password" className="ax-link">{c.forgot}</Link>
        </div>

        <button type="submit" className="ax-btn">{c.btn}</button>
        <div className="ax-or"><span />{c.or}<span /></div>
        <button type="button" className="ax-ghost">{c.sso}</button>

        {msg && <div className="ax-ok" role="status">{msg}</div>}

        <div className="ax-switch">
          {c.q} <Link to="/signup" className="ax-link">{c.a}</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
