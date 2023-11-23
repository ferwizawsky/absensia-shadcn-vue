import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), obfuscatorPlugin(obfuscateOpt())],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

function obfuscateOpt() {
  return {
    // include: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    options: {
      // your javascript-obfuscator options

      debugProtection: false,
      disableConsoleOutput: false,
      deadCodeInjection: false,

      compact: true,
      controlFlowFlattening: false,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjectionThreshold: 0.4,
      domainLock: [],
      domainLockRedirectUrl: "about:blank",
      forceTransformStrings: [],
      identifierNamesCache: null,
      identifierNamesGenerator: "hexadecimal",
      identifiersDictionary: [],
      identifiersPrefix: "",
      ignoreImports: true,
      inputFileName: "",
      log: true,
      numbersToExpressions: false,
      optionsPreset: "default",
      renamePropertiesMode: "safe",
      reservedNames: [],
      reservedStrings: [],
      seed: 0,
      selfDefending: false,
      simplify: true,
      sourceMap: false,
      sourceMapBaseUrl: "",
      sourceMapFileName: "",
      sourceMapMode: "separate",
      sourceMapSourcesMode: "sources-content",
      splitStrings: true,
      splitStringsChunkLength: 10,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 0.5,
      stringArrayEncoding: [],
      stringArrayIndexesType: ["hexadecimal-number"],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: "variable",
      stringArrayThreshold: 0.75,
      target: "browser",
      transformObjectKeys: false,
      unicodeEscapeSequence: false,

      // ...  [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
    },
  };
}
