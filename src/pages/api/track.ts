import type { APIRoute } from "astro";

export const prerender = false; // This ensures it runs on-demand, not at build time

interface TrackingData {
    duration: number;
    pageLoadTime: number;
    clicks: Array<{ text: string; url: string; timestamp: number }>;
    cookies: any;
    localStorage: any;
    sessionStorage: any;
    device: {
        userAgent: string;
        platform: string;
        vendor: string;
        screenResolution: string;
        screenAvailableResolution: string;
        windowResolution: string;
        colorDepth: string;
        pixelRatio: number;
        orientation: string;
        language: string;
        languages: string;
        timezone: string;
        timezoneOffset: number;
        cookiesEnabled: boolean;
        doNotTrack: string;
        onlineStatus: string;
        cpuCores: number | string;
        deviceMemory: string;
        touchSupport: boolean;
        maxTouchPoints: number;
        pdfViewerEnabled: boolean;
        webdriver: boolean;
        connection: any;
        gpu: any;
        fonts: string;
        localStorage: string;
        sessionStorage: string;
        indexedDB: boolean;
        plugins: number;
        mimeTypes: number;
        battery: any;
        mediaDevices: any;
    };
    page: {
        url: string;
        title: string;
        referrer: string;
        protocol: string;
        host: string;
        pathname: string;
        hash: string;
        search: string;
    };
    engagement: {
        mouseMovements: number;
        maxScrollDepth: string;
        idleTimeSeconds: number;
        activeTimeSeconds: number;
    };
    performance: any;
}

