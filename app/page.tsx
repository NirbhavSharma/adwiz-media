"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  LineChart,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  PenTool,
  Phone,
  Send,
  Share2,
  Sparkles,
  Target,
  Users,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
};

type Proof = {
  label: string;
  value: string;
  detail: string;
};

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Plans", href: "#plans" },
  { label: "Contact", href: "#contact" }
];

const services: Service[] = [
  {
    title: "Social Media Management",
    description: "A consistent content engine for Instagram, Facebook, LinkedIn, and short-form channels.",
    icon: Share2,
    points: ["Content calendars", "Captions and creatives", "Community replies"]
  },
  {
    title: "Online Presence Setup",
    description: "Clean profiles, clear messaging, search-ready pages, and brand systems that feel credible from the first click.",
    icon: Sparkles,
    points: ["Profile optimization", "Brand voice", "Visual direction"]
  },
  {
    title: "Reach Campaigns",
    description: "Audience-first campaigns built to increase discovery, inquiries, store visits, and qualified leads.",
    icon: Megaphone,
    points: ["Targeting strategy", "Creative testing", "Lead funnels"]
  },
  {
    title: "Growth Analytics",
    description: "Reporting that shows what is working, what is wasting budget, and where the next growth move sits.",
    icon: LineChart,
    points: ["Monthly reports", "KPI dashboards", "Action plans"]
  }
];

const proof: Proof[] = [
  { label: "Launch speed", value: "14 days", detail: "to move from brand audit to the first managed content cycle" },
  { label: "Content rhythm", value: "30+", detail: "monthly creative assets planned across posts, reels, stories, and ads" },
  { label: "Support model", value: "360", detail: "strategy, design, copy, publishing, campaigns, and reporting in one place" }
];

const process = [
  ["Audit", "We review your current profiles, audience, competitors, content quality, and missed opportunities."],
  ["Build", "We create the monthly strategy, visual system, content calendar, ad direction, and conversion path."],
  ["Manage", "We publish, optimize, respond, report, and keep improving the brand presence every week."],
  ["Scale", "We turn winning content and insights into campaigns that expand reach and bring better leads."]
];

const packages = [
  ["Presence", "For brands that need a professional online foundation.", "Profile setup", "Brand messaging", "12 content pieces", "Monthly report"],
  ["Growth", "For businesses ready for consistent social media management.", "Content calendar", "20 content pieces", "Community support", "Campaign planning"],
  ["Scale", "For teams that need full marketing support and stronger lead flow.", "Paid campaign support", "30+ content pieces", "Analytics dashboard", "Priority strategy"]
];

