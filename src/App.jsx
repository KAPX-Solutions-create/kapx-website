
import { useState, useEffect, useRef } from "react";

/* ─── EMAILJS CONFIG ─────────────────────────────────────────────────────────
   Sign up free at https://www.emailjs.com
   Replace the three values below with your real credentials.
   Template variables to map in your EmailJS template:
     {{from_name}}, {{from_email}}, {{company}}, {{budget}}, {{message}}
──────────────────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_uvbcjlh";
const EMAILJS_TEMPLATE_ID = "template_b6uugxs";
const EMAILJS_PUBLIC_KEY  = "yycoSu_d_hkdvn0dL";
const RECIPIENT_EMAIL     = "hello@kapxsolutions.com"; // ← update this

const BLUE = "#2563eb", DARK = "#0f172a", MUTED = "#475569", LIGHT = "#f8fafc", BORDER = "#e2e8f0";

/* ─── ICON COMPONENT ────────────────────────────────────────────────────────── */
const I = ({ id, size = 24, s = 2, color }) => {
  const paths = {
    terminal: ["M4 17l6-6-6-6", "M12 19h8"],
    code:     ["M16 18l6-6-6-6", "M8 6L2 12l6 6"],
    layers:   ["M12 2L2 7l10 5 10-5-10-5", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    shield:   ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
    file:     ["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8"],
    db:       ["M21 12c0 1.66-4 3-9 3s-9-1.34-9-3", "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"],
    menu:     ["M3 12h18", "M3 6h18", "M3 18h18"],
    x:        ["M18 6L6 18", "M6 6l12 12"],
    arrow:    ["M5 12h14", "M12 5l7 7-7 7"],
    send:     ["M22 2L11 13", "M22 2L15 22 11 13 2 9l20-7"],
    check:    ["M22 11.08V12a10 10 0 11-5.93-9.14", "M22 4L12 14.01 9 11.01"],
    bot:      ["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"],
    cpu:      ["M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 14h3M20 9h3M20 14h3","M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z","M9 9h6v6H9z"],
    chart:    ["M18 20V10", "M12 20V4", "M6 20v-6"],
    star:     ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
    mail:     ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
    phone:    ["M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.56 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"],
    sparkle:  ["M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z","M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"],
    linkedin: ["M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z","M2 9h4v12H2z","circle:4:4:2"],
    twitter:  ["M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"],
    github:   ["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"],
    mappin:   ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z","circle:12:10:3"],
    clock:    ["circle:12:12:10","M12 6v6l4 2"],
    zap:      ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
    plus:     ["M12 5v14","M5 12h14"],
    minus:    ["M5 12h14"],
  };
  const list = paths[id] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
      {list.map((d, i) => {
        if (d.startsWith("circle:")) { const [, cx, cy, r] = d.split(":"); return <circle key={i} cx={cx} cy={cy} r={r} />; }
        return <path key={i} d={d} />;
      })}
    </svg>
  );
};

/* ─── FADE-IN HOOK ──────────────────────────────────────────────────────────── */
const useInView = (ref) => {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
};
const FI = ({ children, d = 0, style = {} }) => {
  const r = useRef(); const v = useInView(r);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(20px)", transition: `opacity .55s ${d}s, transform .55s ${d}s`, ...style }}>{children}</div>;
};

/* ─── SHARED COMPONENTS ─────────────────────────────────────────────────────── */
const Pill = ({ c }) => <span style={{ background: "#eff6ff", color: "#1d4ed8", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em", padding: "4px 13px", borderRadius: 9999, display: "inline-block", marginBottom: 12 }}>{c}</span>;
const STitle = ({ label, title, sub, center }) => (
  <div style={{ marginBottom: 44, textAlign: center ? "center" : undefined }}>
    <Pill c={label} />
    <h2 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, color: DARK, letterSpacing: "-1px", margin: "0 0 10px" }}>{title}</h2>
    {sub && <p style={{ color: MUTED, fontSize: 16, fontWeight: 500, maxWidth: center ? 520 : 540, margin: center ? "0 auto" : 0, lineHeight: 1.65 }}>{sub}</p>}
  </div>
);
const Btn = ({ children, onClick, href, outline, full, disabled, small }) => {
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, padding: small ? "9px 18px" : "13px 26px", borderRadius: 9999, fontWeight: 700, fontSize: small ? 13 : 15, cursor: disabled ? "not-allowed" : "pointer", textDecoration: "none", border: "none", transition: "all .2s", opacity: disabled ? 0.5 : 1, width: full ? "100%" : undefined, boxSizing: "border-box" };
  const filled = { ...base, background: BLUE, color: "#fff", boxShadow: "0 4px 16px rgba(37,99,235,.25)" };
  const out = { ...base, background: "transparent", color: DARK, border: `1.5px solid ${BORDER}` };
  const s = outline ? out : filled;
  if (href) return <a href={href} style={s}>{children}</a>;
  return <button onClick={onClick} disabled={disabled} style={s}>{children}</button>;
};

