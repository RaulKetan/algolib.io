import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guidesData } from '@/data/guidesData';
import TimeComplexityClient from './TimeComplexityClient';

export async function generateMetadata(): Promise<Metadata> {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "time-complexity");
  
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
      url: `https://rulcode.com/guides/time-complexity`,
    },
  };
}

export default async function TimeComplexityPage() {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "time-complexity");

  if (!guide) {
    notFound();
  }

  return <TimeComplexityClient />;
}
