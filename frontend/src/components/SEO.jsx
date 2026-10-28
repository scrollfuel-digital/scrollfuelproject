import { useEffect } from "react";

const SITE_NAME = "ScrollFuel";
const SITE_URL = "https://scrollfuel.in";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo1.png`;

const setMeta = (attr, key, value) => {
    if (!value) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
};

const setCanonical = (href) => {
    if (!href) return;
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
};

const toAbsolute = (url) => {
    if (!url) return DEFAULT_IMAGE;
    try { return new URL(url, SITE_URL).href; } catch { return DEFAULT_IMAGE; }
};

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
    const canonicalUrl = toAbsolute(canonical);
    const imageUrl = toAbsolute(image);

    useEffect(() => {
        if (title) document.title = title;

        setMeta("name", "description", description);
        setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");

        setMeta("property", "og:type", type);
        setMeta("property", "og:site_name", SITE_NAME);
        setMeta("property", "og:locale", "en_IN");
        setMeta("property", "og:title", title || SITE_NAME);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", canonicalUrl);
        setMeta("property", "og:image", imageUrl);
        setMeta("property", "og:image:alt", title || SITE_NAME);

        setMeta("name", "twitter:card", "summary_large_image");
        setMeta("name", "twitter:title", title || SITE_NAME);
        setMeta("name", "twitter:description", description);
        setMeta("name", "twitter:image", imageUrl);
        setMeta("name", "twitter:image:alt", title || SITE_NAME);

        setCanonical(canonicalUrl);

        if (type === "article") {
            setMeta("property", "article:published_time", publishedTime);
            setMeta("property", "article:modified_time", modifiedTime);
            setMeta("property", "article:author", author);
        }
    }, [title, description, canonicalUrl, imageUrl, type, noIndex, publishedTime, modifiedTime, author]);

    return null;
};

export default SEO;