/* ─── PAGES ─────────────────────────────────────────────────────────────────── */

/* HOME */
const Home = ({ setPage }) => {
  const counterRef = useRef(); const cv = useInView(counterRef);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  useEffect(() => {
    if (!cv) return;
    const targets = [40, 98, 24, 3]; let step = 0;
    const t = setInterval(() => { step++; const p = Math.min(step / 40, 1); setCounts(targets.map(n => Math.round(n * p))); if (step >= 40) clearInterval(t); }, 30);
    return () => clearInterval(t);
  }, [cv]);

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "88vh", display: "flex", alignItems: "center", padding: "72px 24px 56px", background: LIGHT, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "#93c5fd", opacity: .08, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
          <FI d={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, background: "#fff", padding: "7px 16px", borderRadius: 9999, border: `1px solid ${BORDER}`, boxShadow: "0 1px 6px rgba(0,0,0,.05)" }}>
              <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#60a5fa", animation: "ping 1.8s ease-in-out infinite" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: BLUE, display: "block" }} />
              </span>
              <span style={{ color: "#1d4ed8", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: ".09em" }}>Open for new engagements</span>
            </div>
          </FI>
          <FI d={.07}>
            <h1 style={{ fontSize: "clamp(38px,6vw,72px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 22, letterSpacing: "-2.5px", color: DARK, maxWidth: 780 }}>
              Intelligent Systems.<br />
              <span style={{ background: `linear-gradient(135deg,${BLUE},#06b6d4)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Expertly Engineered.</span>
            </h1>
          </FI>
          <FI d={.14}>
            <p style={{ color: MUTED, fontSize: 18, maxWidth: 520, marginBottom: 36, lineHeight: 1.72, fontWeight: 500 }}>
              KAPX builds custom AI systems and automations that replace manual workflows and give your team back hours every week — without disrupting how you already work.
            </p>
          </FI>
          <FI d={.2}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
              <Btn onClick={() => setPage("contact")}>Book a Free Call <I id="arrow" size={17} /></Btn>
              <button onClick={() => setPage("work")} style={{ color: MUTED, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 15, padding: "13px 4px" }}>See Our Work →</button>
            </div>
          </FI>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ overflow: "hidden", background: BLUE, padding: "10px 0" }}>
        <div style={{ display: "inline-flex", gap: 48, animation: "ticker 26s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, ri) =>
            ["Custom AI Systems","Workflow Automation","RAG & Knowledge Bases","API Integrations","AI Chatbots","Document Processing","Data Pipelines","Secure Architecture"].map((t, i) => (
              <span key={`${ri}-${i}`} style={{ color: "rgba(255,255,255,.8)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", display: "inline-flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,.35)", display: "inline-block" }} />{t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* STATS */}
      <section ref={counterRef} style={{ padding: "64px 24px", background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="stats-grid">
          {[{ v: `${counts[0]}+`, l: "Projects Delivered" }, { v: `${counts[1]}%`, l: "Client Satisfaction" }, { v: `${counts[2]}h`, l: "Response Guarantee" }, { v: `${counts[3]}x`, l: "Avg. Efficiency Gain" }].map(({ v, l }, i) => (
            <FI key={l} d={i * .07}>
              <div style={{ textAlign: "center", padding: "28px 12px", background: LIGHT, borderRadius: 14, border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: BLUE, letterSpacing: "-2px", lineHeight: 1 }}>{v}</div>
                <div style={{ color: MUTED, fontWeight: 600, fontSize: 13, marginTop: 7 }}>{l}</div>
              </div>
            </FI>
          ))}
        </div>
      </section>

      {/* QUICK SERVICES PREVIEW */}
      <section style={{ padding: "80px 24px", background: LIGHT }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <FI><STitle label="What We Do" title="Built for your exact problem." sub="Six core AI systems — each one customized to your tools, your team, and your workflow." /></FI>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="services-grid">
            {[
              { icon: "code", title: "Custom AI Integrations", desc: "Connect LLMs directly into your existing stack with tools built around your business context." },
              { icon: "layers", title: "Workflow Automation", desc: "Replace repetitive manual work with automated pipelines that run 24/7 without human error." },
              { icon: "shield", title: "Secure Architecture", desc: "Enterprise-grade design with zero-trust security, access controls, and audit logs built in." },
              { icon: "cpu", title: "RAG & Knowledge Bases", desc: "Build AI that answers questions from your own documents — contracts, manuals, databases." },
              { icon: "chart", title: "AI-Powered Analytics", desc: "Automated reports, anomaly detection, and natural-language querying over your data." },
              { icon: "bot", title: "Intelligent Chatbots", desc: "Context-aware assistants for support, Q&A, or lead qualification trained on your content." },
            ].map((s, i) => (
              <FI key={s.title} d={i * .06}>
                <div onClick={() => setPage("services")} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 24px 20px", cursor: "pointer", transition: "all .22s" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.09)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ color: BLUE, background: "#eff6ff", width: 46, height: 46, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><I id={s.icon} size={22} /></div>
                  <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: DARK }}>{s.title}</h3>
                  <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FI>
            ))}
          </div>
          <FI d={.3}><div style={{ textAlign: "center", marginTop: 36 }}><Btn outline onClick={() => setPage("services")}>View All Services <I id="arrow" size={16} /></Btn></div></FI>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ padding: "72px 24px", background: DARK }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FI><h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>Ready to start your first project?</h2></FI>
          <FI d={.1}><p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.65, marginBottom: 28 }}>No commitment required. Tell us your problem and we'll come back within 24 hours with a clear plan.</p></FI>
          <FI d={.18}><Btn onClick={() => setPage("contact")}>Submit a Request <I id="send" size={16} /></Btn></FI>
        </div>
      </section>
    </div>
  );
};

/* SERVICES */
const Services = ({ setPage }) => {
  const services = [
    { icon: "code", title: "Custom AI Integrations", tags: ["Claude API", "OpenAI", "Webhooks"], desc: "Connect powerful LLMs like Claude or GPT-4 directly into your existing software stack. Whether it's your CRM, internal dashboard, or a bespoke tool — we build AI that understands your business context and speaks your language.", detail: ["Full API integration with your existing tools", "Custom prompt engineering and fine-tuning", "Secure credential management and key vaulting", "Testing, documentation, and team handoff"] },
    { icon: "layers", title: "Workflow Automation", tags: ["n8n", "Make.com", "Python", "Zapier"], desc: "We map your manual processes, identify every bottleneck, and replace repetitive work with reliable automated pipelines. From invoice processing to email triage — set it up once, run it forever.", detail: ["Full workflow audit and bottleneck analysis", "Automated pipelines with error handling and alerts", "Integrations with 500+ tools via API", "Monitoring dashboards and run logs"] },
    { icon: "shield", title: "Secure Architecture", tags: ["Zero-trust", "SOC 2 aligned", "Audit logs"], desc: "Every system we build starts with security. Access controls, encryption at rest and in transit, detailed audit logs, and compliance-aligned design — so your data stays yours.", detail: ["Threat modeling and architecture review", "Role-based access control (RBAC)", "Encryption and secrets management", "Compliance documentation (GDPR, HIPAA-aligned)"] },
    { icon: "cpu", title: "RAG & Knowledge Bases", tags: ["Vector DBs", "Embeddings", "Pinecone", "Weaviate"], desc: "Build AI that knows your documents. Upload contracts, manuals, policy docs, or entire databases and get a private assistant that answers questions accurately — only from your data.", detail: ["Document ingestion and chunking pipelines", "Semantic search with vector embeddings", "Hallucination guardrails and source citation", "Incremental re-indexing as docs update"] },
    { icon: "chart", title: "AI-Powered Analytics", tags: ["Python", "SQL", "Dashboards"], desc: "Stop waiting for monthly reports. We build systems that monitor your data continuously, surface anomalies instantly, and let you ask questions in plain English and get answers immediately.", detail: ["Automated scheduled reporting", "Anomaly detection and alert systems", "Natural language querying over your data warehouse", "Interactive dashboards with drill-down capability"] },
    { icon: "bot", title: "Intelligent Chatbots", tags: ["Multi-turn", "Handoff logic", "CRM sync"], desc: "Deploy smart, context-aware assistants for customer support, internal Q&A, or lead qualification — trained on your content, connected to your systems, with a clear handoff to humans when needed.", detail: ["Custom persona and tone configuration", "Multi-turn conversation with memory", "Live agent escalation and handoff routing", "CRM and helpdesk integration (HubSpot, Zendesk, etc.)"] },
  ];
  return (
    <div style={{ padding: "72px 24px", background: LIGHT, minHeight: "80vh" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FI><STitle label="Services" title="Everything we build." sub="Each engagement is fixed-price, scoped in advance, and delivered with full documentation." /></FI>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {services.map((s, i) => (
            <FI key={s.title} d={i * .06}>
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 18, padding: "32px 32px 28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }} className="service-row">
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ color: BLUE, background: "#eff6ff", width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I id={s.icon} size={24} /></div>
                    <div>
                      <h3 style={{ fontWeight: 800, fontSize: 18, color: DARK, margin: 0 }}>{s.title}</h3>
                      <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                        {s.tags.map(t => <span key={t} style={{ background: LIGHT, color: "#334155", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 9999, border: `1px solid ${BORDER}` }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.72 }}>{s.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 12 }}>What's included</div>
                  {s.detail.map(d => (
                    <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 9 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <I id="check" size={11} color="#16a34a" s={2.5} />
                      </div>
                      <span style={{ color: DARK, fontSize: 14, fontWeight: 500 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FI>
          ))}
        </div>
        <FI d={.3}><div style={{ textAlign: "center", marginTop: 44 }}><Btn onClick={() => setPage("contact")}>Start a Project <I id="arrow" size={16} /></Btn></div></FI>
      </div>
    </div>
  );
};

/* PROCESS */
const Process = ({ setPage }) => {
  const steps = [
    { n: "01", icon: "phone", title: "Discovery Call", time: "30 min", desc: "We spend 30 minutes understanding your exact bottlenecks, tools, and goals. No pitch — just an honest assessment of what's buildable and what the ROI looks like.", detail: "Come prepared with a description of the problem you're trying to solve. I'll ask questions, challenge assumptions, and by the end you'll have a clear idea of whether this is a good fit — before any money changes hands." },
    { n: "02", icon: "file", title: "Scoped Proposal", time: "1–2 days", desc: "You receive a clear, fixed-price proposal: exact deliverables, timeline, tech stack, and price. No surprise invoices. No scope creep.", detail: "Everything is documented in writing before work starts. If requirements change mid-project, we discuss it openly and adjust the scope together. You always know exactly what you're paying for." },
    { n: "03", icon: "zap", title: "Build & Iterate", time: "1–4 weeks", desc: "I ship a working prototype fast — often within a week. You test it in the real world, give feedback, and we iterate until it's exactly right.", detail: "You get a private staging environment from day one. No waiting until the end to see results. Weekly check-ins keep you in the loop and catch any misalignments early." },
    { n: "04", icon: "layers", title: "Deploy & Handoff", time: "2–3 days", desc: "I handle deployment to your infrastructure and walk your team through the system. You get documentation, source code, and 30 days of post-launch support.", detail: "The system is yours — source code, docs, everything. I don't lock you into proprietary tools or ongoing subscriptions you don't need. After handoff, optional retainer support is available." },
  ];
  return (
    <div style={{ padding: "72px 24px", background: "#fff", minHeight: "80vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FI><STitle label="Process" title="How a project runs." sub="From first conversation to deployed system — typically under four weeks." /></FI>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom,${BLUE},${BORDER})`, zIndex: 0 }} />
          {steps.map((s, i) => (
            <FI key={s.n} d={i * .1}>
              <div style={{ display: "flex", gap: 28, marginBottom: 44, position: "relative", zIndex: 1 }}>
                <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: "50%", background: BLUE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, boxShadow: `0 0 0 4px #fff, 0 0 0 6px ${BLUE}22` }}>{s.n}</div>
                <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 26px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 18, color: DARK }}>{s.title}</h3>
                    <span style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999 }}>{s.time}</span>
                  </div>
                  <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.72, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>{s.detail}</p>
                </div>
              </div>
            </FI>
          ))}
        </div>
        <FI d={.4}>
          <div style={{ background: DARK, borderRadius: 18, padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Ready to kick things off?</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>The discovery call is free and takes 30 minutes.</div>
            </div>
            <Btn onClick={() => setPage("contact")}>Book the Call <I id="arrow" size={16} /></Btn>
          </div>
        </FI>
      </div>
    </div>
  );
};

