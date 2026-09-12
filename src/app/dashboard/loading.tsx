export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-800 rounded-md"></div>
        <div className="h-4 w-72 bg-slate-800/60 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-4 space-y-2">
            <div className="h-4 w-20 bg-slate-800 rounded"></div>
            <div className="h-6 w-32 bg-slate-800/60 rounded"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="h-48 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-6"></div>
          <div className="h-64 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-6"></div>
        </div>
        <div className="space-y-6">
          <div className="h-80 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-6"></div>
          <div className="h-48 bg-[#0c1229]/80 rounded-xl border border-slate-800/80 p-6"></div>
        </div>
      </div>
    </div>
  )
}
