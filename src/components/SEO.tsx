import { Helmet } from "react-helmet-async";
interface Props {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
  type: string;
  author: string;
  robots: string;
  canonical: string;
  siteName: string;
  twitterCard: string;
  twitterCreator: string;
  structuredData: string | null|any;
}

const SEO = ({
  title = "Naruto uzumaki",
  description = "Default description for the page.",
  keywords = "react, seo, website",
  image = "/default-og-image.jpg",
  url = "https://naruto-lovat-nine.vercel.app/",
  type = "website",
  author = "Your Brand",
  robots = "index, follow",
  canonical = "",
  siteName = "Your Website",
  twitterCard = "summary_large_image",
  twitterCreator = "@yourhandle",
  structuredData = null,
}: Props) => {
  const pageTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const canonicalUrl = canonical || url;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterCreator} />

      {/* Extra */}
      <meta name="theme-color" content="#ffffff" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
