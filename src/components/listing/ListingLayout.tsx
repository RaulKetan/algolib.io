import { ReactNode, useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { ProblemHero } from "./ProblemHero";
import { ProblemSidebarFilters } from "./ProblemSidebarFilters";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Search, ListFilter } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface ListingLayoutProps {
    title: string;
    description: string;
    searchQuery: string;
    onSearchChange: (val: string) => void;
    sortBy: string;
    onSortChange: (val: string) => void;
    selectedTopics: string[];
    onTopicToggle: (topic: string) => void;
    topics?: string[];
    selectedCompanies: string[];
    onCompanyToggle: (company: string) => void;
    companies?: string[];
    selectedDifficulties: string[];
    onDifficultyToggle: (difficulty: string) => void;
    showRecommendation?: boolean;
    showCategoryToggle?: boolean;
    isCategoryWise?: boolean;
    onCategoryWiseChange?: (value: boolean) => void;
    children: ReactNode;
    stats?: {
        count: number;
        hours?: number;
    };
    progressWidget?: ReactNode;
    stickyHeaderSlot?: ReactNode;
    icon?: any;
}

interface FilterContentProps {
    selectedTopics: string[];
    onTopicToggle: (topic: string) => void;
    topics?: string[];
    selectedCompanies: string[];
    onCompanyToggle: (company: string) => void;
    companies?: string[];
    selectedDifficulties: string[];
    onDifficultyToggle: (difficulty: string) => void;
}

const FilterContent = ({
    selectedTopics,
    onTopicToggle,
    topics,
    selectedCompanies,
    onCompanyToggle,
    companies,
    selectedDifficulties,
    onDifficultyToggle
}: FilterContentProps) => (
    <div className="space-y-8 h-fit pb-12">
        <div className="space-y-1 xl-listing:block hidden">
            <h2 className="text-lg font-medium">Filters</h2>
            <p className="text-md text-muted-foreground">Narrow down by topic or difficulty</p>
        </div>

        <ProblemSidebarFilters
            selectedTopics={selectedTopics}
            onTopicToggle={onTopicToggle}
            topics={topics}
            selectedCompanies={selectedCompanies}
            onCompanyToggle={onCompanyToggle}
            companies={companies}
            selectedDifficulties={selectedDifficulties}
            onDifficultyToggle={onDifficultyToggle}
        />
    </div>
);

