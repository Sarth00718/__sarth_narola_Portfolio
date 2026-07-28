import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Sora } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://sarth-narola.vercel.app'),
  title: 'Sarth Narola — Full Stack Developer & AI Engineer',
  description:
    'Portfolio of Sarth Narola — Full Stack Developer and AI Engineer. Building scalable AI-powered web applications with MERN, RAG pipelines, and modern AI frameworks.',
  keywords: [
    'Sarth Narola',
    'Full Stack Developer',
    'AI Engineer',
    'MERN',
    'RAG',
    'LangChain',
    'Nirma University',
    'Portfolio',
  ],
  authors: [{ name: 'Sarth Narola' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Sarth Narola — Full Stack Developer & AI Engineer',
    description:
      'Building scalable AI-powered web applications with MERN stack, RAG pipelines, and modern AI frameworks.',
    type: 'website',
    url: 'https://sarth-narola.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarth Narola — Full Stack Developer & AI Engineer',
    description:
      'Building scalable AI-powered web applications with MERN stack, RAG pipelines, and modern AI frameworks.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${sora.variable}`}>
      <body className="bg-[#050816] text-white antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
