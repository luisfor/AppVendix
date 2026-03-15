module.exports = [
"[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40cd0b429aa8adb8d15a139221101e61d09c0fdeb5":"updateUserTheme"},"",""] */ __turbopack_context__.s([
    "updateUserTheme",
    ()=>updateUserTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function updateUserTheme(theme) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session || !session.userId) {
        return {
            error: 'No autorizado'
        };
    }
    try {
        // Update DB
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.update({
            where: {
                id: session.userId
            },
            data: {
                themePreference: theme
            }
        });
        // Refresh Session Cookie with new theme preference
        const expires = new Date(session.expires);
        const newSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["encrypt"])({
            ...session,
            themePreference: theme
        });
        (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set('session', newSession, {
            expires,
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'lax'
        });
        return {
            success: true
        };
    } catch (error) {
        console.error('Error updating theme:', error);
        return {
            error: 'Error al actualizar el tema'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateUserTheme
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserTheme, "40cd0b429aa8adb8d15a139221101e61d09c0fdeb5", null);
}),
"[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0070e7985facf4adaf5e0117d5aa331828c89a13a9":"getPlans","00e4e8ae57091ce80d7b9fd4b93a15d3ea08c960f8":"getSaaSMetrics","40199757f04c30222a1991c0273d261d778ccd9fc2":"getCompanies","407d569dda344fbf211fda2e5f07a0d724801c05d1":"createCompany","4095762965af2315914bfb161cc72fef6aed3fbfa7":"getCompanyDetails","40cf5e70fd9b40b1b8f2b3f4d42ad3ed222bb62682":"softDeleteCompany","40dd38db36b3c2080245c571ec50faed862d8a0364":"impersonateCompany","6036b3705bf2298f922a6af566f9e15f5fc7f1bf76":"updateCompanyPlan","60b6d6d0c7301d1953b47df214225075dbeb920348":"toggleCompanyStatus"},"",""] */ __turbopack_context__.s([
    "createCompany",
    ()=>createCompany,
    "getCompanies",
    ()=>getCompanies,
    "getCompanyDetails",
    ()=>getCompanyDetails,
    "getPlans",
    ()=>getPlans,
    "getSaaSMetrics",
    ()=>getSaaSMetrics,
    "impersonateCompany",
    ()=>impersonateCompany,
    "softDeleteCompany",
    ()=>softDeleteCompany,
    "toggleCompanyStatus",
    ()=>toggleCompanyStatus,
    "updateCompanyPlan",
    ()=>updateCompanyPlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getSaaSMetrics() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalCompanies, activeCompanies, suspendedCompanies, newCompaniesThisMonth, totalPlatformUsers, activePlans] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.count({
            where: {
                status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].ACTIVE
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.count({
            where: {
                status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].SUSPENDED
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.count({
            where: {
                createdAt: {
                    gte: firstDayOfMonth
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.count(),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.findMany({
            where: {
                status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].ACTIVE
            },
            include: {
                plan: true
            }
        })
    ]);
    const mrr = activePlans.reduce((acc, company)=>acc + Number(company.plan?.monthlyPrice || 0), 0);
    const companiesPerPlanMap = activePlans.reduce((acc, company)=>{
        if (!company.plan) return acc; // Skip companies without a plan assigned
        const planName = company.plan.name;
        if (!acc[planName]) acc[planName] = 0;
        acc[planName]++;
        return acc;
    }, {});
    const companiesPerPlan = Object.entries(companiesPerPlanMap).map(([name, count])=>({
            name,
            count
        }));
    return {
        totalCompanies,
        activeCompanies,
        suspendedCompanies,
        mrr,
        newCompaniesThisMonth,
        estimatedYearlyRevenue: mrr * 12,
        totalPlatformUsers,
        companiesPerPlan
    };
}
async function getCompanies(params = {}) {
    const { page = 1, pageSize = 10, search, filter, sortBy = 'createdAt', sortOrder = 'desc' } = params;
    const skip = (page - 1) * pageSize;
    const where = {};
    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                email: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        ];
    }
    if (filter) {
        if (filter.status) where.status = filter.status;
        if (filter.planId) where.planId = filter.planId;
        if (filter.createdMonth) {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            where.createdAt = {
                gte: firstDay
            };
        }
    }
    // Ensure sortBy is a valid field for Company model or handle it
    const allowedSortFields = [
        'name',
        'email',
        'createdAt',
        'status'
    ];
    const validSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const [companies, totalCount] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.findMany({
            where,
            include: {
                plan: true,
                _count: {
                    select: {
                        branches: true,
                        users: true,
                        sales: true
                    }
                }
            },
            orderBy: {
                [validSortBy]: sortOrder
            },
            skip,
            take: pageSize
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.count({
            where
        })
    ]);
    return {
        companies,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize)
    };
}
async function toggleCompanyStatus(companyId, currentStatus) {
    const newStatus = currentStatus === __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].ACTIVE ? __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].SUSPENDED : __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].ACTIVE;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.update({
        where: {
            id: companyId
        },
        data: {
            status: newStatus
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/saas-admin');
    return {
        success: true
    };
}
async function updateCompanyPlan(companyId, planId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.update({
        where: {
            id: companyId
        },
        data: {
            planId
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/saas-admin');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(`/saas-admin/companies/${companyId}`);
    return {
        success: true
    };
}
async function softDeleteCompany(companyId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.update({
        where: {
            id: companyId
        },
        data: {
            deletedAt: new Date()
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/saas-admin');
    return {
        success: true
    };
}
async function getCompanyDetails(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.findUnique({
        where: {
            id
        },
        include: {
            plan: {
                include: {
                    modules: true
                }
            },
            _count: {
                select: {
                    branches: true,
                    users: true,
                    sales: true,
                    products: true
                }
            },
            users: {
                take: 10,
                orderBy: {
                    createdAt: 'desc'
                }
            },
            branches: true
        }
    });
}
async function impersonateCompany(companyId) {
    // In a real app, this would set a special "impersonation" cookie or update the session
    // For this POC, we'll return a success and perhaps log it
    console.log(`[AUDIT] SaaS Admin is impersonating Company: ${companyId}`);
    return {
        success: true,
        redirectUrl: '/'
    };
}
async function createCompany(data) {
    const company = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].company.create({
        data: {
            name: data.name,
            email: data.email,
            status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["CompanyStatus"].ACTIVE,
            planId: data.planId
        }
    });
    // Create default admin for the new company
    const hashedPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hash('temporary_password_change_me', 10);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.create({
        data: {
            name: data.adminName,
            email: data.adminEmail,
            password: hashedPassword,
            systemRole: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["SystemRole"].COMPANY_ADMIN,
            companyId: company.id
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/saas-admin');
    return {
        success: true,
        companyId: company.id
    };
}
async function getPlans() {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.findMany({
        include: {
            modules: true
        }
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSaaSMetrics,
    getCompanies,
    toggleCompanyStatus,
    updateCompanyPlan,
    softDeleteCompany,
    getCompanyDetails,
    impersonateCompany,
    createCompany,
    getPlans
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSaaSMetrics, "00e4e8ae57091ce80d7b9fd4b93a15d3ea08c960f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanies, "40199757f04c30222a1991c0273d261d778ccd9fc2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleCompanyStatus, "60b6d6d0c7301d1953b47df214225075dbeb920348", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateCompanyPlan, "6036b3705bf2298f922a6af566f9e15f5fc7f1bf76", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(softDeleteCompany, "40cf5e70fd9b40b1b8f2b3f4d42ad3ed222bb62682", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCompanyDetails, "4095762965af2315914bfb161cc72fef6aed3fbfa7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(impersonateCompany, "40dd38db36b3c2080245c571ec50faed862d8a0364", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCompany, "407d569dda344fbf211fda2e5f07a0d724801c05d1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlans, "0070e7985facf4adaf5e0117d5aa331828c89a13a9", null);
}),
"[project]/.next-internal/server/app/saas-admin/companies/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/saas-admin/companies/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0058438bc3e7de797a5999b235c5f8840c376fe0d5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "0070e7985facf4adaf5e0117d5aa331828c89a13a9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPlans"],
    "008a4297fe3cab3835777afa389a6edcdb4635d397",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"],
    "00e4e8ae57091ce80d7b9fd4b93a15d3ea08c960f8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSaaSMetrics"],
    "40199757f04c30222a1991c0273d261d778ccd9fc2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanies"],
    "404c7d125b32a952ebad29a6c426dbacd9559ab7a6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "407d569dda344fbf211fda2e5f07a0d724801c05d1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCompany"],
    "4095762965af2315914bfb161cc72fef6aed3fbfa7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCompanyDetails"],
    "40cd0b429aa8adb8d15a139221101e61d09c0fdeb5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUserTheme"],
    "40cf5e70fd9b40b1b8f2b3f4d42ad3ed222bb62682",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["softDeleteCompany"],
    "40dd38db36b3c2080245c571ec50faed862d8a0364",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["impersonateCompany"],
    "6036b3705bf2298f922a6af566f9e15f5fc7f1bf76",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCompanyPlan"],
    "60b6d6d0c7301d1953b47df214225075dbeb920348",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleCompanyStatus"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$saas$2d$admin$2f$companies$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/saas-admin/companies/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$saas$2d$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/saas-admin.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_5be4e761._.js.map