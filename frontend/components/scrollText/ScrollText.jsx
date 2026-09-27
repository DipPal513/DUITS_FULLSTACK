export default function ScrollText() {
  return (
    <section className="border-y border-border bg-secondary/45">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase text-primary">Learn · Build · Contribute</p>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-right">
          Connecting students through technology, practical learning, and shared work.
        </p>
      </div>
    </section>
  )
}