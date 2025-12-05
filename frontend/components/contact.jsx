"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = () => {
    console.log("Contact form submitted:", formData)
    // Handle form submission
    alert("Message sent successfully!")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-white mt-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-6">
              Let's talk
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Whether you have a question, want to collaborate, or just want to say hello, we're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <Mail className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Email</p>
                        <a 
                          href="mailto:duits.official@gmail.com" 
                          className="text-slate-900 hover:text-slate-600 transition-colors"
                        >
                          duits.official@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <Phone className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
                        <a 
                          href="tel:+8801519201101" 
                          className="text-slate-900 hover:text-slate-600 transition-colors"
                        >
                          01519-201101
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <MapPin className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Address</p>
                        <p className="text-slate-900">
                          1st Floor, TSC<br />
                          University of Dhaka<br />
                          Dhaka 1205, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 transition-colors">
                        <Clock className="w-5 h-5 text-slate-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Office Hours</p>
                        <div className="text-slate-900 space-y-1">
                          <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                          <p>Saturday: 10:00 AM - 2:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3947964830596!2d90.39364931543654!3d23.735001184596734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xfcc5b021faff43ea!2sTeacher-Student%20Center%20(TSC)!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="name" 
                        className="text-sm font-medium text-slate-700"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="email" 
                        className="text-sm font-medium text-slate-700"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="subject" 
                      className="text-sm font-medium text-slate-700"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="message" 
                      className="text-sm font-medium text-slate-700"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about what you need..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 transition-colors resize-none"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors group"
                  >
                    Send message
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}