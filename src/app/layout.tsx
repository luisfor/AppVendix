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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Mocking session for demo - Simplified logic for role detection
    const adminUser = await prisma.user.findUnique({
        where: { email: 'admin@pos-saas.com' }, // This represents the SaaS Super Admin
    });

    const isSuperAdmin = true; // Hardcoded for this demo step to show the impact

    const company = await prisma.company.findFirst({
        where: { name: 'Farmacia Salud y Vida' },
        include: { plan: { include: { modules: true } } }
    });

    const enabledModules = company
        ? await prisma.companyModule.findMany({
            where: { companyId: company.id, enabled: true },
            include: { module: true }
        })
        : [];

    const modules = enabledModules.map(em => em.module.code);

    return (
        <html lang="es" className="dark">
            <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
                <div className="flex h-screen overflow-hidden bg-[#0a0a0b]">
                    <Sidebar
                        companyName={company?.name || 'AppVendix'}
                        planName={company?.plan?.name || 'Trial'}
                        modules={modules}
                        isSuperAdmin={isSuperAdmin}
                    />
                    <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
                        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0a0a0b]/80 px-8 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                    Panel de Control
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-medium">{isSuperAdmin ? 'SaaS Owner' : 'Luis Admin'}</span>
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                        {isSuperAdmin ? 'PLATFORM OWNER' : (company?.name || 'Sin Empresa')}
                                    </span>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20 shadow-lg shadow-purple-500/20" />
                            </div>
                        </header>
                        <div className="p-8 animate-fade-in text-white">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}

function Sidebar({ companyName, planName, modules, isSuperAdmin }: { companyName: string, planName: string, modules: string[], isSuperAdmin?: boolean }) {
    const menuItems = [
        { name: 'SaaS Admin', icon: '👑', href: '/saas-admin', superOnly: true },
        { name: 'Inicio', icon: '🏠', href: '/' },
        { name: 'Sucursales', icon: '🏢', href: '/sucursales' },
        { name: 'Usuarios', icon: '👥', href: '/usuarios' },
        { name: 'Almacen', icon: '📦', href: '#', moduleCode: 'POS_BASIC' },
        { name: 'Ventas', icon: '💰', href: '#', moduleCode: 'POS_BASIC' },
        { name: 'Inventario', icon: '📊', href: '#', moduleCode: 'INVENTORY' },
        { name: 'Taller', icon: '🛠️', href: '#', moduleCode: 'WORKSHOP' },
        { name: 'Configuración', icon: '⚙️', href: '#' },
    ];

    return (
        <aside className="w-64 border-r border-white/10 bg-[#0a0a0b] flex flex-col hidden lg:flex">
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30">
                        A
                    </div>
                    <span className="text-xl font-bold tracking-tight">AppVendix</span>
                </Link>
            </div>
            <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    // Super Admin check
                    if (item.superOnly && !isSuperAdmin) return null;

                    // Feature Flag check
                    if (item.moduleCode && !modules.includes(item.moduleCode)) return null;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 group hover:text-white hover:bg-white/5 text-white/40`}
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-6 border-t border-white/10">
                <div className="glass-card rounded-xl p-4 text-xs">
                    <p className="text-white/40 mb-2 uppercase tracking-widest font-bold">{planName}</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full w-2/3 shadow-sm shadow-purple-600/50" />
                    </div>
                    <p className="mt-2 text-white/60 font-medium">{companyName}</p>
                </div>
            </div>
        </aside>
    );
}
