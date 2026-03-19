'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

/* ── Country data ─────────────────────────────────────────── */
interface Country {
    name: string;
    iso2: string;
    dialCode: string;
    flag: string;
}

const COUNTRIES: Country[] = [
    { name: 'Colombia', iso2: 'co', dialCode: '57', flag: '🇨🇴' },
    { name: 'United States', iso2: 'us', dialCode: '1', flag: '🇺🇸' },
    { name: 'Mexico', iso2: 'mx', dialCode: '52', flag: '🇲🇽' },
    { name: 'Venezuela', iso2: 've', dialCode: '58', flag: '🇻🇪' },
    { name: 'Ecuador', iso2: 'ec', dialCode: '593', flag: '🇪🇨' },
    { name: 'Peru', iso2: 'pe', dialCode: '51', flag: '🇵🇪' },
    { name: 'Chile', iso2: 'cl', dialCode: '56', flag: '🇨🇱' },
    { name: 'Argentina', iso2: 'ar', dialCode: '54', flag: '🇦🇷' },
    { name: 'Bolivia', iso2: 'bo', dialCode: '591', flag: '🇧🇴' },
    { name: 'Brazil', iso2: 'br', dialCode: '55', flag: '🇧🇷' },
    { name: 'Paraguay', iso2: 'py', dialCode: '595', flag: '🇵🇾' },
    { name: 'Uruguay', iso2: 'uy', dialCode: '598', flag: '🇺🇾' },
    { name: 'Panama', iso2: 'pa', dialCode: '507', flag: '🇵🇦' },
    { name: 'Costa Rica', iso2: 'cr', dialCode: '506', flag: '🇨🇷' },
    { name: 'Guatemala', iso2: 'gt', dialCode: '502', flag: '🇬🇹' },
    { name: 'Honduras', iso2: 'hn', dialCode: '504', flag: '🇭🇳' },
    { name: 'El Salvador', iso2: 'sv', dialCode: '503', flag: '🇸🇻' },
    { name: 'Nicaragua', iso2: 'ni', dialCode: '505', flag: '🇳🇮' },
    { name: 'Cuba', iso2: 'cu', dialCode: '53', flag: '🇨🇺' },
    { name: 'Dominican Republic', iso2: 'do', dialCode: '1', flag: '🇩🇴' },
    { name: 'Canada', iso2: 'ca', dialCode: '1', flag: '🇨🇦' },
    { name: 'Spain', iso2: 'es', dialCode: '34', flag: '🇪🇸' },
    { name: 'France', iso2: 'fr', dialCode: '33', flag: '🇫🇷' },
    { name: 'Germany', iso2: 'de', dialCode: '49', flag: '🇩🇪' },
    { name: 'Italy', iso2: 'it', dialCode: '39', flag: '🇮🇹' },
    { name: 'United Kingdom', iso2: 'gb', dialCode: '44', flag: '🇬🇧' },
    { name: 'Portugal', iso2: 'pt', dialCode: '351', flag: '🇵🇹' },
    { name: 'China', iso2: 'cn', dialCode: '86', flag: '🇨🇳' },
    { name: 'Japan', iso2: 'jp', dialCode: '81', flag: '🇯🇵' },
    { name: 'India', iso2: 'in', dialCode: '91', flag: '🇮🇳' },
    { name: 'Australia', iso2: 'au', dialCode: '61', flag: '🇦🇺' },
];

const DEFAULT_COUNTRY = COUNTRIES[0]; // Colombia

/* ── helper: parse an existing full phone string ─────────── */
function parseInitialPhone(stored: string): { country: Country; local: string } {
    if (!stored) return { country: DEFAULT_COUNTRY, local: '' };
    const digits = stored.replace(/^\+/, '');
    // Try longest dial code first to avoid mis-matching '1' for US vs '506' for CR
    const match = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length)
        .find(c => digits.startsWith(c.dialCode));
    if (match) return { country: match, local: digits.slice(match.dialCode.length) };
    return { country: DEFAULT_COUNTRY, local: stored };
}

