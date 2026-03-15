import prisma from '@/lib/prisma';
import BranchManagement from '@/app/components/BranchManagement';


export default async function BranchesPage() {
    // En un caso real, obtendríamos la sesión del middleware/auth
    // Mock de sesión de Company Admin (obtenido de los datos del seed)
    const company = await prisma.company.findFirst({
        where: { name: 'Farmacia Salud y Vida' }
    });

    if (!company) {
        return <div>Empresa de prueba no encontrada. Por favor ejecute el seed.</div>;
    }

    const branches = await prisma.branch.findMany({
        where: { companyId: company.id }
    });

    return (
        <div className="animate-fade-in">
            <BranchManagement initialBranches={branches} />
        </div>
    );
}
