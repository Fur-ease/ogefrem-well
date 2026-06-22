"use client";

import { useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes in ms

export default function SessionTimeout() {
    const { data: session } = useSession();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            handleLogout();
        }, INACTIVITY_TIMEOUT);
    };

    const handleLogout = async () => {
        if (session) {
            toast.info("Session expired due to inactivity", {
                description: "You will be logged out automatically.",
                duration: 5000,
            });
            await signOut({ callbackUrl: "/login" });
        }
    };

    useEffect(() => {
        if (!session) return;

        // List of events that reset the timer
        const events = [
            "mousedown",
            "mousemove",
            "keydown",
            "scroll",
            "touchstart",
        ];

        // Initial timer
        resetTimer();

        // Add event listeners
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

        return () => {
            // Cleanup
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [session]);

    return null;
}
