import Background from '../components/Background';

export default function BackgroundLayout({ children }) {
  return (
    <>
      <Background />

      <header className="p-4 flex justify-end fixed top-0 w-screen">
        <img className="w-32" src="/ropera-logo.svg" alt="Ropera Logo"/>
      </header>
      
      <main className="text-white px-4">
        {children}
      </main>
    </>
  )
}