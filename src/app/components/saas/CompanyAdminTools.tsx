'use client';

import React, { useState } from 'react';
import { 
    Zap, 
    Mail, 
    MessageSquare, 
    ShieldAlert, 
    ShieldCheck, 
    UserSearch, 
    ChevronDown, 
    Settings2 
} from 'lucide-react';

interface CompanyAdminToolsProps {
    company: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        status: string;
    };
}

export default function CompanyAdminTools({ company }: CompanyAdminToolsProps) {
    const [showActions, setShowActions] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImpersonate = () => {
        alert('Simulando Inquilino: Redirigiendo al panel de ' + company.name);
        // Lógica real: Server action que firme JWT temporal y redirija a /dashboard
    };

    const handleToggleStatus = () => {
        const nextStatus = company.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        if (confirm(`¿Seguro que deseas cambiar el estado a ${nextStatus}?`)) {
            alert('Cambiando estado a ' + nextStatus);
            // Lógica real: Server action updateCompanyStatus
        }
    };

    const handleContact = () => {
        if (company.phone) {
            window.open(`https://wa.me/${company.phone.replace(/\D/g, '')}?text=Hola+${encodeURIComponent(company.name)},+soy+el+administrador+de+AppVendix.`, '_blank');
        } else {
            window.open(`mailto:${company.email}?subject=Asunto+Administrativo+-+AppVendix`, '_blank');
        }
    };

    return (
        <div className="flex gap-4 relative">
            {/* Contact Button */}
            <button 
                onClick={handleContact}
                className="bg-[var(--text-dim)]/10 border border-[var(--border-dim)] px-6 py-3 rounded-2xl font-bold hover:bg-[var(--text-dim)]/20 transition-all text-[var(--text-dim)] flex items-center gap-2 group"
            >
                {company.phone ? <MessageSquare size={18} /> : <Mail size={18} />}
                <span className="group-hover:text-[var(--text-main)] transition-colors">Contactar Admin</span>
            </button>

            {/* Rapid Actions Dropdown */}
            <div className="relative">
                <button 
                    onClick={() => setShowActions(!showActions)}
                    className="bg-purple-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 text-white flex items-center gap-2 active:scale-95"
                >
                    <Zap size={18} className="fill-current" /> Acciones Rápidas <ChevronDown size={14} className={`transition-transform duration-300 ${showActions ? 'rotate-180' : ''}`} />
                </button>

                {showActions && (
                    <>
                        <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setShowActions(false)}
                        />
                        <div className="absolute right-0 mt-3 w-64 glass-card rounded-3xl border border-[var(--border-dim)] shadow-2xl z-20 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                            <div className="p-2">
                                <button 
                                    onClick={handleImpersonate}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[var(--text-main)] hover:bg-purple-500/10 hover:text-purple-400 rounded-2xl transition-all"
                                >
                                    <UserSearch size={18} className="text-purple-400" />
                                    Simular Inquilino
                                </button>
                                
                                <button 
                                    onClick={handleToggleStatus}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[var(--text-main)] hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl transition-all"
                                >
                                    {company.status === 'ACTIVE' ? (
                                        <><ShieldAlert size={18} className="text-rose-400" /> Suspender Empresa</>
                                    ) : (
                                        <><ShieldCheck size={18} className="text-emerald-400" /> Activar Empresa</>
                                    )}
                                </button>

                                <div className="h-px bg-[var(--border-dim)] my-1 mx-2" />

                                <button 
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[var(--text-main)] hover:bg-[var(--text-dim)]/5 rounded-2xl transition-all"
                                >
                                    <Settings2 size={18} className="text-[var(--text-dim)]" />
                                    Gestionar Plan
                                </button>
                            </div>
                            
                            <div className="bg-purple-600/5 p-3 text-center">
                                <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Controles de Super Admin</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
