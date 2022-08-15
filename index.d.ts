import { Configuration } from 'webpack';

export declare type PicoConfig = {
  /** javascript entry */
  entry: string[];
  build: {
    /** javascript or typescript match glob */
    jsGlob: string[];
    /** style match glob */
    styleGlob: string[];
  };
  postCssOption: {
    //
  };
  /** output file */
  outDir: {
    es: string;
    commonjs: string;
    umd: string;
  };
  /** custom webpack config overwrite default config */
  webpack: Omit<Configuration, 'entry'>;
  /** custom postcss plugin, if provide webpack custom webpack config, this configuration don't work */
  postCssPlugins: any[];
};
