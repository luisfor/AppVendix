import prisma from '@/lib/prisma';
import UserManagement from '@/app/components/UserManagement';

export default async function UsuariosPage() {
    const company = await prisma.company.findFirst({
        where: { name: 'Farmacia Salud y Vida' }
    });

    if (!company) {
        return <div>Empresa de prueba no encontrada. Por favor ejecute el seed.</div>;
    }

    const users = await prisma.user.findMany({
        where: { companyId: company.id },
        include: { role: true }
    });

    return (
        <div className="animate-fade-in">
            <UserManagement initialUsers={users} />
        </div>
    );
}
