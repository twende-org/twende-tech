import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  ogType?: string;
  ogImage?: string;
  twendeDigital?: boolean;
}

const SEO = ({ 
  title, 
  description, 
  ogType = "website", 
  ogImage = "/og-image.png", 
  twendeDigital = true 
}: SEOProps) => {
  const siteTitle = "Twende Digital";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = "Premier Digital Engineering Firm in Tanzania. Build. Scale. Innovate Faster with Enterprise Innovation and Managed Tech Services.";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Standard Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
    </Helmet>
  );
};

export default SEO;
