import { ReactNode } from "react";
import { SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

import { Crown, MenuIcon, Rocket } from "lucide-react";

import { useApp } from "@/contexts/AppContext";
import UserMenu from "./UserMenu";
import { GlobalDunningBanner } from "./GlobalDunningBanner";
import logo from "@/assets/logo.svg";

interface SidebarLayoutProps {
    children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
    const pathname = usePathname();
    const isDsaRoute = pathname?.startsWith('/dsa/');
    const { hasPremiumAccess } = useApp();
    const { setOpenMobile } = useSidebar();

    return (
        <SidebarInset>
            <GlobalDunningBanner />
            <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/50 bg-background/80 backdrop-blur-md px-4 md:px-6 w-full sticky top-0 z-50 overflow-x-hidden">
                <div className="flex items-center gap-3">
                    {!isDsaRoute && (
                        <SidebarTrigger className="-ml-1" />
                    )}

                    {isDsaRoute && (
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity md:hidden">
                            <img src={typeof logo === 'string' ? logo : (logo as any).src} alt="RulCode Logo" className="w-5 h-5" />
                            <span className="font-bold text-base tracking-tight">rulcode</span>
                        </Link>
                    )}
                </div>

                <div className="flex-1 w-full flex justify-end items-center">
                    <div className="flex items-center gap-5">
                        {!isDsaRoute && (
                            <Link href="/dsa/get-started">
                                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground px-2">
                                    <Rocket className="w-3.5 h-3.5" />
                                    <span>Get started</span>
                                </Button>
                            </Link>
                        )}


                        {!hasPremiumAccess && (
                            <Link href="/pricing" className="text-[12px] font-normal text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                                Pricing
                            </Link>
                        )}

                        <ThemeToggle />
                        <UserMenu />

                        {isDsaRoute && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden h-8 w-8 ml-1"
                                onClick={() => setOpenMobile(true)}
                            >
                                <MenuIcon className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 min-h-[calc(100vh-48px)] min-w-0">
                {children}
            </div>
        </SidebarInset>
    );
}
