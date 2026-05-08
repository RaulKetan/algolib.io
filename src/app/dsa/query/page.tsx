import { Metadata } from 'next';
import { Suspense } from 'react';
import ProblemsClient from '../problems/ProblemsClient';

export const metadata: Metadata = {
  title: "Search Algorithm Problems - RulCode",
  description: "Filter and search through our comprehensive collection of algorithm problems by company, topic, or difficulty.",
};

export default function QueryPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Suspense fallback={<div className="p-8 animate-pulse text-center mt-20">Loading results...</div>}>
        <ProblemsClient />
      </Suspense>
    </div>
  );
}
