import { chromium } from "playwright";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const routes = [
    "/",
    "/about/",
    "/about-us/",
    "/blog/",
    "/portfolio/social-media-marketing/",
    "/portfolio/video/",
    "/career/",
    "/connect-with-us/",
    "/services/",

    // Service pages
    "/services/seo-ppc-service-in-nagpur/",
    "/services/social-media-marketing-services-in-nagpur/",
    "/services/branding-design-services-in-nagpur/",
    "/services/videography-photography-services-in-nagpur/",
    "/services/website-development-services-in-nagpur/",
    "/services/content-marketing-services-nagpur/",
];

const distPath = path.resolve("dist");

/**
 * Make sure every non-root route has a trailing slash.
 */
function normalizeRoute(route) {
    if (route === "/") {
        return "/";
    }

    return route.endsWith("/") ? route : `${route}/`;
}

/**
 * Start Vite preview server.
 */
function startServer() {
    return new Promise((resolve, reject) => {
        const server = spawn(
            "npx",
            [
                "vite",
                "preview",
                "--host",
                "127.0.0.1",
                "--port",
                String(PORT),
            ],
            {
                shell: true,
                stdio: ["ignore", "pipe", "pipe"],
            }
        );

        let started = false;

        const checkOutput = (data) => {
            const output = data.toString();

            console.log(output);

            if (
                output.includes(`localhost:${PORT}`) ||
                output.includes(`127.0.0.1:${PORT}`)
            ) {
                if (!started) {
                    started = true;
                    resolve(server);
                }
            }
        };

        server.stdout.on("data", checkOutput);
        server.stderr.on("data", checkOutput);

        server.on("error", reject);

        setTimeout(() => {
            if (!started) {
                started = true;
                resolve(server);
            }
        }, 3000);
    });
}

/**
 * Save rendered HTML as:
 *
 * dist/
 *   route-name/
 *      index.html
 */
function saveRouteHtml(route, html) {
    const normalizedRoute = normalizeRoute(route);

    // Remove first and last slash only for filesystem path
    const cleanRoute = normalizedRoute.replace(/^\/|\/$/g, "");

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

    fs.writeFileSync(outputFile, html, "utf8");

    console.log(`✓ Generated: ${outputFile}`);
}

/**
 * Start prerendering.
 */
async function prerender() {
    console.log("\n🚀 Starting ScrollFuel prerender...\n");

    const server = await startServer();

    const browser = await chromium.launch();

    const page = await browser.newPage();

    try {
        for (const originalRoute of routes) {
            const route = normalizeRoute(originalRoute);

            const url = `${BASE_URL}${route}`;

            console.log(`\n----------------------------------------`);
            console.log(`Rendering: ${route}`);
            console.log(`URL: ${url}`);

            await page.goto(url, {
                waitUntil: "networkidle",
            });

            // Give React / Helmet time to update the page
            await page.waitForTimeout(1000);

            // Check the final browser URL
            const finalUrl = page.url();

            console.log(`Final URL: ${finalUrl}`);

            // Get rendered HTML
            const html = await page.content();

            // Save HTML
            saveRouteHtml(route, html);
        }
    } finally {
        await browser.close();

        server.kill();

        console.log("\n✅ ScrollFuel prerender completed.\n");
    }
}

prerender().catch((error) => {
    console.error("\n❌ Prerender failed:");
    console.error(error);

    process.exit(1);
}); 