export const ListingLayout = ({
    title,
    description,
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    selectedTopics,
    onTopicToggle,
    topics,
    selectedCompanies,
    onCompanyToggle,
    companies,
    selectedDifficulties,
    onDifficultyToggle,
    showRecommendation,
    showCategoryToggle,
    isCategoryWise,
    onCategoryWiseChange,
    children,
    stats,
    progressWidget,
    stickyHeaderSlot,
    icon
}: ListingLayoutProps) => {
    const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

    const filterProps = {
        selectedTopics,
        onTopicToggle,
        topics,
        selectedCompanies,
        onCompanyToggle,
        companies,
        selectedDifficulties,
        onDifficultyToggle
    };

    return (
        <SidebarLayout>
            <div className="min-h-screen bg-background flex flex-col min-w-0">
                <main className="flex-1 w-full max-w-[1600px] mx-auto px-2 sm:px-4 py-8 md:py-12">
                    <div className="flex flex-col xl-listing:flex-row gap-8 xl-listing:gap-12 justify-center">
                        {/* Main Content */}
                        <div className="w-full min-w-0 max-w-[820px] mx-auto xl-listing:mx-0">
                            <ProblemHero
                                title={title}
                                description={description}
                                showRecommendation={showRecommendation}
                                icon={icon}
                            />

                            <div className="space-y-6">
                                {progressWidget && (
                                    <div className="w-full max-w-[300px]">
                                        {progressWidget}
                                    </div>
                                )}

                                {stickyHeaderSlot && (
                                    <div className="sticky top-[48px] z-30 bg-background/95 backdrop-blur-sm -mx-2 px-2 py-3 mb-2">
                                        {stickyHeaderSlot}
                                    </div>
                                )}

                                <div className="rounded-xl border border-border/40 bg-card shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5 space-y-4">
                                    {/* Search & Sort Row */}
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                                        <div className="relative flex-1 group">
                                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
                                            <Input
                                                type="text"
                                                placeholder="Search within this list of questions"
                                                value={searchQuery}
                                                onChange={(e) => onSearchChange(e.target.value)}
                                                className="pl-11 h-11 sm:h-12 text-sm sm:text-base bg-background border-border/60 rounded-xl shadow-sm focus-visible:ring-primary/20 focus-visible:border-primary/40 transition-all"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-4">
                                            <Select value={sortBy} onValueChange={onSortChange}>
                                                <SelectTrigger className="flex-1 sm:w-[160px] h-11 sm:h-12 rounded-xl bg-background border-border/60 shadow-sm font-medium hover:border-primary/40 transition-all">
                                                    <div className="flex items-center gap-2">
                                                        <ListFilter className="w-4 h-4 text-muted-foreground" />
                                                        <SelectValue placeholder="Sort by" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent align="end" className="rounded-xl border-border/60">
                                                    <SelectItem value="serial-asc">Serial No ↑</SelectItem>
                                                    <SelectItem value="serial-desc">Serial No ↓</SelectItem>
                                                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                                                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                                                    <SelectItem value="difficulty-asc">Easy → Hard</SelectItem>
                                                    <SelectItem value="difficulty-desc">Hard → Easy</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <div className="xl-listing:hidden flex items-center">
                                                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                                                    <SheetTrigger asChild>
                                                        <Button variant="outline" size="icon" className="h-11 sm:h-12 w-11 sm:w-12 rounded-xl border-border/60 bg-background shadow-sm shrink-0">
                                                            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
                                                        </Button>
                                                    </SheetTrigger>
                                                    <SheetContent side="right" className="w-full sm:w-[540px] p-0 flex flex-col h-full border-l border-border/40 shadow-2xl">
                                                        <SheetHeader className="p-6 border-b border-border/50 shrink-0">
                                                            <SheetTitle className="text-xl font-medium tracking-tight">Filters</SheetTitle>
                                                        </SheetHeader>

                                                        <ScrollArea className="flex-1">
                                                            <div className="p-6">
                                                                <FilterContent {...filterProps} />
                                                            </div>
                                                        </ScrollArea>

                                                        <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm flex items-center gap-3 shrink-0">
                                                            <Button
                                                                variant="outline"
                                                                className="flex-1 rounded-xl h-11 font-medium border-border/60 hover:bg-muted/50"
                                                                onClick={() => {
                                                                    onTopicToggle('CLEAR_ALL');
                                                                    onCompanyToggle('CLEAR_ALL');
                                                                    onDifficultyToggle('CLEAR_ALL');
                                                                }}
                                                            >
                                                                Clear all
                                                            </Button>
                                                            <Button
                                                                className="flex-1 rounded-xl h-11 bg-[#dfff5e] hover:bg-[#dfff5e]/90 text-black font-bold shadow-[0_4px_12px_rgba(223,255,94,0.3)] transition-all active:scale-[0.98]"
                                                                onClick={() => setIsFilterSheetOpen(false)}
                                                            >
                                                                Apply
                                                            </Button>
                                                        </div>
                                                    </SheetContent>
                                                </Sheet>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    {(stats || showCategoryToggle) && (
                                        <div className="h-[1px] bg-border/20 w-full" />
                                    )}

                                    {/* Category-wise Toggle & Stats Row */}
                                    {(stats || showCategoryToggle) && (
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            {showCategoryToggle && (
                                                <div className="flex items-center justify-between gap-4 h-11 sm:h-12 px-4 rounded-xl bg-background border border-border/60 shadow-sm transition-all w-full sm:w-fit shrink-0">
                                                    <label htmlFor="category-mode" className="text-xs sm:text-sm font-semibold text-foreground/80 tracking-tight cursor-pointer select-none whitespace-nowrap">
                                                        Category-wise
                                                    </label>
                                                    <Switch
                                                        id="category-mode"
                                                        checked={isCategoryWise}
                                                        onCheckedChange={onCategoryWiseChange}
                                                        className="scale-90 data-[state=checked]:bg-[#84cc16] data-[state=checked]:border-[#84cc16] shrink-0"
                                                    />
                                                </div>
                                            )}
                                            {stats && (
                                                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-muted-foreground/70 sm:ml-auto">
                                                    <div className="flex items-center gap-2 bg-muted/40 dark:bg-muted/10 px-3 py-1.5 rounded-lg border border-border/20">
                                                        <svg className="w-4 h-4 text-muted-foreground/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                        </svg>
                                                        <span>
                                                            <strong className="text-foreground font-semibold">{stats.count}</strong> questions
                                                        </span>
                                                    </div>
                                                    {stats.hours && (
                                                        <div className="flex items-center gap-2 bg-muted/40 dark:bg-muted/10 px-3 py-1.5 rounded-lg border border-border/20">
                                                            <svg className="w-4 h-4 text-muted-foreground/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            <span>
                                                                <strong className="text-foreground font-semibold">{stats.hours}</strong> hours total
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col gap-0 min-w-0">
                                    {children}
                                </div>
                            </div>
                        </div>

                        {/* Sticky Sidebar Filters - Desktop Only */}
                        <aside className="hidden xl-listing:block xl-listing:w-80 shrink-0">
                            <div className="sticky top-[80px]">
                                <ScrollArea className="h-[calc(100vh-120px)] pr-4 -mr-4">
                                    <FilterContent {...filterProps} />
                                </ScrollArea>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </SidebarLayout>
    );
};
