"use client"

import { Card } from "@/components/ui/card"
import axios from "axios"
import { Check } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import MembershipForm from "./membership_form"
import api from "@/config"
export default function Membership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    department: "",
    year: "",
    interests: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const validate = (data) => {
    const errs = {}
    if (!data.name || !data.name.trim()) errs.name = "Full name is required."
    if (!data.email || !data.email.trim()) errs.email = "Email is required."
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Enter a valid email address."
    if (!data.phone || !data.phone.trim()) errs.phone = "Phone number is required."
    else if (!/^[+\d()\-.\s]{7,}$/.test(data.phone)) errs.phone = "Enter a valid phone number."
    if (!data.studentId || !data.studentId.trim()) errs.studentId = "Student ID is required."
    if (!data.department || !data.department.trim()) errs.department = "Department is required."
    if (!data.year || !data.year.trim()) errs.year = "Year of study is required."
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage("")
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await api.post("/member/register", formData);

      // handle successful response
      setSuccessMessage(response.data?.message || "Registration successful.")
      toast.success("Registration successful!")
      // optionally reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        studentId: "",
        department: "",
        year: "",
        interests: "",
      })
      console.log("Server response:", response.data)
    } catch (error) {
      console.error(error)
      toast.error("Registration failed. Please try again.")
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // server responded with a status outside 2xx
          const serverMsg =
            (error.response.data && (error.response.data.message || error.response.data.error)) ||
            `Server error: ${error.response.status}`
          setErrors({ submit: serverMsg })
        } else if (error.request) {
          // request made but no response
          setErrors({ submit: "No response from server. Please check your network." })
        } else {
          // something happened setting up request
          setErrors({ submit: "Request error. Please try again." })
        }
      } else {
        setErrors({ submit: "An unexpected error occurred." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    "Access to exclusive workshops and events",
    "Networking opportunities with industry professionals",
    "Hands-on project experience",
    "Mentorship from experienced developers",
    "Free access to learning resources",
    "Certificate of membership",
    "Priority registration for hackathons",
    "Career guidance and job opportunities",
  ]

  return (
    <section id="membership" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Become a member and unlock access to exclusive events, resources, and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Membership Benefits</h3>
            <Card className="p-8 border-border/50">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-center">
                  <span className="font-bold text-primary">Free Membership</span> - No fees required!
                </p>
              </div>
            </Card>
          </div>

          <MembershipForm handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />


        </div>
      </div>
    </section>
  )
}
