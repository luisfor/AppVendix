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
"[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40612eb00b321d871d002ddc74b5e28c13362d24b4":"getPlans","40663594a9ff33a49aac76617fd674d099308eac36":"duplicatePlan","407ac0d30ce77a358ba82cafce2241038872792faf":"createPlan","40970aa8e7c8e622b845171b1bf3447585e6f761fd":"softDeletePlan","40f648e73d50681106b14a81c522663ef64680eaba":"getPlanById","602ca844be1df97815859d6749a41cfacedb7104a5":"updatePlan","60c8d2d58cecf4414187d0d6907efb8a0b7152c69b":"togglePlanStatus"},"",""] */ __turbopack_context__.s([
    "createPlan",
    ()=>createPlan,
    "duplicatePlan",
    ()=>duplicatePlan,
    "getPlanById",
    ()=>getPlanById,
    "getPlans",
    ()=>getPlans,
    "softDeletePlan",
    ()=>softDeletePlan,
    "togglePlanStatus",
    ()=>togglePlanStatus,
    "updatePlan",
    ()=>updatePlan
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function getPlans(includeArchived = false) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    const where = includeArchived ? {} : {
        status: {
            in: [
                __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ACTIVE,
                __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].INACTIVE
            ]
        }
    };
    const plans = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.findMany({
        where,
        include: {
            modules: true,
            _count: {
                select: {
                    companies: true
                }
            }
        },
        orderBy: {
            monthlyPrice: 'asc'
        }
    });
    return plans;
}
async function getPlanById(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.findUnique({
        where: {
            id
        },
        include: {
            modules: true,
            priceHistory: {
                orderBy: {
                    effectiveDate: 'desc'
                }
            }
        }
    });
}
async function createPlan(data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    const newPlan = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.create({
        data: {
            code: data.code || `PLAN-${Date.now()}`,
            name: data.name,
            description: data.description,
            monthlyPrice: data.monthlyPrice,
            yearlyPrice: data.yearlyPrice,
            duration: 30,
            maxUsers: data.maxUsers,
            maxBranches: data.maxBranches,
            maxProducts: data.maxProducts,
            isTrialEligible: data.isTrialEligible,
            allowCourtesy: data.allowCourtesy,
            version: 1,
            modules: {
                connect: data.moduleIds.map((id)=>({
                        id
                    }))
            },
            priceHistory: {
                create: {
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice
                }
            }
        }
    });
    return {
        success: true,
        plan: newPlan
    };
}
async function duplicatePlan(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    const original = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.findUnique({
        where: {
            id
        },
        include: {
            modules: true
        }
    });
    if (!original) throw new Error("Plan not found");
    const duplicate = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.create({
        data: {
            ...original,
            id: undefined,
            name: `${original.name} (Copy)`,
            code: `${original.code || 'PLAN'}-COPY-${Date.now()}`,
            createdAt: undefined,
            updatedAt: undefined,
            modules: {
                connect: original.modules.map((m)=>({
                        id: m.id
                    }))
            },
            priceHistory: {
                create: {
                    monthlyPrice: original.monthlyPrice,
                    yearlyPrice: original.yearlyPrice
                }
            }
        }
    });
    return {
        success: true,
        plan: duplicate
    };
}
async function togglePlanStatus(id, currentStatus) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    const newStatus = currentStatus === __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ACTIVE ? __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].INACTIVE : __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ACTIVE;
    const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.update({
        where: {
            id
        },
        data: {
            status: newStatus
        }
    });
    return {
        success: true,
        plan
    };
}
async function softDeletePlan(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    const plan = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    companies: true
                }
            }
        }
    });
    if (!plan) throw new Error("Plan not found");
    if (plan._count.companies > 0) {
        throw new Error("Cannot delete plan with active subscriptions. Archive it instead.");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].subscriptionPlan.update({
        where: {
            id
        },
        data: {
            status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ARCHIVED
        }
    });
    return {
        success: true
    };
}
async function updatePlan(id, data) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"])();
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].$transaction(async (tx)=>{
        const original = await tx.subscriptionPlan.findUnique({
            where: {
                id
            },
            include: {
                modules: true,
                _count: {
                    select: {
                        companies: true
                    }
                }
            }
        });
        if (!original) throw new Error("Plan not found");
        // 1. Determine if we need a new version
        const samePrice = Number(original.monthlyPrice) === data.monthlyPrice && Number(original.yearlyPrice) === data.yearlyPrice;
        const sameLimits = original.maxUsers === data.maxUsers && original.maxBranches === data.maxBranches && original.maxProducts === data.maxProducts;
        // If there are NO active companies, we can just update in place regardless
        const hasSubscribers = original._count.companies > 0;
        if (hasSubscribers && (!samePrice || !sameLimits)) {
            // WE MUST VERSION TO PROTECT EXISTING CUSTOMERS
            // Step A: Archive old plan
            await tx.subscriptionPlan.update({
                where: {
                    id
                },
                data: {
                    status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ARCHIVED
                }
            });
            // Step B: Create New Version
            const newVersion = await tx.subscriptionPlan.create({
                data: {
                    code: original.code,
                    version: original.version + 1,
                    name: data.name,
                    description: data.description,
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice,
                    duration: 30,
                    maxUsers: data.maxUsers,
                    maxBranches: data.maxBranches,
                    maxProducts: data.maxProducts,
                    isTrialEligible: data.isTrialEligible,
                    allowCourtesy: data.allowCourtesy,
                    status: __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PlanStatus"].ACTIVE,
                    modules: {
                        connect: data.moduleIds.map((mid)=>({
                                id: mid
                            }))
                    },
                    priceHistory: {
                        create: {
                            monthlyPrice: data.monthlyPrice,
                            yearlyPrice: data.yearlyPrice
                        }
                    }
                }
            });
            return {
                success: true,
                plan: newVersion,
                versioned: true
            };
        } else {
            // WE CAN IN-PLACE UPDATE (No subscribers yet, or just changing name/description/modules/flags)
            // Check if price changed (only relevant if hasSubscribers is false, otherwise caught above)
            if (!samePrice) {
                await tx.planPriceHistory.create({
                    data: {
                        planId: id,
                        monthlyPrice: data.monthlyPrice,
                        yearlyPrice: data.yearlyPrice
                    }
                });
            }
            // Update modules: Disconnect all, connect new
            await tx.subscriptionPlan.update({
                where: {
                    id
                },
                data: {
                    modules: {
                        set: []
                    }
                }
            });
            const updated = await tx.subscriptionPlan.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    description: data.description,
                    monthlyPrice: data.monthlyPrice,
                    yearlyPrice: data.yearlyPrice,
                    maxUsers: data.maxUsers,
                    maxBranches: data.maxBranches,
                    maxProducts: data.maxProducts,
                    isTrialEligible: data.isTrialEligible,
                    allowCourtesy: data.allowCourtesy,
                    modules: {
                        connect: data.moduleIds.map((mid)=>({
                                id: mid
                            }))
                    }
                }
            });
            return {
                success: true,
                plan: updated,
                versioned: false
            };
        }
    });
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPlans,
    getPlanById,
    createPlan,
    duplicatePlan,
    togglePlanStatus,
    softDeletePlan,
    updatePlan
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlans, "40612eb00b321d871d002ddc74b5e28c13362d24b4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPlanById, "40f648e73d50681106b14a81c522663ef64680eaba", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createPlan, "407ac0d30ce77a358ba82cafce2241038872792faf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(duplicatePlan, "40663594a9ff33a49aac76617fd674d099308eac36", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(togglePlanStatus, "60c8d2d58cecf4414187d0d6907efb8a0b7152c69b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(softDeletePlan, "40970aa8e7c8e622b845171b1bf3447585e6f761fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updatePlan, "602ca844be1df97815859d6749a41cfacedb7104a5", null);
}),
"[project]/.next-internal/server/app/saas-admin/plans/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)");
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
"[project]/.next-internal/server/app/saas-admin/plans/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0058438bc3e7de797a5999b235c5f8840c376fe0d5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "008a4297fe3cab3835777afa389a6edcdb4635d397",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requireSaaSAdmin"],
    "404c7d125b32a952ebad29a6c426dbacd9559ab7a6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40612eb00b321d871d002ddc74b5e28c13362d24b4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPlans"],
    "40663594a9ff33a49aac76617fd674d099308eac36",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["duplicatePlan"],
    "407ac0d30ce77a358ba82cafce2241038872792faf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPlan"],
    "40970aa8e7c8e622b845171b1bf3447585e6f761fd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["softDeletePlan"],
    "40cd0b429aa8adb8d15a139221101e61d09c0fdeb5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateUserTheme"],
    "40f648e73d50681106b14a81c522663ef64680eaba",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPlanById"],
    "602ca844be1df97815859d6749a41cfacedb7104a5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePlan"],
    "60c8d2d58cecf4414187d0d6907efb8a0b7152c69b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["togglePlanStatus"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$saas$2d$admin$2f$plans$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/saas-admin/plans/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2f$plans$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions/plans.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_a933a31b._.js.map