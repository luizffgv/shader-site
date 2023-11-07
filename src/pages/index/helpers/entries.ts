import { throwIfNull } from "@luizffgv/ts-conversions";
import SCENES, { Scene } from "Assets/scenes.js";
import SHADERPACKS, { Shaderpack } from "Assets/shaderpacks";
import { html } from "Scripts/tags";
import { DEFAULT_SHADERPACK_NAME } from "../constants";

const DEFAULT_SHADERPACK = SHADERPACKS[DEFAULT_SHADERPACK_NAME];

/**
 * Returns the path to a scene screenshot.
 *
 * @param scene - Scene used.
 * @param shaderpack - Shaderpack used.
 * @returns Path.
 */
function getSceneImagePath(scene: Scene, shaderpack: Shaderpack) {
  return `assets/scenes/${scene.dir}/${shaderpack.file}`;
}

/**
 * Returns the HTML string representation of a scene entry.
 *
 * @param sceneIndex - Index of the scene in the {@link SCENES} array.
 * @returns Entry representation.
 */
function sceneToEntryHTML(sceneIndex: number) {
  const SCENE = throwIfNull(SCENES[sceneIndex]);

  return html`
    <div
      class="entry"
      data-index="${sceneIndex}"
      tabindex="0"
      role="radio"
      aria-label="${SCENE.name} scene"
      aria-checked="false"
    >
      <img
        src="${getSceneImagePath(SCENE, DEFAULT_SHADERPACK)}"
        alt="${SCENE.name} on ${DEFAULT_SHADERPACK_NAME}"
        aria-hidden="true"
      />
      <p class="name" aria-hidden="true">${SCENE.name}</p>
    </div>
  `;
}

/**
 * Returns all scene entries as HTML represented by a string.
 *
 * @returns Entries representation.
 */
function entriesHTML() {
  return [...SCENES.keys()].map((index) => sceneToEntryHTML(index)).join("");
}

export default function () {
  return entriesHTML();
}
