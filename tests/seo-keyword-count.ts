/* Test jumlah kata kunci yang dihasilkan engine */
import { SEO_KEYWORDS, SEO_KEYWORD_COUNT, KEYWORD_CLUSTERS, keywordsForPage } from "../src/lib/seo-keywords";

console.log("Total kata kunci unik:", SEO_KEYWORD_COUNT);
for (const c of KEYWORD_CLUSTERS) {
  console.log(`  [${c.id}] ${c.items.length} — ${c.label}`);
}
console.log("\nContoh frasa:", SEO_KEYWORDS.slice(0, 5).map((k) => k.t));
console.log("\nkeywordsForPage(modelId=ex5):", keywordsForPage({ modelId: "ex5", cap: 60 }).length, "frasa");
console.log("\nSemua href unik & valid?", new Set(SEO_KEYWORDS.map((k) => k.h)).size, "route unik");
const routes = new Set(SEO_KEYWORDS.map((k) => k.h));
console.log([...routes].sort().join("\n"));
