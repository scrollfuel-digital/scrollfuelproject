
import { chromium } from "playwright";
import sparticuzChromium from "@sparticuz/chromium";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const PORT = 4173;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

const SITE_URL = "https://scrollfuel.in";

const DEFAULT_TITLE =
    "Best Digital Marketing Agency in Nagpur | ScrollFuel";

const distPath = path.resolve("dist");

const routes = [
    "/",
    "/about-us/",
    "/blog/",
    "/services/",

    // Individual blog detail pages
    "/blog/why-does-my-website-rank-in-google-but-not-appear-in-ai-search-results/",
    "/blog/how-much-does-website-development-cost-for-a-small-business-in-india/",
    "/blog/digital-marketing-for-clinics-and-doctors-in-nagpur/",
    "/blog/free-google-business-profile-checklist-for-nagpur-businesses/",
    "/blog/how-google-business-profile-helps-real-estate-get-enquiries/",
    "/blog/real-estate-digital-marketing-in-nagpur-a-practical-guide-for-builders/",
    "/blog/how-to-choose-the-best-digital-marketing-agency-in-nagpur/",
    "/blog/how-to-improve-google-maps-ranking-in-nagpur/",
    "/blog/how-seo-helps-real-estate-builders-get-more-leads/",
    "/blog/personal-branding-on-social-media-to-win-more-clients/",
    "/blog/how-to-scale-your-business-faster-with-digital-marketing-in-2026/",
    "/blog/ai-in-digital-marketing-enhancing-creativity-not-replacing-it/",
    "/blog/content-marketing-strategy-that-works-in-2026-beyond-keywords/",
    "/blog/how-to-rank-on-google-even-without-website-clicks/",
    "/blog/how-to-combine-seo-and-affiliate-marketing-strategy/",
    "/blog/how-to-rank-in-google-ai-overviews/",
    "/blog/the-technical-seo-checklist-for-search-engines-and-ai-search/",
    "/blog/how-a-modern-website-redesign-can-increase-leads-by-2x-2026-guide/",
    "/blog/how-personal-branding-on-social-media-can-help-you-win-more-clients/",
    "/blog/google-ads-vs-meta-ads-which-is-better-for-your-business/",

    // Portfolio
    "/portfolio/",

    // Career and contact
    "/career/",
    "/connect-with-us/",

    // Nagpur service pages
    "/services/seo-ppc-service-in-nagpur/",
    "/services/social-media-marketing-services-in-nagpur/",
    "/services/branding-design-services-in-nagpur/",
    "/services/videography-photography-services-in-nagpur/",
    "/services/website-development-services-in-nagpur/",
    "/services/content-marketing-services-nagpur/",

    // Main service pages
    "/seo-and-ppc-services/",
    "/content-marketing-services/",
    "/social-media-marketing-services/",
    "/website-development-services/",
    "/branding-and-design-services/",
    "/videography-and-photography-services/",
];

function normalizeRoute(route) {
    if (route === "/") {
        return "/";
    }

    return route.endsWith("/")
        ? route
        : `${route}/`;
}

// Remove duplicate routes automatically
const uniqueRoutes = [
    ...new Set(routes.map(normalizeRoute)),
];

console.log(
    `📄 Total unique routes: ${uniqueRoutes.length}`
);


function checkServer(url) {
    return new Promise((resolve) => {
        const request = http.get(url, (response) => {
            response.resume();

            resolve(
                response.statusCode >= 200 &&
                response.statusCode < 400
            );
        });

        request.on("error", () => {
            resolve(false);
        });

        request.setTimeout(1000, () => {
            request.destroy();
            resolve(false);
        });
    });
}

async function waitForServer(
    url,
    timeout = 30000
) {
    const startTime = Date.now();

    console.log(
        `\n⏳ Waiting for Vite preview server: ${url}`
    );

    while (Date.now() - startTime < timeout) {
        const ready = await checkServer(url);

        if (ready) {
            console.log(
                "✅ Vite preview server is ready.\n"
            );

            return;
        }

        await new Promise((resolve) =>
            setTimeout(resolve, 500)
        );
    }

    throw new Error(
        `Vite preview server did not start within ${timeout / 1000} seconds.`
    );
}

