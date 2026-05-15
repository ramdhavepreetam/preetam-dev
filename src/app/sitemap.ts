import { MetadataRoute } from 'next';
import { projects } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://preetamr.com';

  const routes = [
    '',
    '/about',
    '/deployments',
    '/writing',
    '/playbook',
    '/now',
    '/speaking',
    '/contact',
    '/ai',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/deployments/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
