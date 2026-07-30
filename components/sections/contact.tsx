import { Reveal } from "@/components/reveal";
import { ContactRow } from "@/components/ui/contact-row";
import { MagneticButton } from "@/components/magnetic-button";
import { AtSign, Phone, MapPin, MessageCircle } from "lucide-react";
import type { Github, Linkedin, Mail } from "lucide-react";

export function Contact({
  socials,
  email,
  phone,
  location,
  resume,
}: {
  socials: { label: string; href: string; icon: typeof Github | typeof Linkedin | typeof Mail }[];
  email?: string;
  phone?: string;
  location?: string;
  resume?: string;
}) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 px-4 pb-24 pt-24 sm:px-6 lg:px-10 lg:pb-36 lg:pt-36"
      aria-labelledby="contact-title"
    >
      <Reveal className="contact-panel mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#89d0ff]/[.16] p-6 sm:p-10 lg:p-14">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.16fr_.84fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#9bd8ff]">
              07 / Contact
            </p>
            <h2
              id="contact-title"
              className="mt-5 max-w-2xl font-[family-name:var(--font-geist)] text-5xl leading-[.88] tracking-[-.08em] sm:text-7xl"
            >
              Let’s make something people want to keep using.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/62">
              For an AI product, a thoughtful web experience, or a technical
              conversation—this is a good place to begin.
            </p>
            <div className="mt-9 flex flex-wrap gap-2">
              {socials.length ? (
                socials.map(({ label, href, icon: Icon }) => (
                  <MagneticButton
                    key={label}
                    href={href}
                    external={href.startsWith("http")}
                    icon
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </MagneticButton>
                ))
              ) : (
                <p className="rounded-full border border-white/[.1] bg-white/[.04] px-4 py-3 font-mono text-[10px] text-white/48">
                  Contact details can be enabled securely with environment
                  variables.
                </p>
              )}
            </div>
          </div>
          <div className="rounded-[24px] border border-white/[.1] bg-black/20 p-5 sm:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/42">
              Direct channels
            </p>
            <div className="mt-7 space-y-4">
              <ContactRow
                icon={<AtSign className="h-4 w-4" />}
                label="Email"
                value={email || "Available on request"}
                href={email ? `mailto:${email}` : undefined}
              />
              <ContactRow
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={phone || "Available on request"}
                href={phone ? `tel:${phone.replace(/\s/g, "")}` : undefined}
              />
              <ContactRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={location || "Available on request"}
              />
              <ContactRow
                icon={<MessageCircle className="h-4 w-4" />}
                label="Resume"
                value={resume ? "Download PDF" : "Available on request"}
                href={resume}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