function startServer() {
    return new Promise((resolve, reject) => {
        console.log(
            "\n🚀 Starting Vite preview server...\n"
        );

        const viteCommand = path.resolve(
            "node_modules",
            "vite",
            "bin",
            "vite.js"
        );

        const server = spawn(
            process.execPath,
            [
                viteCommand,
                "preview",
                "--host",
                HOST,
                "--port",
                String(PORT),
                "--strictPort",
            ],
            {
                stdio: ["ignore", "pipe", "pipe"],
                windowsHide: true,
            }
        );

        let stderrBuffer = "";
        let settled = false;

        server.stdout.on("data", (data) => {
            process.stdout.write(data.toString());
        });

        server.stderr.on("data", (data) => {
            const output = data.toString();

            stderrBuffer += output;

            process.stderr.write(output);
        });

        server.on("error", (error) => {
            if (!settled) {
                settled = true;
                reject(error);
            }
        });

        server.on("exit", (code, signal) => {
            if (!settled && code !== 0) {
                settled = true;

                reject(
                    new Error(
                        `Vite server exited unexpectedly. Code: ${code}, Signal: ${signal}\n${stderrBuffer}`
                    )
                );
            }
        });

        waitForServer(`${BASE_URL}/`)
            .then(() => {
                if (!settled) {
                    settled = true;
                    resolve(server);
                }
            })
            .catch((error) => {
                try {
                    server.kill();
                } catch {
                    // Ignore cleanup errors
                }

                if (!settled) {
                    settled = true;
                    reject(error);
                }
            });
    });
}

function stopServer(server) {
    if (!server || server.killed) {
        return;
    }

    console.log(
        "\n🛑 Stopping Vite preview server..."
    );

    try {
        if (process.platform === "win32") {
            spawn(
                "taskkill",
                [
                    "/pid",
                    String(server.pid),
                    "/f",
                    "/t",
                ],
                {
                    stdio: "ignore",
                    windowsHide: true,
                }
            );
        } else {
            server.kill("SIGTERM");
        }
    } catch (error) {
        console.warn(
            "Could not stop server:",
            error.message
        );
    }
}

