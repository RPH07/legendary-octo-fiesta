async function purgeCache(url) {
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/purge_cache`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ files: [url] })
        }
    );

    const data = await res.json();
    if (!data.success) {
        console.error('Failed to purge cache:', data.errors);
        throw new Error('Failed to purge cache');
    }
    
    return data;
}

module.exports = { purgeCache };