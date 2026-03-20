import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

type Page = {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: Array<{
    label: string;
    href?: string;
  }>;
};

const pages: Page[] = [
  {
    id: "about",
    slug: "about",
    eyebrow: "Build Log 00",
    title: "About me",
    description:
      "Should I add an introduction here for recruiters? Are there still recruiters for software engineers? Are there still going to be software engineers?",
    bullets: [
      {
        label:
          "Focused on shipping polished interfaces for real use instead of collecting half-finished experiments",
      },
      {
        label:
          "Usually working across React, TypeScript, UI systems, and the messy middle between design and implementation",
      },
      {
        label:
          "The two labels above and this entire site are AI-generated and very mildly tweaked",
      },
    ],
  },
  {
    id: "projects",
    slug: "projects",
    eyebrow: "Build Log 01",
    title: "Projects",
    description:
      "A list of my applications for free public use. The sky used to be the limit, now its the number of my account's AI tokens.",
    bullets: [
      {
        label:
          "A finance tracker with built-in retirement planning and projection tools. For the FIRE-minded",
        href: "/time-to-fire",
      },
    ],
  },
  {
    id: "lab",
    slug: "lab",
    eyebrow: "Build Log 02",
    title: "Lab notes and prototypes",
    description:
      "A corner for interface sketches, visual tests, and over-caffeinated front-end experiments that survive long enough to become features.",
    bullets: [
      { label: "CSS motion studies with practical performance budgets" },
      {
        label: "Rapid TS components that prefer clarity over framework theater",
      },
      { label: "Testing ideas in public before pretending they were obvious" },
    ],
  },
  {
    id: "contact",
    slug: "contact",
    eyebrow: "Build Log 03",
    title: "Contact the control room",
    description:
      "If you want to collaborate, commission something, or trade oddly specific web opinions, this is the hatch to knock on.",
    bullets: [
      { label: "Email: hello@waynewee.com" },
      {
        label: "Response mode: concise, technical, and usually caffeinated",
      },
      {
        label:
          "Best for: landing pages, portfolios, product sites, and front-end cleanup",
      },
    ],
  },
];

function PrimaryNavLink({ to, children }: { to: string; children: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "nav-link is-active" : "nav-link"
      }
    >
      {children}
    </NavLink>
  );
}

function PageView({ page }: { page: Page }) {
  const isAboutPage = page.slug === "about";

  return (
    <section className={`subpage ${isAboutPage ? "subpage-about" : ""}`}>
      {isAboutPage ? (
        <div className="about-portrait">
          <div className="portrait-frame">
            <img
              className="portrait-image"
              src="/profile-img.jpg"
              alt="Portrait of Wayne Wee"
            />
          </div>
        </div>
      ) : null}

      <div className="subpage-content">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="lede">{page.description}</p>
        <ul className="bullet-list">
          {page.bullets.map((bullet) => (
            <li key={bullet.label}>
              {bullet.href ? (
                <a target="_blank" className="bullet-link" href={bullet.href}>
                  {bullet.label}
                </a>
              ) : (
                bullet.label
              )}
            </li>
          ))}
        </ul>
        <div className="button-row">
          <Link className="button button-primary" to="/">
            Return to launch screen
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <section className="hero-panel">
      <div className="hero-copy">
        <p className="eyebrow">A place for my little apps</p>
        <h1>Hello. Welcome to waynewee . com</h1>
        <p className="lede">
          A collection of actual apps built by me (but mostly by AI) meant for
          actual use, built for niche markets (but mostly for myself).
        </p>
        <div className="button-row">
          <Link className="button button-secondary" to="/about">
            About me
          </Link>
          <Link className="button button-primary" to="/projects">
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExternalRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return null;
}

function AppShell() {
  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand-mark">&lt;/&gt;</span>
          waynewee.com
        </Link>
        <nav className="topnav" aria-label="Primary">
          <PrimaryNavLink to="/about">About</PrimaryNavLink>
          <PrimaryNavLink to="/projects">Projects</PrimaryNavLink>
          <PrimaryNavLink to="/lab">Lab</PrimaryNavLink>
          <PrimaryNavLink to="/contact">Contact</PrimaryNavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/time-to-fire"
          element={
            <ExternalRedirect href="https://waynewee.github.io/time-to-fire" />
          }
        />
        {pages.map((page) => (
          <Route
            key={page.id}
            path={`/${page.slug}`}
            element={<PageView page={page} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
