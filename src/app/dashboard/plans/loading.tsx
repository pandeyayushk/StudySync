export default function PlansLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
        <div className="h-4 w-72 bg-slate-100 rounded-md"></div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-white rounded-xl border border-slate-200 p-6"></div>
        ))}
      </div>
    </div>
  )
}
