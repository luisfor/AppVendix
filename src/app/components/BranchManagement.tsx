"use client";

import React, { useState } from 'react';

interface Branch {
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
}

export default function BranchManagement({ initialBranches }: { initialBranches: Branch[] }) {
    const [branches, setBranches] = useState(initialBranches);
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="space-y-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestión de Sucursales</h2>
                    <p className="text-white/40 text-sm">Administra las ubicaciones físicas de tu negocio</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-purple-600/20"
                >
                    + Nueva Sucursal
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branches.map((branch) => (
                    <div key={branch.id} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl">
                                🏢
                            </div>
                            <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                Activa
                            </span>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{branch.name}</h3>
                        <p className="text-white/40 text-xs mb-4">{branch.address || 'Sin dirección registrada'}</p>
                        <div className="flex items-center gap-2 text-xs text-white/60">
                            <span>📞 {branch.phone || 'N/A'}</span>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
                            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-colors">
                                Editar
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-colors">
                                Ver Inventario
                            </button>
                        </div>
                    </div>
                ))}

                {branches.length === 0 && (
                    <div className="col-span-full py-12 text-center glass-card rounded-2xl border border-dashed border-white/10">
                        <p className="text-white/40">No hay sucursales registradas aún.</p>
                    </div>
                )}
            </div>

            {showAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="glass-card w-full max-w-md rounded-2xl p-8 border border-white/10 animate-fade-in">
                        <h3 className="text-xl font-bold mb-6">Agregar Nueva Sucursal</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Nombre</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g. Sucursal Norte" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Dirección</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g. Av. Principal 123" />
                            </div>
                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={() => setShowAdd(false)}
                                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-600/20 transition-colors">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
