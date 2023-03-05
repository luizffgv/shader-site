/**
 * Information about a specific scene for screenshots.
 * @typedef {object} Scene
 * @property {string} name The name of the scene.
 * @property {string} dir The name of the scene's directory.
 * @property {string} version The Minecraft version used.
 * @property {string} seed The world seed used.
 * The same seed will not always produce the same blocks as it seems to depend
 * on chunk loading order, but the worlds should be similar enough.
 * @property {[number, number]} resolution The resolution used.
 * @property {number} fov The field of view used.
 * @property {number} time The in-game time of the scene.
 * @property {number} distance The render distance used.
 * @property {number} brightness The brightness used, from 0 to 10.
 * @property {[number, number, number, number, number]} coordinates Scene
 * coordinates.
 * @property {import("./shaderpacks").ShaderpackName[]} shaderpacks Shaderpacks
 * available to view the scene with.
 */

/** @type {readonly Readonly<Scene>[]} */
export default [
  {
    name: "Forest",
    dir: "forest",
    version: "1.20.2",
    seed: "3739530015537911763",
    resolution: [1920, 1080],
    fov: 70,
    time: 4000,
    distance: 16,
    brightness: 50,
    coordinates: [85, 88, -158, -134, 2],
    shaderpacks: [
      "Vanilla",
      "AstraLex 73.0 (Ultra)",
      "Chocapic13 V9 Extreme",
      "Chocapic13 V9 High",
      "Chocapic13 V9 Low",
      "Chocapic13 V9 Medium",
      "Chocapic13 V9 Ultra",
      "Complementary 4.6 (Extreme)",
      "Complementary Reimagined 2.0.2 (Ultra)",
      "Continuum 2.0.5 (Ultra)",
      "Rethinking Voxels r0.1-alpha10 (High)",
      "Rethinking Voxels r0.1-alpha10 (Ultra)",
      "SEUS PTGI HRR 3 (Default)",
    ],
  },
  {
    name: "Mansion",
    dir: "mansion",
    version: "1.20.2",
    seed: "3739530015537911763",
    resolution: [1920, 1080],
    fov: 70,
    time: 23_500,
    distance: 16,
    brightness: 50,
    coordinates: [473, 115.0625, 626, -50, 0],
    shaderpacks: [
      "Vanilla",
      "AstraLex 73.0 (Ultra)",
      "Chocapic13 V9 Extreme",
      "Chocapic13 V9 High",
      "Chocapic13 V9 Low",
      "Chocapic13 V9 Medium",
      "Chocapic13 V9 Ultra",
      "Complementary 4.6 (Extreme)",
      "Complementary Reimagined 2.0.2 (Ultra)",
      "Continuum 2.0.5 (Ultra)",
      "Rethinking Voxels r0.1-alpha10 (High)",
      "Rethinking Voxels r0.1-alpha10 (Ultra)",
      "SEUS PTGI HRR 3 (Default)",
    ],
  },
];
