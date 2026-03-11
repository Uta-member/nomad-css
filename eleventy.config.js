module.exports = function (eleventyConfig) {
  // dist/css をそのまま _site/dist/css/ にコピー
  eleventyConfig.addPassthroughCopy({ "dist/css": "dist/css" });
  // showcase/assets を _site/assets/ にコピー
  eleventyConfig.addPassthroughCopy({ "showcase/assets": "assets" });

  // dist/css の変更を watch してホットリロード
  eleventyConfig.addWatchTarget("dist/css/");

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
