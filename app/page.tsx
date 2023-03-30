import Questions from './Components/Questions/page'

export default function Home() {
  return (
    <main className="main">
      {/* @ts-expect-error Server Component */}
      <Questions />
    </main>
  )
}
