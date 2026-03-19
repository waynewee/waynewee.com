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
  const isAboutPage = currentPage?.slug === "about";

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">&lt;/&gt;</span>
          waynewee.com
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
        </nav>
      </header>

      {currentPage ? (
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
            <p className="eyebrow">{currentPage.eyebrow}</p>
            <h1>{currentPage.title}</h1>
            <p className="lede">{currentPage.description}</p>
            <ul className="bullet-list">
              {currentPage.bullets.map((bullet) => (
                <li key={bullet.label}>
                  {bullet.href ? (
                    <a
                      target="_blank"
                      className="bullet-link"
                      href={bullet.href}
                    >
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
                <a className="button button-secondary" href="#about">
                  About me
                </a>
                <a className="button button-primary" href="#projects">
                  Browse projects
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