async function getIPInfo(ip: string) {
    try {
        // Use multiple geolocation services for maximum accuracy and cross-reference data
        const results = await Promise.allSettled([
            // Service 1: ipapi.co (most comprehensive, 1000 req/day free)
            fetch(`https://ipapi.co/${ip}/json/`).then((r) =>
                r.ok ? r.json() : null
            ),

            // Service 2: ip-api.com (free, unlimited but rate limited to 45 req/min)
            fetch(`http://ip-api.com/json/${ip}?fields=66846719`).then((r) =>
                r.ok ? r.json() : null
            ),

            // Service 3: ipinfo.io (50k req/month free)
            fetch(`https://ipinfo.io/${ip}/json`).then((r) =>
                r.ok ? r.json() : null
            ),
        ]);

        // Extract data from each service
        const ipapiData =
            results[0].status === "fulfilled" ? results[0].value : null;
        const ipApiComData =
            results[1].status === "fulfilled" ? results[1].value : null;
        const ipinfoData =
            results[2].status === "fulfilled" ? results[2].value : null;

        // If all services failed, return null
        if (!ipapiData && !ipApiComData && !ipinfoData) {
            return null;
        }

        // Combine and cross-reference data for maximum accuracy
        const enrichedData: any = {};

        // Get reverse DNS (hostname)
        try {
            const rdnsResponse = await fetch(
                `https://dns.google/resolve?name=${ip.split(".").reverse().join(".")}.in-addr.arpa&type=PTR`
            );
            if (rdnsResponse.ok) {
                const rdnsData = await rdnsResponse.json();
                if (rdnsData.Answer && rdnsData.Answer.length > 0) {
                    enrichedData.reverseDNS = rdnsData.Answer[0].data.replace(
                        /\.$/,
                        ""
                    );
                }
            }
        } catch (e) {
            enrichedData.reverseDNS = ipinfoData?.hostname || "Not available";
        }

        // Merge location data (use most specific/accurate from all sources)
        enrichedData.locationDetails = {
            city:
                ipapiData?.city ||
                ipApiComData?.city ||
                ipinfoData?.city ||
                "Unknown",
            region:
                ipapiData?.region ||
                ipApiComData?.regionName ||
                ipinfoData?.region ||
                "Unknown",
            regionCode:
                ipapiData?.region_code || ipApiComData?.region || "Unknown",
            country:
                ipapiData?.country_name ||
                ipApiComData?.country ||
                ipinfoData?.country ||
                "Unknown",
            countryCode:
                ipapiData?.country_code ||
                ipApiComData?.countryCode ||
                ipinfoData?.country ||
                "Unknown",
            postal:
                ipapiData?.postal ||
                ipApiComData?.zip ||
                ipinfoData?.postal ||
                "Unknown",
            latitude:
                ipapiData?.latitude ||
                ipApiComData?.lat ||
                (ipinfoData?.loc
                    ? parseFloat(ipinfoData.loc.split(",")[0])
                    : "Unknown"),
            longitude:
                ipapiData?.longitude ||
                ipApiComData?.lon ||
                (ipinfoData?.loc
                    ? parseFloat(ipinfoData.loc.split(",")[1])
                    : "Unknown"),
            timezone:
                ipapiData?.timezone ||
                ipApiComData?.timezone ||
                ipinfoData?.timezone ||
                "Unknown",
            utcOffset: ipapiData?.utc_offset || "Unknown",
            countryCallingCode: ipapiData?.country_calling_code || "Unknown",
            currency:
                ipapiData?.currency || ipApiComData?.currency || "Unknown",
            languages: ipapiData?.languages || "Unknown",
        };

        // Merge ISP/Network data from all sources
        enrichedData.org =
            ipapiData?.org || ipApiComData?.isp || ipinfoData?.org || "Unknown";
        enrichedData.isp =
            ipApiComData?.isp || ipapiData?.org || ipinfoData?.org || "Unknown";
        enrichedData.asn =
            ipapiData?.asn ||
            ipApiComData?.as?.split(" ")[0] ||
            ipinfoData?.asn ||
            "Unknown";
        enrichedData.network = ipapiData?.network || "Unknown";

        // ASN Details with full name
        enrichedData.asnDetails = {
            asn: enrichedData.asn,
            org: enrichedData.org,
            network: enrichedData.network,
            asnName:
                ipApiComData?.as ||
                ipapiData?.asn ||
                ipinfoData?.asn ||
                "Unknown",
        };

        // Enhanced IP type detection with data from multiple sources
        enrichedData.proxy = ipApiComData?.proxy || false;
        enrichedData.hosting = ipApiComData?.hosting || false;
        enrichedData.mobile = ipApiComData?.mobile || false;

        const org = enrichedData.org.toLowerCase();
        if (
            enrichedData.hosting ||
            org.includes("hosting") ||
            org.includes("cloud") ||
            org.includes("datacenter") ||
            org.includes("data center") ||
            org.includes("digital ocean") ||
            org.includes("digitalocean") ||
            org.includes("amazon") ||
            org.includes("aws") ||
            org.includes("google cloud") ||
            org.includes("microsoft azure") ||
            org.includes("linode") ||
            org.includes("vultr") ||
            org.includes("ovh") ||
            org.includes("hetzner")
        ) {
            enrichedData.ipType = "Datacenter/Hosting";
        } else if (
            enrichedData.proxy ||
            org.includes("vpn") ||
            org.includes("proxy")
        ) {
            enrichedData.ipType = "VPN/Proxy";
        } else if (
            enrichedData.mobile ||
            org.includes("mobile") ||
            org.includes("wireless") ||
            org.includes("cellular") ||
            org.includes("t-mobile") ||
            org.includes("verizon") ||
            org.includes("at&t") ||
            org.includes("att")
        ) {
            enrichedData.ipType = "Mobile/Cellular";
        } else if (
            org.includes("isp") ||
            org.includes("telecom") ||
            org.includes("broadband") ||
            org.includes("cable") ||
            org.includes("fiber") ||
            org.includes("comcast") ||
            org.includes("spectrum") ||
            org.includes("cox") ||
            org.includes("sbcglobal") ||
            org.includes("charter")
        ) {
            enrichedData.ipType = "Residential ISP";
        } else {
            enrichedData.ipType = "Unknown";
        }

        // Additional metadata from ip-api.com
        if (ipApiComData) {
            enrichedData.metroCode = ipApiComData.district || "Unknown";
            enrichedData.autonomousSystem = ipApiComData.as || "Unknown";
        }

        // Accuracy indicator - show which services provided data
        enrichedData.dataSourcesUsed = [
            ipapiData ? "ipapi.co" : null,
            ipApiComData ? "ip-api.com" : null,
            ipinfoData ? "ipinfo.io" : null,
        ].filter(Boolean);

        enrichedData.accuracyScore = enrichedData.dataSourcesUsed.length;

        return enrichedData;
    } catch (error) {
        console.error("Failed to fetch IP info:", error);
        return null;
    }
}

function formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

