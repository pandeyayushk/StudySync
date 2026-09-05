export default function SetupLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
        <div className="h-4 w-72 bg-slate-100 rounded-md"></div>
      </div>
      <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
      <div className="h-80 bg-white rounded-xl border border-slate-200 p-6"></div>
    </div>
  )
}
