export const dynamic = "force-static";

import generateFeed from "@/utils/rss";

export async function GET() {
    const out = await generateFeed();
    return new Response(out, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}