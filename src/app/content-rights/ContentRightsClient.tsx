'use client';
import dynamic from 'next/dynamic';
const ContentRights = dynamic(() => import('@/pages/ContentRights'), { ssr: false });
export default function ContentRightsClient() { return <ContentRights />; }
