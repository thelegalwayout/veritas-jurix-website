import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Phone, Mail, MapPin, Menu, X, ShieldCheck, Gavel, Landmark, Users, FileText, BriefcaseBusiness, ChevronRight, ArrowUpRight, Building2, Send, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const logoSrc = "/logo.png";
const pradeepPhoto = "/pradeep-singh.png";
const vijayPhoto = "/vijay-singh.png";

const practiceAreas = [
  { slug: "criminal-litigation", title: "Criminal Litigation", icon: Gavel, text: "Bail, trial strategy, complaints, revisions, appeals, and criminal court representation.", headline: "Strategic representation in criminal proceedings.", intro: "Veritas Jurix assists clients in criminal matters from urgent protective relief to trial preparation, revisions, appeals, and related proceedings.", services: ["Anticipatory and regular bail", "Criminal trials and defence strategy", "Complaints and FIR-related remedies", "Appeals, revisions, and quashing matters", "Cheque bounce and economic offence matters"] },
  { slug: "civil-disputes", title: "Civil Disputes", icon: Landmark, text: "Property, injunctions, recovery, contractual disputes, and civil remedies.", headline: "Clear remedies for civil and commercial disputes.", intro: "The firm handles civil disputes with a focus on pleadings, documents, interim relief, evidence, and practical resolution strategy.", services: ["Property and possession disputes", "Injunction suits", "Recovery proceedings", "Contractual disputes", "Execution and related applications"] },
  { slug: "matrimonial-family-law", title: "Matrimonial & Family Law", icon: Users, text: "Divorce, maintenance, custody, domestic violence, mediation, and settlement support.", headline: "Sensitive family matters handled with discretion.", intro: "Veritas Jurix supports clients in family and matrimonial disputes with balanced advice, confidentiality, and careful court strategy.", services: ["Divorce and separation proceedings", "Maintenance matters", "Child custody and visitation", "Domestic violence cases", "Settlement and mediation support"] },
  { slug: "taxation-matters", title: "Taxation Matters", icon: FileText, text: "Notices, compliance disputes, tax litigation, and representation before competent forums.", headline: "Tax dispute support with procedural focus.", intro: "The firm assists in taxation notices, disputes, compliance-linked proceedings, and representation before competent authorities and forums.", services: ["Tax notices and replies", "Assessment-related disputes", "Appeals and representation", "Compliance advisory", "Document review and legal strategy"] },
  { slug: "general-litigation", title: "General Litigation", icon: BriefcaseBusiness, text: "Court appearances, drafting, legal notices, dispute strategy, and case management.", headline: "End-to-end litigation support.", intro: "For matters that require court action or legal response, Veritas Jurix provides drafting, filing, appearance, and case strategy support.", services: ["Legal notices and replies", "Drafting and filing", "Court appearances", "Case strategy and review", "Interim applications and procedural support"] },
  { slug: "advisory-documentation", title: "Advisory & Documentation", icon: ShieldCheck, text: "Legal opinions, document review, due diligence, and preventive legal advisory.", headline: "Preventive legal support before disputes arise.", intro: "The firm reviews documents, prepares opinions, and assists clients in understanding legal exposure before taking important decisions.", services: ["Legal opinions", "Agreement and document review", "Due diligence support", "Risk assessment", "Pre-litigation advisory"] }
];

const attorneys = [
  { name: "Pradeep Singh", role: "Managing Partner", photo: pradeepPhoto, focus: "Criminal litigation, matrimonial matters, taxation matters, legal drafting, advisory services, dispute resolution, and High Court strategy.", courts: "High Court of Allahabad, Lucknow Bench; District Courts; Tribunals; and Competent Authorities." },
  { name: "Vijay Singh", role: "Senior Partner", photo: vijayPhoto, focus: "Civil disputes, matrimonial matters, taxation matters, legal drafting, advisory services, and dispute resolution.", courts: "High Court of Allahabad, Lucknow Bench; District Courts; Tribunals; and Competent Authorities." }
];