function getAttribute(tag, attribute) {
    const escaped = attribute.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const regex = new RegExp(
        `${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
        "i"
    );

    const match = tag.match(regex);

    return match
        ? (match[1] ?? match[2] ?? "").toLowerCase()
        : null;
}

function deduplicateHead(html) {

    const titles = [
        ...html.matchAll(
            /<title\b[^>]*>[\s\S]*?<\/title>/gi
        ),
    ];

    if (titles.length > 1) {
        const lastTitle =
            titles[titles.length - 1][0];

        html = html.replace(
            /<title\b[^>]*>[\s\S]*?<\/title>/gi,
            ""
        );

        html = html.replace(
            "</head>",
            `${lastTitle}</head>`
        );
    }

    const metaTags = [
        ...html.matchAll(/<meta\b[^>]*>/gi),
    ];

    const seenMeta = new Set();
    const removeMeta = [];

    for (
        let i = metaTags.length - 1;
        i >= 0;
        i--
    ) {
        const tag = metaTags[i][0];

        const name = getAttribute(tag, "name");
        const property = getAttribute(
            tag,
            "property"
        );

        const key = name
            ? `name:${name}`
            : property
                ? `property:${property}`
                : null;

        if (!key) {
            continue;
        }

        if (seenMeta.has(key)) {
            removeMeta.push(metaTags[i]);
        } else {
            seenMeta.add(key);
        }
    }

    // Remove from last index to first index
    for (const match of removeMeta) {
        html =
            html.slice(0, match.index) +
            html.slice(
                match.index + match[0].length
            );
    }

    const canonicalTags = [
        ...html.matchAll(/<link\b[^>]*>/gi),
    ].filter(
        (match) =>
            getAttribute(match[0], "rel") ===
            "canonical"
    );

    if (canonicalTags.length > 1) {
        const lastCanonical =
            canonicalTags[canonicalTags.length - 1][0];

        html = html.replace(
            /<link\b[^>]*>/gi,
            (tag) =>
                getAttribute(tag, "rel") ===
                    "canonical"
                    ? ""
                    : tag
        );

        html = html.replace(
            "</head>",
            `${lastCanonical}</head>`
        );
    }

    return html;
}

function validateSEO(html, route) {
    const checks = {
        title: /<title\b[^>]*>[\s\S]*?<\/title>/i.test(html),

        description:
            /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i.test(html),

        keywords:
            /<meta\b(?=[^>]*\bname=["']keywords["'])[^>]*>/i.test(html),

        canonical:
            /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i.test(html),

        ogImage:
            /<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*>/i.test(html),

        ogWidth:
            /<meta\b(?=[^>]*\bproperty=["']og:image:width["'])[^>]*>/i.test(html),

        ogHeight:
            /<meta\b(?=[^>]*\bproperty=["']og:image:height["'])[^>]*>/i.test(html),
    };

    const missing = Object.entries(checks)
        .filter(([, valid]) => !valid)
        .map(([key]) => key);

    if (missing.length > 0) {
        console.warn(
            `⚠️ Missing SEO tags for ${route}: ${missing.join(", ")}`
        );

        return false;
    }

    return true;
}

function saveRouteHtml(route, html) {
    const normalizedRoute =
        normalizeRoute(route);

    const cleanRoute = normalizedRoute.replace(
        /^\/|\/$/g,
        ""
    );

    const outputDirectory = cleanRoute
        ? path.join(distPath, cleanRoute)
        : distPath;

    fs.mkdirSync(outputDirectory, {
        recursive: true,
    });

    const outputFile = path.join(
        outputDirectory,
        "index.html"
    );

    const finalHtml = deduplicateHead(html);

    const isValid = validateSEO(
        finalHtml,
        route
    );

    fs.writeFileSync(
        outputFile,
        finalHtml,
        "utf8"
    );

    console.log(
        `${isValid ? "✓" : "⚠️"} Generated: ${outputFile}`
    );

    return isValid;
}


async function launchBrowser() {
    const isVercel =
        process.env.VERCEL === "1";

    if (isVercel) {
        console.log(
            "☁️ Vercel environment detected"
        );

        console.log(
            "🚀 Launching Sparticuz Chromium..."
        );

        const executablePath =
            await sparticuzChromium.executablePath();

        return chromium.launch({
            executablePath,

            args: [
                ...sparticuzChromium.args,
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
            ],

            headless: true,
        });
    }

    console.log(
        "💻 Local environment detected"
    );

    console.log(
        "🚀 Launching Playwright Chromium..."
    );

    return chromium.launch({
        headless: true,

        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });
}

async function waitForSEO(page, route) {
    console.log(
        "⏳ Waiting for React SEO metadata..."
    );

    // Wait for React to create/update canonical
    await page.waitForFunction(
        () => {
            const canonical =
                document.querySelector(
                    'link[rel="canonical"]'
                );

            const description =
                document.querySelector(
                    'meta[name="description"]'
                );

            return (
                document.title.trim().length > 0 &&
                canonical?.href &&
                description?.content?.trim().length > 10
            );
        },
        null,
        {
            timeout: 20000,
        }
    );

    // Blog pages use API data, so wait for
    // their actual dynamic title and description.
    const isBlogDetail =
        /^\/blog\/[^/]+\/$/.test(route);

    if (isBlogDetail) {
        await page.waitForFunction(
            (defaultTitle) => {
                const title = document.title;

                const description =
                    document.querySelector(
                        'meta[name="description"]'
                    )?.content;

                return (
                    title.trim().length > 0 &&
                    title !== defaultTitle &&
                    description &&
                    description.trim().length > 10
                );
            },
            DEFAULT_TITLE,
            {
                timeout: 30000,
            }
        );
    }

    // Allow remaining metadata to settle
    await page.waitForTimeout(700);
}

// ==========================================
// MAIN PRERENDER FUNCTION
// ==========================================

async function prerender() {
    console.log(
        "\n========================================"
    );

    console.log(
        "🚀 STARTING SCROLLFUEL PRERENDER"
    );

    console.log(
        "========================================\n"
    );

    let server = null;
    let browser = null;

    let successfulRoutes = 0;
    let failedRoutes = 0;

    try {
        // ----------------------------------
        // Start preview server
        // ----------------------------------

        if (!fs.existsSync(distPath)) {
            throw new Error(
                "dist folder not found. Run npm run build first."
            );
        }

        server = await startServer();

        console.log(
            `🌐 Preview URL: ${BASE_URL}`
        );

        // ----------------------------------
        // Launch browser
        // ----------------------------------

        browser = await launchBrowser();

        // ----------------------------------
        // Create browser page
        // ----------------------------------

        const page = await browser.newPage();

        await page.setViewportSize({
            width: 1366,
            height: 900,
        });

        // Browser console errors
        page.on("console", (message) => {
            if (message.type() === "error") {
                console.log(
                    `⚠️ Browser console error: ${message.text()}`
                );
            }
        });

        // React runtime errors
        page.on("pageerror", (error) => {
            console.log(
                `⚠️ Browser page error: ${error.message}`
            );
        });

        // ----------------------------------
        // Render every unique route
        // ----------------------------------

        for (const route of uniqueRoutes) {
            const url = `${BASE_URL}${route}`;

            console.log(
                "\n----------------------------------------"
            );

            console.log(
                `📄 Rendering: ${route}`
            );

            try {
                const response = await page.goto(
                    url,
                    {
                        waitUntil: "domcontentloaded",
                        timeout: 60000,
                    }
                );

                if (
                    !response ||
                    response.status() >= 400
                ) {
                    throw new Error(
                        `Page returned HTTP ${response?.status() ?? "no response"}`
                    );
                }

                // Wait for React SEO
                await waitForSEO(page, route);

                // Check browser URL
                console.log(
                    `🌐 Final URL: ${page.url()}`
                );

                // Check page metadata
                const metadata =
                    await page.evaluate(() => {
                        return {
                            title: document.title,

                            description:
                                document.querySelector(
                                    'meta[name="description"]'
                                )?.content,

                            keywords:
                                document.querySelector(
                                    'meta[name="keywords"]'
                                )?.content,

                            canonical:
                                document.querySelector(
                                    'link[rel="canonical"]'
                                )?.href,

                            ogImage:
                                document.querySelector(
                                    'meta[property="og:image"]'
                                )?.content,
                        };
                    });

                console.log(
                    "SEO Metadata:",
                    metadata
                );

                // Validate canonical host
                const canonicalUrl = new URL(
                    metadata.canonical
                );

                if (
                    canonicalUrl.hostname !==
                    new URL(SITE_URL).hostname
                ) {
                    throw new Error(
                        `Invalid canonical domain: ${metadata.canonical}`
                    );
                }

                // Get rendered HTML
                const html = await page.content();

                // Save generated HTML
                const valid = saveRouteHtml(
                    route,
                    html
                );

                if (!valid) {
                    throw new Error(
                        `SEO validation failed for ${route}`
                    );
                }

                successfulRoutes++;

                console.log(
                    `✅ Successfully prerendered: ${route}`
                );

            } catch (error) {
                failedRoutes++;

                console.error(
                    `\n❌ Failed route: ${route}`
                );

                console.error(
                    error.message
                );

                // Continue with remaining routes
                continue;
            }
        }
        

        if (failedRoutes > 0) {
            throw new Error(
                `${failedRoutes} routes failed during prerendering. Check the errors above.`
            );
        }

        console.log(
            "🎉 ALL ROUTES PRERENDERED SUCCESSFULLY!"
        );

    } finally {
       
        if (browser) {
            try {
                await browser.close();

                console.log(
                    "✅ Browser closed."
                );
            } catch {
                // Ignore cleanup errors
            }
        }

        stopServer(server);
    }
}

prerender().catch((error) => {
    console.error(
        "\n❌ PRERENDER FAILED:"
    );

    console.error(error);

    process.exitCode = 1;
});
