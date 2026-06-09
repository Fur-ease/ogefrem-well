import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function WellLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    // Double check authorization
    if (session.user.department !== "WELL" && session.user.department !== "ADMIN") {
        redirect("/"); // Back to OGEFREM dashboard
    }

    return <>{children}</>;
}
