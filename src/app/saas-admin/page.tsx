import { getSaaSMetrics, getCompanies } from '@/lib/actions/saas-admin';
import SaaSAdminDashboard from '@/app/components/SaaSAdminDashboard';

export const dynamic = 'force-dynamic';

export default async function SaaSAdminPage() {
    const [metrics, companies] = await Promise.all([
        getSaaSMetrics(),
        getCompanies(),
    ]);

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-10">
                <header className="mb-10 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-10 bg-purple-600 rounded-full" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-500">
                            SaaS Control Center
                        </span>
                    </div>
                    <h1 className="text-5xl font-black bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent">
                        Administración Global
                    </h1>
                    <p className="text-white/40 max-w-2xl text-lg font-medium">
                        Panel central para dueños del sistema. Gestione inquilinos, monitoree la salud del negocio y configure el ecosistema modular.
                    </p>
                </header>

                <SaaSAdminDashboard metrics={metrics} companies={companies} />
            </div>
        </div>
    );
}
