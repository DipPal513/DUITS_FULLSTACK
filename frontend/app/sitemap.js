
// 1. Base URL of your website
const BASE_URL = 'https://duitsbd.org';

export default async function sitemap() {
  
  // 2. Define your static routes here
  const routes = [
    '',           // Homepage
    '/about',
    '/contact',
    '/events',
    '/gallery',
    '/notice',
    '/executives',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8, // Homepage is priority 1, others 0.8
  }));

  
  return [...routes];
}