'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import CompanyEditForm from '@/app/components/saas/CompanyEditForm';
import { updateCompanyDetails } from '@/lib/actions/saas-admin';

interface CompanyEditHeaderProps {
    company: any;
}

export default function CompanyEditHeader({ company }: CompanyEditHeaderProps) {
    const [showEdit, setShowEdit] = useState(false);

    const handleSuccess = async (data: any) => {
        const result = await updateCompanyDetails(data);
        if (result.error) {
            throw new Error(result.error);
        }
        // In reality, updateCompanyDetails uses revalidatePath, 
        // but we might want to force a refresh if needed or just trust Next.js
        window.location.reload();
    };

    return (
        <>
            <button 
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-purple-400 hover:border-purple-500/30 transition-all font-bold text-xs group"
            >
                <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                Editar Perfil
            </button>

            {showEdit && (
                <CompanyEditForm
                    company={company}
                    onClose={() => setShowEdit(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}
