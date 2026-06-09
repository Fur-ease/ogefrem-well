import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function logActivity(
    userId: string,
    action: string,
    entity: string,
    entityId?: string,
    detail?: any
) {
    try {
        await prisma.activityLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                detail: detail ? JSON.stringify(detail) : null,
            },
        });
    } catch (error) {
        logger.error({ error, action, userId }, "Failed to log activity");
    }
}
