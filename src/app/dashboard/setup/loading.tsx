export default function SetupLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-800 rounded-md"></div>
        <div className="h-4 w-72 bg-slate-800/60 rounded-md"></div>
      </div>
      <div className="h-10 w-48 bg-slate-800 rounded-lg"></div>
      <div className="h-80 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-6"></div>
    </div>
  )
}
