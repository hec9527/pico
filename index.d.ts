import { Configuration } from 'webpack';

export declare type PicoConfig = {
  /** javascript entry */
  entry: string;
  build: {
    /** javascript or typescript match glob */
    jsGlob: string[];
    /** style match glob */
    styleGlob: string[];
  };

  /** output file */
  outDir: {
    es: string;
    cjs: string;
    umd: string;
  };
};
