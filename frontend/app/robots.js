
export default function robots() {
  return {
    rules: {
      userAgent: '*', 
      allow: '/',     
      disallow: [     
        '/admin/',
        '/dashboard/', 
        '/api/',      
        '/private/',
      ],
    },
    // This is crucial: Tell Google where your map is
    sitemap: 'https://duitsbd.org/sitemap.xml', 
  };
}