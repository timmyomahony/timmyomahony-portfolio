import type { Metadata } from "next";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/index.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import config from "@/../portfolio.config";

import {
  Inter,
  Noto_Serif_JP,
  Overpass,
  IBM_Plex_Mono,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
});

const noto_serif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto_serif",
  weight: ["400", "500", "700"],
});

const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  weight: ["400", "500", "600", "700"],
});

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["400", "500", "600", "700"],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${inter.variable} ${noto_serif.variable} ${overpass.variable} ${ibm.variable} m-0 h-full w-full bg-beige p-0 font-inter text-black selection:bg-ruby selection:text-beige`}
      >
        {children}
        {process.env.NODE_ENV === "production" &&
          process.env.FATHOM_SITE_ID && (
            <script
              src="https://cdn.usefathom.com/script.js"
              data-site={process.env.FATHOM_SITE_ID}
              defer
            ></script>
          )}
        {process.env.NODE_ENV === "development" && (
          <div className="type-0 fixed bottom-0 left-0 bg-black p-1 text-white">
            <div className="sm:hidden">none</div>
            <div className="hidden sm:block md:hidden">sm</div>
            <div className="hidden md:block lg:hidden">md</div>
            <div className="hidden lg:block xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block">2xl</div>
          </div>
        )}
      </body>
      <SpeedInsights />
    </html>
  );
};

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
const generateMetadata = async () => {
  const metadata: Metadata = {
    metadataBase: new URL(config.url),
    title: {
      template: `%s | ${config.name}`,
      default: `${config.name} | Timmy O'Mahony`,
    },
    twitter: {
      card: "summary_large_image",
      title: config.byline,
      description: config.byline,
    },
    openGraph: {
      title: config.byline,
      description: config.byline,
      siteName: config.name,
      locale: "en-IE",
    },
    authors: [{ name: config.name, url: config.url }],
    creator: config.name,
  };

  return metadata;
};

export { generateMetadata };

export default RootLayout;