/* ── Props ───────────────────────────────────────────────── */
interface PhoneInputFieldProps {
    value: string;                        // full E.164 value e.g. +573160437913
    onChange: (full: string) => void;     // called with full number on every change
    className?: string;
}

export default function PhoneInputField({ value, onChange, className = '' }: PhoneInputFieldProps) {
    const initial = parseInitialPhone(value);
    const [selectedCountry, setSelectedCountry] = useState<Country>(initial.country);
    const [localNumber, setLocalNumber] = useState(initial.local);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    /* ── sync external value changes ──────────────────────── */
    useEffect(() => {
        const parsed = parseInitialPhone(value);
        setSelectedCountry(parsed.country);
        setLocalNumber(parsed.local);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // only on mount — avoid loop

    /* ── emit full number upward ───────────────────────────── */
    const emit = (country: Country, local: string) => {
        const clean = local.replace(/\D/g, '');
        onChange(clean ? `+${country.dialCode}${clean}` : '');
    };

    const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^\d\s\-()]/g, '');
        setLocalNumber(raw);
        emit(selectedCountry, raw);
    };

    const selectCountry = (c: Country) => {
        setSelectedCountry(c);
        setOpen(false);
        setSearch('');
        emit(c, localNumber);
    };

    /* ── close dropdown on outside click ──────────────────── */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ── focus search on open ──────────────────────────────── */
    useEffect(() => {
        if (open) setTimeout(() => searchRef.current?.focus(), 50);
    }, [open]);

    const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dialCode.includes(search)
    );

    return (
        <div className={`flex gap-2 ${className}`} ref={dropdownRef}>
            {/* ── Country selector button ── */}
            <div className="relative flex-shrink-0">
                <button
                    type="button"
                    onClick={() => setOpen(o => !o)}
                    className="h-full flex items-center gap-1.5 bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-3 py-4 text-sm font-bold text-[var(--text-main)] hover:border-purple-500/50 hover:bg-purple-500/5 focus:outline-none focus:border-purple-500/50 transition-all min-w-[96px]"
                >
                    <span className="text-lg leading-none">{selectedCountry.flag}</span>
                    <span className="text-[var(--text-dim)] text-xs font-black">+{selectedCountry.dialCode}</span>
                    <ChevronDown
                        size={12}
                        className={`text-[var(--text-dim)] transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* ── Dropdown ── */}
                {open && (
                    <div className="absolute top-full left-0 mt-2 w-72 z-[10100] glass-card rounded-2xl border border-[var(--border-dim)] shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150">
                        {/* Search */}
                        <div className="p-3 border-b border-[var(--border-dim)]">
                            <div className="relative">
                                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Buscar país..."
                                    className="w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-[var(--text-main)] placeholder:text-[var(--text-dim)]/50 focus:outline-none focus:border-purple-500/50 transition-all"
                                />
                            </div>
                        </div>
                        {/* List */}
                        <ul className="max-h-52 overflow-y-auto py-1">
                            {filtered.length === 0 && (
                                <li className="px-4 py-3 text-xs text-[var(--text-dim)] text-center">Sin resultados</li>
                            )}
                            {filtered.map(c => (
                                <li key={`${c.iso2}-${c.dialCode}`}>
                                    <button
                                        type="button"
                                        onClick={() => selectCountry(c)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all hover:bg-purple-500/10 ${selectedCountry.iso2 === c.iso2 && selectedCountry.dialCode === c.dialCode ? 'text-purple-400 bg-purple-500/5' : 'text-[var(--text-main)]'}`}
                                    >
                                        <span className="text-base leading-none w-6 text-center">{c.flag}</span>
                                        <span className="flex-1 text-left truncate">{c.name}</span>
                                        <span className="text-[var(--text-dim)] text-[10px] font-black tracking-wide">+{c.dialCode}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* ── Local number input ── */}
            <input
                type="tel"
                value={localNumber}
                onChange={handleLocalChange}
                placeholder="3160437913"
                className="flex-1 bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl py-4 px-5 text-sm font-bold text-[var(--text-main)] placeholder:text-[var(--text-dim)]/30 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
            />
        </div>
    );
}
