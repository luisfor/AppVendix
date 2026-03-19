import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth-utils';
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { UserProvider } from "@/app/components/UserProvider";
import ThemeToggle from "@/app/components/ThemeToggle";
import Sidebar from "@/app/components/Sidebar";
import HeaderAvatar from "@/app/components/HeaderAvatar";

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
    let session = null;
    let company = null;
    let modules: string[] = [];
    let isSuperAdmin = false;

    try {
        session = await getSession();
        isSuperAdmin = session?.role === 'SAAS_SUPER_ADMIN';

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
    } catch (error) {
        console.error('Error loading layout data:', error);
    }

    return (
        <html lang="es">
            <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
                <ThemeProvider initialTheme={(session?.themePreference as "dark" | "light") || "dark"}>
                    <UserProvider
                        initialImage={session?.image ?? null}
                        initialName={session?.name ?? null}
                        initialEmail={session?.email ?? null}
                    >
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
                                        <HeaderAvatar
                                            userName={session.email.split('@')[0]}
                                            subtitle={isSuperAdmin ? 'PLATFORM OWNER' : (company?.name || 'Empresa')}
                                        />
                                    </div>
                                </header>
                            )}
                            <div className={`${session ? 'p-8' : ''} animate-fade-in text-[var(--text-main)] h-full`}>
                                {children}
                            </div>
                        </main>
                    </div>
                    </UserProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
