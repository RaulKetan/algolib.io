import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  let supabase;
  try {
    supabase = await createClient();
  } catch (error) {
    console.error('Error creating supabase client for llms.txt:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
  
  // Fetch published algorithms
  const { data: algorithms, error } = await supabase
    .from('algorithms')
    .select('id, name, description, category, difficulty')
    .eq('published', true)
    .order('category', { ascending: true })
    .order('difficulty', { ascending: true });

  if (error) {
    console.error('Error fetching algorithms for llms.txt:', error);
    return new NextResponse('Error generating llms.txt', { status: 500 });
  }

  // Generate markdown content
  let markdown = `# Rulcode - Master Algorithms Visually\n\n`;
  markdown += `> Rulcode is an interactive, open-source educational platform designed to help developers master Data Structures and Algorithms (DSA). We provide visual animations, detailed explanations, and code snippets in multiple languages (Python, Java, C++, TypeScript) for over 200 coding interview problems.\n\n`;
  
  markdown += `## Algorithm Directory\n`;
  markdown += `Below is a categorized list of all our published algorithm visualizations and solutions.\n\n`;

  if (algorithms && algorithms.length > 0) {
    let currentCategory = '';
    
    for (const algo of algorithms) {
      const category = algo.category || 'Uncategorized';
      if (category !== currentCategory) {
        markdown += `### ${category}\n`;
        currentCategory = category;
      }
      
      const descSnippet = algo.description 
        ? (algo.description.length > 150 ? algo.description.substring(0, 150) + '...' : algo.description) 
        : `Learn about ${algo.name}`;
      
      // Remove linebreaks from description for single-line bullets
      const cleanDesc = descSnippet.replace(/\r?\n|\r/g, ' ').trim();
      
      markdown += `- [${algo.name}](https://rulcode.com/problem/${algo.id}): ${cleanDesc}\n`;
    }
  } else {
    markdown += `No algorithms currently published.\n`;
  }

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  });
}
