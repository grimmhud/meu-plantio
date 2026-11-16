"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  Droplets,
  Github,
  Leaf,
  Menu,
  Phone,
  Play,
  RotateCcw,
  Satellite,
  ShieldCheck,
  Sun,
  Volume2,
  X,
} from "lucide-react";
import { Brand } from "../shared-ui/Brand";
import { Button } from "../shared-ui/Button";
import { ListenButton } from "../shared-ui/ListenButton";

const DEMO = "/app";
const team = [
  { name: "Hudson Oliveira", image: "/team/hudson.jpg", linkedin: "https://www.linkedin.com/in/grimmhud/?locale=en" },
  { name: "Joana Carolina", image: "/team/joana.jpg", linkedin: "https://www.linkedin.com/in/joanacarol/" },
  { name: "Ane Freitas", image: "/team/ane.jpg", linkedin: "https://www.linkedin.com/in/anefreitas/" },
  { name: "Jessica Pereira", image: "/team/jessica.jpg", linkedin: "https://www.linkedin.com/in/jessiepsx/" },
  { name: "Luís Garcês", image: "/team/luis.jpg", linkedin: "https://www.linkedin.com/in/luisgarces2005/" },
  { name: "Ingrid Lorena", image: "/team/ingrid.jpg", linkedin: "https://www.linkedin.com/in/ingrid-lorena/" },
];
const narration =
  "A changing climate means planting plans need to adapt. Meu plantio brings climate information, the history of the garden bed, and the farmer’s choices into one plan. Pictures and audio help make that information easier to understand. The farmer stays in control of what happens next.";
