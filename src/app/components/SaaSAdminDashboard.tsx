'use client';

import { useState } from 'react';
import { CompanyStatus } from '@prisma/client';
import { toggleCompanyStatus, createCompany } from '@/lib/actions/saas-admin';

interface SaaSAdminDashboardProps {
    metrics: {
        totalCompanies: number; activeCompanies: number; totalSales: number; totalRevenue: number;
    };
    companies: any[];
    plans: any[];
}

export default function SaaSAdminDashboard({ metrics, companies, plans }: SaaSAdminDashboardProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        planId: plans[0]?.id || '',
        adminName: '',
        adminEmail: '',
    });

    const handleToggleStatus = async (id: string, status: CompanyStatus) => {
        setLoading(id);
        await toggleCompanyStatus(id, status);
        setLoading(null);
    };

    const handleCreateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading('creating');
        await createCompany(formData);
        setLoading(null);
        setShowModal(false);
        setFormData({ name: '', email: '', planId: plans[0]?.id || '', adminName: '', adminEmail: '' });
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
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2"
                    >
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

            {/* New Company Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="glass-card w-full max-w-2xl rounded-[2.5rem] border border-white/10 bg-[#0d0d0e] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300">
                        <h2 className="text-3xl font-black mb-8">Registrar Nueva Empresa</h2>

                        <form onSubmit={handleCreateCompany} className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Nombre de la Empresa</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ej. Farmacia Central"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Email de Empresa</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="contacto@empresa.com"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Plan de Suscripción</label>
                                <select
                                    value={formData.planId}
                                    onChange={e => setFormData({ ...formData, planId: e.target.value })}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all appearance-none"
                                >
                                    {plans.map(p => (
                                        <option key={p.id} value={p.id} className="bg-[#0d0d0e]">{p.name} (${p.price}/mes)</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-span-2 mt-4">
                                <div className="h-px bg-white/5 w-full mb-6" />
                                <h3 className="text-sm font-bold text-purple-400 mb-6 uppercase tracking-widest">Cuenta de Administrador Inicial</h3>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Nombre del Admin</label>
                                <input
                                    required
                                    value={formData.adminName}
                                    onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                                    placeholder="Nombre completo"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-widest font-black text-white/40">Email del Admin</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.adminEmail}
                                    onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                                    placeholder="admin@empresa.com"
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>

                            <div className="col-span-2 flex justify-end gap-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-3.5 rounded-2xl font-bold text-white/40 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={loading === 'creating'}
                                    type="submit"
                                    className="bg-white text-black px-10 py-3.5 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-50"
                                >
                                    {loading === 'creating' ? 'Creando...' : 'Crear Empresa'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
