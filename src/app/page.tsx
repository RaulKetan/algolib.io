import { Metadata } from 'next';
import HomeClient from './HomeClient';
import Script from 'next/script';
import { HeroSection } from '@/components/Home/sections/HeroSection';
import { InteractiveSandboxTeaser } from '@/components/Home/sections/InteractiveSandboxTeaser';
import { TopicRoadmapSection } from '@/components/Home/sections/TopicRoadmapSection';
import { SprintsAndTracksSection } from '@/components/Home/sections/SprintsAndTracksSection';
import { CraftingSection } from '@/components/Home/sections/CraftingSection';
import { CommunitySection } from '@/components/Home/sections/CommunitySection';
import { WorkspaceSection } from '@/components/Home/sections/WorkspaceSection';
import { ScratchpadSection } from '@/components/Home/sections/ScratchpadSection';
import { FeedbackSection } from '@/components/Home/sections/FeedbackSection';
import { BottomCTA } from '@/components/Home/sections/BottomCTA';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Rulcode | Master Algorithms & Coding Interviews",
  description: "Accelerate your coding prep with interactive visualizations and multi-language solutions. Master Blind 75 and 200+ algorithms visually.",
  keywords: ["algorithms", "open source", "data structures", "competitive programming", "coding interviews", "algorithm visualization", "code snippets", "python", "java", "c++", "typescript", "Rulcode.com"],
  openGraph: {
    title: "Rulcode | Master Algorithms & Coding Interviews",
    description: "Accelerate your coding prep with interactive visualizations and multi-language solutions. Master Blind 75 and 200+ algorithms visually.",
    type: "website",
    url: "https://rulcode.com/",
    images: ["https://rulcode.com/og-image.png"],
    siteName: "rulcode.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rulcode_com",
    title: "Rulcode | Master Algorithms & Coding Interviews",
    description: "Accelerate your coding prep with interactive visualizations and multi-language solutions. Master Blind 75 and 200+ algorithms visually.",
    images: ["https://rulcode.com/og-image.png"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://rulcode.com/#website",
        "url": "https://rulcode.com",
        "name": "Rulcode",
        "description": "Interactive open-source algorithm library and visualization platform",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://rulcode.com/dsa/problems?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://rulcode.com/#organization",
        "name": "Rulcode",
        "url": "https://rulcode.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rulcode.com/android-chrome-512x512.png"
        },
        "sameAs": [
          "https://github.com/rkmahale17/rulcode.com"
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="json-ld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-black text-[#1A1A1A] dark:text-white overflow-x-hidden relative w-full">
        <HeroSection />
        <InteractiveSandboxTeaser />
        <SprintsAndTracksSection />
        <TopicRoadmapSection />
        <HomeClient type="platform-preview" />
        <WorkspaceSection />
        <ScratchpadSection />
        <FeedbackSection />
        <CommunitySection />
        <CraftingSection />
        <BottomCTA />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
