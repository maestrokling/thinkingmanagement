const Parser = require("rss-parser");
const fs = require("fs");
const path = require("path");

async function fetchMedium() {
  const parser = new Parser();
  const outPath = path.join(__dirname, "medium.json");

  try {
    const feed = await parser.parseURL(
      "https://medium.com/feed/@nathankling_49918"
    );
    const posts = feed.items.map((item) => ({
      title: item.title || "Untitled",
      date: item.isoDate || item.pubDate || new Date().toISOString(),
      url: item.link || "#",
      excerpt:
        item.contentSnippet
          ? item.contentSnippet.substring(0, 200).trim() + "…"
          : "",
    }));
    fs.writeFileSync(outPath, JSON.stringify(posts, null, 2));
    console.log(`Fetched ${posts.length} Medium posts.`);
  } catch (err) {
    console.warn("Medium RSS fetch failed, using fallback:", err.message);
    if (!fs.existsSync(outPath)) {
      fs.writeFileSync(outPath, "[]");
    }
  }
}

fetchMedium();
