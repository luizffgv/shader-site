import path from "node:path";
import scenes from "./src/assets/scenes.js";
import { lstat } from "node:fs/promises";
import SHADERPACKS from "./src/assets/shaderpacks.js";

const IMAGES_DIR = "./src/assets/fwd/scenes";

/** Whether errors were detected. */
let error = false;

const unusedShaderpacks = new Set(Object.keys(SHADERPACKS));

/**
 * Checks if a screenshot exists.
 *
 * @remarks
 *
 * May update {@link error} and log errors.
 *
 * @param {import("./src/assets/scenes.js").Scene} scene
 * @param {import("./src/assets/shaderpacks.js").ShaderpackName} shaderpackName
 */
async function checkExistence(scene, shaderpackName) {
  const shaderpack = SHADERPACKS[shaderpackName];

  const imagePath = path.join(IMAGES_DIR, scene.dir, shaderpack.file);

  await lstat(imagePath)
    .then((lstatResult) => {
      if (!lstatResult.isFile())
        throw new Error("Path exists, but doesn't refer to a file.");
    })
    .catch(() => {
      error = true;
      console.log(
        `Shaderpack ${shaderpackName} is missing in scene ${scene.name}.`
      );
    });

  unusedShaderpacks.delete(shaderpackName);
}

const checkResults = scenes.flatMap((scene) =>
  scene.shaderpacks.map((shaderpack) => checkExistence(scene, shaderpack))
);

await Promise.all(checkResults);

if (unusedShaderpacks.size != 0)
  for (const shaderpack of unusedShaderpacks) {
    console.log(`Shaderpack ${shaderpack} was not used in any scene.`);
    error = true;
  }

process.exit(error ? 1 : 0);
