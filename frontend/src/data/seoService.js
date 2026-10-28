
import { servicesData } from "./servicesData.js";
import { serviceSEO, pageSEO } from "./seoData.js";

const SITE_URL = "https://scrollfuel.in";

const generalServiceKeys = {
    seoPpc: "seoPpc",
    contentMarketing: "contentMarketing",
    socialMedia: "socialMedia",
    websiteDevelopment: "websiteDevelopment",
    branding: "branding",
    videography: "videography",
};

const normalizePath = (pathname = "/") => {
    const pathOnly = pathname.split("?")[0].split("#")[0];
    if (!pathOnly || pathOnly === "/") return "/";
    return `/${pathOnly.split("/").filter(Boolean).join("/")}/`;
};

const normalizeSEO = (data, fallbackPath = "/") => ({
    h1: data?.h1 || data?.title || "ScrollFuel",
    title: data?.title || "Digital Marketing Services | ScrollFuel",
    description:
        data?.description ||
        "Explore digital marketing services from ScrollFuel.",
    primaryKeyword: data?.primaryKeyword || data?.h1 || data?.title || "",
    canonical:
        data?.canonical ||
        `${SITE_URL}${normalizePath(fallbackPath)}`,
});

export const seoService = {
    general: Object.fromEntries(
        Object.entries(generalServiceKeys).map(([key, dataKey]) => {
            const service = servicesData[dataKey];
            return [
                key,
                normalizeSEO(service, service?.path || "/"),
            ];
        })
    ),

    nagpur: Object.fromEntries(
        Object.entries(serviceSEO).map(([slug, data]) => [
            slug,
            normalizeSEO(data),
        ])
    ),

    pages: Object.fromEntries(
        Object.entries(pageSEO).map(([key, data]) => [
            key,
            normalizeSEO(data),
        ])
    ),
};

export const getSeoService = (identifier) => {
    if (!identifier) return null;

    if (seoService.general[identifier]) {
        return seoService.general[identifier];
    }

    if (seoService.nagpur[identifier]) {
        return seoService.nagpur[identifier];
    }

    if (seoService.pages[identifier]) {
        return seoService.pages[identifier];
    }

    return null;
};


export const getSeoServiceByPath = (pathname = "/") => {
    const currentPath = normalizePath(pathname);

    // 1. Global service pages
    for (const [key, dataKey] of Object.entries(generalServiceKeys)) {
        const service = servicesData[dataKey];

        if (
            service?.path &&
            normalizePath(service.path) === currentPath
        ) {
            return seoService.general[key];
        }
    }

    // 2. Nagpur-specific service pages
    for (const [slug, data] of Object.entries(seoService.nagpur)) {
        const expectedPath = `/services/${slug}/`;

        if (currentPath === normalizePath(expectedPath)) {
            return data;
        }
    }

    // 3. Other pages (home, about, blog, etc.)
    for (const data of Object.values(seoService.pages)) {
        if (
            data.canonical &&
            normalizePath(new URL(data.canonical).pathname) === currentPath
        ) {
            return data;
        }
    }

    return null;
};

