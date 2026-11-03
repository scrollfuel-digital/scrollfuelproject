
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "ScrollFuel";
const SITE_URL = "https://scrollfuel.in";

const DEFAULT_TITLE =
    "Best Digital Marketing Agency in Nagpur | ScrollFuel";

const DEFAULT_DESCRIPTION =
    "ScrollFuel is a digital marketing agency in Nagpur offering SEO, PPC, social media marketing, branding and website development services.";

const DEFAULT_KEYWORDS =
    "digital marketing agency Nagpur, SEO services Nagpur, social media marketing Nagpur, PPC agency Nagpur, branding agency Nagpur, web development Nagpur, ScrollFuel";

const DEFAULT_IMAGE =
    `${SITE_URL}/assets/logo1.png`;

// Create or update meta tags
const setMeta = (attribute, key, value) => {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return;
    }

    let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
    );

    if (!element) {
        element = document.createElement("meta");

        element.setAttribute(attribute, key);

        document.head.appendChild(element);
    }

    element.setAttribute("content", value);
};

// Remove metadata
const removeMeta = (attribute, key) => {
    document.head.querySelector(
        `meta[${attribute}="${key}"]`
    )?.remove();
};

// Create or update canonical URL
const setCanonical = (href) => {
    let element = document.head.querySelector(
        'link[rel="canonical"]'
    );

    if (!element) {
        element = document.createElement("link");

        element.setAttribute("rel", "canonical");

        document.head.appendChild(element);
    }

    element.setAttribute("href", href);
};

// Convert relative image URL into absolute URL
const toAbsolute = (url, fallback) => {
    try {
        return new URL(url || fallback, SITE_URL).href;
    } catch {
        return fallback;
    }
};

// Normalize canonical URL
const getCanonical = (canonical, pathname) => {
    const pagePath = canonical || pathname;

    const url = new URL(pagePath, SITE_URL);

    // Remove query parameters and hash
    url.search = "";
    url.hash = "";

    // Add trailing slash
    if (
        url.pathname !== "/" &&
        !url.pathname.endsWith("/")
    ) {
        url.pathname += "/";
    }

    return url.href;
};

const SEO = ({
    title = DEFAULT_TITLE,

    description = DEFAULT_DESCRIPTION,

    keywords = DEFAULT_KEYWORDS,

    canonical,

    image = DEFAULT_IMAGE,

    type = "website",

    publishedTime,

    modifiedTime,

    author,

    noIndex = false,
}) => {
    const location = useLocation();

    useEffect(() => {
        const canonicalUrl = getCanonical(
            canonical,
            location.pathname
        );

        const imageUrl = toAbsolute(
            image,
            DEFAULT_IMAGE
        );

        // ====================================
        // PAGE TITLE
        // ====================================

        document.title = title;

        // ====================================
        // BASIC SEO META TAGS
        // ====================================

        setMeta(
            "name",
            "title",
            title
        );

        setMeta(
            "name",
            "description",
            description
        );

        setMeta(
            "name",
            "keywords",
            keywords
        );

        setMeta(
            "name",
            "robots",
            noIndex
                ? "noindex, nofollow"
                : "index, follow, max-image-preview:large"
        );

        // ====================================
        // OPEN GRAPH META TAGS
        // ====================================

        setMeta(
            "property",
            "og:type",
            type
        );

        setMeta(
            "property",
            "og:site_name",
            SITE_NAME
        );

        setMeta(
            "property",
            "og:locale",
            "en_IN"
        );

        setMeta(
            "property",
            "og:title",
            title
        );

        setMeta(
            "property",
            "og:description",
            description
        );

        setMeta(
            "property",
            "og:url",
            canonicalUrl
        );

        setMeta(
            "property",
            "og:image",
            imageUrl
        );

        setMeta(
            "property",
            "og:image:width",
            "1200"
        );

        setMeta(
            "property",
            "og:image:height",
            "630"
        );

        setMeta(
            "property",
            "og:image:alt",
            title
        );

        // ====================================
        // TWITTER META TAGS
        // ====================================

        setMeta(
            "name",
            "twitter:card",
            "summary_large_image"
        );

        setMeta(
            "name",
            "twitter:title",
            title
        );

        setMeta(
            "name",
            "twitter:description",
            description
        );

        setMeta(
            "name",
            "twitter:image",
            imageUrl
        );

        setMeta(
            "name",
            "twitter:image:alt",
            title
        );

        // ====================================
        // CANONICAL URL
        // ====================================

        setCanonical(canonicalUrl);

        // ====================================
        // BLOG ARTICLE META TAGS
        // ====================================

        if (type === "article") {
            setMeta(
                "property",
                "article:published_time",
                publishedTime
            );

            setMeta(
                "property",
                "article:modified_time",
                modifiedTime
            );

            setMeta(
                "property",
                "article:author",
                author
            );
        } else {
            removeMeta(
                "property",
                "article:published_time"
            );

            removeMeta(
                "property",
                "article:modified_time"
            );

            removeMeta(
                "property",
                "article:author"
            );
        }

    }, [
        title,
        description,
        keywords,
        canonical,
        image,
        type,
        noIndex,
        publishedTime,
        modifiedTime,
        author,
        location.pathname,
    ]);

    return null;
};

export default SEO;
