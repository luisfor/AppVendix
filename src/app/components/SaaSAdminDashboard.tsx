'use client';

import { useState } from 'react';
import { CompanyStatus } from '@prisma/client';
import { toggleCompanyStatus } from '@/lib/actions/saas-admin';

interface SaaSAdminDashboardProps {
    metrics: {
        totalCompanies: number; activeCompanies: number; totalSales: number; totalRevenue: number;
    };
    companies: any[];
}

export default function SaaSAdminDashboard({ metrics, companies }: SaaSAdminDashboardProps) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleToggleStatus = async (id: string, status: CompanyStatus) => {
        setLoading(id);
        await toggleCompanyStatus(id, status);
        setLoading(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Empresas Totales', value: metrics.totalCompanies, icon: '🏢', color: 'bg-blue-500' },
                    { label: 'Empresas Activas', value: metrics.activeCompanies, icon: '✅', color: 'bg-emerald-500' },
                    { label: 'Ventas Globales', value: metrics.totalSales, icon: '🛒', color: 'bg-purple-500' },
                    { label: 'Ingresos Totales', value: `$${metrics.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-amber-500' },
                ].map((m) => (
                    <div key={m.label} className="glass-card rounded-2xl p-6 border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] group">
                        <div className={`h-12 w-12 rounded-xl ${m.color}/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                            {m.icon}
                        </div>
                        <p className="text-white/40 text-sm font-medium mb-1 uppercase tracking-wider">{m.label}</p>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{m.value}</h3>
                    </div>
                ))}
            </div>

            {/* Companies List */}
            <div className="glass-card rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/50">
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div>
                        <h2 className="text-xl font-bold">Gestión de Clientes SaaS</h2>
                        <p className="text-white/40 text-sm mt-1">Lista completa de empresas registradas en la plataforma</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2">
                        <span>+</span> Nueva Empresa
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] text-white/40 text-[10px] uppercase tracking-[0.15em] font-bold">
                                <th className="px-8 py-4 border-b border-white/5 font-black">Empresa</th>
                                <th className="px-8 py-4 border-b border-white/5 font-black">Plan</th>
                                <th className="px-8 py-4 border-b border-white/5 font-black">Status</th>
                                <th className="px-8 py-4 border-b border-white/5 font-black">Estructura</th>
                                <th className="px-8 py-4 border-b border-white/5 text-right font-black">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {companies.map((company) => (
                                <tr key={company.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-lg font-bold text-white/80 group-hover:border-purple-500/30 transition-colors">
                                                {company.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white/90">{company.name}</div>
                                                <div className="text-xs text-white/30">{company.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 shadow-sm">
                                            {company.plan?.name || 'Manual'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${company.status === CompanyStatus.ACTIVE
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                            }`}>
                                            {company.status === CompanyStatus.ACTIVE ? 'Activa' : 'Suspendida'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex gap-4 text-xs">
                                            <div className="flex flex-col">
                                                <span className="text-white/20 text-[9px] uppercase font-bold tracking-tighter">Sucursales</span>
                                                <span className="font-mono text-white/60">{company._count.branches}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white/20 text-[9px] uppercase font-bold tracking-tighter">Usuarios</span>
                                                <span className="font-mono text-white/60">{company._count.users}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(company.id, company.status)}
                                                disabled={loading === company.id}
                                                className={`text-xs px-4 py-2 rounded-lg font-bold transition-all border ${company.status === CompanyStatus.ACTIVE
                                                        ? 'bg-rose-500/5 text-rose-500/60 border-rose-500/10 hover:bg-rose-500/10 hover:text-rose-500'
                                                        : 'bg-emerald-500/5 text-emerald-500/60 border-emerald-500/10 hover:bg-emerald-500/10 hover:text-emerald-500'
                                                    } active:scale-95 disabled:opacity-50`}
                                            >
                                                {loading === company.id ? '...' : company.status === CompanyStatus.ACTIVE ? 'Suspender' : 'Activar'}
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90">
                                                ⚙️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
