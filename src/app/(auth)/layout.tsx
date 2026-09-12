export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4 text-slate-100">
      {children}
    </div>
  )
}
