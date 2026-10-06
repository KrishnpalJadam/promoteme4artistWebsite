import React, { useEffect, useState } from "react";
import "./styles.css";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { pageMarkup } from "./pageMarkup";

const navItems = [
  ["/", "Home"],
  ["/how-it-works", "How It Works"],
  ["/features", "Features"],
  ["/faq", "FAQ"],
  ["/contact", "Contact"],
];

function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img src="/assets/logo.png" alt="PromoteMe4Artist logo" className=" hrink-0 rounded-xl object-cover object-top" style={{width: "70px"}} />
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight">
              Promote<span className="text-brand-gradient">Me4</span>Artist
            </span>
       
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([to, label]) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-secondary hover:text-foreground ${active ? "text-foreground bg-secondary" : "text-muted-foreground"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a
            href="#download"
            className="hidden rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-brand transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Get the App
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-background px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navItems.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {label}
              </Link>
            ))}
            <a href="#download" className="mt-1 rounded-xl bg-brand-gradient px-4 py-3 text-center text-sm font-bold text-primary-foreground">
              Get the App
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return <div dangerouslySetInnerHTML={{ __html: pageMarkup.footer }} />;
}

function SourcePage({ slug, title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div
      className="flex-1"
      dangerouslySetInnerHTML={{ __html: pageMarkup[slug] }}
    />
  );
}

function ContactPage() {
  useEffect(() => {
    document.title = meta.contact[0];
    window.scrollTo(0, 0);

    const form = document.querySelector(".card-surface form");
    if (!form) return;

    const submit = (event) => {
      event.preventDefault();
      const topic = form.querySelector("#topic")?.value || "";
      const name = form.querySelector("#name")?.value || "";
      const email = form.querySelector("#email")?.value || "";
      const message = form.querySelector("#message")?.value || "";
      const subject = encodeURIComponent(`${topic} — ${name || "Website visitor"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
      window.location.href = `mailto:support@promoteme4artist.com?subject=${subject}&body=${body}`;
    };

    form.addEventListener("submit", submit);
    return () => form.removeEventListener("submit", submit);
  }, []);

  return <SourcePage slug="contact" title={meta.contact[0]} description={meta.contact[1]} />;
}

function HomePage() {
  useEffect(() => {
    document.title = meta.home[0];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", meta.home[1]);
    window.scrollTo(0, 0);
  }, []);

  return <div className="flex-1" dangerouslySetInnerHTML={{ __html: pageMarkup.home }} />;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<SourcePage slug="how-it-works" title={meta["how-it-works"][0]} description={meta["how-it-works"][1]} />} />
          <Route path="/features" element={<SourcePage slug="features" title={meta.features[0]} description={meta.features[1]} />} />
          <Route path="/faq" element={<SourcePage slug="faq" title={meta.faq[0]} description={meta.faq[1]} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  useEffect(() => { document.title = "Page Not Found — PromoteMe4Artist"; window.scrollTo(0, 0); }, []);
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="mt-3 text-4xl font-extrabold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-8 inline-flex rounded-xl bg-brand-gradient px-5 py-3 text-sm font-extrabold text-primary-foreground shadow-brand">
        Back to home
      </Link>
    </section>
  );
}

const meta = {
  "home": ["PromoteMe4Artist — Promote Your YouTube Videos With Credits", "Earn credits by watching and engaging with other creators, then spend them promoting your own YouTube videos."],
  "how-it-works": ["How It Works — PromoteMe4Artist", "Create a campaign, earn credits by watching eligible videos, and spend credits to promote your own YouTube videos."],
  "features": ["Features — PromoteMe4Artist", "Campaign creation, a credit and reward system, video submission, promotion tracking, watch-time options and secure account connection."],
  "faq": ["FAQ — PromoteMe4Artist", "Answers about promoting videos, earning and calculating credits, video distribution, YouTube account connection and prohibited content."],
  "contact": ["Contact & Support — PromoteMe4Artist", "Contact PromoteMe4Artist support: report a problem, ask about credits and campaigns, or request account deletion."]
};

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
