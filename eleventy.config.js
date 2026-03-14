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
          "src/themes/apple-hig/apple-hig.scss:dist/css/apple-hig.css",
          "src/themes/material2/material2.scss:dist/css/material2.css",
          "src/themes/ant/ant.scss:dist/css/ant.css",
          "src/themes/bootstrap/bootstrap.scss:dist/css/bootstrap.css",
          "src/themes/chakra/chakra.scss:dist/css/chakra.css",
          "src/themes/material1/material1.scss:dist/css/material1.css",
          "src/themes/shadcn/shadcn.scss:dist/css/shadcn.css",
          "src/themes/primer/primer.scss:dist/css/primer.css",
          "src/themes/carbon/carbon.scss:dist/css/carbon.css",
          "src/themes/daisyui/daisyui.scss:dist/css/daisyui.css",
          "src/themes/spectrum/spectrum.scss:dist/css/spectrum.css",
          "src/themes/win95/win95.scss:dist/css/win95.css",
          "src/themes/aqua/aqua.scss:dist/css/aqua.css",
          "src/themes/holo/holo.scss:dist/css/holo.css",
          "src/themes/solarized/solarized.scss:dist/css/solarized.css",
          "src/themes/nord/nord.scss:dist/css/nord.css",
          "src/themes/cyberpunk/cyberpunk.scss:dist/css/cyberpunk.css",
          "src/themes/terminal/terminal.scss:dist/css/terminal.css",
          "src/themes/neumorphism/neumorphism.scss:dist/css/neumorphism.css",
          "src/themes/glass/glass.scss:dist/css/glass.css",
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
