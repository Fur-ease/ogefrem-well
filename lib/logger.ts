import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const createLogger = () => {
    return pino({
        level: process.env.LOG_LEVEL || "info",
        base: { service: "ogefrem-well" },
        ...(isDev ? {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    sync: true // Synchronous logging is more stable in Next.js Dev
                }
            }
        } : {})
    });
};

const globalForPino = globalThis as unknown as {
    logger: pino.Logger | undefined;
};

export const logger = globalForPino.logger ?? createLogger();

if (isDev) globalForPino.logger = logger;
