export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">NAVYK</h1>
      <p className="mt-2 text-gray-600">Карьерная и образовательная платформа.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a className="rounded border p-4 hover:bg-gray-50" href="/jobs">Вакансии</a>
        <a className="rounded border p-4 hover:bg-gray-50" href="/auth">Вход / Регистрация</a>
      </div>
    </main>
  )
}