const insights = [
  {
    slug: "anticipatory-bail",
    title: "Anticipatory Bail Under Indian Law: Key Considerations",
    category: "Criminal Law",
    summary: "A practical overview of what clients should prepare before seeking anticipatory bail.",
    content: [
      "Anticipatory bail is a preventive legal remedy available to a person who apprehends arrest in connection with a criminal accusation.",
      "Before filing, it is important to collect the FIR or complaint details, relevant documents, chronology of events, previous communication, and facts showing cooperation.",
      "Courts generally consider the nature of allegations, role attributed to the applicant, possibility of cooperation with investigation, and whether custodial interrogation appears necessary.",
      "Every matter depends on its own facts. Proper legal advice should be taken before initiating proceedings."
    ]
  },
  {
    slug: "legal-notice",
    title: "What To Do After Receiving A Legal Notice",
    category: "General Litigation",
    summary: "Steps to take after receiving a civil, criminal, matrimonial, property, or commercial legal notice.",
    content: [
      "A legal notice should not be ignored. It may contain allegations, demands, timelines, and proposed legal action.",
      "The first step is to preserve the envelope, notice copy, attachments, emails, messages, agreements, payment records, and any previous communication.",
      "A reply should be prepared carefully because it may later be relied upon in court proceedings.",
      "Avoid emotional or informal responses. A legally structured reply can clarify facts and protect your position."
    ]
  },
  {
    slug: "property-disputes-injunctions",
    title: "Property Disputes And Injunctions: A Practical Guide",
    category: "Civil Litigation",
    summary: "Understanding possession, documents, title papers, and interim protection in property disputes.",
    content: [
      "Property disputes often involve possession, title, boundaries, inheritance, sale documents, or interference by another party.",
      "In urgent cases, a party may seek interim protection from the court to prevent dispossession, construction, alienation, or interference.",
      "Useful documents include sale deeds, revenue records, mutation documents, photographs, tax receipts, electricity bills, and possession-related evidence.",
      "The strength of a property case often depends on documentation, chronology, and timely legal action."
    ]
  },
  {
    slug: "mutual-consent-divorce",
    title: "Divorce By Mutual Consent: Process And Timelines",
    category: "Family Law",
    summary: "A simple overview of mutual consent divorce, settlement terms, and court process.",
    content: [
      "Divorce by mutual consent is usually considered when both spouses agree to dissolve the marriage and settle their disputes.",
      "Important settlement points may include maintenance, alimony, child custody, visitation, return of articles, pending cases, and future claims.",
      "The petition should clearly record the settlement terms to avoid disputes later.",
      "The actual timeline depends on facts, court schedule, statutory requirements, and judicial discretion."
    ]
  },
  {
    slug: "cheque-bounce-cases",
    title: "Cheque Bounce Cases Under NI Act",
    category: "Commercial Litigation",
    summary: "Basic procedural points involved in cheque dishonour matters.",
    content: [
      "Cheque bounce matters usually require careful attention to dates, bank return memo, legal notice, service proof, and limitation periods.",
      "The complainant should preserve the cheque, return memo, notice, postal receipts, tracking report, invoices, agreements, and payment records.",
      "The accused should review whether the cheque was issued for a legally enforceable debt or liability and whether procedural requirements were followed.",
      "Legal advice should be taken quickly because limitation periods are important in cheque dishonour cases."
    ]
  },
  {
    slug: "tax-notices",
    title: "Responding To Tax Notices: Common Mistakes To Avoid",
    category: "Taxation",
    summary: "Common mistakes people make after receiving a tax notice or compliance communication.",
    content: [
      "Tax notices should be reviewed carefully with reference to the section, assessment year, deadline, and documents requested.",
      "Common mistakes include ignoring the notice, submitting incomplete replies, missing deadlines, or sending inconsistent explanations.",
      "Relevant records such as returns, computation, bank statements, invoices, notices, replies, and previous orders should be organized before responding.",
      "A structured reply can help clarify the factual and legal position before the competent authority."
    ]
  }
];

const navItems = ["About", "Practice Areas", "Team", "Insights", "Contact"];
const leadEndpoint = import.meta.env.VITE_LEAD_ENDPOINT || "";
const analyticsId = import.meta.env.VITE_GA_ID || "";

function FloatingPanel({ children, className = "" }) {
  return <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, ease: "easeOut" }} whileHover={{ y: -8, scale: 1.02 }} className={className}>{children}</motion.div>;
}

