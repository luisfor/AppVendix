'use client';

import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

interface CompanyMapProps {
    address: string | null;
}

export default function CompanyMap({ address }: CompanyMapProps) {
    if (!address) {
        return (
            <div className="h-64 w-full rounded-[2rem] bg-[var(--text-dim)]/5 border-2 border-dashed border-[var(--border-dim)] flex flex-col items-center justify-center text-center p-8 group hover:border-purple-500/30 transition-all">
                <div className="h-16 w-16 rounded-2xl bg-[var(--text-dim)]/5 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                    <MapPin size={32} />
                </div>
                <h4 className="font-bold text-[var(--text-main)] italic">Ubicación sin configurar</h4>
                <p className="text-[var(--text-dim)] text-xs mt-2 max-w-[200px]">
                    Agrega la dirección física para habilitar el mapa interactivo.
                </p>
            </div>
        );
    }

    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_ME_OR_USE_SEARCH&q=${encodedAddress}`;
    
    // Fallback search URL if no API Key (using standard search embed)
    const fallbackUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-purple-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-dim)] opacity-90">Geo-Localización</span>
                </div>
                <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                    Ver en Grande <ExternalLink size={10} />
                </a>
            </div>
            
            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden border border-[var(--border-dim)] shadow-inner group">
                <iframe
                    title="Company Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="filter-map-dark"
                    src={fallbackUrl}
                    allowFullScreen
                ></iframe>
                
                {/* Overlay to handle scroll capture in parent */}
                <div className="absolute inset-0 pointer-events-none border-[12px] border-[var(--border-dim)]/[0.05] rounded-[2rem]"></div>
            </div>
        </div>
    );
}
