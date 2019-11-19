import { join } from 'path';
import rimraf from 'rimraf';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';

const terserInstance = terser({
  compress: {
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    warnings: false,
    drop_console: true,
    drop_debugger: true
  },
  output: {
    comments: false
  }
});

const env = process.env.NODE_ENV;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const generateRollupOptions = function generateRollupOptions(path) {
  try {
    const libDir = join(path, 'lib');
    const pkg = require(`${path}/package.json`);
    const entryFile = join(path, 'src/index.ts');
    const outputFile = join(path, 'lib/index.js');
    const externalList = [];

    const plugins = [



      nodeResolve({
        browser: true,
        extensions
      }),
      commonJs(),
      typescript({
        transpiler: 'babel',
        tsconfig: join(path, './tsconfig.json'),
        extensions
        //sourceMap: true
      }),
      env === 'production' && terserInstance,

    ].filter(Boolean);

    if (!pkg) return;

    if (pkg['peerDependencies']) {
      [].push.apply(externalList, Object.keys(pkg['peerDependencies']));
    }
    rimraf.sync(libDir);
    return {
      input: entryFile,
      plugins,
      output: {
        file: outputFile,
        format: 'umd',
        //sourceMap: 'inline' ,
        name: pkg['umdName'] || pkg['name']
      }
      // external: id => {
      //   return externalList.some(ex => {
      //     return new RegExp(ex).test(id);
      //   });
      // }
    };
  } catch (e) {}
};

export default generateRollupOptions(join(__dirname));
