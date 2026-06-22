/**
 * Simple input sanitizer to prevent basic XSS and data corruption.
 */

export function sanitizeString(val: any): any {
    if (typeof val !== "string") return val;

    // Remove script tags and potentially dangerous HTML
    return val
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
        .replace(/on\w+="[^"]*"/gim, "")
        .replace(/on\w+='[^']*'/gim, "")
        .trim();
}

export function sanitizeObject(obj: any): any {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
    }

    const sanitized: any = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "string") {
            sanitized[key] = sanitizeString(value);
        } else if (typeof value === "object" && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    }
    return sanitized;
}
