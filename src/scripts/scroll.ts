export enum Axis {
  Vertical,
  Horizontal,
}

/**
 * Makes an element scrollable by clicking and dragging.
 *
 * @param element - Target element.
 * @param axis - Scroll axis.
 */
export function scrollOnDrag(element: HTMLElement, axis: Axis) {
  let preDragging = true;
  let draggedDistance = 0;

  function moveListener(event: MouseEvent) {
    if (preDragging) {
      draggedDistance +=
        axis === Axis.Horizontal ? event.movementX : event.movementY;
      if (Math.abs(draggedDistance) > 32) preDragging = false;
    } else {
      if (axis === Axis.Horizontal) element.scrollBy(-event.movementX, 0);
      else element.scrollBy(0, -event.movementY);
    }
  }

  function downListener(event: MouseEvent) {
    event.preventDefault();

    addEventListener("mousemove", moveListener);

    addEventListener(
      "click",
      (event) => {
        if (!preDragging) event.stopPropagation();

        preDragging = true;
        draggedDistance = 0;

        removeEventListener("mousemove", moveListener);
      },
      { capture: true, once: true }
    );
  }

  element.addEventListener("mousedown", downListener);
}
