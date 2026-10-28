import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoServiceByPath } from "../../data/seoService.js";

const SITE_URL = "https://scrollfuel.in";

const normalizePath = (pathname = "/") => {
    const pathOnly = pathname.split("?")[0].split("#")[0];
    if (!pathOnly || pathOnly === "/") return "/";
    return `/${pathOnly.split("/").filter(Boolean).join("/")}/`;
};

const setMetaTag = (attribute, key, content) => {
    if (!content) return;
    const selector = `meta[${attribute}="${key}"]`;
    const elements = document.head.querySelectorAll(selector);
    let element = elements[0];
    elements.forEach((item, index) => { if (index > 0) item.remove(); });
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.setAttribute("content", content);
};

const setCanonical = (href) => {
    if (!href) return;
    const elements = document.head.querySelectorAll('link[rel="canonical"]');
    let element = elements[0];
    elements.forEach((item, index) => { if (index > 0) item.remove(); });
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
        const pathname = normalizePath(location.pathname);

        // Skip — BlogDetails uses react-helmet-async for full SEO control
        if (pathname.startsWith("/blog/") && pathname !== "/blog/") return;

        const seo = getSeoServiceByPath(pathname);

        if (!seo) {
            document.title = "ScrollFuel | Digital Marketing Agency";

            setMetaTag(
                "name",
                "description",
                "Explore digital marketing, SEO, PPC, content marketing and creative services from ScrollFuel."
            );

            setMetaTag("name", "robots", "index, follow");

            setMetaTag(
                "property",
                "og:title",
                "ScrollFuel | Digital Marketing Agency"
            );

            setMetaTag(
                "property",
                "og:description",
                "Explore digital marketing, SEO, PPC, content marketing and creative services from ScrollFuel."
            );

            setMetaTag("property", "og:type", "website");
            setMetaTag("property", "og:url", `${SITE_URL}${pathname}`);
            setMetaTag("property", "og:site_name", "ScrollFuel");

            setMetaTag("name", "twitter:card", "summary");
            setMetaTag(
                "name",
                "twitter:title",
                "ScrollFuel | Digital Marketing Agency"
            );

            setMetaTag(
                "name",
                "twitter:description",
                "Explore digital marketing, SEO, PPC, content marketing and creative services from ScrollFuel."
            );

            setCanonical(`${SITE_URL}${pathname}`);

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
