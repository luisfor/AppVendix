import { getCompanyDetails } from '@/lib/actions/saas-admin';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CompanyDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await getCompanyDetails(id);
    const company = result as any;

    if (!company) {
        notFound();
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/saas-admin/companies" className="text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors text-sm flex items-center gap-2 mb-2">
                        <span>←</span> Regresar a Empresas
                    </Link>
                    <h1 className="text-4xl font-black text-[var(--text-main)]">{company.name}</h1>
                    <p className="text-[var(--text-dim)] mt-1 uppercase tracking-widest text-xs font-black">ID de Inquilino: {company.id}</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-[var(--text-dim)]/10 border border-[var(--border-dim)] px-6 py-2 rounded-xl font-bold hover:bg-[var(--text-dim)]/20 transition-all text-[var(--text-dim)]">
                        📧 Contactar Admin
                    </button>
                    <button className="bg-purple-600 px-6 py-2 rounded-xl font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20 text-white">
                        ⚡ Acciones Rápidas
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="glass-card md:col-span-2 rounded-[2.5rem] p-10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${company.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                            {company.status}
                        </span>
                    </div>

                    <h3 className="text-[var(--text-dim)] uppercase tracking-[0.2em] text-[10px] font-black mb-8">Perfil de Empresa</h3>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-1">
                            <p className="text-[var(--text-dim)] text-xs font-medium">Representante</p>
                            <p className="text-xl font-bold text-[var(--text-main)]">{company.users?.[0]?.name || 'N/A'}</p>
                            <p className="text-sm text-[var(--text-dim)]">{company.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[var(--text-dim)] text-xs font-medium">Ubicación</p>
                            <p className="text-xl font-bold text-[var(--text-main)]">{company.address || 'Sin dirección'}</p>
                            <p className="text-sm text-[var(--text-dim)]">{company.phone || 'Sin teléfono'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[var(--text-dim)] text-xs font-medium">Fecha de Registro</p>
                            <p className="text-xl font-bold text-[var(--text-main)]">{new Date(company.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[var(--text-dim)] text-xs font-medium">Plan Actual</p>
                            <p className="text-xl font-bold text-purple-400">{company.plan?.name}</p>
                        </div>
                    </div>
                </div>

                {/* Usage Metrics */}
                <div className="space-y-8">
                    {[
                        { label: 'Sucursales', value: company._count?.branches || 0, icon: '🏢' },
                        { label: 'Usuarios Colaboradores', value: company._count?.users || 0, icon: '👥' },
                        { label: 'Productos en Catálogo', value: company._count?.products || 0, icon: '📦' },
                        { label: 'Ventas Realizadas', value: company._count?.sales || 0, icon: '💰' },
                    ].map((idx) => (
                        <div key={idx.label} className="glass-card rounded-3xl p-6 flex items-center gap-5">
                            <div className="h-12 w-12 rounded-2xl bg-[var(--text-dim)]/5 flex items-center justify-center text-2xl">
                                {idx.icon}
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-[var(--text-main)]">{idx.value}</h4>
                                <p className="text-[var(--text-dim)] text-[10px] uppercase font-bold tracking-widest">{idx.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modules Section */}
            <div className="glass-card rounded-[2.5rem] p-10 mt-8">
                <h3 className="text-[var(--text-dim)] uppercase tracking-[0.2em] text-[10px] font-black mb-8">Módulos Habilitados</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {company.plan?.modules?.map((mod: any) => (
                        <div key={mod.id} className="px-6 py-4 rounded-2xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] flex items-center justify-between group hover:border-purple-500/30 transition-all">
                            <div className="space-y-0.5">
                                <p className="font-bold text-[var(--text-main)]/90 group-hover:text-purple-400 transition-colors">{mod.name}</p>
                                <p className="text-[10px] text-[var(--text-dim)] font-black tracking-widest">{mod.code}</p>
                            </div>
                            <span className="text-emerald-500 text-xs font-bold font-black">✓</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Users */}
            <div className="glass-card rounded-[2.5rem] overflow-hidden mt-8">
                <div className="px-10 py-8 border-b border-[var(--border-dim)] flex items-center justify-between">
                    <h3 className="text-[var(--text-dim)] uppercase tracking-[0.2em] text-[10px] font-black">Últimos Usuarios Registrados</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[var(--text-dim)] text-[9px] uppercase tracking-widest font-black bg-[var(--text-dim)]/[0.02]">
                                <th className="px-10 py-4">Usuario</th>
                                <th className="px-10 py-4">Rol</th>
                                <th className="px-10 py-4">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-dim)]">
                            {company.users?.map((user: any) => (
                                <tr key={user.id} className="hover:bg-[var(--text-dim)]/[0.02] transition-colors">
                                    <td className="px-10 py-5 font-bold text-[var(--text-main)]/90">{user.name} <span className="text-[var(--text-dim)] font-normal ml-2">({user.email})</span></td>
                                    <td className="px-10 py-5">
                                        <span className="px-3 py-1 rounded-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-[9px] font-black uppercase tracking-widest text-[var(--text-dim)]">
                                            {user.systemRole}
                                        </span>
                                    </td>
                                    <td className="px-10 py-5 text-[var(--text-dim)] text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
