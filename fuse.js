const {
  FuseBox,
  WebIndexPlugin,
  Sparky,
  QuantumPlugin,
  SassPlugin,
  CSSPlugin,
  EnvPlugin,
  JSONPlugin,
} = require('fuse-box');

const BUILD_PATH = 'build/';
const proxyServer = require('./proxy-server');
require('dotenv').config();

Sparky.task('build', ['clean', 'copy-assets'], buildProductionBundle);
Sparky.task('dev', ['clean', 'copy-assets'], devServer);

Sparky.task('default', ['clean', 'copy-assets', 'dev'], () => {});
Sparky.task('clean', () => Sparky.src(BUILD_PATH).clean(BUILD_PATH));
Sparky.task('copy-assets', () => Sparky.src('assets/**/**.*', { base: './src' }).dest('./build'));

function buildProductionBundle() {
  const fuse = init(true);
  fuse.bundle('app').instructions('>index.jsx');
  fuse.run();
}

function devServer() {
  const fuse = init(false);
  fuse.dev({ port: 3010, root: false }, server => proxyServer(server.httpServer.app));
  fuse
    .bundle('app')
    .instructions('>index.js')
    .watch()
    .hmr();
  fuse.run();
}

function init(isProd) {
  return FuseBox.init({
    homeDir: 'src',
    output: 'build/$name.js',
    sourceMaps: !isProd,
    target: 'browser',
    useTypescriptCompiler: true,
    allowSyntheticDefaultImports: true,
    log: {
      showBundledFiles: false, // Don't list all the bundled files every time we bundle
      clearTerminalOnBundle: true, // Clear the terminal window every time we bundle
    },
    plugins: [
      EnvPlugin({
        NODE_ENV: isProd ? 'production' : 'dev',
        PAYMENTIQ_API_URL: process.env.PAYMENTIQ_API_URL,
      }),
      CSSPlugin(),
      [SassPlugin({ importer: true, omitSourceMapUrl: !isProd, indentedSyntax: true }), CSSPlugin()],
      JSONPlugin(),
      WebIndexPlugin({ template: 'src/index.html' }),
      isProd && QuantumPlugin({ uglify: true }),
    ],
  });
}
