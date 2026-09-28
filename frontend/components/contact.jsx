"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react"
import { FaFacebook } from "react-icons/fa"
import ScrollReveal from "@/components/home/ScrollReveal"

const EMAIL = "duits.official@gmail.com"
const TOPICS = ["Membership", "Event partnership", "Collaboration", "General enquiry"]

const INFO = [
  { icon: Mail, label: "Email", lines: [EMAIL], href: `mailto:${EMAIL}` },
  { icon: Phone, label: "Phone", lines: ["01519-201101"], href: "tel:+8801519201101" },
  { icon: MapPin, label: "Address", lines: ["1st Floor, TSC", "University of Dhaka", "Dhaka 1205, Bangladesh"] },
  { icon: Clock, label: "Office hours", lines: ["Mon – Fri: 9:00 AM – 5:00 PM", "Saturday: 10:00 AM – 2:00 PM", "Sunday: Closed"] },
]

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
const label = "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const set = (key) => (e) => setFormData((f) => ({ ...f, [key]: e.target.value }))

  const pickTopic = (t) =>
    setFormData((f) => (f.subject === "" || TOPICS.includes(f.subject) ? { ...f, subject: t } : f))

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(formData.subject || `DUITS enquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nReply email: ${formData.email}\n\n${formData.message}`)
    setSent(true)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-[#050b1f] dark:text-white">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e3edff] via-[#f0f6ff] to-white pb-16 pt-32 dark:from-[#050b1f] dark:via-[#050b1f] dark:to-[#050b1f] sm:pb-20 sm:pt-36">
        <div className="ct-grid" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-400/25 blur-[100px] dark:bg-blue-600/25" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-300/25 blur-[100px] dark:bg-cyan-500/10" aria-hidden="true" />
        <MessageSquare aria-hidden="true" strokeWidth={1} className="pointer-events-none absolute -right-10 top-20 hidden h-80 w-80 text-blue-600/[0.07] dark:text-blue-400/[0.08] lg:block" />

        <div className="ct-in relative mx-auto max-w-6xl px-6 sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-blue-800 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-blue-100">
            <MessageSquare size={14} /> Stay in touch
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">talk.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            For membership questions, event partnerships, campus collaborations, or general enquiries, reach the society through the channels below.
          </p>
        </div>

        <style>{`
          .ct-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.08) 1px, transparent 1px); background-size: 56px 56px; -webkit-mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); mask-image: radial-gradient(ellipse 70% 80% at 30% 30%, #000 25%, transparent 75%); }
          .dark .ct-grid { background-image: linear-gradient(rgba(148,163,184,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.08) 1px, transparent 1px); }
          .ct-in { animation: ctin .8s cubic-bezier(.2,.7,.2,1) both; }
          @keyframes ctin { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .ct-in { animation: none; } }
        `}</style>
      </section>

      {/* Info + form */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left: info + map */}
          <ScrollReveal from="left">
            <div className="space-y-4">
              {INFO.map(({ icon: I, label: name, lines, href }) => {
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-content-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                      <I size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">{name}</span>
                      {lines.map((l) => (
                        <span key={l} className="mt-0.5 block break-words text-sm font-medium leading-6 text-slate-900 dark:text-slate-100">{l}</span>
                      ))}
                    </span>
                  </>
                )
                const cls = "group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none"
                return href ? (
                  <Link key={name} href={href} className={`${cls} hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/10 dark:hover:border-blue-400/40`}>{body}</Link>
                ) : (
                  <div key={name} className={cls}>{body}</div>
                )
              })}

              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm dark:border-white/10 dark:shadow-none">
                <iframe
                  title="DUITS location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3947964830596!2d90.39364931543654!3d23.735001184596734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xfcc5b021faff43ea!2sTeacher-Student%20Center%20(TSC)!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block grayscale transition-all duration-300 hover:grayscale-0 dark:opacity-80 dark:hover:opacity-100"
                />
              </div>

              <a
                href="https://www.facebook.com/Dhaka.University.IT.Society.DUITS/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:bg-blue-500"
              >
                <FaFacebook /> Follow us on Facebook
              </a>
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal from="right" delay={80}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 dark:border-white/10 dark:bg-[#0b1636]/60 dark:shadow-none sm:p-9">
              <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <span className={label}>What is this about?</span>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a topic">
                    {TOPICS.map((t) => {
                      const on = formData.subject === t
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => pickTopic(t)}
                          aria-pressed={on}
                          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${on ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25 dark:border-blue-500 dark:bg-blue-500" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"}`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Name</label>
                    <input id="name" name="name" autoComplete="name" placeholder="Your full name" value={formData.name} onChange={set("name")} required className={`${field} h-12`} />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={set("email")} required className={`${field} h-12`} />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={label}>Subject</label>
                  <input id="subject" name="subject" placeholder="How can we help you?" value={formData.subject} onChange={set("subject")} required className={`${field} h-12`} />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                    <span className="text-xs text-slate-400">{formData.message.length}/1000</span>
                  </div>
                  <textarea id="message" name="message" rows={6} maxLength={1000} placeholder="Tell us more about what you need..." value={formData.message} onChange={set("message")} required className={`${field} resize-none py-3.5`} />
                </div>

                <button
                  type="submit"
                  className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  <Send size={16} /> Send message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>

                {sent && (
                  <div role="status" className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-100">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-content-center rounded-full bg-blue-600 text-white"><Check size={12} strokeWidth={3} /></span>
                    <p>Your email app should open with the message ready to send. If nothing happens, write to us directly at <a href={`mailto:${EMAIL}`} className="font-semibold underline">{EMAIL}</a>.</p>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}