import "./styles.scss?apply";

import { MultiImageCompareElement } from "Components/multiimgcmp";

import SCENES, { Scene } from "Assets/scenes.js";
import SHADERPACKS, { Shaderpack } from "Assets/shaderpacks.js";
import { throwIfNull, trySpecify } from "@luizffgv/ts-conversions";
import { Axis, scrollOnDrag } from "Scripts/scroll";
import { DEFAULT_SHADERPACK_NAME } from "./constants";

function getImagePath(scene: Scene, shaderpack: Shaderpack) {
  return `assets/scenes/${scene.dir}/${shaderpack.file}`;
}

function setSceneOptions(comparer: MultiImageCompareElement, scene: Scene) {
  comparer.clearOptions();

  for (const shaderpackName of scene.shaderpacks)
    comparer.setOption(
      shaderpackName,
      getImagePath(scene, SHADERPACKS[shaderpackName])
    );

  if (!scene.shaderpacks.includes(DEFAULT_SHADERPACK_NAME))
    throw new Error(
      `Scene ${scene.name} is missing the default shaderpack ${DEFAULT_SHADERPACK_NAME}.`
    );
  comparer.default = [DEFAULT_SHADERPACK_NAME, DEFAULT_SHADERPACK_NAME];
}

addEventListener(
  "DOMContentLoaded",
  () => {
    const elements = {
      shareButton: throwIfNull(document.getElementById("share")),
      compare: trySpecify(
        document.getElementById("cmp"),
        MultiImageCompareElement
      ),
      grid: throwIfNull(document.getElementById("grid")),
    };

    elements.shareButton.addEventListener("click", () =>
      navigator.share({
        title: "Shader Site",
        text: "Compare Minecraft shaders",
        url: window.location.href,
      })
    );

    scrollOnDrag(elements.grid, Axis.Horizontal);

    setSceneOptions(elements.compare, throwIfNull(SCENES[0]));

    const grid = document.getElementById("grid");
    if (grid == null) throw new Error("Couldn't find #grid element");

    // We need to have at least one scene
    if (SCENES.length === 0) throw new Error("No scenes found");

    for (const entry of grid.children) {
      if (!(entry instanceof HTMLElement))
        throw new Error("entry is not an HTML element");

      const select = () => {
        const sceneIndex = Number.parseInt(throwIfNull(entry.dataset["index"]));
        const scene = throwIfNull(SCENES[sceneIndex]);

        const previousActive = grid.querySelector(
          ":scope > [aria-checked='true']"
        );
        previousActive?.setAttribute("aria-checked", "false");

        entry.setAttribute("aria-checked", "true");

        setSceneOptions(elements.compare, scene);

        // Avoid scrolling if the image is already completely in the screen
        const rect = elements.compare.getBoundingClientRect();
        if (rect.y + rect.height > document.documentElement.clientHeight)
          elements.compare.scrollIntoView({ behavior: "smooth" });
      };

      entry.addEventListener("click", select);
      entry.addEventListener("keypress", (event) => {
        event.preventDefault();
        if (event.key === " ") select();
      });
    }

    throwIfNull(grid.firstElementChild).setAttribute("aria-checked", "true");
  },
  { once: true }
);
