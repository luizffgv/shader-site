import "./styles.scss?apply";

import { MultiImageCompareElement } from "Components/multiimgcmp";

import scenes, { Scene } from "Assets/scenes.js";
import SHADERPACKS, { Shaderpack } from "Assets/shaderpacks.js";
import { throwIfNull, trySpecify } from "@luizffgv/ts-conversions";
import { Axis, scrollOnDrag } from "Scripts/scroll";

const DEFAULT_SHADERPACK_NAME = "Vanilla";

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

    setSceneOptions(elements.compare, throwIfNull(scenes[0]));

    const grid = document.getElementById("grid");
    if (grid == null) throw new Error("Couldn't find #grid element");

    // We need to have scenes and shaderpacks
    if (scenes.length === 0) throw new Error("No scenes found");
    if (Object.keys(SHADERPACKS).length === 0)
      throw new Error("No shaderpacks found");

    for (const scene of scenes) {
      const entry = grid.appendChild(document.createElement("div"));
      entry.setAttribute("tabindex", "0");
      entry.setAttribute("role", "radio");
      entry.setAttribute("aria-label", `${scene.name} scene`);
      entry.setAttribute("aria-checked", "false");
      entry.classList.add("entry");
      const select = () => {
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

      const image = entry.appendChild(document.createElement("img"));
      image.src = getImagePath(scene, SHADERPACKS[DEFAULT_SHADERPACK_NAME]);
      image.alt = `${scene.name} on ${DEFAULT_SHADERPACK_NAME}`;
      image.setAttribute("aria-hidden", "true");

      const name = entry.appendChild(document.createElement("p"));
      name.setAttribute("aria-hidden", "true");
      name.classList.add("name");
      name.textContent = scene.name;
    }

    throwIfNull(grid.firstElementChild).setAttribute("aria-checked", "true");
  },
  { once: true }
);
