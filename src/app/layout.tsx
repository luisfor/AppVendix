import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth-utils';
import { ThemeProvider } from "@/app/components/ThemeProvider";
import ThemeToggle from "@/app/components/ThemeToggle";
import Sidebar from "@/app/components/Sidebar";

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
    const session = await getSession();
    const isSuperAdmin = session?.role === 'SAAS_SUPER_ADMIN';

    let company = null;
    let modules: string[] = [];

    if (session?.companyId) {
        const enabledModules = await prisma.companyModule.findMany({
            where: { companyId: session.companyId, enabled: true },
            include: { module: true }
        });
        modules = enabledModules.map(em => em.module.code);

        company = await prisma.company.findUnique({
            where: { id: session.companyId },
            include: { plan: true }
        });
    }

    return (
        <html lang="es">
            <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
                <ThemeProvider initialTheme={(session?.themePreference as "dark" | "light") || "dark"}>
                    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
                        {session && (
                            <Sidebar
                                companyName={company?.name || 'AppVendix'}
                                planName={isSuperAdmin ? 'Full Access' : (company?.plan?.name || 'Sin Plan')}
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
