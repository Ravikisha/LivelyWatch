export interface LivelyOptions {
  port: number;
  host: string;
  open: boolean;
  root: string;
  watch: string;
  ignore: string;
  spa: boolean;
  entryFile: string;
  cssInject: boolean;
  https: boolean;
  cert: string;
  key: string;
  proxy: Record<string, string>;
}
