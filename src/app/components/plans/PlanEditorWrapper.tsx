'use client';

import { useState } from 'react';
import { SystemModule } from '@prisma/client';
import PlanEditorModal from './PlanEditorModal';
import { createPlan, updatePlan } from '@/lib/actions/plans';

export default function PlanEditorWrapper({ availableModules }: { availableModules: SystemModule[] }) {
    const [isCreating, setIsCreating] = useState(false);

    // Listen to global events from PlansDataGrid row actions
    const [editingPlan, setEditingPlan] = useState<any | null>(null);

    // Workaround for sibling communication: expose a global function
    // In a real app with Redux/Zustand this would be in the store
    if (typeof window !== 'undefined') {
        (window as any).editPlan = (plan: any) => {
            setEditingPlan(plan);
        };
    }

    const handleSave = async (data: any) => {
        try {
            if (editingPlan) {
                const result = await updatePlan(editingPlan.id, data);
                if (result.versioned) {
                    alert(`¡Éxito! Como cambiaste el precio o límites, se ha creado una NUEVA versión (v${result.plan.version}) del plan. Los clientes anteriores conservarán su plan antiguo archivado.`);
                }
            } else {
                await createPlan(data);
            }
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error al guardar");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsCreating(true)}
                className="bg-[var(--text-main)] text-[var(--background)] px-8 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[var(--text-main)]/10"
            >
                + Crear Plan
            </button>

            {(isCreating || editingPlan) && (
                <PlanEditorModal
                    plan={editingPlan}
                    availableModules={availableModules}
                    onClose={() => { setIsCreating(false); setEditingPlan(null); }}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
