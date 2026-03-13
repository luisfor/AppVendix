import { getSaaSMetrics, getCompanies, getPlans } from '@/lib/actions/saas-admin';
import SaaSAdminDashboard from '@/app/components/SaaSAdminDashboard';

export const dynamic = 'force-dynamic';

export default async function SaaSAdminPage() {
    const [metricsRaw, companiesRaw, plansRaw] = await Promise.all([
        getSaaSMetrics(),
        getCompanies(),
        getPlans(),
    ]);

    // Deep serialization for Client Components (handles Decimals, Dates, etc.)
    const metrics = JSON.parse(JSON.stringify(metricsRaw));
    const companies = JSON.parse(JSON.stringify(companiesRaw));
    const plans = JSON.parse(JSON.stringify(plansRaw));

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <header className="mb-10 flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-10 bg-purple-600 rounded-full" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-500">
                            SaaS Control Center
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-[var(--text-main)] tracking-tight">
                        Dashboard Global
                    </h1>
                    <p className="text-[var(--text-dim)] max-w-2xl text-lg font-medium">
                        Resumen financiero y salud del ecosistema modular.
                    </p>
                </header>

                <SaaSAdminDashboard metrics={metrics} companies={companies} plans={plans} hideMetrics={false} />
            </div>
        </div>
    );
}
