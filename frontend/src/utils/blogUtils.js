export const API = import.meta.env.VITE_API_URL || "";

export const createSlug = (title = "") =>
    title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-");

export const blogSlug = (blog) => blog?.slug || createSlug(blog?.title);

/**
 * Ask Cloudinary for a resized, auto-format (webp/avif), auto-quality image.
 * Non-Cloudinary URLs are returned unchanged.
 */
export const optimizeImage = (url, width = 800) => {
    if (!url) return url;
    if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
    if (/\/upload\/[^/]*(f_auto|q_auto|w_\d+)/.test(url)) return url;
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

export const getImageUrl = (img, width = 800) => {
    if (!img) return "/assets/blog.jpeg";
    const full = img.startsWith("http") ? img : `${API}${img}`;
    return optimizeImage(full, width);
};

/* ------------------------------------------------------------------ */
/* Tiny client cache so navigating list <-> detail is instant          */
/* ------------------------------------------------------------------ */

const TTL = 60 * 1000;

let listCache = null; // { t, data }
let listPromise = null;
const detailCache = new Map(); // slug -> { t, data }
const detailPromises = new Map();

export const getCachedBlogList = () => (listCache ? listCache.data : null);

export const fetchBlogList = () => {
    if (listCache && Date.now() - listCache.t < TTL) {
        return Promise.resolve(listCache.data);
    }
    if (listPromise) return listPromise;

    listPromise = fetch(`${API}/api/blog`)
        .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
            return res.json();
        })
        .then((json) => {
            const data = Array.isArray(json?.data) ? json.data : [];
            listCache = { t: Date.now(), data };
            return data;
        })
        .finally(() => {
            listPromise = null;
        });

    return listPromise;
};

export const getCachedBlog = (slug) => detailCache.get(slug)?.data || null;

export const fetchBlogBySlug = (slug) => {
    const cached = detailCache.get(slug);
    if (cached && Date.now() - cached.t < TTL) return Promise.resolve(cached.data);
    if (detailPromises.has(slug)) return detailPromises.get(slug);

    const p = fetch(`${API}/api/blog/slug/${encodeURIComponent(slug)}`)
        .then(async (res) => {
            if (res.status === 404) return null;
            if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);
            const json = await res.json();
            const data = { blog: json.data, related: json.related || [] };
            detailCache.set(slug, { t: Date.now(), data });
            return data;
        })
        .finally(() => {
            detailPromises.delete(slug);
        });

    detailPromises.set(slug, p);
    return p;
};

// Prefetch is intentionally DISABLED: hovering cards was firing a request per
// card (and per cloned slider card), flooding the Network tab.
// Now only the post you actually open is requested, once.
// (Kept as a no-op so existing onMouseEnter/onTouchStart calls don't break;
//  you can delete those handlers later.)
export const prefetchBlog = () => { };