async function sendDiscordNotification(
    data: TrackingData,
    ipInfo: any,
    clientIP: string
) {
    const webhookUrl =
        "https://ptb.discord.com/api/webhooks/1423692503281958922/Z5jiwTcmDLpupJRGMLCKSRng7yXIKlm55nfmzL9LmKFpNU29zWzlDd7eAVgSMashvItT";

    const clicksText =
        data.clicks.length > 0
            ? data.clicks
                  .map(
                      (c) =>
                          `• [${c.text || "Unknown"}](${c.url}) at ${formatDuration(c.timestamp)}`
                  )
                  .join("\n")
            : "No links clicked";

    // Browser detection from user agent
    const getBrowser = (ua: string) => {
        if (ua.includes("Chrome")) return "Chrome";
        if (ua.includes("Safari")) return "Safari";
        if (ua.includes("Firefox")) return "Firefox";
        if (ua.includes("Edge")) return "Edge";
        return "Unknown";
    };

    const connectionInfo =
        data.device.connection && typeof data.device.connection === "object"
            ? `${data.device.connection.effectiveType || "Unknown"} (${data.device.connection.downlink || "N/A"}, RTT: ${data.device.connection.rtt || "N/A"})`
            : "Unknown";

    // Create map link if we have coordinates
    const mapLink =
        ipInfo &&
        ipInfo.locationDetails &&
        ipInfo.locationDetails.latitude !== "Unknown" &&
        ipInfo.locationDetails.longitude !== "Unknown"
            ? `https://www.google.com/maps?q=${ipInfo.locationDetails.latitude},${ipInfo.locationDetails.longitude}`
            : null;

    const embed = {
        title:
            "🌐 New Website Visit" +
            (ipInfo?.ipType ? ` (${ipInfo.ipType})` : ""),
        description: mapLink ? `📍 [View on Map](${mapLink})` : undefined,
        color: 0x5865f2, // Discord blurple
        fields: [
            {
                name: "⏱️ Time on Site",
                value: formatDuration(data.duration),
                inline: true,
            },
            {
                name: "🔗 Links Clicked",
                value: data.clicks.length.toString(),
                inline: true,
            },
            {
                name: "📊 Engagement",
                value: `${data.engagement.maxScrollDepth} scrolled`,
                inline: true,
            },
            {
                name: "🖱️ Interaction Details",
                value: [
                    `**Mouse Movements:** ${data.engagement.mouseMovements}`,
                    `**Active Time:** ${data.engagement.activeTimeSeconds}s`,
                    `**Idle Time:** ${data.engagement.idleTimeSeconds}s`,
                    `**Max Scroll:** ${data.engagement.maxScrollDepth}`,
                ].join("\n"),
                inline: true,
            },
            {
                name: "🔗 Clicked Links",
                value: clicksText.substring(0, 1024), // Discord field limit
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true,
            },
            {
                name: "💻 Device Hardware",
                value: [
                    `**Platform:** ${data.device.platform}`,
                    `**Screen:** ${data.device.screenResolution} (${data.device.colorDepth})`,
                    `**Available:** ${data.device.screenAvailableResolution}`,
                    `**Window:** ${data.device.windowResolution}`,
                    `**Orientation:** ${data.device.orientation}`,
                    `**Pixel Ratio:** ${data.device.pixelRatio}x`,
                    `**Touch:** ${data.device.touchSupport ? "Yes" : "No"} (${data.device.maxTouchPoints} points)`,
                ].join("\n"),
                inline: true,
            },
            {
                name: "⚙️ System Resources",
                value: [
                    `**CPU Cores:** ${data.device.cpuCores}`,
                    `**Memory:** ${data.device.deviceMemory}`,
                    `**Webdriver:** ${data.device.webdriver ? "Yes (Bot?)" : "No"}`,
                    `**PDF Viewer:** ${data.device.pdfViewerEnabled ? "Yes" : "No"}`,
                    `**Plugins:** ${data.device.plugins}`,
                    `**MIME Types:** ${data.device.mimeTypes}`,
                ].join("\n"),
                inline: true,
            },
            {
                name: "\u200B",
                value: "\u200B",
                inline: true,
            },
            {
                name: "🎨 GPU & Graphics",
                value:
                    data.device.gpu && typeof data.device.gpu === "object"
                        ? [
                              `**Renderer:** ${data.device.gpu.renderer || "Unknown"}`,
                              `**Vendor:** ${data.device.gpu.vendor || "Unknown"}`,
                          ].join("\n")
                        : "Not available",
                inline: true,
            },
            {
                name: "🔤 Fonts Detected",
                value: data.device.fonts?.substring(0, 1024) || "Unknown",
                inline: true,
            },
            {
                name: "🔋 Battery Status",
                value:
                    data.device.battery &&
                    typeof data.device.battery === "object"
                        ? [
                              `**Level:** ${data.device.battery.level || "Unknown"}`,
                              `**Charging:** ${data.device.battery.charging ? "Yes" : "No"}`,
                              data.device.battery.charging
                                  ? `**Time to full:** ${data.device.battery.chargingTime || "N/A"}`
                                  : `**Time remaining:** ${data.device.battery.dischargingTime || "N/A"}`,
                          ]
                              .filter(Boolean)
                              .join("\n")
                        : typeof data.device.battery === "string"
                          ? data.device.battery
                          : "Not available",
                inline: true,
            },
            {
                name: "🎥 Media Devices",
                value:
                    data.device.mediaDevices &&
                    typeof data.device.mediaDevices === "object"
                        ? [
                              `**Microphones:** ${data.device.mediaDevices.audioinput || 0}`,
                              `**Cameras:** ${data.device.mediaDevices.videoinput || 0}`,
                              `**Speakers:** ${data.device.mediaDevices.audiooutput || 0}`,
                          ].join("\n")
                        : typeof data.device.mediaDevices === "string"
                          ? data.device.mediaDevices
                          : "Not available",
                inline: true,
            },
            {
                name: "💾 Storage Support",
                value: [
                    `**LocalStorage:** ${data.device.localStorage}`,
                    `**SessionStorage:** ${data.device.sessionStorage}`,
                    `**IndexedDB:** ${data.device.indexedDB ? "Yes" : "No"}`,
                ].join("\n"),
                inline: true,
            },
            {
                name: "🌐 Browser & Network",
                value: [
                    `**Browser:** ${getBrowser(data.device.userAgent)}`,
                    `**Vendor:** ${data.device.vendor}`,
                    `**Connection:** ${connectionInfo}`,
                    `**Online:** ${data.device.onlineStatus}`,
                    `**Cookies:** ${data.device.cookiesEnabled ? "Enabled" : "Disabled"}`,
                    `**DNT:** ${data.device.doNotTrack}`,
                ].join("\n"),
                inline: true,
            },
            {
                name: "🌍 Location Details",
                value:
                    ipInfo && ipInfo.locationDetails
                        ? [
                              `**City:** ${ipInfo.locationDetails.city}`,
                              `**Region:** ${ipInfo.locationDetails.region} (${ipInfo.locationDetails.regionCode})`,
                              `**Country:** ${ipInfo.locationDetails.country} (${ipInfo.locationDetails.countryCode})`,
                              `**Postal:** ${ipInfo.locationDetails.postal}`,
                              `**Coordinates:** ${ipInfo.locationDetails.latitude}, ${ipInfo.locationDetails.longitude}`,
                              `**Timezone:** ${ipInfo.locationDetails.timezone} (${ipInfo.locationDetails.utcOffset})`,
                              `**Currency:** ${ipInfo.locationDetails.currency}`,
                          ].join("\n")
                        : `**Location:** Unknown\n**Language:** ${data.device.language}`,
                inline: true,
            },
            {
                name: "🌐 Network Information",
                value: ipInfo
                    ? [
                          `**IP Address:** ${clientIP}`,
                          `**Reverse DNS:** ${ipInfo.reverseDNS || "Not available"}`,
                          `**IP Type:** ${ipInfo.ipType || "Unknown"}`,
                          `**ASN:** ${ipInfo.asnDetails?.asn || ipInfo.asn || "Unknown"}`,
                          `**Network:** ${ipInfo.asnDetails?.network || ipInfo.network || "Unknown"}`,
                      ].join("\n")
                    : `**IP:** ${clientIP}\n*Network info unavailable*`,
                inline: true,
            },
            {
                name: "🏢 ISP & Organization",
                value: ipInfo
                    ? [
                          `**ISP/Org:** ${ipInfo.org || ipInfo.asnDetails?.org || "Unknown"}`,
                          `**Type:** ${ipInfo.ipType || "Unknown"}`,
                          ipInfo.country_calling_code
                              ? `**Calling Code:** ${ipInfo.locationDetails?.countryCallingCode}`
                              : "",
                          ipInfo.languages
                              ? `**Languages:** ${ipInfo.locationDetails?.languages}`
                              : "",
                          ipInfo.dataSourcesUsed
                              ? `**Data Sources:** ${ipInfo.dataSourcesUsed.join(", ")}`
                              : "",
                          ipInfo.accuracyScore
                              ? `**Accuracy:** ${ipInfo.accuracyScore}/3 ⭐`
                              : "",
                      ]
                          .filter(Boolean)
                          .join("\n")
                    : "Not available",
                inline: true,
            },
            {
                name: "⚡ Performance Metrics",
                value:
                    data.performance && Object.keys(data.performance).length > 0
                        ? [
                              `**Page Load:** ${data.performance.pageLoad || "N/A"}`,
                              `**DNS Lookup:** ${data.performance.dnsLookup || "N/A"}`,
                              `**TCP Connect:** ${data.performance.tcpConnection || "N/A"}`,
                              `**Server Response:** ${data.performance.serverResponse || "N/A"}`,
                              `**DOM Processing:** ${data.performance.domProcessing || "N/A"}`,
                          ].join("\n")
                        : "No performance data",
                inline: true,
            },
            {
                name: "📄 Page Details",
                value: [
                    `**Title:** ${data.page.title}`,
                    `**URL:** ${data.page.url}`,
                    `**Referrer:** ${data.page.referrer || "Direct visit"}`,
                ].join("\n"),
                inline: false,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Website Analytics • Advanced Tracking",
        },
    };

    // Helper to format storage/cookies for Discord
    function formatStorageData(storageData: any, title: string): string {
        if (
            !storageData ||
            storageData === "Empty" ||
            storageData === "No cookies"
        ) {
            return `**${title}:** Empty`;
        }
        if (typeof storageData === "string") {
            return `**${title}:** ${storageData}`;
        }

        var items = [];
        var count = 0;
        for (var key in storageData) {
            if (storageData.hasOwnProperty(key)) {
                var value = storageData[key];
                // Truncate long values
                if (typeof value === "string" && value.length > 100) {
                    value = value.substring(0, 100) + "...";
                }
                items.push(`• **${key}**: ${value}`);
                count++;
                // Limit to prevent Discord message size issues
                if (count >= 10) {
                    items.push(
                        `... and ${Object.keys(storageData).length - 10} more items`
                    );
                    break;
                }
            }
        }
        return `**${title} (${Object.keys(storageData).length} items):**\n${items.join("\n")}`;
    }

    // Add storage data as separate embeds if there's data
    const additionalEmbeds = [];

    if (data.cookies && data.cookies !== "No cookies") {
        additionalEmbeds.push({
            title: "🍪 Cookies",
            description: formatStorageData(data.cookies, "Cookies"),
            color: 0xffa500,
            timestamp: new Date().toISOString(),
        });
    }

    if (data.localStorage && data.localStorage !== "Empty") {
        additionalEmbeds.push({
            title: "💾 Local Storage",
            description: formatStorageData(data.localStorage, "Local Storage"),
            color: 0x00ff00,
            timestamp: new Date().toISOString(),
        });
    }

    if (data.sessionStorage && data.sessionStorage !== "Empty") {
        additionalEmbeds.push({
            title: "📦 Session Storage",
            description: formatStorageData(
                data.sessionStorage,
                "Session Storage"
            ),
            color: 0x0099ff,
            timestamp: new Date().toISOString(),
        });
    }

    try {
        // Send main embed first
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [embed, ...additionalEmbeds].slice(0, 10), // Discord max 10 embeds
            }),
        });

        if (!response.ok) {
            console.error(
                "Failed to send Discord notification:",
                await response.text()
            );
        }
    } catch (error) {
        console.error("Error sending Discord notification:", error);
    }
}

export const POST: APIRoute = async ({ request }) => {
    try {
        // Get client IP
        const clientIP =
            request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        // Parse tracking data
        const data: TrackingData = await request.json();

        // Get IP information
        const ipInfo =
            clientIP !== "Unknown" ? await getIPInfo(clientIP) : null;

        // Send to Discord
        await sendDiscordNotification(data, ipInfo, clientIP);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error processing tracking data:", error);
        return new Response(
            JSON.stringify({ success: false, error: "Internal server error" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};
