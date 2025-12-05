"use client"

import React, { useState } from "react"
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react"

// --- UI Components (Simulating @/components/ui) ---

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:text-slate-100 ${className}`}
      {...props}
    />
  )
}

const Label = ({ className, children, ...props }) => {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 dark:text-slate-100 ${className}`}
      {...props}
    />
  )
}

// --- Main Contact Component ---

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
    // alert("Message sent successfully!") // Replaced with console log for preview safety
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    // Added dark:bg-slate-950 for the main background
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Hero Section */}
      {/* Added dark gradient and border colors */}
      <section className="relative bg-gradient-to-br pt-30 from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            {/* Added dark:text-white */}
            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
              Let's talk
            </h1>
            {/* Added dark:text-slate-400 */}
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
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
                {/* Added dark:text-white */}
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {/* Item 1: Email */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      {/* Icon Box: Added dark:bg-slate-900, dark:group-hover:bg-slate-800 */}
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                        {/* Icon: Added dark:text-slate-400 */}
                        <Mail className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                      </div>
                      <div>
                        {/* Label: Added dark:text-slate-400 */}
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Email</p>
                        {/* Value: Added dark:text-slate-200, dark:hover:text-white */}
                        <a 
                          href="mailto:duits.official@gmail.com" 
                          className="text-slate-900 dark:text-slate-200 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                          duits.official@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Item 2: Phone */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                        <Phone className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Phone</p>
                        <a 
                          href="tel:+8801519201101" 
                          className="text-slate-900 dark:text-slate-200 hover:text-slate-600 dark:hover:text-white transition-colors"
                        >
                          01519-201101
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Item 3: Address */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                        <MapPin className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Address</p>
                        <p className="text-slate-900 dark:text-slate-200">
                          1st Floor, TSC<br />
                          University of Dhaka<br />
                          Dhaka 1205, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Office Hours */}
                  <div className="group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                        <Clock className="w-5 h-5 text-slate-700 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Office Hours</p>
                        <div className="text-slate-900 dark:text-slate-200 space-y-1">
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
              {/* Added dark:border-slate-800 */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.3947964830596!2d90.39364931543654!3d23.735001184596734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a55cd36f%3A0xfcc5b021faff43ea!2sTeacher-Student%20Center%20(TSC)!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300 dark:opacity-80 dark:hover:opacity-100"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {/* Card: Added dark:bg-slate-900, dark:border-slate-800 */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 lg:p-10 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label 
                        htmlFor="name" 
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        // Note: Dark styles for inputs are handled in the component definition above
                        className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:focus:border-slate-100 dark:focus:ring-slate-100 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label 
                        htmlFor="email" 
                        className="text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:focus:border-slate-100 dark:focus:ring-slate-100 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="subject" 
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="h-11 border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:focus:border-slate-100 dark:focus:ring-slate-100 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="message" 
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about what you need..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-slate-300 focus:border-slate-900 focus:ring-slate-900 dark:focus:border-slate-100 dark:focus:ring-slate-100 transition-colors resize-none"
                    />
                  </div>

                  {/* Button: Added dark mode text/bg inversion */}
                  <Button 
                    onClick={handleSubmit}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium rounded-lg transition-colors group"
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