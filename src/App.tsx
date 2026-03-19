import { useEffect, useState } from "react";
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
        href: "https://waynewee.github.io/time-to-fire",
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

const routeFromHash = () => window.location.hash.replace("#", "") || "home";

function App() {
  const [route, setRoute] = useState(routeFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const currentPage = pages.find((page) => page.slug === route);

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">&lt;/&gt;</span>
          waynewee.com
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#projects">Projects</a>
          <a href="#lab">Lab</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {currentPage ? (
        <section className="subpage">
          <p className="eyebrow">{currentPage.eyebrow}</p>
          <h1>{currentPage.title}</h1>
          <p className="lede">{currentPage.description}</p>
          <ul className="bullet-list">
            {currentPage.bullets.map((bullet) => (
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
            <a className="button button-primary" href="#home">
              Return to launch screen
            </a>
          </div>
        </section>
      ) : (
        <>
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">A place for my little apps</p>
              <h1>Hello. Welcome to waynewee . com</h1>
              <p className="lede">
                A collection of actual apps built by me (but mostly by AI) meant
                for actual use, built for niche markets (but mostly for myself).
              </p>
              <div className="button-row">
                <a className="button button-primary" href="#projects">
                  Browse projects
                </a>
                <button
                  className="button button-secondary"
                  type="button"
                  disabled
                >
                  Enter the lab
                </button>
                <button className="button button-ghost" type="button" disabled>
                  Ping the operator
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
