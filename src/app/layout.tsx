import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import prisma from '@/lib/prisma';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AppVendix POS - SaaS Scalable",
    description: "Sistema de punto de venta premium y escalable",
};

import { getSession } from '@/lib/auth-utils';
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    const isSuperAdmin = session?.role === 'SAAS_SUPER_ADMIN';

    let company = null;
    let modules: string[] = [];

    if (session?.companyId) {
        company = await prisma.company.findUnique({
            where: { id: session.companyId },
            include: { plan: { include: { modules: true } } }
        });

        const enabledModules = await prisma.companyModule.findMany({
            where: { companyId: session.companyId, enabled: true },
            include: { module: true }
        });
        modules = enabledModules.map(em => em.module.code);
    }

    return (
        <html lang="es">
            <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
                <ThemeProvider initialTheme={(session?.themePreference as "dark" | "light") || "dark"}>
                    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
                        {session && (
                            <Sidebar
                                companyName={company?.name || 'AppVendix'}
                                planName={company?.plan?.name || 'SaaS Owner'}
                                modules={modules}
                                isSuperAdmin={isSuperAdmin}
                            />
                        )}
                        <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
                            {session && (
                                <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[var(--border-dim)] bg-[var(--background)]/80 px-8 backdrop-blur-md">
                                    <div className="flex items-center gap-4">
                                        <h1 className="text-xl font-bold text-[var(--text-main)]">
                                            Panel de Control
                                        </h1>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <ThemeToggle />
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm font-medium text-[var(--text-main)]">{session.email.split('@')[0]}</span>
                                                <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest font-bold">
                                                    {isSuperAdmin ? 'PLATFORM OWNER' : (company?.name || 'Empresa')}
                                                </span>
                                            </div>
                                            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 border border-[var(--border-dim)] shadow-sm" />
                                        </div>
                                    </div>
                                </header>
                            )}
                            <div className={`${session ? 'p-8' : ''} animate-fade-in text-[var(--text-main)] h-full`}>
                                {children}
                            </div>
                        </main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}

import { logout } from '@/lib/actions/auth';

function Sidebar({ companyName, planName, modules, isSuperAdmin }: { companyName: string, planName: string, modules: string[], isSuperAdmin?: boolean }) {
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

    const companyItems = [
        { name: 'Inicio', icon: '🏠', href: '/' },
        { name: 'Sucursales', icon: '🏢', href: '/sucursales' },
        { name: 'Usuarios', icon: '👥', href: '/usuarios' },
        { name: 'Almacen', icon: '📦', href: '#', moduleCode: 'POS_BASIC' },
        { name: 'Ventas', icon: '💰', href: '#', moduleCode: 'POS_BASIC' },
        { name: 'Inventario', icon: '📊', href: '#', moduleCode: 'INVENTORY' },
        { name: 'Taller', icon: '🛠️', href: '#', moduleCode: 'WORKSHOP' },
        { name: 'Configuración', icon: '⚙️', href: '#' },
    ];

    const menuItems = isSuperAdmin ? superAdminItems : companyItems;

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
                    // Feature Flag check for company items
                    if (item.moduleCode && !modules.includes(item.moduleCode)) return null;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 group hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/5 text-[var(--text-dim)]`}
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-[var(--border-dim)] space-y-4">
                <div className="glass-card rounded-xl p-4 text-[10px]">
                    <p className="text-[var(--text-dim)] mb-2 uppercase tracking-widest font-bold">{isSuperAdmin ? 'Full Access' : planName}</p>
                    <div className="w-full bg-[var(--text-dim)]/10 h-1 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full w-full shadow-sm shadow-purple-600/50" />
                    </div>
                    <p className="mt-2 text-[var(--text-main)]/60 font-medium truncate">{isSuperAdmin ? 'AppVendix Platform' : companyName}</p>
                </div>

                <form action={logout}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/5 transition-all font-bold text-xs group">
                        <span className="text-lg group-hover:rotate-12 transition-transform">🚪</span>
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </aside>
    );
}
