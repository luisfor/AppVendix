'use client';

import { useState } from 'react';

export default function POSContainer() {
    const [cart, setCart] = useState<any[]>([]);

    return (
        <div className="flex flex-col h-full gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Punto de Venta</h2>
                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase mt-1">Terminal de Operación</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Estado Caja</span>
                        <span className="text-sm font-bold text-white">🟢 ABIERTA</span>
                    </div>
                    <div className="h-10 w-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-xl shadow-inner">
                        🏦
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden">
                {/* Product Grid Placeholder */}
                <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-card p-4 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer active:scale-95 shadow-lg shadow-black/20">
                                <div className="h-32 bg-white/5 rounded-2xl mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                    🍕
                                </div>
                                <p className="font-bold text-sm text-white/80 uppercase">Producto Demo #{i}</p>
                                <p className="text-purple-400 font-black text-lg mt-1">$9.99</p>
                                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-purple-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                    Añadir al Carrito
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Cart */}
                <div className="lg:col-span-1 glass-card rounded-3xl border border-white/10 flex flex-col overflow-hidden bg-white/[0.02] shadow-2xl">
                    <div className="p-6 border-b border-white/5 bg-white/5">
                        <h3 className="font-black text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
                            <span>🛒</span> Carrito de Compras
                        </h3>
                    </div>
                    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-white/5 flex items-center justify-center text-4xl opacity-20">
                            🛍️
                        </div>
                        <p className="text-white/20 font-bold italic text-sm italic">
                            El carrito está vacío.<br />Selecciona productos para comenzar.
                        </p>
                    </div>
                    <div className="p-8 bg-white/5 border-t border-white/10 space-y-6">
                        <div className="space-y-3 font-bold uppercase tracking-widest">
                            <div className="flex justify-between text-[10px] text-white/40">
                                <span>Subtotal</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-[10px] text-white/40">
                                <span>Impuestos (18%)</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-xl text-white pt-2 border-t border-white/5">
                                <span className="font-black tracking-tighter">Total</span>
                                <span className="text-purple-400">$0.00</span>
                            </div>
                        </div>
                        <button className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-purple-600/20 active:scale-[0.98]">
                            Procesar Pago
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
