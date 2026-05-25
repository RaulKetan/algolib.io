import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guidesData } from '@/data/guidesData';
import SpaceComplexityClient from './SpaceComplexityClient';

export async function generateMetadata(): Promise<Metadata> {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "space-complexity");
  
  if (!guide) {
    return {
      title: 'Guide Not Found | RulCode',
    };
  }

  return {
    title: `${guide.title} - DSA Guide | RulCode`,
    description: guide.description,
    openGraph: {
      title: `${guide.title} - DSA Guide | RulCode`,
      description: guide.description,
      url: `https://rulcode.com/guides/space-complexity`,
    },
  };
}

export default async function SpaceComplexityPage() {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "space-complexity");

  if (!guide) {
    notFound();
  }

  return <SpaceComplexityClient />;
}
