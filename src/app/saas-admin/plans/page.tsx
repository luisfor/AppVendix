import { getPlans } from '@/lib/actions/plans';
import prisma from '@/lib/prisma';
import { PlanStatus } from '@prisma/client';
import PlansDataGrid from '@/app/components/plans/PlansDataGrid';
import PlanEditorWrapper from '@/app/components/plans/PlanEditorWrapper';

export default async function PlansPage() {
    const plans = await getPlans(true);
    const availableModules = await prisma.systemModule.findMany({ orderBy: { code: 'asc' } });

    const activePlans = plans.filter(p => p.status === PlanStatus.ACTIVE).length;
    const archivedPlans = plans.filter(p => p.status === PlanStatus.ARCHIVED).length;
    const totalCompanies = plans.reduce((acc, p) => acc + p._count.companies, 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight mb-3">
                        Planes de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Suscripción</span>
                    </h1>
                    <p className="text-[var(--text-dim)]/80 text-lg md:text-xl font-medium max-w-2xl">
                        Gestiona los planes, precios y límites. El sistema versionará automáticamente los cambios de precio para proteger las suscripciones existentes.
                    </p>
                </div>

                <PlanEditorWrapper availableModules={availableModules} />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-center">
                    <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-[0.2em] font-black mb-2">Planes Activos</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-[var(--text-main)]">{activePlans}</span>
                        <span className="text-[var(--text-dim)]">/ {plans.length} total</span>
                    </div>
                </div>

                <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-center">
                    <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-[0.2em] font-black mb-2">Empresas Monetizadas</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-[var(--text-main)]">{totalCompanies}</span>
                        <span className="text-[var(--text-dim)]">suscripciones</span>
                    </div>
                </div>

                <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-center border-l-4 border-amber-500/50">
                    <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-[0.2em] font-black mb-2">Versiones Archivadas</span>
                    <div className="flex items-center gap-3">
                        <span className="text-5xl font-black text-[var(--text-main)]">{archivedPlans}</span>
                        <p className="text-[10px] text-[var(--text-dim)]/60 max-w-[120px] leading-tight font-bold">Planes legados que mantienen el precio para clientes antiguos.</p>
                    </div>
                </div>
            </div>

            <PlansDataGrid plans={JSON.parse(JSON.stringify(plans))} />
        </div>
    );
}
