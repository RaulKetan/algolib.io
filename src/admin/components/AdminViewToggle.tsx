"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { User, ShieldCheck } from 'lucide-react';

const AdminViewToggle = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { profile } = useApp();

    const isAdmin = profile?.role === 'admin';

    if (!isAdmin) {
        return null;
    }

    const isAdminPage = pathname.startsWith('/admin');

    const toggleMode = () => {
        if (isAdminPage) {
            // For problem pages, try to go to the equivalent user page
            if (pathname.startsWith('/admin/problem/')) {
                const problemId = pathname.split('/').pop();
                if (problemId && problemId !== 'new') {
                    router.push(`/problem/${problemId}`);
                    return;
                }
            }
            // Otherwise, go to user home
            router.push('/');
        } else {
            // For problem pages, try to go to the equivalent admin page
            if (pathname.startsWith('/problem/')) {
                const problemId = pathname.split('/').pop();
                if (problemId) {
                    router.push(`/admin/problem/${problemId}`);
                    return;
                }
            }
            // Otherwise, go to admin dashboard
            router.push('/admin');
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[100] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
                variant="outline"
                size="icon"
                onClick={toggleMode}
                className="w-12 h-12 rounded-full shadow-2xl bg-background/80 backdrop-blur-md border border-border hover:bg-accent transition-all"
                title={isAdminPage ? "Switch to User View" : "Switch to Admin View"}
            >
                {isAdminPage ? (
                    <User className="w-5 h-5 text-primary" />
                ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                )}
            </Button>
        </div>
    );
};

export default AdminViewToggle;
