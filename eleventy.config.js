const { execSync } = require("child_process");

module.exports = function (eleventyConfig) {
  // SCSSソースを監視してビルドをトリガー
  eleventyConfig.addWatchTarget("src/");

  // dist/ はSassの出力先なので、Eleventyの監視対象から除外（無限ループ防止）
  eleventyConfig.watchIgnores.add("./dist/");

  // Eleventy ビルド前に Sass をコンパイル（レースコンディション防止）
  eleventyConfig.on("eleventy.before", async () => {
    try {
      execSync(
        [
          "sass src/nomad-css-ui/_nomad-css-ui.scss:dist/css/nomad-css-ui.css",
          "src/themes/default/default.scss:dist/css/default.css",
          "src/themes/fluent2/fluent2.scss:dist/css/fluent2.css",
          "src/themes/material3/material3.scss:dist/css/material3.css",
          "src/themes/bootstrap5/bootstrap5.scss:dist/css/bootstrap5.css",
          "src/themes/shadcn/shadcn.scss:dist/css/shadcn.css",
          "--style=expanded",
        ].join(" "),
        { stdio: "inherit" }
      );
    } catch (e) {
      console.error("Sass build failed:", e.message);
    }
  });

  // dist/css をそのまま _site/dist/css/ にコピー
  eleventyConfig.addPassthroughCopy({ "dist/css": "dist/css" });
  // showcase/assets を _site/assets/ にコピー
  eleventyConfig.addPassthroughCopy({ "showcase/assets": "assets" });

  // {% demo %}...{% enddemo %}: デモをライブ表示＋コピー可能なコード表示で出力
  const escapeHtml = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  eleventyConfig.addPairedShortcode("demo", function (content) {
    const lines = content
      .replace(/^\r?\n+/, "")
      .replace(/\s+$/, "")
      .split("\n");
    const indents = lines
      .filter((l) => l.trim())
      .map((l) => l.match(/^[ \t]*/)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    const code = lines.map((l) => l.slice(min)).join("\n");
    return [
      '<div class="demo-live">',
      content,
      "</div>",
      '<details class="demo-code">',
      "<summary>HTML</summary>",
      '<div class="demo-code-wrap">',
      '<button type="button" class="demo-copy">Copy</button>',
      "<pre><code>" + escapeHtml(code) + "</code></pre>",
      "</div>",
      "</details>",
    ].join("\n");
  });

  return {
    dir: {
      input: "showcase",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // GitHub Actions ワークフローで ELEVENTY_PATH_PREFIX 環境変数をセット
    // ローカルでは "/" のまま
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
  };
};