const horizons = [
  {
    label: "Climate history",
    eyebrow: "AVAILABLE IN THE DEMO",
    title: "Understand the season before choosing it.",
    text: "NASA POWER brings regional temperature, rainfall and solar radiation history into the planning conversation. Our current reference covers 2021–2025. History helps explore exposure; it does not predict a particular future season.",
    source: "NASA POWER · Regional history · 2021–2025",
    image: "/media/climate.png",
  },
  {
    label: "Next seven days",
    eyebrow: "AVAILABLE IN THE DEMO",
    title: "Bring the next operation closer to today.",
    text: "A valid seven-day Open-Meteo forecast supports the next operation. It has a consultation time and an expiry. It is not extended across the whole growing cycle, and missing information stays visible.",
    source: "Open-Meteo · Seven-day forecast",
    image: "/media/home.png",
  },
  {
    label: "The whole rotation",
    eyebrow: "CORE VISION · IN DEVELOPMENT",
    title: "Compare the consequences of a sequence.",
    text: "Our proposed predictive engine combines agronomic rules, crop stages, environmental scenarios and the producer’s priorities. It will compare sequences under the same conditions, explain trade-offs and identify what still needs checking locally.",
    source: "Planned · Agronomic methods and field validation required",
    image: "/media/rotation.png",
  },
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [horizon, setHorizon] = useState(0);
  const active = horizons[horizon];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav
            className={menuOpen ? "nav open" : "nav"}
            aria-label="Main navigation"
          >
            <a href="#people" onClick={() => setMenuOpen(false)}>
              The people
            </a>
            <a href="#conversation" onClick={() => setMenuOpen(false)}>
              Phone calls
            </a>
            <a href="#planning" onClick={() => setMenuOpen(false)}>
              Predictive planning
            </a>
            <a href="#impact" onClick={() => setMenuOpen(false)}>
              Our impact
            </a>
            <a href="#pitch" onClick={() => setMenuOpen(false)}>
              The pitch
            </a>
            <a href="https://github.com/grimmhud/meu-plantio" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </nav>
          <a
            className="header-demo"
            href={DEMO}
            target="_blank"
            rel="noreferrer"
          >
            Explore the demo <ArrowUpRight size={17} />
          </a>
          <Button
            variant="quiet"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <div id="mobile-navigation" className="mobile-nav" hidden={!menuOpen}>
          <a href="#people" onClick={() => setMenuOpen(false)}>
            The people
          </a>
          <a href="#conversation" onClick={() => setMenuOpen(false)}>
            Phone calls
          </a>
          <a href="#planning" onClick={() => setMenuOpen(false)}>
            Predictive planning
          </a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>
            Our impact
          </a>
          <a href="#pitch" onClick={() => setMenuOpen(false)}>
            The pitch
          </a>
          <a href={DEMO} target="_blank" rel="noreferrer">
            Explore the demo ↗
          </a>
          <a href="https://github.com/grimmhud/meu-plantio" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
            GitHub ↗
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> IAGORA · NASA SPACE APPS CHALLENGE
              2026
            </p>
            <h1 id="hero-title">
              Better planting decisions.
              <br />
              <span>In every farmer’s hands.</span>
            </h1>
            <p className="hero-description">
              Earth data. Local knowledge. A plan you can see and hear. Meet
              crop rotation planning built around small vegetable growers.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={DEMO}
                target="_blank"
                rel="noreferrer"
              >
                Explore the demo <ArrowUpRight size={20} />
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/grimmhud/meu-plantio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} aria-hidden="true" /> View on GitHub <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <a className="watch-button" href="#pitch">
                <span className="play-circle">
                  <Play size={17} fill="currentColor" />
                </span>{" "}
                Watch our 30-second pitch
              </a>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={16} /> Pictures and audio
              </span>
              <span>
                <Check size={16} /> Farmer-led decisions
              </span>
            </div>
            <a className="scroll-cue" href="#people">
              <ArrowDown size={18} /> Get to know the project
            </a>
          </div>
          <div className="hero-visual">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit-label">
              <Satellite size={17} /> FROM EARTH DATA TO THE GARDEN BED
            </div>
            <div className="hero-phone">
              <div className="phone-speaker" />
              <img
                src="/media/home.png"
                alt="Meu plantio home screen with illustrated garden checks and a Listen button"
                width="392"
                height="852"
                fetchPriority="high"
              />
            </div>
            <div className="voice-float">
              <span className="float-icon">
                <Volume2 size={22} />
              </span>
              <div>
                <strong>See it. Hear it.</strong>
                <span>Your next step, made clearer.</span>
              </div>
              <div className="mini-wave" aria-hidden="true">
                {[10, 22, 15, 29, 19, 12, 24].map((v, i) => (
                  <i key={i} style={{ height: v }} />
                ))}
              </div>
            </div>
            <div className="crop-float">
              <img src="/media/carrot.svg" width="62" height="58" alt="" />
              <div>
                <span>THINK ABOUT WHAT COMES NEXT</span>
                <strong>One bed. A whole rotation.</strong>
              </div>
            </div>
            <p className="demo-caption">
              Actual app screens · Sample farm records and plans
            </p>
          </div>
        </section>

        <div className="idea-strip">
          <div className="section-shell">
            <span>SMALL PLOTS. BIG DECISIONS.</span>
            <p>
              Agricultural information is only useful when the person growing
              the food can use it.
            </p>
            <Leaf size={32} />
          </div>
        </div>

        <section
          id="people"
          className="people-section section-shell section-space"
        >
          <div className="section-heading">
            <p className="eyebrow">01 / THE PEOPLE BEHIND EVERY HARVEST</p>
            <h2>
              Built around the grower.
              <br />
              <span>Not just the data.</span>
            </h2>
          </div>
          <div className="family-context">
            <div>
              <strong>3.9 million</strong>
              <span>family farming establishments in Brazil</span>
            </div>
            <div>
              <strong>77%</strong>
              <span>of Brazilian agricultural establishments</span>
            </div>
            <p>
              IBGE Agricultural Census 2017 · National context, not a count of
              horticultural growers.
              <a
                href="https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/25786-em-11-anos-agricultura-familiar-perde-9-5-dos-estabelecimentos-e-2-2-milhoes-de-postos-de-trabalho"
                target="_blank"
                rel="noreferrer"
              >
                Read the IBGE source ↗
              </a>
            </p>
          </div>
          <div className="people-grid">
            <div className="persona-visual">
              <div className="persona-coordinate">
                23°31′S 46°11′W <span>MOGI DAS CRUZES, BRAZIL</span>
              </div>
              <img
                src="/media/lettuce-bed.svg"
                alt="Illustrated vegetable garden bed"
                width="480"
                height="285"
              />
              <div className="persona-caption">
                <span className="tag">DESIGN PERSONA</span>
                <h3>A small vegetable grower.</h3>
                <p>
                  Works a small vegetable bed and needs to choose the next crop
                  and month while balancing water, time and household income.
                </p>
                <ul className="persona-needs">
                  <li>One bed, several crop cycles</li>
                  <li>Water, time and budget constraints</li>
                  <li>Space to question, decline or decide later</li>
                </ul>
                <small>
                  Illustrative design persona, not a customer testimonial.
                  Reading ability varies; it is not assumed for every grower.
                </small>
              </div>
            </div>
            <div className="people-copy">
              <h3>The knowledge is already in the field.</h3>
              <p>
                What is often missing is a clear way to connect that knowledge
                with weather, crop history and the next planting choice.
              </p>
              <p>
                El Niño can shift rainfall and temperature patterns, with
                different effects across regions. Adapting a plan requires local
                context and information that is easy to act on.
              </p>
              <a
                className="text-link"
                href="https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/nota-tecnica-conjunta-aponta-alta-probabilidade-de-el-nino-no-segundo-semestre-de-2026"
                target="_blank"
                rel="noreferrer"
              >
                Read the INPE climate context <ArrowUpRight size={16} />
              </a>
              <div className="literacy-fact">
                <strong>
                  26.4<span>%</span>
                </strong>
                <div>
                  <p>
                    of Brazilian family farmers could not read or write in 2017.
                  </p>
                  <small>
                    National historical data · IBGE Agricultural Census 2017,
                    Ipea analysis.
                  </small>
                  <a
                    href="https://repositorio.ipea.gov.br/bitstream/11058/14052/6/Agricultura%20familiar_Cap6.pdf#page=34"
                    target="_blank"
                    rel="noreferrer"
                  >
                    See the source · Table 7, p. 269 ↗
                  </a>
                </div>
              </div>
              <p className="emphasis-line">
                Access is part of the problem.
                <br />
                Voice is part of our answer.
              </p>
            </div>
          </div>
        </section>

        <section id="planning" className="planning-section">
          <div className="section-shell section-space">
            <div className="section-heading">
              <p className="eyebrow">02 / PREDICTIVE PLANNING</p>
              <h2>
                See the next cycle
                <br />
                <span>before committing to it.</span>
              </h2>
              <p className="section-description">
                Our core vision is to compare crop sequences, timing and
                trade-offs for the same bed. Climate data supports the decision.
                The farmer’s priorities give it direction.
              </p>
            </div>
            <div className="planning-grid">
              <div className="planning-explainer">
                <div
                  className="horizon-tabs"
                  role="tablist"
                  aria-label="Planning horizons"
                >
                  {horizons.map((item, i) => (
                    <button
                      key={item.label}
                      id={`horizon-${i}`}
                      role="tab"
                      aria-selected={horizon === i}
                      aria-controls="horizon-panel"
                      onClick={() => setHorizon(i)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                          e.preventDefault();
                          const next =
                            (horizon + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                          setHorizon(next);
                          document.getElementById(`horizon-${next}`)?.focus();
                        }
                      }}
                      tabIndex={horizon === i ? 0 : -1}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div
                  role="tabpanel"
                  id="horizon-panel"
                  aria-labelledby={`horizon-${horizon}`}
                  className="horizon-content"
                >
                  <span className={horizon === 2 ? "tag planned" : "tag"}>
                    {active.eyebrow}
                  </span>
                  <h3>{active.title}</h3>
                  <p>{active.text}</p>
                  <div className="source-line">
                    <Satellite size={18} />
                    <span>{active.source}</span>
                  </div>
                </div>
                <div className="method-line">
                  <span>Agronomic rules</span>
                  <i>+</i>
                  <span>Crop stages</span>
                  <i>+</i>
                  <span>Environmental scenarios</span>
                  <i>+</i>
                  <span>Local knowledge</span>
                </div>
                <p className="method-note">
                  Whole-rotation simulation is in development. We do not yet
                  offer validated predictions of plot yield, losses, irrigation
                  dose or soil recovery.
                </p>
              </div>
              <div className="planning-phone-wrap">
                <div className="planning-phone">
                  <img
                    src={active.image}
                    width="392"
                    height="852"
                    alt={
                      horizon === 0
                        ? "Climate panel distinguishing NASA historical temperature and missing forecast values"
                        : horizon === 1
                          ? "App home: the entry point for garden checks and weather consultation"
                          : "A saved rotation with lettuce, carrot and tomato"
                    }
                  />
                </div>
                <span className="screen-caption">
                  Product demonstration · Data limits remain visible
                </span>
              </div>
            </div>
            <div className="rotation-story">
              <div>
                <span className="eyebrow">THE WHOLE SEQUENCE MATTERS</span>
                <h3>
                  One next crop is part
                  <br />
                  of a longer story.
                </h3>
              </div>
              <div className="crop-sequence">
                {["Lettuce", "Carrot", "Tomato"].map((crop, i) => (
                  <div className="sequence-stage" key={crop}>
                    <span>0{i + 1}</span>
                    <img
                      src={`/media/${crop.toLowerCase()}.svg`}
                      width="90"
                      height="80"
                      alt=""
                    />
                    <strong>{crop}</strong>
                  </div>
                ))}
              </div>
              <p>
                Illustrative sequence.
                <br />
                Not a planting recommendation.
              </p>
            </div>
          </div>
        </section>

        <section id="voice" className="voice-section">
          <div className="section-shell voice-inner">
            <div className="voice-copy">
              <p className="eyebrow">03 / A VOICE FOR EVERY DECISION</p>
              <h2>
                Understanding a plan
                <br />
                should feel like
                <br />
                <span>a conversation.</span>
              </h2>
              <p>
                Short labels. Familiar drawings. An explanation you can hear
                again. Voice is a way into the same planning experience, with
                the same evidence and the same room to say “I don’t know.”
              </p>
              <ListenButton
                text={narration}
                label="Listen to the idea"
                className="voice-listen"
              />
              <details className="transcript">
                <summary>
                  Read the audio transcript <ChevronDown size={16} />
                </summary>
                <p>{narration}</p>
              </details>
              <p className="voice-note">
                Available today: browser speech synthesis. Audio depends on
                browser support and is not guaranteed offline.
              </p>
            </div>
            <div className="voice-display">
              <span className="tag light">PICTURES + WORDS + AUDIO</span>
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 35 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      height: 18 + Math.abs(Math.sin(i * 0.83)) * 78,
                      animationDelay: `${i * -0.08}s`,
                    }}
                  />
                ))}
              </div>
              <div className="voice-statement">
                “What comes next
                <br />
                for <em>my</em> garden bed?”
              </div>
              <p>
                One question at a time.
                <br />A choice that stays with the grower.
              </p>
              <div className="voice-principles">
                <span>
                  <Volume2 size={18} /> Listen again
                </span>
                <span>
                  <RotateCcw size={18} /> Go back
                </span>
                <span>
                  <ShieldCheck size={18} /> Decide yourself
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="conversation"
          className="call-section section-shell section-space"
        >
          <div className="call-intro">
            <div>
              <p className="eyebrow">04 / THE CONVERSATION WE ARE BUILDING</p>
              <h2>
                An alert is the beginning.
                <br />
                <span>Understanding is the next step.</span>
              </h2>
            </div>
            <p>
              Our proposed call experience carries the context with it: the
              alert, the bed, the plan and what still needs checking. The farmer
              should not have to explain everything from the beginning.
            </p>
          </div>
          <div className="call-context">
            <div>
              <span className="tag planned">PROPOSED TELEPHONE EXPERIENCE</span>
              <h3>A familiar channel, with the plan already in context.</h3>
              <p>
                For someone who struggles with reading or navigating several
                screens, a short call could make the next step easier to
                understand. It should explain the reason for an alert, ask what
                has changed and preserve the farmer’s right to choose.
              </p>
            </div>
            <div className="conversation-example">
              <span>ILLUSTRATIVE DIALOGUE · NOT A LIVE CALL</span>
              <p className="assistant-bubble">
                “You asked to discuss your next crop. Have you planted it yet?”
              </p>
              <p className="farmer-bubble">“I already planted it.”</p>
              <p className="assistant-bubble">
                “Then let’s review the next step with that update.”
              </p>
            </div>
          </div>
          <ol className="call-journey">
            {[
              {
                icon: Sun,
                title: "An alert",
                text: "A clear reason to review the plan.",
              },
              {
                icon: Phone,
                title: "A requested call",
                text: "The farmer chooses to start it.",
              },
              {
                icon: AudioLines,
                title: "A contextual conversation",
                text: "Explain, ask and listen to corrections.",
              },
              {
                icon: Check,
                title: "Their decision",
                text: "Confirm, refuse or decide later.",
              },
              {
                icon: Volume2,
                title: "An audio summary",
                text: "Keep the next step easy to revisit.",
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <span className="journey-icon">
                  <Icon size={25} />
                  <small>0{i + 1}</small>
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <details className="call-status">
            <summary>
              <span>
                <span className="status-dot amber" /> Planned experience ·
                Telephone calls are not available yet
              </span>
              <ChevronDown size={19} />
            </summary>
            <p>
              The current app can explain content through browser audio and
              prepare conversation context. It does not place telephone calls or
              deliver this complete flow. Telephony, notifications and
              contextual dialogue remain integration work. Screen-based
              participation remains an alternative.
            </p>
          </details>
        </section>

        <section
          id="impact"
          className="impact-section section-shell section-space"
        >
          <div className="section-heading">
            <p className="eyebrow">05 / THE IMPACT WE WANT TO MAKE</p>
            <h2>
              Less waste begins with
              <br />
              <span>a better-informed decision.</span>
            </h2>
            <p className="section-description">
              We want more of the grower’s effort to reach the harvest.
              Environmental and social impact must be checked in the field,
              alongside the people using the plan.
            </p>
          </div>
          <div className="impact-list">
            {[
              {
                n: "01",
                icon: Droplets,
                title: "Use water with more context.",
                text: "Connect the planting decision to available water and valid information. Measure actual water applied; do not infer savings from rainfall alone.",
                measure: "MEASURE · Water applied and crop outcomes",
              },
              {
                n: "02",
                icon: RotateCcw,
                title: "Avoid effort that needs repeating.",
                text: "Explore timing and crop sequences that may reduce replanting, unsuitable operations and discarded production.",
                measure: "MEASURE · Replanting, discarded harvest and costs",
              },
              {
                n: "03",
                icon: Leaf,
                title: "Keep the soil in the conversation.",
                text: "Consider rotation and cover alongside local soil information. Soil improvement is a goal that needs observation across cycles.",
                measure: "MEASURE · Locally assessed soil conditions over time",
              },
              {
                n: "04",
                icon: Volume2,
                title: "Make participation part of the result.",
                text: "A useful plan is one the farmer can understand, question and choose. Listening is a design choice; comprehension is something to validate.",
                measure: "MEASURE · Understanding, autonomy and follow-through",
              },
            ].map(({ n, icon: Icon, title, text, measure }) => (
              <article key={n}>
                <span className="impact-number">{n}</span>
                <div className="impact-icon">
                  <Icon size={29} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="measure">{measure}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="impact-disclaimer">
            <ShieldCheck size={19} /> These are intended impacts and pilot
            measures. No water savings, productivity gains or soil recovery
            results have been established by this demo.
          </p>
        </section>

        <section className="today-section">
          <div className="section-shell section-space">
            <div className="today-heading">
              <p className="eyebrow">06 / AN HONEST LOOK AT THE PROJECT</p>
              <h2>
                A working foundation.
                <br />A bigger direction.
              </h2>
            </div>
            <div className="today-grid">
              <div>
                <span className="tag">IN THE CURRENT DEMO</span>
                <ul>
                  <li>
                    <Check />
                    Crop and month selection for the same bed
                  </li>
                  <li>
                    <Check />
                    NASA POWER regional climate history
                  </li>
                  <li>
                    <Check />
                    Seven-day Open-Meteo forecast
                  </li>
                  <li>
                    <Check />
                    Pictures and browser-generated audio
                  </li>
                  <li>
                    <Check />
                    Local plans, observations and activity records
                  </li>
                </ul>
              </div>
              <div>
                <span className="tag planned">WHAT WE ARE BUILDING TOWARD</span>
                <ul>
                  <li>
                    <ArrowRight />
                    Explainable comparison of complete rotations
                  </li>
                  <li>
                    <ArrowRight />
                    Agronomic simulation with local constraints
                  </li>
                  <li>
                    <ArrowRight />
                    Requested contextual telephone conversations
                  </li>
                  <li>
                    <ArrowRight />
                    Validation with growers and field measurements
                  </li>
                  <li>
                    <ArrowRight />
                    Optional offline access and synchronization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pitch" className="pitch-section">
          <div className="section-shell section-space">
            <div className="pitch-heading">
              <div>
                <p className="eyebrow">07 / THE IDEA IN 30 SECONDS</p>
                <h2>
                  Meet the team.
                  <br />
                  <span>See the idea in action.</span>
                </h2>
              </div>
              <p>
                Our first pitch brings the problem, the people and the app
                together. A little introduction to a much bigger conversation.
              </p>
            </div>
            <div className="pitch-player">
              <video
                controls
                playsInline
                preload="none"
                poster="/media/pitch-poster.png"
              >
                <source src="/media/pitch.mp4" type="video/mp4" />
                Your browser does not support video.{" "}
                <a href="/media/pitch.mp4">Download the pitch.</a>
              </video>
            </div>
            <div className="pitch-meta">
              <span>
                <Play size={14} /> 00:30 · English narration
              </span>
              <span>IAGORA · NASA Space Apps Challenge 2026</span>
              <a href="/media/pitch.mp4" download="meu-plantio-pitch.mp4">
                Download the video <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="closing-section section-shell">
          <span className="eyebrow">THE FARMER STAYS IN CONTROL</span>
          <h2>
            The next crop.
            <br />
            <span>Their choice.</span>
          </h2>
          <p>
            Explore what we have built. Imagine what becomes possible
            <br className="desktop-break" /> when Earth data is easier to see,
            hear and use.
          </p>
          <div className="closing-actions">
            <a
              className="button button-primary"
              href={DEMO}
              target="_blank"
              rel="noreferrer"
            >
              Try the app demo <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href="#voice">
              Listen to the idea <Volume2 size={19} />
            </a>
          </div>
          <img
            src="/media/carrot-bed.svg"
            alt=""
            className="closing-crop"
            width="320"
            height="190"
          />
        </section>
        <section id="team" className="team-section section-shell section-space" aria-labelledby="team-title">
          <div className="team-heading">
            <div>
              <p className="eyebrow">08 / THE PEOPLE BEHIND MEU PLANTIO</p>
              <h2 id="team-title">Meet the team.<br /><span>We are IAGORA.</span></h2>
            </div>
            <p>Six people, one shared idea: bring Earth data closer to the people growing our food. Get to know us on LinkedIn.</p>
          </div>
          <div className="team-grid">
            {team.map(member => (
              <a key={member.linkedin} className="team-card" href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`View ${member.name} on LinkedIn (opens in a new tab)`}>
                <div className="team-photo"><img src={member.image} alt={`Portrait of ${member.name}`} width="400" height="500" loading="lazy" /></div>
                <div className="team-member"><h3>{member.name}</h3><span>LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></span></div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="section-shell">
          <div className="footer-top">
            <div>
              <Brand />
              <p>
                Earth data. Local knowledge.
                <br />
                Decisions in every farmer’s hands.
              </p>
              <p>
                <a
                  href="https://github.com/grimmhud/meu-plantio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source on GitHub (opens in a new tab)"
                >
                  View source on GitHub ↗
                </a>
              </p>
            </div>
            <div className="footer-event">
              <img
                src="/brands/space-apps.svg"
                alt="NASA Space Apps Challenge"
                width="224"
                height="88"
              />
              <p>
                A project by team <strong>IAGORA</strong> · 2026
              </p>
            </div>
          </div>
          <div className="footer-sources">
            <span>OUR REFERENCES</span>
            <a
              href="https://power.larc.nasa.gov/"
              target="_blank"
              rel="noreferrer"
            >
              NASA POWER ↗
            </a>
            <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
              Open-Meteo ↗
            </a>
            <a
              href="https://repositorio.ipea.gov.br/bitstream/11058/14052/6/Agricultura%20familiar_Cap6.pdf#page=34"
              target="_blank"
              rel="noreferrer"
            >
              IBGE / Ipea literacy data ↗
            </a>
            <a
              href="https://www.gov.br/inpe/pt-br/assuntos/ultimas-noticias/nota-tecnica-conjunta-aponta-alta-probabilidade-de-el-nino-no-segundo-semestre-de-2026"
              target="_blank"
              rel="noreferrer"
            >
              INPE climate context ↗
            </a>
          </div>
          <div className="footer-bottom">
            <span>Meu plantio · A project in development</span>
            <span>
              NASA is a data source and the Space Apps event organizer. This
              does not imply endorsement of the app.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
