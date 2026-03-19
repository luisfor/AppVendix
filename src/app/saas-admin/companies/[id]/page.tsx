import { getCompanyDetails, updateCompanyDetails } from '@/lib/actions/saas-admin';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import UserManagement from '@/app/components/UserManagement';
import CompanyMap from '@/app/components/saas/CompanyMap';
import CompanyAdminTools from '@/app/components/saas/CompanyAdminTools';
import CompanyEditHeader from './CompanyEditHeader';

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
                    <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tighter italic">{company.name}</h1>
                    <p className="text-[var(--text-dim)] mt-1 uppercase tracking-[0.3em] text-[10px] font-black opacity-70">ID Inquilino: {company.id}</p>
                </div>
                
                <CompanyAdminTools company={company} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card rounded-[3rem] p-10 overflow-hidden relative border border-[var(--border-dim)]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-[var(--text-dim)] uppercase tracking-[0.3em] text-[10px] font-black">Perfil de Empresa</h3>
                            <div className="flex items-center gap-4">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-lg ${company.status === 'ACTIVE'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5'
                                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5'
                                    }`}>
                                    {company.status}
                                </span>
                                <CompanyEditHeader company={company} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-1 group">
                                <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-widest opacity-80">Representante Legal</p>
                                <p className="text-xl font-bold text-[var(--text-main)] group-hover:text-purple-400 transition-colors">{company.users?.[0]?.name || 'N/A'}</p>
                                <p className="text-xs text-[var(--text-dim)] font-medium italic">{company.email}</p>
                            </div>
                            
                            <div className="space-y-1 group">
                                <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-widest opacity-80">Contacto Directo</p>
                                <p className="text-xl font-bold text-[var(--text-main)]">{company.phone || 'Sin teléfono'}</p>
                                <p className="text-xs text-[var(--text-dim)] font-medium">Línea corporativa verificada</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-widest opacity-80">Dirección Física</p>
                                <p className="text-lg font-bold text-[var(--text-main)] leading-snug">{company.address || 'Sin dirección asignada'}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-widest opacity-80">Plan de Suscripción</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl font-black text-purple-400 italic uppercase tracking-tighter">{company.plan?.name}</p>
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                </div>
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    {/* Interactive Map Section */}
                    <div className="glass-card rounded-[3rem] p-1 border border-[var(--border-dim)] bg-black/20 overflow-hidden shadow-2xl">
                        <CompanyMap address={company.address} />
                    </div>
                </div>

                {/* Usage Metrics */}
                <div className="space-y-6">
                    <h3 className="text-[var(--text-dim)] uppercase tracking-[0.3em] text-[10px] font-black px-4">Métricas de Consumo</h3>
                    {[
                        { label: 'Sucursales', value: company._count?.branches || 0, icon: '🏢', color: 'blue' },
                        { label: 'Usuarios', value: company._count?.users || 0, icon: '👥', color: 'purple' },
                        { label: 'Productos', value: company._count?.products || 0, icon: 'amber', color: 'amber' },
                        { label: 'Ventas', value: company._count?.sales || 0, icon: '💰', color: 'emerald' },
                    ].map((idx) => (
                        <div key={idx.label} className="glass-card rounded-[2rem] p-6 flex items-center justify-between border border-[var(--border-dim)] hover:translate-x-2 transition-transform cursor-pointer group">
                            <div className="flex items-center gap-5">
                                <div className="h-14 w-14 rounded-2xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] flex items-center justify-center text-2xl group-hover:bg-purple-500/10 transition-colors">
                                    {idx.icon === 'amber' ? '📦' : idx.icon}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-[var(--text-main)] tracking-tighter">{idx.value}</h4>
                                    <p className="text-[var(--text-dim)] text-[10px] uppercase font-black tracking-widest opacity-80">{idx.label}</p>
                                </div>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-[var(--text-dim)]/20 group-hover:bg-purple-500 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modules Section */}
            <div className="glass-card rounded-[3rem] p-10 mt-8 border border-[var(--border-dim)] relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-[var(--text-dim)] uppercase tracking-[0.3em] text-[10px] font-black mb-8">Ecosistema de Módulos <span className="text-purple-400/50 italic ml-2">AppVendix Core</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {company.plan?.modules?.map((mod: any) => (
                            <div key={mod.id} className="px-6 py-5 rounded-2xl bg-white/[0.02] border border-[var(--border-dim)] flex items-center justify-between group hover:border-purple-500/30 hover:bg-purple-500/[0.02] transition-all">
                                <div className="space-y-0.5">
                                    <p className="font-bold text-[var(--text-main)] group-hover:text-purple-400 transition-colors text-sm">{mod.name}</p>
                                    <p className="text-[9px] text-[var(--text-dim)] font-black tracking-[0.2em] uppercase opacity-40">{mod.code}</p>
                                </div>
                                <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <span className="text-emerald-500 text-[10px] font-black">✓</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
            </div>

            {/* User Management Section */}
            <div className="glass-card rounded-[3rem] p-10 mt-8 border border-[var(--border-dim)] shadow-2xl relative">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                <UserManagement
                    initialUsers={company.users || []}
                    companyId={company.id}
                />
            </div>
        </div>
    );
}
