import { redirect } from 'next/navigation'

export default async function BlogPage({ params }) {
  const { id } = await params
  redirect(`/dashboard/createblog?id=${encodeURIComponent(id)}`)
}
