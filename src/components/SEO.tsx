import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = "website", 
  ogImage = "/og-image.png" 
}: SEOProps) {
  const siteName = "Twende Digital";
  const defaultTitle = "Engineering Excellence & Digital Innovation";
  const defaultDesc = "Twende Digital provides high-authority tech engineering, enterprise software innovation, and managed digital services for forward-thinking companies.";

  const displayTitle = title && title.trim() !== "" ? title : defaultTitle;
  const displayDesc = description && description.trim() !== "" ? description : defaultDesc;

  const fullTitle = displayTitle === siteName ? siteName : `${displayTitle} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={displayDesc} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={displayDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={displayDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#3b82f6" />
    </Helmet>
  );
}
