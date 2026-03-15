module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/components/SaaSAdminDashboard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SaaSAdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
;
;
;
;
;
function SaaSAdminDashboard({ metrics, initialData, plans, hideMetrics }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(null);
    const [showToggleModal, setShowToggleModal] = useState(null);
    // Query States
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({});
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        planId: plans[0]?.id || '',
        adminName: '',
        adminEmail: ''
    });
    const refreshData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        setIsFetching(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanies"])({
                page,
                pageSize: 10,
                search,
                filter,
                sortBy,
                sortOrder
            });
            setData(result);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally{
            setIsFetching(false);
        }
    }, [
        page,
        search,
        filter,
        sortBy,
        sortOrder
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refreshData();
    }, [
        refreshData
    ]);
    const handleSearch = (e)=>{
        setSearch(e.target.value);
        setPage(1); // Reset page on search
    };
    const handleFilterClick = (newFilter)=>{
        setFilter(newFilter);
        setPage(1);
    };
    const clearFilters = ()=>{
        setFilter({});
        setSearch('');
        setPage(1);
        setSortBy('createdAt');
        setSortOrder('desc');
    };
    const handleSort = (field)=>{
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };
    const confirmToggleStatus = async ()=>{
        if (!showToggleModal) return;
        setLoading(showToggleModal.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleCompanyStatus"])(showToggleModal.id, showToggleModal.status);
        setLoading(null);
        setShowToggleModal(null);
    };
    const handleSoftDelete = async (id)=>{
        if (confirm('¿Está seguro de eliminar esta empresa? Podrá restaurarla luego.')) {
            setLoading(id);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["softDeleteCompany"])(id);
            setLoading(null);
        }
    };
    const handleImpersonate = async (id)=>{
        setLoading(id);
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["impersonateCompany"])(id);
        if (result.success) {
            router.push(result.redirectUrl);
        }
        setLoading(null);
    };
    const handleUpdatePlan = async ()=>{
        if (!showPlanModal) return;
        setLoading(showPlanModal.id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCompanyPlan"])(showPlanModal.id, showPlanModal.planId);
        setLoading(null);
        setShowPlanModal(null);
    };
    const handleCreateCompany = async (e)=>{
        e.preventDefault();
        setLoading('creating');
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCompany"])(formData);
        setLoading(null);
        setShowModal(false);
        setFormData({
            name: '',
            email: '',
            planId: plans[0]?.id || '',
            adminName: '',
            adminEmail: ''
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700",
        children: [
            !hideMetrics && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: [
                    [
                        {
                            label: 'MRR',
                            value: `$${metrics.mrr.toLocaleString()}`,
                            icon: '📈',
                            color: 'bg-emerald-500',
                            sub: 'Monthly Recurring Revenue',
                            clickable: false
                        },
                        {
                            label: 'Revenue Anual Est.',
                            value: `$${metrics.estimatedYearlyRevenue.toLocaleString()}`,
                            icon: '💰',
                            color: 'bg-blue-500',
                            sub: 'Basado en suscripciones',
                            clickable: false
                        },
                        {
                            label: 'Empresas Activas',
                            value: metrics.activeCompanies,
                            icon: '✅',
                            color: 'bg-purple-500',
                            sub: `De ${metrics.totalCompanies} totales`,
                            filter: {
                                status: CompanyStatus.ACTIVE
                            }
                        },
                        {
                            label: 'Nuevas (Mes)',
                            value: metrics.newCompaniesThisMonth,
                            icon: '✨',
                            color: 'bg-amber-500',
                            sub: 'Crecimiento mensual',
                            filter: {
                                createdMonth: true
                            }
                        },
                        {
                            label: 'Usuarios Plataforma',
                            value: metrics.totalPlatformUsers,
                            icon: '👥',
                            color: 'bg-indigo-500',
                            sub: 'Carga actual',
                            clickable: false
                        },
                        {
                            label: 'Suspendidas',
                            value: metrics.suspendedCompanies,
                            icon: '⚠️',
                            color: 'bg-rose-500',
                            sub: 'Control de Churn',
                            filter: {
                                status: CompanyStatus.SUSPENDED
                            }
                        }
                    ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>m.filter && handleFilterClick(m.filter),
                            className: `glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-dim)]/20 group ${m.filter ? 'cursor-pointer hover:bg-[var(--text-dim)]/5' : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-10 w-10 rounded-xl ${m.color}/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`,
                                    children: m.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 163,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-dim)] text-[10px] font-black uppercase tracking-wider mb-1",
                                    children: m.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 166,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-black text-[var(--text-main)]",
                                    children: m.value
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 167,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-dim)]/50 text-[9px] mt-1 font-medium",
                                    children: m.sub
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 168,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, m.label, true, {
                            fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                            lineNumber: 158,
                            columnNumber: 25
                        }, this)),
                    metrics.companiesPerPlan?.map((plan)=>{
                        const planObj = plans.find((p)=>p.name === plan.name);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>planObj && handleFilterClick({
                                    planId: planObj.id
                                }),
                            className: "glass-card rounded-2xl p-6 transition-all duration-300 hover:border-[var(--text-dim)]/20 group cursor-pointer hover:bg-[var(--text-dim)]/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform",
                                    children: "🏢"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 181,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-dim)] text-[10px] font-black uppercase tracking-wider mb-1",
                                    children: [
                                        "Plan ",
                                        plan.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 184,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-black text-[var(--text-main)]",
                                    children: plan.count
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 185,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[var(--text-dim)]/50 text-[9px] mt-1 font-medium",
                                    children: "Empresas activas en este plan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 186,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, plan.name, true, {
                            fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                            lineNumber: 176,
                            columnNumber: 29
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 149,
                columnNumber: 17
            }, this),
            (Object.keys(filter).length > 0 || search) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between bg-purple-600/10 border border-purple-500/20 px-6 py-3 rounded-2xl animate-in slide-in-from-left-4 duration-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[var(--text-dim)] text-xs font-black uppercase tracking-widest",
                                children: "Filtrando por:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 197,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    filter.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter",
                                        children: [
                                            "Estado: ",
                                            filter.status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 200,
                                        columnNumber: 33
                                    }, this),
                                    filter.planId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter",
                                        children: [
                                            "Plan: ",
                                            plans.find((p)=>p.id === filter.planId)?.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 205,
                                        columnNumber: 33
                                    }, this),
                                    filter.createdMonth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-purple-600 text-white text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter",
                                        children: "Creados este mes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 210,
                                        columnNumber: 33
                                    }, this),
                                    search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "bg-[var(--text-main)] text-[var(--background)] text-[9px] px-2 py-1 rounded-full font-black uppercase tracking-tighter",
                                        children: [
                                            "Búsqueda: ",
                                            search
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 198,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 196,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clearFilters,
                        className: "text-[var(--text-dim)] hover:text-rose-500 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1",
                        children: "✕ Limpiar Filtros"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 221,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 195,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/20 ${isFetching ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-300`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-6 border-b border-[var(--border-dim)] flex flex-col md:flex-row items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-bold text-[var(--text-main)]",
                                        children: "Gestión de Clientes SaaS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 234,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[var(--text-dim)] text-[10px] uppercase font-black tracking-widest mt-1",
                                        children: [
                                            data.totalCount,
                                            " Resultados Encontrados"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 235,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 233,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 w-full md:w-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex-1 md:w-64",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Buscar empresa o email...",
                                                value: search,
                                                onChange: handleSearch,
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-purple-500 transition-all"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 241,
                                                columnNumber: 29
                                            }, this),
                                            isFetching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute right-3 top-2.5 h-3 w-3 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 248,
                                                columnNumber: 44
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 240,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowModal(true),
                                        className: "bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20 active:scale-95 flex items-center gap-2 whitespace-nowrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 254,
                                                columnNumber: 29
                                            }, this),
                                            " Nueva Empresa"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 250,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 239,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 232,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-left border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-[var(--text-dim)]/[0.02] text-[var(--text-dim)] text-[10px] uppercase tracking-[0.15em] font-bold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-4 border-b border-[var(--border-dim)] font-black cursor-pointer hover:text-[var(--text-main)] transition-colors",
                                                onClick: ()=>handleSort('name'),
                                                children: [
                                                    "Empresa ",
                                                    sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 263,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-4 border-b border-[var(--border-dim)] font-black",
                                                children: "Suscripción"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 266,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-4 border-b border-[var(--border-dim)] font-black",
                                                children: "Uso"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 267,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-4 border-b border-[var(--border-dim)] text-right font-black cursor-pointer hover:text-[var(--text-main)] transition-colors",
                                                onClick: ()=>handleSort('createdAt'),
                                                children: [
                                                    "Fecha ",
                                                    sortBy === 'createdAt' && (sortOrder === 'asc' ? '▲' : '▼')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 268,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-8 py-4 border-b border-[var(--border-dim)] text-right font-black",
                                                children: "Acciones"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 271,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 262,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 261,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-y divide-[var(--border-dim)]",
                                    children: data.companies.map((company)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-[var(--text-dim)]/[0.02] transition-colors group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-10 w-10 rounded-lg bg-[var(--text-dim)]/5 border border-[var(--border-dim)] flex items-center justify-center text-lg font-bold text-[var(--text-main)] group-hover:bg-[var(--text-dim)]/10 transition-colors",
                                                                children: company.name[0]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-semibold text-[var(--text-main)]/90",
                                                                        children: company.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 283,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest flex items-center gap-2 mt-1",
                                                                        children: [
                                                                            company.email,
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: `h-1 w-1 rounded-full ${company.status === CompanyStatus.ACTIVE ? 'bg-emerald-500' : 'bg-rose-500'}`
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                                lineNumber: 286,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 284,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1.5 flex flex-col items-start font-black",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-widest border border-blue-500/20",
                                                                children: company.plan?.name || 'Manual'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowPlanModal({
                                                                        id: company.id,
                                                                        planId: company.planId
                                                                    }),
                                                                className: "text-[9px] text-[var(--text-dim)]/40 hover:text-[var(--text-main)] transition-colors uppercase tracking-widest",
                                                                children: "Cambiar Plan"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-6 text-xs font-mono",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter",
                                                                        children: "BNC"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 307,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-main)]/60",
                                                                        children: company._count.branches
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 308,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter",
                                                                        children: "USR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 311,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-main)]/60",
                                                                        children: company._count.users
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 312,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-dim)] text-[9px] uppercase font-bold tracking-tighter",
                                                                        children: "SLS"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 315,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[var(--text-main)]/60",
                                                                        children: company._count.sales
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                        lineNumber: 316,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5 text-right font-mono text-[10px] text-[var(--text-dim)]",
                                                    children: new Date(company.createdAt).toLocaleDateString()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-8 py-5 text-right",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-end gap-3 text-lg",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setShowToggleModal({
                                                                        id: company.id,
                                                                        name: company.name,
                                                                        status: company.status
                                                                    }),
                                                                disabled: loading === company.id,
                                                                className: `text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-tighter transition-all border ${company.status === CompanyStatus.ACTIVE ? 'text-rose-500/60 border-rose-500/10 hover:bg-rose-500/10' : 'text-emerald-500/60 border-emerald-500/10 hover:bg-emerald-500/10'}`,
                                                                children: company.status === CompanyStatus.ACTIVE ? 'Suspender' : 'Activar'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 325,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleImpersonate(company.id),
                                                                className: "p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-blue-400 hover:bg-blue-500/10 transition-all active:scale-90",
                                                                title: "Impersonar",
                                                                children: "🎭"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/saas-admin/companies/${company.id}`,
                                                                className: "p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--text-main)]/10 transition-all active:scale-90 flex items-center justify-center",
                                                                title: "Ver Detalles",
                                                                children: "👁️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 344,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleSoftDelete(company.id),
                                                                className: "p-2 rounded-lg bg-[var(--text-dim)]/[0.05] border border-[var(--border-dim)] text-[var(--text-dim)] hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90",
                                                                title: "Eliminar",
                                                                children: "🗑️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                        lineNumber: 324,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, company.id, true, {
                                            fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                            lineNumber: 276,
                                            columnNumber: 33
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                    lineNumber: 274,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                            lineNumber: 260,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 259,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-4 border-t border-[var(--border-dim)] flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-[var(--text-dim)] font-black uppercase tracking-widest",
                                children: [
                                    "Página ",
                                    data.page,
                                    " de ",
                                    data.totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 369,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: data.page === 1 || isFetching,
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        className: "px-4 py-2 rounded-xl bg-[var(--text-dim)]/5 border border-[var(--border-dim)] text-xs font-bold hover:bg-[var(--text-dim)]/10 disabled:opacity-30 transition-all",
                                        children: "Anterior"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 373,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: data.page >= data.totalPages || isFetching,
                                        onClick: ()=>setPage((p)=>p + 1),
                                        className: "px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 disabled:opacity-30 transition-all",
                                        children: "Siguiente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 380,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 372,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 368,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 231,
                columnNumber: 13
            }, this),
            showPlanModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/80 backdrop-blur-md",
                        onClick: ()=>setShowPlanModal(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 394,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card w-full max-w-sm rounded-[2rem] p-8 shadow-3xl relative z-10 animate-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-bold mb-6 text-[var(--text-main)]",
                                children: "Cambiar Plan"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 396,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    plans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowPlanModal({
                                                    ...showPlanModal,
                                                    planId: plan.id
                                                }),
                                            className: `w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between ${showPlanModal.planId === plan.id ? 'bg-purple-600/10 border-purple-500 text-[var(--text-main)]' : 'bg-[var(--text-dim)]/5 border-[var(--border-dim)] text-[var(--text-dim)] hover:bg-[var(--text-dim)]/10'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold",
                                                    children: plan.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono",
                                                    children: [
                                                        "$",
                                                        plan.price
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, plan.id, true, {
                                            fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                            lineNumber: 399,
                                            columnNumber: 33
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-4 pt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowPlanModal(null),
                                                className: "flex-1 py-3 text-[var(--text-dim)] font-bold hover:text-[var(--text-main)] transition-colors",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 412,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleUpdatePlan,
                                                className: "flex-1 py-3 bg-[var(--text-main)] text-[var(--background)] rounded-xl font-black shadow-lg shadow-[var(--text-main)]/5 active:scale-95 transition-transform",
                                                children: "Actualizar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 413,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 411,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 397,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 395,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 393,
                columnNumber: 17
            }, this),
            showModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
                        onClick: ()=>setShowModal(false)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 423,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card w-full max-w-2xl rounded-[2.5rem] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-black mb-8 text-[var(--text-main)]",
                                children: "Registrar Nueva Empresa"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 425,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleCreateCompany,
                                className: "grid grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]",
                                                children: "Nombre de la Empresa"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 429,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                value: formData.name,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        name: e.target.value
                                                    }),
                                                placeholder: "Ej. Farmacia Central",
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 430,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 428,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]",
                                                children: "Email de Empresa"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 440,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "email",
                                                value: formData.email,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    }),
                                                placeholder: "contacto@empresa.com",
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 441,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 439,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]",
                                                children: "Plan de Suscripción"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 452,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: formData.planId,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        planId: e.target.value
                                                    }),
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all appearance-none text-[var(--text-main)]",
                                                children: plans.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: p.id,
                                                        className: "bg-[var(--background)]",
                                                        children: [
                                                            p.name,
                                                            " ($",
                                                            p.price,
                                                            "/mes)"
                                                        ]
                                                    }, p.id, true, {
                                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 453,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 451,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-[var(--border-dim)] w-full mb-6"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 465,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-bold text-purple-400 mb-6 uppercase tracking-widest",
                                                children: "Cuenta de Administrador Inicial"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 466,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 464,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]",
                                                children: "Nombre del Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 470,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                value: formData.adminName,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        adminName: e.target.value
                                                    }),
                                                placeholder: "Nombre completo",
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 471,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 469,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-[10px] uppercase tracking-widest font-black text-[var(--text-dim)]",
                                                children: "Email del Admin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 481,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "email",
                                                value: formData.adminEmail,
                                                onChange: (e)=>setFormData({
                                                        ...formData,
                                                        adminEmail: e.target.value
                                                    }),
                                                placeholder: "admin@empresa.com",
                                                className: "w-full bg-[var(--text-dim)]/5 border border-[var(--border-dim)] rounded-2xl px-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-[var(--text-main)]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 482,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 480,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 flex justify-end gap-4 mt-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowModal(false),
                                                className: "px-8 py-3.5 rounded-2xl font-bold text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors",
                                                children: "Cancelar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 493,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: loading === 'creating',
                                                type: "submit",
                                                className: "bg-[var(--text-main)] text-[var(--background)] px-10 py-3.5 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[var(--text-main)]/10 disabled:opacity-50",
                                                children: loading === 'creating' ? 'Creando...' : 'Crear Empresa'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                                lineNumber: 500,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 492,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 427,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 424,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 422,
                columnNumber: 17
            }, this),
            showToggleModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[70] flex items-center justify-center p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/80 backdrop-blur-md",
                        onClick: ()=>setShowToggleModal(null)
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 515,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-card w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-3xl animate-in zoom-in-95 fade-in duration-300 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mx-auto h-20 w-20 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl ${showToggleModal.status === CompanyStatus.ACTIVE ? 'bg-rose-500/20 text-rose-500 shadow-rose-500/20' : 'bg-emerald-500/20 text-emerald-500 shadow-emerald-500/20'}`,
                                children: showToggleModal.status === CompanyStatus.ACTIVE ? '⚠️' : '✅'
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 517,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-black mb-4 text-[var(--text-main)]",
                                children: showToggleModal.status === CompanyStatus.ACTIVE ? '¿Suspender Empresa?' : '¿Activar Empresa?'
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 520,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[var(--text-dim)] mb-8 text-lg",
                                children: [
                                    "¿Estás seguro que deseas ",
                                    showToggleModal.status === CompanyStatus.ACTIVE ? 'suspender' : 'activar',
                                    " el acceso a la empresa ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 524,
                                        columnNumber: 153
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-[var(--text-main)]",
                                        children: showToggleModal.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 524,
                                        columnNumber: 159
                                    }, this),
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 523,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-4 pt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowToggleModal(null),
                                        className: "flex-1 py-3.5 rounded-2xl font-bold bg-[var(--text-dim)]/10 text-[var(--text-dim)] hover:bg-[var(--text-dim)]/20 hover:text-[var(--text-main)] transition-colors",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 527,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: confirmToggleStatus,
                                        disabled: loading === showToggleModal.id,
                                        className: `flex-1 py-3.5 rounded-2xl font-black transition-all shadow-xl disabled:opacity-50 ${showToggleModal.status === CompanyStatus.ACTIVE ? 'bg-rose-500 text-white shadow-rose-500/30 hover:bg-rose-600' : 'bg-emerald-500 text-white shadow-emerald-500/30 hover:bg-emerald-600'}`,
                                        children: loading === showToggleModal.id ? 'Procesando...' : showToggleModal.status === CompanyStatus.ACTIVE ? 'Sí, Suspender' : 'Sí, Activar'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                        lineNumber: 533,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                                lineNumber: 526,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                        lineNumber: 516,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
                lineNumber: 514,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/SaaSAdminDashboard.tsx",
        lineNumber: 145,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/saas-admin/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SaaSAdminPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SaaSAdminDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/SaaSAdminDashboard.tsx [app-rsc] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
async function SaaSAdminPage() {
    const [metricsRaw, companiesRaw, plansRaw] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSaaSMetrics"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanies"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPlans"])()
    ]);
    // Deep serialization for Client Components (handles Decimals, Dates, etc.)
    const metrics = JSON.parse(JSON.stringify(metricsRaw));
    const companies = JSON.parse(JSON.stringify(companiesRaw));
    const plans = JSON.parse(JSON.stringify(plansRaw));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "mb-10 flex flex-col items-start gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 w-10 bg-purple-600 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/saas-admin/page.tsx",
                                    lineNumber: 23,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-black uppercase tracking-[0.3em] text-purple-500",
                                    children: "SaaS Control Center"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/saas-admin/page.tsx",
                                    lineNumber: 24,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/saas-admin/page.tsx",
                            lineNumber: 22,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl font-black text-[var(--text-main)] tracking-tight",
                            children: "Dashboard Global"
                        }, void 0, false, {
                            fileName: "[project]/src/app/saas-admin/page.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[var(--text-dim)] max-w-2xl text-lg font-medium",
                            children: "Resumen financiero y salud del ecosistema modular."
                        }, void 0, false, {
                            fileName: "[project]/src/app/saas-admin/page.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/saas-admin/page.tsx",
                    lineNumber: 21,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$SaaSAdminDashboard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    metrics: metrics,
                    companies: companies,
                    plans: plans,
                    hideMetrics: false
                }, void 0, false, {
                    fileName: "[project]/src/app/saas-admin/page.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/saas-admin/page.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/saas-admin/page.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/saas-admin/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/saas-admin/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__eb73f392._.js.map