export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-crimson/10 selection:text-crimson">
      {/* Forced Light Context Overlay */}
      <div className="fixed inset-0 bg-slate-50 -z-[10]" />
      
      {/* Internal Admin Style Overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        nav, footer { display: none !important; }
        body { background: #f8fafc !important; color: #0f172a !important; }
      ` }} />

      {children}
    </div>
  );
}
