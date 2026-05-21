import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import ProblemDetailClient from './ProblemDetailClient';

interface ProblemPageProps {
  params: Promise<{ slug: string }>;
}

async function getAlgorithm(slug: string) {
  let client = supabase;
  try {
    const { createClient } = await import('@/utils/supabase/server');
    client = await createClient();
  } catch (e) {
    // Falls back to browser client during build / static parameter generation
  }

  const { data, error } = await client
    .from('algorithms')
    .select('*')
    .eq('id', slug) // Existing logic uses ID as slug
    .maybeSingle();

  if (error || !data) return null;

  // Enforce published check on server side.
  // RLS might filter it, but we add an explicit check to be extremely robust.
  if (data.published === false) {
    let isAdmin = false;
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabaseServer = await createClient();
      const { data: { user } } = await supabaseServer.auth.getUser();
      if (user) {
        const { data: profile } = await supabaseServer
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();
        if (profile?.role === 'admin') {
          isAdmin = true;
        }
      }
    } catch (e) {
      // Build time or failed session retrieval
    }

    if (!isAdmin) {
      return null;
    }
  }

  const metadata = data.metadata || {};
  const metadataObj = (typeof metadata === 'object' && metadata !== null ? metadata : {}) as Record<string, any>;
  
  return {
    ...data,
    ...metadataObj,
    metadata: data.metadata,
    slug: data.id, 
  };
}

export async function generateStaticParams() {
  let { data: algorithms, error } = await supabase
    .from('algorithms')
    .select('id')
    .eq('published', true);

  if (error) {
    console.warn('Failed to query static parameters with published = true, falling back to selecting all:', error.message);
    const { data: fallbackAlgos } = await supabase
      .from('algorithms')
      .select('id');
    algorithms = fallbackAlgos;
  }

  if (!algorithms) return [];

  return algorithms.map((algo) => ({
    slug: algo.id,
  }));
}

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const algorithm = await getAlgorithm(slug);

  if (!algorithm) {
    return {
      title: 'Problem Not Found | Rulcode',
    };
  }

  return {
    title: `${algorithm.name} - Algorithm Visualization & Solution | Rulcode`,
    description: algorithm.description || `Learn and visualize ${algorithm.name} with interactive examples and code solutions.`,
    keywords: `${algorithm.category || ''}, algorithms, ${algorithm.name}, coding interview, visualization`,
    openGraph: {
      title: `${algorithm.name} | Rulcode`,
      description: algorithm.description,
      images: [algorithm.image || 'https://rulcode.com/og-image.png'],
    },
  };
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params;
  const algorithm = await getAlgorithm(slug);

  if (!algorithm) {
    notFound();
  }

  return (
    <ProblemDetailClient 
      initialAlgorithm={algorithm} 
      slug={slug} 
    />
  );
}
