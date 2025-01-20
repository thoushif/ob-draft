import Navbar from "@/components/Navbar";
import React from "react";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <div className="fixed inset-0 flex flex-col-reverse md:flex-row">
            <Navbar />
            {children}
        </div>
    );
}

export default AuthenticatedLayout;
