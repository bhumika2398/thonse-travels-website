import PageHeader from "../components/PageHeader.jsx";
import BookingForm from "../components/BookingForm.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Reveal from "../components/Reveal.jsx";
import useDocumentMeta from "../hooks/useDocumentMeta.js";
import { siteInfo } from "../data/siteInfo.js";

export default function Contact() {
  useDocumentMeta(
    "Contact Us | Book a Ride — Thonse Tours and Travels, Udupi",
    "Book a Swift Dzire, Ertiga, or Udupi airport taxi with Thonse Tours and Travels. Call, WhatsApp, or fill out our booking form and Mukthar Ahmed's team will confirm shortly."
  );

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Book a Ride or Ask Us Anything"
        subtitle="Reach us directly, or send your travel details below — we typically confirm within minutes during the day."
        image="gallery-pier-sunset.jpg"
        imageAlt="Pier sunset on the Udupi coast"
      />

      <section className="section-glow-light section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <BookingForm />
            </Reveal>

            <div className="flex flex-col gap-8 lg:col-span-2">
              <Reveal delay={100}>
                <div className="glass-light rounded-3xl p-7 sm:p-9">
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    Contact Details
                  </h3>
                  <ul className="mt-5 space-y-4 text-sm text-ink/75">
                    <li>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gold-dark">
                        Owner
                      </span>
                      {siteInfo.owner}
                    </li>
                    <li>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gold-dark">
                        Phone
                      </span>
                      <a href={siteInfo.callLink} className="hover:text-gold-dark">
                        {siteInfo.phoneDisplay}
                      </a>
                    </li>
                    <li>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gold-dark">
                        WhatsApp
                      </span>
                      <a href={siteInfo.whatsappLink} target="_blank" rel="noreferrer" className="hover:text-gold-dark">
                        Chat with us
                      </a>
                    </li>
                    <li>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gold-dark">
                        Email
                      </span>
                      <a href={`mailto:${siteInfo.email}`} className="hover:text-gold-dark">
                        {siteInfo.email}
                      </a>
                    </li>
                    <li>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-gold-dark">
                        Address
                      </span>
                      {siteInfo.address}
                    </li>
                  </ul>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold-dark">
                    <span className="h-2 w-2 rounded-full bg-gold-dark animate-pulse" />
                    Licensed &amp; Insured · Available 24×7
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
