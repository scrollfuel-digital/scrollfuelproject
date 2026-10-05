import { chromium } from "playwright";
import sparticuzChromium from "@sparticuz/chromium";
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import http from "http";

const PORT = 4173;
const HOST = "127.0.0.1";
const BASE_URL = `http://${HOST}:${PORT}`;

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
 * Check whether Vite preview server is actually responding.
 */
function checkServer(url) {
    return new Promise((resolve) => {
        const request = http.get(url, (response) => {
            response.resume();

            if (
                response.statusCode >= 200 &&
                response.statusCode < 500
            ) {
                resolve(true);
            } else {
                resolve(false);
            }
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

/**
 * Wait until Vite preview server is actually ready.
 */
async function waitForServer(url, timeout = 30000) {
    const startTime = Date.now();

    console.log(
        `\n⏳ Waiting for Vite preview server: ${url}`
    );

    while (Date.now() - startTime < timeout) {
        const ready = await checkServer(url);

        if (ready) {
            console.log(
                `✅ Vite preview server is ready: ${url}\n`
            );

            return;
        }

        await new Promise((resolve) =>
            setTimeout(resolve, 500)
        );
    }

    throw new Error(
        `Vite preview server did not become ready within ${timeout / 1000
        } seconds.`
    );
}

/**
 * Start Vite preview server.
 */
function startServer() {
    return new Promise((resolve, reject) => {
        console.log(
            "🚀 Starting Vite preview server...\n"
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

        server.stdout.on("data", (data) => {
            process.stdout.write(data.toString());
        });

        server.stderr.on("data", (data) => {
            const output = data.toString();

            stderrBuffer += output;

            process.stderr.write(output);
        });

        server.on("error", (error) => {
            reject(error);
        });

        server.on("exit", (code, signal) => {
            if (code !== null && code !== 0) {
                console.error(
                    `\n❌ Vite preview server exited with code ${code}`
                );

                if (stderrBuffer) {
                    console.error(stderrBuffer);
                }
            }

            if (signal) {
                console.log(
                    `\n⚠️ Vite preview server stopped with signal ${signal}`
                );
            }
        });

        waitForServer(`${BASE_URL}/`)
            .then(() => {
                resolve(server);
            })
            .catch((error) => {
                try {
                    server.kill();
                } catch {
                    // Ignore cleanup errors.
                }

                reject(error);
            });
    });
}

/**
 * Stop Vite preview server safely.
 */
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
            "⚠️ Could not stop preview server cleanly:",
            error.message
        );
    }
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

    // Remove first and last slash only for filesystem path.
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

    fs.writeFileSync(
        outputFile,
        html,
        "utf8"
    );

    console.log(
        `✓ Generated: ${outputFile}`
    );
}

/**
 * Launch the correct Chromium for the environment.
 *
 * Local Windows:
 *    Uses Playwright's installed Chromium.
 *
 * Vercel:
 *    Uses @sparticuz/chromium.
 */
async function launchBrowser() {
    const isVercel = process.env.VERCEL === "1";

    if (isVercel) {
        console.log(
            "☁️ Vercel environment detected"
        );

        console.log(
            "🚀 Launching Sparticuz Chromium..."
        );

        const executablePath =
            await sparticuzChromium.executablePath();

        console.log(
            "Chromium executable:",
            executablePath
        );

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

/**
 * Start prerendering.
 */
async function prerender() {
    console.log(
        "\n🚀 Starting ScrollFuel prerender...\n"
    );

    let server = null;
    let browser = null;

    try {
        // ----------------------------------------
        // Start Vite preview
        // ----------------------------------------

        server = await startServer();

        console.log(
            "🌐 Preview server confirmed."
        );

        console.log(
            `🌐 Base URL: ${BASE_URL}`
        );

        // ----------------------------------------
        // Launch browser
        // ----------------------------------------

        browser = await launchBrowser();

        // ----------------------------------------
        // Create page
        // ----------------------------------------

        const page = await browser.newPage();

        // Browser console errors
        page.on("console", (message) => {
            if (message.type() === "error") {
                console.log(
                    `⚠️ Browser console error: ${message.text()}`
                );
            }
        });

        // React/runtime errors
        page.on("pageerror", (error) => {
            console.log(
                `⚠️ Browser page error: ${error.message}`
            );
        });

        // ----------------------------------------
        // Render routes
        // ----------------------------------------

        for (const originalRoute of routes) {
            const route =
                normalizeRoute(originalRoute);

            const url = `${BASE_URL}${route}`;

            console.log(
                "\n----------------------------------------"
            );

            console.log(
                `Rendering: ${route}`
            );

            console.log(
                `URL: ${url}`
            );

            try {
                await page.goto(url, {
                    waitUntil: "networkidle",
                    timeout: 60000,
                });

                // Give React / Helmet time to
                // update SEO tags.
                await page.waitForTimeout(
                    1000
                );

                // Check final browser URL.
                const finalUrl = page.url();

                console.log(
                    `Final URL: ${finalUrl}`
                );

                // Get rendered HTML.
                const html =
                    await page.content();

                // Save HTML.
                saveRouteHtml(
                    route,
                    html
                );

                console.log(
                    `✅ Rendered successfully: ${route}`
                );
            } catch (error) {
                console.error(
                    `\n❌ Failed to render route: ${route}`
                );

                console.error(error);

                throw error;
            }
        }

        console.log(
            "\n========================================"
        );

        console.log(
            "✅ ALL ROUTES PRERENDERED SUCCESSFULLY"
        );

        console.log(
            "========================================\n"
        );
    } finally {
        // ----------------------------------------
        // Close browser
        // ----------------------------------------

        if (browser) {
            try {
                await browser.close();
            } catch {
                // Ignore browser cleanup errors.
            }
        }

        // ----------------------------------------
        // Stop Vite
        // ----------------------------------------

        stopServer(server);
    }
}

/**
 * Run prerender.
 */
prerender().catch((error) => {
    console.error(
        "\n❌ Prerender failed:"
    );

    console.error(error);

    process.exit(1);
});