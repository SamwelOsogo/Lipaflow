import { NavLink, Outlet } from 'react-router';
import './AppShell.css';

function AppShell() {
  return (
    <div className="shell">
      <header className="shell-header">
        <p className="brand">LipaFlow</p>
      </header>

      <nav className="shell-nav" aria-label="Main">
        <NavLink to="/invoices">Invoices</NavLink>
        <NavLink to="/customers">Customers</NavLink>
      </nav>

      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;