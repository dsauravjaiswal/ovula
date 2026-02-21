import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/log-cycle', label: 'Log Cycle' },
  { to: '/settings', label: 'Settings' },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8fb] to-[#fceef4] text-plum">
      <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6">
        <header className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-semibold">Ovula</h1>
          <p className="mt-1 text-sm text-slate-500">Privacy-first cycle tracking, all on your device.</p>
          <nav className="mt-4 flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-rose text-white' : 'bg-rose/10 text-rose hover:bg-rose/20'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
