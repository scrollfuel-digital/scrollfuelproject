
import { Helmet } from "react-helmet-async";

const SITE_NAME = "ScrollFuel";
const SITE_URL = "https://scrollfuel.in";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo1.png`;

const SEO = ({
    title,
    description,
    canonical,
    image = DEFAULT_IMAGE,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
}) => {
    const absoluteUrl = (url) => {
        if (!url) return undefined;

        try {
            return new URL(url, SITE_URL).href;
        } catch {
            return undefined;
        }
    };

    const canonicalUrl = absoluteUrl(canonical);
    const imageUrl = absoluteUrl(image) || DEFAULT_IMAGE;

    return (
        <Helmet>
            <title>{title}</title>

            {description && (
                <meta name="description" content={description} />
            )}

            {canonicalUrl && (
                <link rel="canonical" href={canonicalUrl} />
            )}

            <meta
                name="robots"
                content={
                    noIndex
                        ? "noindex, nofollow"
                        : "index, follow, max-image-preview:large"
                }
            />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:title" content={title || SITE_NAME} />

            {description && (
                <meta property="og:description" content={description} />
            )}

            {canonicalUrl && (
                <meta property="og:url" content={canonicalUrl} />
            )}

            <meta property="og:image" content={imageUrl} />
            <meta property="og:image:alt" content={title || SITE_NAME} />

            {/* Twitter / X */}
            <meta
                name="twitter:card"
                content="summary_large_image"
            />
            <meta name="twitter:title" content={title || SITE_NAME} />

            {description && (
                <meta name="twitter:description" content={description} />
            )}

            <meta name="twitter:image" content={imageUrl} />
            <meta name="twitter:image:alt" content={title || SITE_NAME} />

            {/* Article metadata */}
            {type === "article" && publishedTime && (
                <meta
                    property="article:published_time"
                    content={publishedTime}
                />
            )}

            {type === "article" && modifiedTime && (
                <meta
                    property="article:modified_time"
                    content={modifiedTime}
                />
            )}

            {type === "article" && author && (
                <meta property="article:author" content={author} />
            )}
        </Helmet>
    );
};

export default SEO;
