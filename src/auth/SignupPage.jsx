import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout, { useLang } from "./AuthLayout";
import { Field, PasswordInput } from "./fields";

export default function SignupPage() {
  const { t } = useLang();
  const c = t.signup;
  const [f, setF] = useState({ name: "", email: "", site: "", role: "", pw: "", terms: false });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = t.err.required;
    if (!f.email.trim()) er.email = t.err.required;
    else if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = t.err.email;
    if (!f.pw) er.pw = t.err.required;
    else if (f.pw.length < 12) er.pw = t.err.pw;
    if (!f.terms) er.terms = t.err.terms;
    setErrors(er);
    setMsg(Object.keys(er).length ? "" : c.done);
    // TODO: POST to your backend (e.g. /api/auth/register)
  };

  return (
    <AuthLayout>
      <form className="ax-card" onSubmit={submit} noValidate>
        <h1>{c.title}</h1>
        <p className="ax-lead">{c.sub}</p>

        <Field id="name" label={c.name} error={errors.name}>
          <input id="name" value={f.name} onChange={set("name")} autoComplete="name" />
        </Field>
        <Field id="email" label={c.email} error={errors.email}>
          <input id="email" dir="ltr" type="email" value={f.email} onChange={set("email")} placeholder="name@company.com" autoComplete="email" />
        </Field>
        <Field id="site" label={c.site}>
          <select id="site" value={f.site} onChange={set("site")}>{c.sites.map((s) => <option key={s}>{s}</option>)}</select>
        </Field>
        <Field id="role" label={c.role}>
          <select id="role" value={f.role} onChange={set("role")}>{c.roles.map((r) => <option key={r}>{r}</option>)}</select>
        </Field>
        <Field id="pw" label={c.pw} error={errors.pw} hint={c.hint}>
          <PasswordInput value={f.pw} onChange={set("pw")} autoComplete="new-password" />
        </Field>

        <label className="ax-check ax-terms"><input type="checkbox" checked={f.terms} onChange={set("terms")} />{c.terms}</label>
        {errors.terms && <div className="ax-err" role="alert">{errors.terms}</div>}

        <button type="submit" className="ax-btn">{c.btn}</button>
        {msg && <div className="ax-ok" role="status">{msg}</div>}

        <div className="ax-switch">
          {c.q} <Link to="/login" className="ax-link">{c.a}</Link>
        </div>
      </form>
    </AuthLayout>
  );
}