const faqs = [
  ["Can Adwiz manage our social media every month?", "Yes. The Growth and Scale packages are built for ongoing planning, creative production, publishing, engagement, and reporting."],
  ["Do you help new businesses build their online presence?", "Yes. We can create the messaging, visual direction, profile setup, content plan, and first campaign structure from zero."],
  ["Can you run campaigns for more reach and leads?", "Yes. We can support organic reach campaigns and paid campaign direction depending on your budget and goals."],
  ["What happens after we submit the form?", "Your request is validated by the backend API and securely stored in our database for prompt follow-up by the Adwiz team."]
];

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Adwiz Media",
  description: "Digital growth agency for social media management, online presence, reach campaigns, and brand growth.",
  areaServed: "India",
  serviceType: ["Social Media Management", "Digital Marketing", "Brand Strategy", "Lead Generation"]
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [formStatus, setFormStatus] = useState("Send enquiry");

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("Sending...");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        setFormStatus("Check details");
        return;
      }

      form.reset();
      setFormStatus("Request received");
      window.setTimeout(() => setFormStatus("Send enquiry"), 2800);
    } catch {
      setFormStatus("Try again");
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <main id="top">
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Adwiz Media home">
            <span className="brand-mark">A</span>
            <span>
              <strong>Adwiz Media</strong>
              <small>Digital Growth Agency</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>

          <a className="header-cta" href="#contact">
            <CalendarCheck aria-hidden="true" />
            Book call
          </a>

          <button className="menu-button" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </header>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </nav>
        )}

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Social media, online presence, reach campaigns</p>
            <h1 id="hero-title">Adwiz Media</h1>
            <p className="hero-copy">
              We help businesses look credible online, reach more of the right people, and grow with consistent social media management, content strategy, and performance-focused campaigns.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#contact">
                <Send aria-hidden="true" />
                Start a project
              </a>
              <a className="secondary-button" href="#services">
                View services
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="proof-band" aria-label="Adwiz Media capabilities">
          {proof.map((item) => (
            <article className="proof-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="section" id="services">
          <div className="section-heading">
            <p className="eyebrow">What we build</p>
            <h2>Everything your brand needs to show up stronger online.</h2>
            <p>Adwiz combines strategy, creative execution, and performance tracking so your marketing feels consistent instead of random.</p>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <div className="card-icon"><Icon aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.points.map((point) => (
                      <li key={point}><CheckCircle2 aria-hidden="true" />{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="split-section" id="process">
          <div className="section-heading compact">
            <p className="eyebrow">How it works</p>
            <h2>A practical growth process for busy business owners.</h2>
            <p>We keep the workflow clear: understand the business, create the plan, manage the content, and scale what performs.</p>
          </div>

          <div className="process-list">
            {process.map(([title, detail], index) => (
              <article className="process-row" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="work-media" aria-hidden="true" />
          <div className="work-copy">
            <p className="eyebrow">UI and campaign direction</p>
            <h2>Designed to make your first impression feel organized, active, and trustworthy.</h2>
            <p>
              The brand system uses strong contrast, direct messaging, clear service paths, and conversion-focused forms so visitors immediately know what Adwiz does and how to start.
            </p>
            <div className="feature-line"><Target aria-hidden="true" />Audience-first messaging</div>
            <div className="feature-line"><BarChart3 aria-hidden="true" />Campaign-ready reporting model</div>
            <div className="feature-line"><Clock3 aria-hidden="true" />Fast monthly execution rhythm</div>
          </div>
        </section>

        <section className="section" id="plans">
          <div className="section-heading">
            <p className="eyebrow">Packages</p>
            <h2>Simple service tracks for different growth stages.</h2>
            <p>Use these as website packages, proposal starting points, or backend service categories in your database.</p>
          </div>

          <div className="plan-grid">
            {packages.map(([name, description, ...items]) => (
              <article className="plan-card" key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
                <ul>
                  {items.map((item) => (
                    <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>
                  ))}
                </ul>
                <a href="#contact">Enquire about {name}<ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title">Common things clients ask before starting.</h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className="faq-item" key={question}>
                <button type="button" onClick={() => setOpenFaq(index)} aria-expanded={openFaq === index}>
                  {question}
                  <ChevronDown aria-hidden="true" />
                </button>
                {openFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Contact</p>
            <h2>Tell us what you want to grow.</h2>
            <p>
              Fill out the form and our team will get back to you within 24 hours. Every enquiry is securely saved and tracked.
            </p>
            <div className="contact-methods">
              <a href="mailto:hello@adwizmedia.com"><Mail aria-hidden="true" />hello@adwizmedia.com</a>
              <a href="tel:+918650351303"><Phone aria-hidden="true" />+91 8650351303</a>
              <a href="https://wa.me/+918650351303"><MessageCircle aria-hidden="true" />WhatsApp</a>
            </div>
          </div>

          <form className="lead-form" onSubmit={submitLead}>
            <label>
              Name
              <input name="name" placeholder="Your name" required />
            </label>
            <label>
              Business name
              <input name="company" placeholder="Company or brand" required />
            </label>
            <label>
              Email
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <label>
              Phone
              <input name="phone" placeholder="Phone or WhatsApp" required />
            </label>
            <label>
              Main goal
              <select name="interest" required defaultValue="">
                <option value="" disabled>Select a goal</option>
                <option>Social media management</option>
                <option>Online presence setup</option>
                <option>Reach and lead campaign</option>
                <option>Branding and content strategy</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="message" placeholder="What should we help you with?" rows={4} />
            </label>
            <button className="primary-button form-button" type="submit">
              <Send aria-hidden="true" />
              {formStatus}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