/* WORK */
const Work = ({ setPage }) => {
  const projects = [
    { tag: "Healthcare", dark: true, icon: "file", title: "AI Medical Intake", desc: "Automated patient intake that reads forms, extracts structured data, flags missing info, and routes to the right provider — reducing admin load by 60%.", result: "60% reduction in admin time", tech: ["Claude API", "Python", "Webhooks"] },
    { tag: "Legal", dark: false, icon: "db", title: "The Policy Filter", desc: "Translates complex lease and insurance policies into plain English summaries with risk flags and recommended follow-up questions.", result: "3 min per policy vs. 45 min", tech: ["RAG", "Embeddings", "Pinecone"] },
    { tag: "Finance", dark: false, icon: "chart", title: "Billing Auditor", desc: "Scans invoices and billing documents for errors, duplicate charges, and anomalies — then drafts dispute letters automatically.", result: "$12k recovered in first month", tech: ["OCR pipeline", "LLM analysis"] },
    { tag: "E-commerce", dark: true, icon: "bot", title: "Support Autopilot", desc: "Handles 80% of incoming support tickets without human intervention using order data, product docs, and a configurable escalation policy.", result: "80% ticket deflection rate", tech: ["Multi-turn chat", "CRM sync", "Zendesk"] },
    { tag: "Logistics", dark: false, icon: "layers", title: "Route Intelligence", desc: "Automated weekly route optimization that pulls live order data, applies constraint logic, and generates driver schedules — replacing 4 hours of manual planning.", result: "4 hrs/week saved per dispatcher", tech: ["Python", "Make.com", "Google Maps API"] },
    { tag: "Real Estate", dark: false, icon: "cpu", title: "Lease Analyzer", desc: "Reads uploaded lease agreements and produces structured summaries: key dates, obligations, penalty clauses, and renewal windows — in under 60 seconds.", result: "60s vs. 40 min manual review", tech: ["Claude API", "RAG", "PDF parsing"] },
  ];
  return (
    <div style={{ padding: "72px 24px", background: LIGHT, minHeight: "80vh" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <FI><STitle label="Our Work" title="Systems we've shipped." sub="Each one started as a real problem from a real business. Here's how we solved them." /></FI>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="work-grid">
          {projects.map((p, i) => (
            <FI key={p.title} d={i * .07}>
              <div style={{ borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", height: "100%", ...(p.dark ? { background: "linear-gradient(150deg,#0f172a,#1e293b)", border: "1px solid #1e293b" } : { background: "#fff", border: `1px solid ${BORDER}` }) }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = p.dark ? "0 14px 40px rgba(0,0,0,.2)" : "0 14px 40px rgba(0,0,0,.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                style={{ borderRadius: 18, padding: 28, display: "flex", flexDirection: "column", transition: "all .22s", ...(p.dark ? { background: "linear-gradient(150deg,#0f172a,#1e293b)", border: "1px solid #1e293b" } : { background: "#fff", border: `1px solid ${BORDER}` }) }}>
                <span style={{ background: p.dark ? "rgba(255,255,255,.1)" : "#eff6ff", color: p.dark ? "#93c5fd" : "#1d4ed8", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: ".08em", display: "inline-block", marginBottom: 16, width: "fit-content" }}>{p.tag}</span>
                <div style={{ color: p.dark ? "#fff" : BLUE, background: p.dark ? "rgba(255,255,255,.08)" : "#eff6ff", width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}><I id={p.icon} size={22} /></div>
                <h3 style={{ fontWeight: 800, fontSize: 17, color: p.dark ? "#fff" : DARK, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ color: p.dark ? "#94a3b8" : MUTED, fontSize: 13, lineHeight: 1.68, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                <div style={{ background: p.dark ? "rgba(34,197,94,.12)" : "#f0fdf4", border: `1px solid ${p.dark ? "rgba(34,197,94,.2)" : "#bbf7d0"}`, borderRadius: 9, padding: "7px 12px", marginBottom: 14 }}>
                  <span style={{ color: p.dark ? "#4ade80" : "#15803d", fontSize: 12, fontWeight: 700 }}>Result: {p.result}</span>
                </div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {p.tech.map(t => <span key={t} style={{ background: p.dark ? "rgba(255,255,255,.07)" : LIGHT, color: p.dark ? "#94a3b8" : "#475569", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 9999, border: p.dark ? "1px solid rgba(255,255,255,.1)" : `1px solid ${BORDER}` }}>{t}</span>)}
                </div>
              </div>
            </FI>
          ))}
        </div>
        <FI d={.3}><div style={{ textAlign: "center", marginTop: 44 }}><Btn onClick={() => setPage("contact")}>Start Your Project <I id="arrow" size={16} /></Btn></div></FI>
      </div>
    </div>
  );
};

/* FAQ */
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How long does a typical project take?", a: "Most projects are delivered in 2–4 weeks. Simple automations can be done in under a week. Larger multi-integration systems may take 6–8 weeks. You'll know the timeline exactly before any work begins." },
    { q: "Do I need technical knowledge to work with you?", a: "Not at all. You describe your problem in plain English. I handle everything technical — architecture, code, deployment, and documentation. You review the output, not the code." },
    { q: "What happens to my data?", a: "Your data never trains any public model. I use enterprise API contracts where data is not retained for training. All credentials are managed through secure vaults with no plaintext storage." },
    { q: "Is everything really fixed-price?", a: "Yes. You receive a scoped proposal with a single fixed price before any work begins. If requirements change, we discuss it openly and adjust scope in writing before proceeding. No surprise invoices, ever." },
    { q: "What does it typically cost?", a: "Most engagements fall between $2,000 and $15,000 depending on complexity. Simple single-workflow automations start around $2,000. Multi-system integrations with custom UI and analytics sit at the higher end." },
    { q: "Do you offer ongoing support?", a: "Every project includes 30 days of post-launch support at no extra cost. After that, optional monthly maintenance retainers are available for monitoring, updates, and small enhancements." },
    { q: "Which AI models do you work with?", a: "Primarily Claude (Anthropic) and GPT-4o (OpenAI), chosen based on your use case. For privacy-sensitive workloads I can also deploy open-source models (Mistral, LLaMA) on your own infrastructure." },
    { q: "Will my team be able to use and maintain the system?", a: "Yes. Every delivery includes user documentation and a walkthrough session for your team. Systems are built to be operated by non-technical users. You're never dependent on me to keep things running." },
  ];
  return (
    <div style={{ padding: "72px 24px", background: "#fff", minHeight: "80vh" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FI><STitle label="FAQ" title="Common questions." sub="Everything you need to know before starting a project with KAPX." /></FI>
        {faqs.map((item, i) => (
          <FI key={i} d={i * .04}>
            <div onClick={() => setOpen(open === i ? null : i)} style={{ borderBottom: `1px solid ${BORDER}`, padding: "18px 0", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: DARK }}>{item.q}</span>
                <div style={{ flexShrink: 0, color: BLUE, transition: "transform .2s", transform: open === i ? "rotate(45deg)" : "none" }}>
                  <I id="plus" size={19} />
                </div>
              </div>
              {open === i && <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.75, marginTop: 12, paddingRight: 32 }}>{item.a}</p>}
            </div>
          </FI>
        ))}
      </div>
    </div>
  );
};

/* CONTACT */
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", budget: "", project: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errDetail, setErrDetail] = useState("");

  const send = async () => {
    if (!form.name || !form.email || !form.project) return;
    setStatus("sending");
    try {
      /* EmailJS send — replace credentials at top of file */
      const res = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            to_email: RECIPIENT_EMAIL,
            from_name: form.name,
            from_email: form.email,
            company: form.company || "Not provided",
            budget: form.budget || "Not specified",
            message: form.project,
          },
        }),
      });
      const text = await res.text();
      if (res.ok) { setStatus("success"); }
      else { setStatus("error"); console.error("EmailJS error:", res.status, text); setErrDetail(`${res.status}: ${text}`); }
    } catch (e) { setStatus("error"); setErrDetail(e.message); }
  };

  const inp = { width: "100%", background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "11px 14px", outline: "none", fontWeight: 500, color: DARK, fontSize: 15, boxSizing: "border-box", fontFamily: "inherit" };
  const canSubmit = form.name && form.email && form.project && status !== "sending";

  return (
    <div style={{ padding: "72px 24px", background: LIGHT, minHeight: "80vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }} className="contact-layout">

        {/* LEFT INFO */}
        <div>
          <FI><STitle label="Contact" title="Let's talk about your project." sub="Tell me what you're trying to solve. I'll review it personally and reply within 24 hours." /></FI>
          <FI d={.08}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {[
                { icon: "mail", label: "Email", value: "KAPX-Solutions@kapxsolutionsllc.com" },
                { icon: "clock", label: "Response time", value: "Within 24 hours" },
                { icon: "mappin", label: "Location", value: "Remote — serving clients worldwide" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "#eff6ff", color: BLUE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I id={icon} size={20} /></div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".07em" }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: DARK }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FI>
          <FI d={.14}>
            <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "20px 22px" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: DARK, marginBottom: 10 }}>What to include in your message:</div>
              {["What your current process looks like", "Where the bottleneck or pain point is", "What tools you currently use", "Any timeline or budget constraints"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><I id="check" size={9} color="#16a34a" s={2.5} /></div>
                  <span style={{ fontSize: 13, color: MUTED }}>{t}</span>
                </div>
              ))}
            </div>
          </FI>
        </div>

        {/* RIGHT FORM */}
        <FI d={.1}>
          <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ color: "#22c55e", display: "flex", justifyContent: "center", marginBottom: 16 }}><I id="check" size={60} /></div>
                <h3 style={{ fontWeight: 800, fontSize: 22, color: DARK, marginBottom: 10 }}>Request sent.</h3>
                <p style={{ color: MUTED, fontSize: 15, lineHeight: 1.65 }}>Your message has been delivered to KAPX. Expect a personal reply within 24 hours.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: DARK, margin: "0 0 4px" }}>Submit a project request</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-grid">
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Full Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Work Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@company.com" style={inp} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="form-grid">
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Company</label>
                    <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" style={inp} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Budget Range</label>
                    <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} style={{ ...inp, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                      <option value="">Select...</option>
                      <option>Under $2,000</option>
                      <option>$2,000 – $5,000</option>
                      <option>$5,000 – $15,000</option>
                      <option>$15,000+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>Describe your problem *</label>
                  <textarea value={form.project} onChange={e => setForm({ ...form, project: e.target.value })} rows={5} placeholder="What manual process or bottleneck are you trying to solve? What tools do you currently use? The more detail, the better." style={{ ...inp, resize: "none" }} />
                </div>
                {status === "error" && (
                  <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 9, padding: "10px 14px", color: "#dc2626", fontSize: 13, fontWeight: 600 }}>
                    Something went wrong. Please email KAPX-Solutions@kapxsolutionsllc.com directly or check your EmailJS credentials.
                  {errDetail && <div style={{ marginTop: 6, fontSize: 12, fontFamily: "monospace", color: "#991b1b" }}>{errDetail}</div>}
                  </div>
                )}
                <button onClick={send} disabled={!canSubmit} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", background: canSubmit ? BLUE : "#cbd5e1", color: "#fff", fontWeight: 700, borderRadius: 9999, border: "none", cursor: canSubmit ? "pointer" : "not-allowed", fontSize: 15, transition: "background .2s" }}>
                  {status === "sending" ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spinFast .7s linear infinite", display: "inline-block" }} />Sending...
                    </span>
                  ) : <>Send Request <I id="send" size={16} /></>}
                </button>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>No commitment required · Your info stays private</p>
              </div>
            )}
          </div>
        </FI>
      </div>
    </div>
  );
};

