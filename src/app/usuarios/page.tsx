import { getSession } from '@/lib/auth-utils';
import { getCompanyUsers } from '@/lib/actions/users';
import UserManagement from '@/app/components/UserManagement';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function UsuariosPage() {
    const session = await getSession();

    if (!session) {
        redirect('/auth/login');
    }

    // If it's a Super Admin landing here by mistake or navigation
    if (session.role === 'SAAS_SUPER_ADMIN' && !session.companyId) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
                <div className="text-6xl">🏢</div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">Vista de Empresa</h2>
                    <p className="text-[var(--text-dim)] max-w-md">
                        Estás en la ruta de clientes. Como Administrador Maestro, puedes gestionar a los usuarios de cualquier empresa directamente desde el Panel de Control.
                    </p>
                </div>
                <Link href="/saas-admin/companies" className="bg-purple-600 px-8 py-3 rounded-xl font-bold text-white shadow-xl shadow-purple-600/20 hover:scale-105 transition-all">
                    Ir al Listado de Empresas
                </Link>
            </div>
        );
    }

    if (!session.companyId) {
        redirect('/auth/login');
    }

    const users = await getCompanyUsers(session.companyId);

    return (
        <div className="animate-fade-in h-full">
            <UserManagement
                initialUsers={users}
                companyId={session.companyId}
            />
        </div>
    );
}
