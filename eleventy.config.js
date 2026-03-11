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
          "sass src/themes/default/default.scss:dist/css/default.css",
          "src/themes/fluent2/fluent2.scss:dist/css/fluent2.css",
          "src/themes/material3/material3.scss:dist/css/material3.css",
          "--style=expanded",
        ].join(" "),
        { stdio: "inherit" },
      );
    } catch (e) {
      console.error("Sass build failed:", e.message);
    }
  });

  // dist/css をそのまま _site/dist/css/ にコピー
  eleventyConfig.addPassthroughCopy({ "dist/css": "dist/css" });
  // showcase/assets を _site/assets/ にコピー
  eleventyConfig.addPassthroughCopy({ "showcase/assets": "assets" });

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