/* ─── ROOT APP ──────────────────────────────────────────────────────────────── */
const PAGES = ["home", "services", "process", "work", "faq", "contact"];
const PAGE_LABELS = { home: "Home", services: "Services", process: "Process", work: "Work", faq: "FAQ", contact: "Contact" };

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const topRef = useRef();

  const navigate = (p) => { setPage(p); setMenuOpen(false); topRef.current?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div ref={topRef} style={{ fontFamily: "system-ui,-apple-system,sans-serif", color: DARK, background: "#fff" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes ping{0%{transform:scale(1);opacity:.8}75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes spinFast{to{transform:rotate(360deg)}}
        input:focus,textarea:focus,select:focus{border-color:${BLUE}!important;box-shadow:0 0 0 3px rgba(37,99,235,.12)!important;outline:none}
        @media(max-width:900px){
          .services-grid{grid-template-columns:1fr 1fr!important}
          .service-row{grid-template-columns:1fr!important;gap:16px!important}
          .work-grid{grid-template-columns:1fr 1fr!important}
          .stats-grid{grid-template-columns:1fr 1fr!important}
          .contact-layout{grid-template-columns:1fr!important}
        }
        @media(max-width:600px){
          .services-grid{grid-template-columns:1fr!important}
          .work-grid{grid-template-columns:1fr!important}
          .stats-grid{grid-template-columns:1fr 1fr!important}
          .desktop-nav{display:none!important}
          .mobile-btn{display:flex!important}
          .form-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ background: BLUE, padding: 7, borderRadius: 7, display: "flex" }}><I id="terminal" size={18} color="#fff" /></div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: DARK }}>KAPX<span style={{ color: BLUE }}>.</span></span>
          </button>
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {PAGES.filter(p => p !== "home").map(p => (
              <button key={p} onClick={() => navigate(p)} style={{ padding: "7px 15px", borderRadius: 9999, border: "none", background: page === p ? "#eff6ff" : "transparent", color: page === p ? BLUE : "#64748b", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .18s" }}>
                {PAGE_LABELS[p]}
              </button>
            ))}
            <button onClick={() => navigate("contact")} style={{ marginLeft: 8, padding: "9px 20px", background: DARK, color: "#fff", fontWeight: 700, borderRadius: 9999, border: "none", fontSize: 14, cursor: "pointer" }}>
              Start a Project
            </button>
          </div>
          <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: LIGHT, border: "none", padding: 8, borderRadius: 9999, cursor: "pointer" }}>
            <I id={menuOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ borderTop: `1px solid ${BORDER}`, background: "#fff", padding: "18px 24px 24px" }}>
            {PAGES.filter(p => p !== "home").map(p => (
              <button key={p} onClick={() => navigate(p)} style={{ display: "block", width: "100%", textAlign: "left", color: page === p ? BLUE : MUTED, fontWeight: 700, fontSize: 17, background: "none", border: "none", cursor: "pointer", marginBottom: 18, padding: 0 }}>{PAGE_LABELS[p]}</button>
            ))}
            <button onClick={() => navigate("contact")} style={{ display: "inline-flex", padding: "12px 24px", background: BLUE, color: "#fff", fontWeight: 700, borderRadius: 9999, border: "none", fontSize: 15, cursor: "pointer" }}>Start a Project</button>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      {page === "home"     && <Home setPage={navigate} />}
      {page === "services" && <Services setPage={navigate} />}
      {page === "process"  && <Process setPage={navigate} />}
      {page === "work"     && <Work setPage={navigate} />}
      {page === "faq"      && <FAQ />}
      {page === "contact"  && <Contact />}

      {/* FOOTER */}
      <footer style={{ background: DARK, padding: "52px 24px 28px", borderTop: "1px solid #1e293b" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 36, marginBottom: 40 }} className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ background: BLUE, padding: 7, borderRadius: 7, display: "flex" }}><I id="terminal" size={17} color="#fff" /></div>
                <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>KAPX<span style={{ color: BLUE }}>.</span></span>
              </div>
              <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, maxWidth: 240, marginBottom: 18 }}>Applied AI Engineering for businesses that want to move faster without hiring a team.</p>
              <div style={{ display: "flex", gap: 9 }}>
                {["linkedin", "twitter", "github"].map(s => (
                  <div key={s} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748b", transition: "all .18s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = "#93c5fd"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.color = "#64748b"; }}>
                    <I id={s} size={15} />
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: [["services","Custom Integrations"],["services","Workflow Automation"],["services","RAG Systems"],["services","AI Chatbots"]] },
              { title: "Company", links: [["process","Process"],["work","Our Work"],["faq","FAQ"]] },
              { title: "Contact", links: [[null, RECIPIENT_EMAIL],[null,"Remote · Worldwide"]] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>{col.title}</div>
                {col.links.map(([p, l]) => (
                  <div key={l} onClick={() => p && navigate(p)} style={{ color: "#64748b", fontSize: 13, marginBottom: 9, cursor: p ? "pointer" : "default", transition: "color .18s" }}
                    onMouseOver={e => { if (p) e.currentTarget.style.color = "#94a3b8"; }}
                    onMouseOut={e => { e.currentTarget.style.color = "#64748b"; }}>{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1e293b", paddingTop: 22, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "#475569", fontSize: 12 }}>&copy; {new Date().getFullYear()} KAPX Solutions LLC. All rights reserved.</span>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 600 }}>Accepting new clients</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
