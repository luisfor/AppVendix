import SaaSAdminManagement from '@/app/components/saas/SaaSAdminManagement';
import { getSaaSAdmins } from '@/lib/actions/users';
import { requireSaaSAdmin } from '@/lib/actions/auth';

export default async function AdminsPage() {
    // Security check
    await requireSaaSAdmin();

    // Fetch data
    const admins = await getSaaSAdmins();

    return (
        <div className="animate-fade-in">
            <SaaSAdminManagement initialAdmins={admins} />
        </div>
    );
}
