import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AppVendix POS - SaaS Scalable",
    description: "Sistema de punto de venta premium y escalable",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="dark">
            <body className={`${inter.className} antialiased selection:bg-purple-500/30`}>
                <div className="flex h-screen overflow-hidden bg-[#0a0a0b]">
                    {/* Sidebar logic will go here */}
                    <Sidebar />
                    <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
                        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#0a0a0b]/80 px-8 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                    Panel de Control
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-medium">Luis Admin</span>
                                    <span className="text-xs text-white/40">Sucursal Principal</span>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20 shadow-lg shadow-purple-500/20" />
                            </div>
                        </header>
                        <div className="p-8 animate-fade-in">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}

function Sidebar() {
    const menuItems = [
        { name: 'Inicio', icon: '🏠', active: true },
        { name: 'Almacen', icon: '📦' },
        { name: 'Ventas', icon: '💰' },
        { name: 'Compras', icon: '🛒' },
        { name: 'Inventario', icon: '📊' },
        { name: 'Taller', icon: '🛠️' },
        { name: 'Usuarios', icon: '👥' },
        { name: 'Configuración', icon: '⚙️' },
    ];

    return (
        <aside className="w-64 border-r border-white/10 bg-[#0a0a0b] flex flex-col hidden lg:flex">
            <div className="h-16 flex items-center px-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-600/30">
                        A
                    </div>
                    <span className="text-xl font-bold tracking-tight">AppVendix</span>
                </div>
            </div>
            <nav className="flex-1 py-6 space-y-1">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-200 group ${item.active ? 'sidebar-link-active text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </div>
                ))}
            </nav>
            <div className="p-6 border-t border-white/10">
                <div className="glass-card rounded-xl p-4 text-xs">
                    <p className="text-white/40 mb-2">Plan Professional</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full w-2/3 shadow-sm shadow-purple-600/50" />
                    </div>
                    <p className="mt-2 text-white/60">65% del límite de ventas</p>
                </div>
            </div>
        </aside>
    );
}
