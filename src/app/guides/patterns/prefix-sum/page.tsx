import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guidesData } from '@/data/guidesData';
import GuidesClient from '@/app/guides/GuidesClient';

export async function generateMetadata(): Promise<Metadata> {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "prefix-sum");
  
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
      url: `https://rulcode.com/guides/patterns/prefix-sum`,
    },
  };
}

export default async function PrefixSumPage() {
  const guide = guidesData.flatMap((c) => c.guides).find((g) => g.slug === "prefix-sum");

  if (!guide) {
    notFound();
  }

  return <GuidesClient guide={guide} />;
}
