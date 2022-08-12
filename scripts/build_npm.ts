import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import { LICENSE as license, VERSION as version } from "../version.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  package: {
    name: "copb",
    version,
    description:
      "A functional composition framework built for TypesScript that provides type safety without the need for the usual countless overloads, thanks to some functional type trickery.",
    license,
    repository: {
      type: "git",
      url: "git+https://github.com/jajaperson/copb.git",
    },
    bugs: {
      url: "https://github.com/jajaperson/copb/issues",
    },
  },
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
