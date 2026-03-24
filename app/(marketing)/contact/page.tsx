import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Contact | ${siteContent.companyName}`,
  description:
    "Contact Integrity Roofing of Mississippi for roof repair, replacement, and roofing estimates on the Mississippi Gulf Coast.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Talk with Integrity Roofing of Mississippi"
            description={`${siteContent.contact.responseNote} ${siteContent.licenseNumber}.`}
          />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-900">Contact Details</h2>
              <div className="mt-6 space-y-5 text-sm text-zinc-600">
                <div>
                  <p className="font-semibold text-zinc-900">Phone</p>
                  <a href={`tel:${siteContent.phone}`} className="hover:text-zinc-900">
                    {siteContent.phone}
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">Email</p>
                  <a href={`mailto:${siteContent.email}`} className="break-all hover:text-zinc-900">
                    {siteContent.email}
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">Coverage</p>
                  <p>{siteContent.serviceAreaDetail}</p>
                </div>
                <div>
                  <p className="font-semibold text-zinc-900">Credentials</p>
                  <p>Licensed &amp; Insured • {siteContent.licenseNumber}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-zinc-900">What to include when you reach out</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                A quick phone call is often the fastest way to start. If you are
                sending an email, including a few details up front can make the
                response more helpful.
              </p>

              <ul className="mt-8 space-y-4">
                {siteContent.contact.estimateChecklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl bg-zinc-900 p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                  Fastest Option
                </p>
                <p className="mt-3 text-lg font-semibold">Call {siteContent.phone}</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  For active leaks, visible storm damage, or time-sensitive issues,
                  phone is the best first step.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Service Area"
                title="Mississippi Gulf Coast coverage"
                description="Use this contact page to reinforce the cities and communities the company most wants to be known for online."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {siteContent.serviceCities.map((city) => (
                <div
                  key={city}
                  className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm font-medium text-zinc-700"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
