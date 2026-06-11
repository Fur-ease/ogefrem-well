"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter((v) => v);

    return (
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "hsl(var(--text-muted))" }}>
            <Link href="/" style={{ color: "inherit", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Home size={14} />
            </Link>

            {segments.map((segment, index) => {
                const url = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;
                const label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

                return (
                    <div key={url} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <ChevronRight size={14} />
                        {isLast ? (
                            <span style={{ fontWeight: 600, color: "hsl(var(--text-primary))" }}>{decodeURIComponent(label)}</span>
                        ) : (
                            <Link href={url} style={{ color: "inherit", textDecoration: "none" }}>
                                {decodeURIComponent(label)}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
