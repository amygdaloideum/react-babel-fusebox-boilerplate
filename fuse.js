const { FuseBox, BabelPlugin, WebIndexPlugin, Sparky, QuantumPlugin } = require("fuse-box");
const BUILD_PATH = 'build/';

Sparky.task('build', ['clean'], buildProductionBundle);
Sparky.task('dev', ['clean'], devServer);

Sparky.task("default", ['clean', 'copy-assets', 'dev'], () => { });
Sparky.task('clean', () => Sparky.src(BUILD_PATH).clean(BUILD_PATH));
Sparky.task('copy-assets', () => Sparky.src("assets/", { base: './src' }).dest('./build'));

function buildProductionBundle() {
  const fuse = init(true)
  fuse.bundle("app").instructions(`>index.js`);
  fuse.run();
}

function devServer() {
  const fuse = init(false);
  fuse.dev({ port: 3000 });
  fuse.bundle("app").instructions(`>index.js`).watch().hmr();
  fuse.run();
}

function init(isProd) {
  return FuseBox.init({
    homeDir: "src",
    output: "build/$name.js",
    sourceMaps: !isProd,
    target: 'browser',
    plugins: [
      WebIndexPlugin({ template: 'src/index.html' }),
      BabelPlugin({
        config: {
          sourceMaps: !isProd,
          presets: ["es2015"],
          plugins: [
            ["transform-react-jsx"],
            ["transform-class-properties"],
            ["transform-object-rest-spread"],
          ],
        },
      }),
      isProd && QuantumPlugin({ uglify: true }),
    ],
  })
};
