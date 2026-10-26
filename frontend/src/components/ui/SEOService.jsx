
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoServiceByPath } from "../../data/seoService.js";

const SITE_URL = "https://scrollfuel.in";

const setMetaTag = (attribute, key, content) => {
    if (!content) return;

    let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
    );

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
};

const setCanonical = (href) => {
    let element = document.head.querySelector('link[rel="canonical"]');

    if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        document.head.appendChild(element);
    }

    element.setAttribute("href", href);
};

const SEOService = () => {
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname || "/";
        const seo = getSeoServiceByPath(pathname);

        if (!seo) {
            // Avoid leaving metadata from the previous route on an unknown route.
            document.title = "ScrollFuel | Digital Marketing Agency";
            setMetaTag(
                "name",
                "description",
                "Explore digital marketing, SEO, PPC, content marketing and creative services from ScrollFuel."
            );
            setCanonical(`${SITE_URL}${pathname === "/" ? "/" : pathname}`);
            return;
        }

        document.title = seo.title;

        setMetaTag("name", "description", seo.description);
        setMetaTag("name", "robots", "index, follow");

        setMetaTag("property", "og:title", seo.title);
        setMetaTag("property", "og:description", seo.description);
        setMetaTag("property", "og:type", "website");
        setMetaTag("property", "og:url", seo.canonical);
        setMetaTag("property", "og:site_name", "ScrollFuel");

        setMetaTag("name", "twitter:card", "summary");
        setMetaTag("name", "twitter:title", seo.title);
        setMetaTag("name", "twitter:description", seo.description);

        setCanonical(seo.canonical);
    }, [location.pathname]);

    return null;
};

export default SEOService;
