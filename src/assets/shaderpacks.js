/**
 * Information about a shaderpack.
 * @typedef {object} Shaderpack
 * @property {`${string}.webp`} file Name of the image representing the
 * shaderpack in a scene.
 */

const SHADERPACKS = /** @type {const} */ ({
  Vanilla: {
    file: "Vanilla.webp",
  },
  "AstraLex 73.0 (Ultra)": {
    file: "AstraLex.webp",
  },
  "Chocapic13 V9 Extreme": {
    file: "Chocapic13 V9 Extreme.webp",
  },
  "Chocapic13 V9 Ultra": {
    file: "Chocapic13 V9 Ultra.webp",
  },
  "Chocapic13 V9 High": {
    file: "Chocapic13 V9 High.webp",
  },
  "Chocapic13 V9 Medium": {
    file: "Chocapic13 V9 Medium.webp",
  },
  "Chocapic13 V9 Low": {
    file: "Chocapic13 V9 Low.webp",
  },
  "Complementary 4.6 (Extreme)": {
    file: "Complementary.webp",
  },
  "Complementary Reimagined 2.0.2 (Ultra)": {
    file: "Complementary Reimagined.webp",
  },
  "Continuum 2.0.5 (Ultra)": {
    file: "Continuum.webp",
  },
  "Rethinking Voxels r0.1-alpha10 (High)": {
    file: "Rethinking Voxels.webp",
  },
  "Rethinking Voxels r0.1-alpha10 (Ultra)": {
    file: "Rethinking Voxels (Ultra).webp",
  },
  "SEUS PTGI HRR 3 (Default)": {
    file: "SEUS PTGI HRR 3.webp",
  },
});

/** @typedef {keyof typeof SHADERPACKS} ShaderpackName */

/** @type {Readonly<{[Name in ShaderpackName]: Readonly<Shaderpack>}>} */
export default SHADERPACKS;
