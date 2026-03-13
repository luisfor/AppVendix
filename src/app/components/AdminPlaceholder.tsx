export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-1000">
            <div className="h-24 w-24 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-4xl">
                ⚙️
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl font-black text-[var(--text-main)]">{title}</h1>
                <p className="text-[var(--text-dim)] max-w-md">Este módulo de administración global está en desarrollo. Pronto podrá gestionar configuraciones avanzadas de la plataforma aquí.</p>
            </div>
            <div className="flex gap-4">
                <div className="h-1 w-20 bg-purple-600 rounded-full animate-pulse" />
                <div className="h-1 w-10 bg-purple-600/40 rounded-full" />
                <div className="h-1 w-5 bg-purple-600/20 rounded-full" />
            </div>
        </div>
    );
}
