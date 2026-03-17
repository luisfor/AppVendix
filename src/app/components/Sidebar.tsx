'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions/auth';
import { SYSTEM_MODULES } from '@/lib/modules/registry';

interface SidebarProps {
    companyName: string;
    planName: string;
    modules: string[];
    isSuperAdmin?: boolean;
}

export default function Sidebar({ companyName, planName, modules, isSuperAdmin }: SidebarProps) {
    const pathname = usePathname();

    const superAdminItems = [
        { name: 'Dashboard', icon: '📊', href: '/saas-admin' },
        { name: 'Empresas', icon: '🏢', href: '/saas-admin/companies' },
        { name: 'Planes', icon: '💎', href: '/saas-admin/plans' },
        { name: 'Facturación', icon: '💳', href: '/saas-admin/billing' },
        { name: 'Módulos', icon: '🧩', href: '/saas-admin/modules' },
        { name: 'Ajustes', icon: '⚙️', href: '/saas-admin/settings' },
        { name: 'Auditoría', icon: '📜', href: '/saas-admin/audit' },
        { name: 'Administradores', icon: '👤', href: '/saas-admin/admins' },
        { name: 'Seguridad', icon: '🔒', href: '/saas-admin/security' },
    ];

    const coreCompanyItems = [
        { name: 'Inicio', icon: '🏠', href: '/' },
        { name: 'Sucursales', icon: '🏢', href: '/sucursales' },
        { name: 'Usuarios', icon: '👥', href: '/usuarios' },
    ];

    // Dynamic items based on enabled modules
    const dynamicItems = SYSTEM_MODULES
        .filter(m => modules.includes(m.code))
        .map(m => ({
            name: m.name,
            icon: m.icon,
            href: m.route,
        }));

    const menuItems = isSuperAdmin
        ? superAdminItems
        : [...coreCompanyItems, ...dynamicItems, { name: 'Configuración', icon: '⚙️', href: '/settings' }];

    return (
        <aside className="w-64 border-r border-[var(--border-dim)] bg-[var(--sidebar-bg)] flex flex-col hidden lg:flex">
            <div className="h-16 flex items-center px-6 border-b border-[var(--border-dim)]">
                <Link href={isSuperAdmin ? "/saas-admin" : "/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30">
                        {isSuperAdmin ? 'S' : 'A'}
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[var(--text-main)]">{isSuperAdmin ? 'SaaS Central' : 'AppVendix'}</span>
                </Link>
            </div>
            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item: any) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 group ${isActive
                                    ? 'text-purple-500 bg-purple-500/5 border-r-2 border-purple-500'
                                    : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/5'
                                }`}
                        >
                            <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-[var(--border-dim)] space-y-4">
                <div className="glass-card rounded-xl p-4 text-[10px]">
                    <p className="text-[var(--text-dim)] mb-2 uppercase tracking-widest font-bold">
                        {isSuperAdmin ? 'Full Access' : planName}
                    </p>
                    <div className="w-full bg-[var(--text-dim)]/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full w-full shadow-sm shadow-purple-600/50" />
                    </div>
                    <p className="mt-2 text-[var(--text-main)]/60 font-medium truncate">
                        {isSuperAdmin ? 'AppVendix Platform' : companyName}
                    </p>
                </div>

                <form action={() => logout()}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all font-bold text-xs group">
                        <span className="text-lg group-hover:rotate-12 transition-transform">🚪</span>
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </aside>
    );
}
