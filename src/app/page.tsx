import BillingPrompt from './components/billing/BillingPrompt';

export default function Home() {
    const stats = [
        { title: 'Dinero en Caja', value: 'S/ 0.00', sub: 'PEN EN CAJA', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400', icon: '💵' },
        { title: 'Compras del Mes', value: 'S/ 0.00', sub: 'TOTAL GASTADO', color: 'bg-red-500/10 border-red-500/20 text-red-400', icon: '👜' },
        { title: 'Ventas del Día', value: 'S/ 0.00', sub: 'TRANSACCIONES HOY', color: 'bg-green-500/10 border-green-500/20 text-green-400', icon: '📈' },
        { title: 'Invertido en Stock', value: 'S/ 0.00', sub: 'ACTIVOS ACTUALES', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400', icon: '🏷️' },
    ];

    return (
        <div className="space-y-12">
            <BillingPrompt />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className={`glass-card p-6 rounded-2xl border ${stat.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-lg font-bold">{stat.title}</span>
                            <span className="text-2xl">{stat.icon}</span>
                        </div>
                        <div className="text-3xl font-black mb-1">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-wider opacity-60 font-bold">
                            {stat.sub}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card rounded-2xl p-8 border border-white/5">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold">Comparativa Ventas y Compras</h2>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-2 text-xs text-white/40">
                                <span className="w-3 h-3 rounded-full bg-purple-500" /> Ventas
                            </span>
                            <span className="flex items-center gap-2 text-xs text-white/40">
                                <span className="w-3 h-3 rounded-full bg-red-500" /> Compras
                            </span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full flex items-end justify-between gap-2 border-b border-white/10 pb-2">
                        {[40, 70, 45, 90, 65, 80, 50, 60, 85, 45, 75, 55].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                <div
                                    className="w-full bg-purple-500/40 rounded-t-sm transition-all duration-500 group-hover:bg-purple-500"
                                    style={{ height: `${h}%` }}
                                />
                                <div
                                    className="w-full bg-red-500/40 rounded-t-sm transition-all duration-500 group-hover:bg-red-500"
                                    style={{ height: `${h / 2}%` }}
                                />
                                <span className="text-[10px] text-white/20 mt-2">Mes {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-8 border border-white/5">
                    <h2 className="text-xl font-bold mb-8">Próximos Vencimientos</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-xl border border-white/10 group-hover:bg-purple-500/10 transition-colors">
                                    📅
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Lote Medicamento A</p>
                                    <p className="text-xs text-white/40">Vence en 12 días</p>
                                </div>
                                <div className="ml-auto text-xs font-bold text-red-400">
                                    Crítico
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-4 mt-4 rounded-xl border border-white/10 text-xs font-bold hover:bg-white/5 transition-colors uppercase tracking-widest text-white/60">
                            Ver todos los reportes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
