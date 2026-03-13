'use client';

import { useState } from 'react';
import { login } from '@/lib/actions/auth';
import { useFormStatus } from 'react-dom';

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        const result = await login(formData);
        if (result?.error) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0b] p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
                <div className="glass-card rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-10 shadow-2xl shadow-black">
                    <div className="flex flex-col items-center mb-10">
                        <div className="h-16 w-16 bg-purple-600 rounded-2xl flex items-center justify-center font-black text-3xl text-white shadow-xl shadow-purple-600/30 mb-6 scale-login">
                            A
                        </div>
                        <h1 className="text-3xl font-black bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                            AppVendix SaaS
                        </h1>
                        <p className="text-white/40 text-sm mt-2 font-medium">Panel de Propietario de Plataforma</p>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 px-1">
                                Email Corporativo
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="admin@pos-saas.com"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 px-1">
                                Contraseña
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.05] transition-all placeholder:text-white/10"
                            />
                        </div>

                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs py-3 px-4 rounded-xl font-bold animate-shake">
                                ⚠️ {error}
                            </div>
                        )}

                        <SubmitButton />
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-white/20 text-xs font-medium">
                            Acceso restringido para personal autorizado.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit"
            className="w-full bg-white text-black font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-50 disabled:hover:scale-100"
        >
            {pending ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
    );
}