function App() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(localStorage.getItem("vj_disclaimer") === "accepted");
  const [activePage, setActivePage] = useState("home");
  const [status, setStatus] = useState("");
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.86]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.22], [28, 80]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  React.useEffect(() => {
    if (!analyticsId) return;
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);} // eslint-disable-line
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", analyticsId);
  }, []);

  const acceptDisclaimer = () => {
    localStorage.setItem("vj_disclaimer", "accepted");
    setAccepted(true);
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  setSubmitted(false);
  setStatus("");
  setLoading(true);

  const formData = new FormData(event.currentTarget);

  try {
    const response = await fetch("https://formspree.io/f/xzdwngjg", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      event.currentTarget.reset();
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  } catch (error) {
    setStatus("Something went wrong. Please try again.");
  }

  setLoading(false);
};
  const scrollTo = (id) => {
    setActivePage("home");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
    setOpen(false);
  };

  const openPracticePage = (slug) => {
    setActivePage(slug);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activePractice = practiceAreas.find((area) => area.slug === activePage);
  const activeInsight = insights.find((post) => post.slug === activePage);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const LeadForm = ({ compact = false, title = "Contact / Query Form" }) => (
    <form onSubmit={handleSubmit} className={compact ? "mt-8 grid gap-4 md:grid-cols-2" : "mt-8 space-y-4 border-t border-[#223329] pt-6"}>
      <h3 className={compact ? "text-2xl font-semibold text-[#d7b46a] md:col-span-2" : "text-xl font-semibold text-[#d7b46a]"}>{title}</h3>
      <input name="name" required placeholder="Your Name" className="form-field" />
      <input name="email" type="email" required placeholder="Email ID" className="form-field" />
      <input name="phone" required placeholder="Phone Number" className="form-field" />
      <select name="practiceArea" className="form-field">
        <option value="">Select Practice Area</option>
        {practiceAreas.map((area) => <option key={area.slug} value={area.title}>{area.title}</option>)}
      </select>
      <textarea name="message" required placeholder="Briefly describe your query" rows="5" className={`form-field ${compact ? "md:col-span-2" : ""}`} />
      <input
      type="hidden"
      name="_subject"
      value="New Website Enquiry - Veritas Jurix"
      />
      <button
  type="submit"
  disabled={loading}
  className={`flex items-center justify-center gap-2 rounded-full bg-[#d7b46a] px-6 py-4 text-sm font-semibold uppercase tracking-widest text-[#050806] transition hover:bg-[#b9913f] disabled:opacity-60 ${compact ? "md:col-span-2" : "w-full"}`}
    >
  <Send size={18} />
 {loading ? "Sending..." : "Submit Query"}
    </button>
      {submitted && (
  <p className={`rounded-2xl border border-[#d7b46a]/30 bg-[#050806] p-4 text-sm leading-6 text-[#d7b46a] ${compact ? "md:col-span-2" : ""}`}>
    Thank you. Your enquiry has been received. We will get back to you shortly.
  </p>
)}
      <p className={`text-xs leading-5 text-[#b7aa95] ${compact ? "md:col-span-2" : ""}`}>Your details are used only to respond to your query. Please do not share confidential information until an advocate-client relationship is formally established.</p>
    </form>
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#050806] pb-16 text-[#efe7d8] selection:bg-[#d7b46a] selection:text-[#050806] md:pb-0">
      {!accepted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="max-w-2xl rounded-[2rem] border border-[#d7b46a]/30 bg-[#0d1712] p-6 shadow-2xl md:p-8">
            <div className="mb-4 flex items-center gap-4"><img src={logoSrc} alt="Veritas Jurix logo" className="h-16 w-16 rounded-2xl border border-[#d7b46a]/40 object-cover" /><div><h2 className="text-2xl font-semibold tracking-wide text-[#d7b46a]">Disclaimer</h2><p className="text-sm text-[#b7aa95]">Required for advocate/law-firm websites in India</p></div></div>
            <div className="space-y-3 text-sm leading-6 text-[#d8cfbf]"><p>The Bar Council of India does not permit solicitation of work or advertising by advocates. By accessing this website, the user acknowledges that there has been no advertisement, solicitation, invitation, or inducement from Veritas Jurix or its members.</p><p>The information on this website is for general informational purposes only and is not legal advice. Accessing this website does not create an advocate-client relationship.</p></div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><button onClick={acceptDisclaimer} className="rounded-full bg-[#d7b46a] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#050806] transition hover:bg-[#b9913f]">Agree & Enter</button><button onClick={() => window.history.back()} className="rounded-full border border-[#d7b46a]/50 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] transition hover:bg-[#162a21]">Disagree</button></div>
          </motion.div>
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-[#223329] bg-[#050806]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><button onClick={() => scrollTo("home")} className="flex items-center gap-3 text-left"><img
  src={logoSrc}
  alt="Veritas Jurix logo"
  className="h-16 w-16 rounded-xl object-contain md:h-16 md:w-16"/><div><div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#d7b46a] md:text-lg">Veritas Jurix</div><div className="hidden md:block text-xs uppercase tracking-[0.22em] text-[#b7aa95]">Advocates & Legal Consultants</div></div></button><nav className="hidden items-center gap-8 md:flex">{navItems.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase().replaceAll(" ", "-"))} className="text-sm uppercase tracking-[0.18em] text-[#efe7d8] hover:text-[#d7b46a]">{item}</button>)}</nav><button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button></div>
        {open && <div className="border-t border-[#223329] bg-[#050806] px-5 py-4 md:hidden">{navItems.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase().replaceAll(" ", "-"))} className="block w-full py-3 text-left text-sm uppercase tracking-[0.18em] text-[#efe7d8]">{item}</button>)}</div>}
      </header>

      {activeInsight ? (
  <main>
    <section className="relative px-5 py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(215,180,106,0.18),transparent_32%),radial-gradient(circle_at_90%_30%,rgba(21,68,50,0.45),transparent_30%)]" />

      <div className="relative mx-auto max-w-4xl">
        <button
          onClick={() => scrollTo("insights")}
          className="mb-8 rounded-full border border-[#d7b46a]/50 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] hover:bg-[#132219]"
        >
          ← Back to Insights
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d7b46a]">
          {activeInsight.category}
        </p>

        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#f7ecd7] md:text-6xl">
          {activeInsight.title}
        </h1>

        <p className="mt-6 text-xl leading-9 text-[#d8cfbf]">
          {activeInsight.summary}
        </p>

        <div className="mt-10 space-y-6 rounded-[2rem] border border-[#223329] bg-[#0d1712] p-6 text-base leading-8 text-[#d8cfbf] shadow-lg md:p-8">
          {activeInsight.content.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-[#d7b46a]/30 bg-[#050806] p-6">
          <h2 className="text-2xl font-semibold text-[#d7b46a]">
            Need legal assistance?
          </h2>
          <p className="mt-3 leading-7 text-[#d8cfbf]">
            You may contact Veritas Jurix for legal advice or representation in suitable matters.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:+919513001005"
              className="rounded-full bg-[#d7b46a] px-7 py-4 text-center text-sm font-semibold uppercase tracking-widest text-[#050806] hover:bg-[#b9913f]"
            >
              Call Now
            </a>

            <button
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-[#d7b46a]/70 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] hover:bg-[#132219]"
            >
              Send Query
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
) : activePractice ? <main><section className="relative px-5 py-16 md:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(215,180,106,0.18),transparent_32%),radial-gradient(circle_at_90%_30%,rgba(21,68,50,0.45),transparent_30%)]" /><div className="relative mx-auto max-w-7xl"><button onClick={() => scrollTo("practice-areas")} className="mb-8 rounded-full border border-[#d7b46a]/50 px-5 py-3 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] hover:bg-[#132219]">← Back to Practice Areas</button><div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d7b46a]">Practice Area</p><h1 className="mt-4 text-5xl font-semibold leading-tight text-[#f7ecd7] md:text-7xl">{activePractice.title}</h1><p className="mt-6 text-xl leading-9 text-[#d8cfbf]">{activePractice.headline}</p><p className="mt-5 leading-8 text-[#b7aa95]">{activePractice.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="tel:+919513001005" className="rounded-full bg-[#d7b46a] px-7 py-4 text-center text-sm font-semibold uppercase tracking-widest text-[#050806] shadow-lg transition hover:bg-[#b9913f]">Call Now</a><button onClick={() => scrollTo("contact")} className="rounded-full border border-[#d7b46a]/70 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] transition hover:bg-[#132219]">Send Query</button></div></motion.div><motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="overflow-hidden rounded-[2.5rem] border border-[#d7b46a]/25 bg-[#0d1712] p-6 shadow-2xl"><img src={logoSrc} alt="Veritas Jurix logo" className="mb-6 h-44 w-full rounded-[2rem] object-cover opacity-85" /><h2 className="text-2xl font-semibold text-[#d7b46a]">Services include</h2><div className="mt-5 space-y-3">{activePractice.services.map((service) => <div key={service} className="flex items-center gap-3 rounded-2xl border border-[#223329] bg-[#050806] p-4"><ChevronRight className="text-[#d7b46a]" size={18} /><span>{service}</span></div>)}</div></motion.div></div></div></section><section className="border-y border-[#223329] bg-[#0d1712] px-5 py-16"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">{["Document Review", "Case Strategy", "Court Representation"].map((item) => <FloatingPanel key={item} className="rounded-[2rem] border border-[#223329] bg-[#050806] p-6"><h3 className="text-xl font-semibold text-[#f7ecd7]">{item}</h3><p className="mt-3 leading-7 text-[#d8cfbf]">Focused support designed according to the facts, urgency, and forum of the matter.</p></FloatingPanel>)}</div></section><section id="contact" className="mx-auto max-w-7xl px-5 py-24"><div className="rounded-[2rem] border border-[#223329] bg-[#0d1712] p-6 shadow-lg md:p-8"><h2 className="text-3xl font-semibold text-[#f7ecd7]">Contact Veritas Jurix for {activePractice.title}</h2><LeadForm compact title="Send a Query" /></div></section></main> : (
      <main id="home">
        <section className="relative min-h-[85vh] overflow-hidden px-5 py-10 md:py-20"><div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,8,6,0.98),rgba(8,23,17,0.88),rgba(5,8,6,0.98)),radial-gradient(circle_at_20%_20%,rgba(215,180,106,0.28),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(31,89,64,0.7),transparent_34%)]" /><motion.div aria-hidden="true" className="absolute left-[-10%] top-20 h-[1px] w-[120%] bg-gradient-to-r from-transparent via-[#d7b46a]/60 to-transparent" animate={{ x: ["-20%", "20%", "-20%"] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} /><motion.div aria-hidden="true" className="absolute right-[-20%] top-1/3 h-[1px] w-[130%] rotate-[-18deg] bg-gradient-to-r from-transparent via-[#d7b46a]/45 to-transparent" animate={{ x: ["20%", "-15%", "20%"] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} /><motion.div aria-hidden="true" className="absolute bottom-24 left-[-15%] h-[1px] w-[120%] rotate-[12deg] bg-gradient-to-r from-transparent via-[#d7b46a]/35 to-transparent" animate={{ x: ["-10%", "15%", "-10%"] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} /><div className="relative mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.02fr_0.98fr]"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><p className="mb-6 text-base font-semibold uppercase tracking-[0.45em] text-[#d7b46a]">TRUTH • STRATEGY • RESOLUTION</p><h1 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] text-[#f7ecd7]">
  Strategic Counsel.
  <br />
  Strong Representation.
  <br />
  Practical Resolution.
</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#d8cfbf]">Veritas Jurix is a Lucknow-based litigation and advisory law firm assisting clients in criminal, civil, matrimonial, taxation, and broader dispute matters with preparation-led advocacy.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row">
  <a
    href="tel:+919513001005"
    className="rounded-full bg-[#d7b46a] px-7 py-4 text-center text-sm font-semibold uppercase tracking-widest text-[#050806] shadow-lg transition hover:bg-[#b9913f]"
  >
    Call Now
  </a>

  <a
    href="https://wa.me/919513001005"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-[#25D366] px-7 py-4 text-center text-sm font-semibold uppercase tracking-widest text-[#25D366] transition hover:bg-[#25D366] hover:text-[#050806]"
  >
    WhatsApp
  </a>

  <button
    onClick={() => scrollTo("contact")}
    className="rounded-full border border-[#d7b46a]/70 px-7 py-4 text-sm font-semibold uppercase tracking-widest text-[#d7b46a] transition hover:bg-[#132219]"
  >
    Send Query
  </button>
</div></motion.div><motion.div  style={{ scale: heroScale, borderRadius: heroRadius, y: heroY }}
  className="relative min-h-[560px] overflow-hidden border border-[#d7b46a]/30 bg-gradient-to-br from-[#050806] via-[#0b1712] to-[#130f08] p-4 shadow-2xl"
><div className="absolute inset-4 rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(215,180,106,0.20),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_45%),radial-gradient(circle_at_50%_20%,rgba(215,180,106,0.22),transparent_28%)]" /><div className="absolute inset-x-8 bottom-8 top-20 overflow-hidden rounded-[2rem] border border-[#d7b46a]/20">
  <img
    src="/courthouse-bg.png"
    alt=""
    className="h-full w-full object-cover opacity-45"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/90 via-[#050806]/40 to-transparent" />
  
  </div><motion.img
  src={logoSrc}
  alt="Veritas Jurix logo"
 className="absolute z-10 left-1/2 top-8 h-48 w-48 -translate-x-1/2 md:h-72 md:w-72 -translate-x-1/2 rounded-[2.5rem] border border-[#d7b46a]/30 object-contain shadow-2xl drop-shadow-[0_0_45px_rgba(215,180,106,0.45)]" animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} /><div className="absolute inset-x-8 bottom-8 text-center">
  <p className="text-xl tracking-[0.25em] text-[#d7b46a] uppercase">
    Veritas Jurix
  </p>
  <p className="mt-2 text-sm tracking-[0.35em] text-[#d8cfbf] uppercase">
    Advocates & Legal Consultants
  </p>
</div></motion.div></div></section>
        <section id="about" className="border-y border-[#223329] bg-[#0d1712]"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">About the Firm</p><h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">Built for disputes that need preparation.</h2></div><div className="space-y-5 text-base leading-8 text-[#d8cfbf]"><p>Veritas Jurix provides legal representation and advisory support to individuals, businesses, and institutions in litigation and dispute-related matters.</p><p>The firm’s working style is focused on facts, documents, timelines, risk, remedy, and practical court strategy.</p></div></div></section>
        <section id="practice-areas" className="mx-auto max-w-7xl px-5 py-24"><div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">Practice Areas</p><h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">Legal services across litigation and advisory matters.</h2></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{practiceAreas.map((area) => { const Icon = area.icon; return <button key={area.title} onClick={() => openPracticePage(area.slug)} className="text-left"><FloatingPanel className="group rounded-[2rem] border border-[#223329] bg-[#0d1712] p-6 shadow-sm transition hover:border-[#d7b46a]/60 hover:bg-[#12231b]"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d7b46a] text-[#050806]"><Icon size={23} /></div><div className="flex items-start justify-between gap-4"><h3 className="text-xl font-semibold text-[#f7ecd7]">{area.title}</h3><ArrowUpRight className="text-[#d7b46a] opacity-0 transition group-hover:opacity-100" /></div><p className="mt-3 leading-7 text-[#d8cfbf]">{area.text}</p><p className="mt-5 text-sm font-semibold uppercase tracking-widest text-[#d7b46a]">Explore Practice Area →</p></FloatingPanel></button>; })}</div></section>
        <section id="team" className="border-y border-[#223329] bg-[#0d1712] px-5 py-24"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">Attorney Profiles</p><h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">Partners at Veritas Jurix.</h2></div><div className="grid gap-6 md:grid-cols-2">{attorneys.map((person) => <FloatingPanel key={person.name} className="rounded-[2rem] border border-[#223329] bg-[#050806] p-6 shadow-lg hover:border-[#d7b46a]/50"><div className="mb-6 overflow-hidden rounded-[1.75rem] border border-[#d7b46a]/30 bg-[#0d1712]"><img src={person.photo} alt={person.name} className="h-[300px] md:h-[340px] w-full object-contain bg-[#050806] p-1 object-top transition duration-700 hover:scale-105" /></div><div className="mb-6"><h3 className="text-2xl font-semibold text-[#f7ecd7]">{person.name}</h3><p className="text-[#d7b46a]">{person.role}</p></div><div className="grid gap-4 text-sm text-[#d8cfbf] sm:grid-cols-2"><div className="rounded-2xl border border-[#223329] p-4 sm:col-span-2"><BriefcaseBusiness className="mb-2 text-[#d7b46a]" size={20} /><strong>Practice Focus</strong><br />{person.focus}</div><div className="rounded-2xl border border-[#223329] p-4 sm:col-span-2"><Building2 className="mb-2 text-[#d7b46a]" size={20} /><strong>Court Appearances</strong><br />{person.courts}</div></div></FloatingPanel>)}</div></div></section>
        <section id="approach" className="relative bg-[#d7b46a] text-[#050806]"><div className="mx-auto max-w-7xl px-5 py-20"><p className="text-sm font-semibold uppercase tracking-[0.3em]">Our Approach</p><div className="mt-8 grid gap-6 md:grid-cols-3">{[["Careful Preparation", "Facts, documents, chronology, and clear legal issues."], ["Practical Strategy", "Advice framed around urgency, forum, risk, cost, and likely outcomes."], ["Responsive Support", "Clear communication and timely updates at important stages."]].map(([title, text]) => <FloatingPanel key={title} className="rounded-[2rem] border border-[#050806]/15 bg-[#f2d694]/45 p-6"><ChevronRight className="mb-5" /><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7">{text}</p></FloatingPanel>)}</div></div></section>
       <section id="insights" className="mx-auto max-w-7xl px-5 py-24">
  <div className="mb-12 max-w-2xl">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">
      Legal Insights
    </p>
    <h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">
      Practical legal updates for clients.
    </h2>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    {insights.map((post) => (
      <button
        key={post.slug}
        onClick={() => {
          setActivePage(post.slug);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-left"
      >
        <FloatingPanel className="group h-full rounded-[2rem] border border-[#223329] bg-[#0d1712] p-6 hover:border-[#d7b46a]/50">
          <BookOpen className="mb-6 text-[#d7b46a]" />
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#d7b46a]">
            {post.category}
          </p>
          <h3 className="text-xl font-semibold leading-7 text-[#f7ecd7]">
            {post.title}
          </h3>
          <p className="mt-4 leading-7 text-[#d8cfbf]">
            {post.summary}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#d7b46a]">
            Read Insight →
          </p>
        </FloatingPanel>
      </button>
    ))}
  </div>
 
      </section>
        <section id="contact" className="mx-auto max-w-7xl px-5 py-24"><div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">Contact</p><h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">Send your query to Veritas Jurix.</h2><p className="mt-5 leading-8 text-[#d8cfbf]">Please do not share confidential information until an advocate-client relationship is formally established.</p></div><div className="rounded-[2rem] border border-[#223329] bg-[#0d1712] p-6 shadow-lg md:p-8"><div className="space-y-5"><a href="tel:+919513001005" className="flex gap-4 rounded-2xl border border-[#223329] p-4 transition hover:bg-[#162a21]"><Phone className="text-[#d7b46a]" /> <span><strong>Phone</strong><br />+91-9513001005</span></a><a href="mailto:contact@veritasjurix.com" className="flex gap-4 rounded-2xl border border-[#223329] p-4 transition hover:bg-[#162a21]"><Mail className="text-[#d7b46a]" /> <span><strong>Email</strong><br />contact@veritasjurix.com</span></a><div className="flex gap-4 rounded-2xl border border-[#223329] p-4"><MapPin className="shrink-0 text-[#d7b46a]" /> <span><strong>Office</strong><br /> High Court of Allahabad, Lucknow, PIN 226010, Uttar Pradesh</span></div></div><LeadForm /></div></div></section>
        <section className="border-t border-[#223329] bg-[#0d1712] px-5 py-20"><div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d7b46a]">Office Location</p><h2 className="mt-3 text-4xl font-semibold text-[#f7ecd7]">Visit Veritas Jurix.</h2><p className="mt-5 leading-8 text-[#d8cfbf]"> High Court of Allahabad, Lucknow, PIN 226010, Uttar Pradesh</p><a href="https://www.google.com/maps/search/?api=1&query=%20High%20Court%20of%20Allahabad%20Lucknow%20226010" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-[#d7b46a] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#050806] hover:bg-[#b9913f]">Open Directions</a></div><div className="min-h-[320px] overflow-hidden rounded-[2rem] border border-[#223329] bg-[#050806]"><iframe title="Veritas Jurix Office Location" src="https://www.google.com/maps?q=High%20Court%20of%20Allahabad%20Lucknow&output=embed" className="h-[320px] w-full border-0 opacity-90" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
      </main>)}
      <a
  href="https://wa.me/919513001005"
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl transition hover:scale-110"
  aria-label="Chat on WhatsApp"
>
  <span className="text-2xl text-white">💬</span>
</a>
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 border-t border-[#223329] bg-[#050806] md:hidden">
  <a
    href="tel:+919513001005"
    className="flex items-center justify-center gap-2 border-r border-[#223329] py-4 text-sm font-semibold uppercase tracking-widest text-[#d7b46a]"
  >
    📞 Call Now
  </a>

  <a
    href="https://wa.me/919513001005"
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center gap-2 py-4 text-sm font-semibold uppercase tracking-widest text-[#25D366]"
  >
    💬 WhatsApp
  </a>
</div>
      
      <footer className="border-t border-[#223329] bg-[#0d1712]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-[#b7aa95] md:flex-row"><p>© 2026 Veritas Jurix. All rights reserved.</p><p>This website is for general information only and does not constitute legal advice.</p></div></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
