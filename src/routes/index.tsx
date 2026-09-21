import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  ArrowUp,
  Award,
  Briefcase,
  Code2,
  Database,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Send,
  Sparkles,
  Terminal,
  Trophy,
  X,
} from "lucide-react";

import heroImage from "@/assets/hero-illustration.png";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";
import {
  achievements,
  certifications,
  education,
  internship,
  profile,
  projects,
  skills,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Swetha G — Java Developer & Full-Stack Portfolio" },
      {
        name: "description",
        content:
          "Swetha G is a Computer Science and Engineering student and Java developer building full-stack web applications with Java, MySQL and modern web technologies.",
      },
      { property: "og:title", content: "Swetha G — Java Developer & Full-Stack Portfolio" },
      {
        property: "og:description",
        content:
          "Projects, skills, education and internship experience of Swetha G, Java and full-stack developer.",
      },
    ],
  }),
  component: Portfolio,
});

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "internship", label: "Internship" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const categoryIcon: Record<string, typeof Code2> = {
  Programming: Code2,
  "Web Development": Terminal,
  Database: Database,
  Concepts: Sparkles,
  Tools: Briefcase,
  "Soft Skills": Award,
};

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#home" className="font-display text-lg font-bold tracking-tight">
            Swetha<span className="text-primary">.G</span>
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/admin-login"
              className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Admin
            </Link>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-border p-2 text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-surface px-4 py-3 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/admin-login"
                className="rounded-lg px-3 py-2 text-sm text-primary"
                onClick={() => setMenuOpen(false)}
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="hero-glow relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground">
              <span className="size-2 rounded-full bg-success" /> Open to software development
              opportunities
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Hi, I'm <span className="text-gradient">Swetha G</span>
            </h1>
            <p className="mt-4 font-mono text-sm text-primary sm:text-base">{profile.tagline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                View My Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SocialLink href={profile.github} label="GitHub">
                <Github className="size-4" />
              </SocialLink>
              <SocialLink href={profile.linkedin} label="LinkedIn">
                <Linkedin className="size-4" />
              </SocialLink>
              <SocialLink href={profile.leetcode} label="LeetCode">
                <Code2 className="size-4" />
              </SocialLink>
            </div>
          </div>
          <Reveal className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl" />
              <img
                src={heroImage}
                alt="Illustration representing Java and full-stack development"
                width={1024}
                height={1024}
                className="w-64 sm:w-80 lg:w-[26rem]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me" subtitle="Career objective">
        <Reveal className="card-surface p-6 sm:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">{profile.objective}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Computer Science Education",
              "Java",
              "Object-Oriented Programming",
              "Web Development",
              "MySQL",
              "Problem Solving",
              "Self-Learning",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Education */}
      <Section id="education" title="Education" subtitle="Academic background">
        <div className="grid gap-5 md:grid-cols-3">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 80}>
              <article className="card-surface h-full p-6">
                <GraduationCap className="size-6 text-primary" />
                <h3 className="mt-4 text-base font-semibold">{item.degree}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.institution}</p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">{item.period}</p>
                <p className="mt-1 text-sm font-semibold text-accent">{item.score}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Technical Skills" subtitle="What I work with">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => {
            const Icon = categoryIcon[group.category] ?? Code2;
            return (
              <Reveal key={group.category} delay={index * 70}>
                <article className="card-surface h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-primary/12 p-2 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-base font-semibold">{group.category}</h3>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Internship */}
      <Section id="internship" title="Internship" subtitle="Industry experience">
        <Reveal>
          <article className="card-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{internship.title}</h3>
                <p className="mt-1 text-sm text-primary">{internship.company}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-muted-foreground">{internship.duration}</p>
                <p className="mt-1 text-xs text-accent">{internship.type}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {internship.description}
            </p>
          </article>
        </Reveal>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Things I have built">
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.name}
              delay={index * 80}
              className={project.featured ? "lg:col-span-2" : ""}
            >
              <article className="card-surface flex h-full flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  {project.featured && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      Featured Project
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </div>
                <h3
                  className={`mt-4 font-semibold ${project.featured ? "text-2xl" : "text-lg"}`}
                >
                  {project.name}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-wide text-primary">{project.type}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 pt-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    <Github className="size-4" /> GitHub
                  </a>
                  {project.featured && (
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      Request Live Demo
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications" title="Certifications" subtitle="Verified learning">
        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <Reveal key={cert} delay={index * 80}>
              <article className="card-surface flex h-full items-start gap-4 p-6">
                <span className="rounded-lg bg-primary/12 p-2 text-primary">
                  <Award className="size-5" />
                </span>
                <p className="text-sm font-medium leading-relaxed">{cert}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" title="Achievements" subtitle="Highlights">
        <div className="grid gap-5 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <Reveal key={item} delay={index * 80}>
              <article className="card-surface h-full p-6">
                <Trophy className="size-6 text-accent" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get In Touch" subtitle="Contact me">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="card-surface h-full p-6 sm:p-8">
              <h3 className="text-lg font-semibold">Contact details</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Feel free to reach out about internships, projects or collaboration.
              </p>
              <div className="mt-6 space-y-4 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-4 text-primary" /> {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="size-4 text-primary" /> {profile.phone}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Linkedin className="size-4 text-primary" /> LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="size-4 text-primary" /> GitHub
                </a>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Code2 className="size-4 text-primary" /> LeetCode
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div>
            <p className="font-display text-base font-semibold">{profile.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{profile.role}</p>
          </div>
          <div className="flex items-center gap-3">
            <SocialLink href={profile.github} label="GitHub">
              <Github className="size-4" />
            </SocialLink>
            <SocialLink href={profile.linkedin} label="LinkedIn">
              <Linkedin className="size-4" />
            </SocialLink>
            <SocialLink href={profile.leetcode} label="LeetCode">
              <Code2 className="size-4" />
            </SocialLink>
          </div>
        </div>
        <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </div>
      </footer>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-transform hover:-translate-y-1"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
      {label}
    </a>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <Reveal className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{subtitle}</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
      </Reveal>
      {children}
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name cannot be empty").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .min(1, "Email cannot be empty")
    .email("Enter a valid email address")
    .max(150, "Email is too long"),
  subject: z.string().trim().min(1, "Subject cannot be empty").max(200, "Subject is too long"),
  message: z.string().trim().min(1, "Message cannot be empty").max(2000, "Message is too long"),
});

type ContactFields = z.infer<typeof contactSchema>;

function ContactForm() {
  const empty: ContactFields = { name: "", email: "", subject: "", message: "" };
  const [values, setValues] = useState<ContactFields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const update = (field: keyof ContactFields, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setServerError("");
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactFields;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) {
      setStatus("error");
      setServerError("Your message could not be saved. Please try again in a moment.");
      return;
    }
    setValues(empty);
    setStatus("sent");
  };

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8" noValidate>
      <h3 className="text-lg font-semibold">Send a message</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Messages are stored securely and reviewed from the admin dashboard.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            maxLength={100}
            onChange={(event) => update("name", event.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="Your full name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            maxLength={150}
            onChange={(event) => update("email", event.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="you@example.com"
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Subject" error={errors.subject}>
          <input
            type="text"
            value={values.subject}
            maxLength={200}
            onChange={(event) => update("subject", event.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="What is this about?"
          />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Message" error={errors.message}>
          <textarea
            rows={5}
            value={values.message}
            maxLength={2000}
            onChange={(event) => update("message", event.target.value)}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            placeholder="Write your message here..."
          />
        </Field>
      </div>

      {status === "sent" && (
        <p className="mt-5 rounded-lg border border-success/40 bg-success/10 px-4 py-3 text-sm text-success">
          Thank you! Your message has been received successfully.
        </p>
      )}
      {serverError && (
        <p className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        <Send className="size-4" />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
