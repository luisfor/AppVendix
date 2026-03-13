import { getCompanies, getPlans } from '@/lib/actions/saas-admin';
import SaaSAdminDashboard from '@/app/components/SaaSAdminDashboard';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
    const [companies, plans] = await Promise.all([
        getCompanies(),
        getPlans(),
    ]);

    // We pass empty metrics because this page is focused on the table
    const dummyMetrics = {
        totalCompanies: 0,
        activeCompanies: 0,
        suspendedCompanies: 0,
        mrr: 0,
        newCompaniesThisMonth: 0,
        estimatedYearlyRevenue: 0,
        totalPlatformUsers: 0,
    };

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-black">Gestión de Empresas</h1>
                <p className="text-white/40 mt-2">Administre todos los inquilinos de la plataforma, sus suscripciones y estado operativo.</p>
            </header>

            {/* We reuse the component but it will only show the table if we modify it to be conditional or just ignore metrics */}
            <SaaSAdminDashboard metrics={dummyMetrics} companies={companies} plans={plans} hideMetrics={true} />
        </div>
    );
}
