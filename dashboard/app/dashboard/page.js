"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import { storage, STORAGE_KEYS } from "@/lib/storage"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    members: 0,
    executives: 0,
    events: 0,
    gallery: 0,
  })

  useEffect(() => {
    // Load stats from storage
    const members = storage.get(STORAGE_KEYS.MEMBERS) || []
    const executives = storage.get(STORAGE_KEYS.EXECUTIVES) || []
    const events = storage.get(STORAGE_KEYS.EVENTS) || []
    const gallery = storage.get(STORAGE_KEYS.GALLERY) || []

    setStats({
      members: members.length,
      executives: executives.length,
      events: events.length,
      gallery: gallery.length,
    })
  }, [])

  const statCards = [
    {
      title: "Total Members",
      value: stats.members,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      title: "Executives",
      value: stats.executives,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    {
      title: "Upcoming Events",
      value: stats.events,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      title: "Gallery Items",
      value: stats.gallery,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your IT club today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg border ${stat.color}`}>{stat.icon}</div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-left transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Add Member</span>
              </div>
            </button>

            <button className="p-4 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/20 text-left transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Create Event</span>
              </div>
            </button>

            <button className="p-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-left transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">Upload Photo</span>
              </div>
            </button>

            <button className="p-4 rounded-lg bg-muted hover:bg-muted/80 border border-border text-left transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted-foreground/10 group-hover:bg-muted-foreground/20 transition-colors">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-foreground">View Reports</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New member joined</p>
                <p className="text-xs text-muted-foreground mt-1">John Doe joined the IT club</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Event scheduled</p>
                <p className="text-xs text-muted-foreground mt-1">Web Development Workshop on Feb 15</p>
              </div>
              <span className="text-xs text-muted-foreground">5h ago</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
