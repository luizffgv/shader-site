type Stringifiable = object | string | boolean | number | null | undefined;

/**
 * Escapes special HTML characters in a string by replacing them with HTML
 * entities.
 */
function escapeHTML(value: Stringifiable) {
  return String(value)
    .replaceAll("&", "&amp")
    .replaceAll(">", "&gt")
    .replaceAll("<", "&lt")
    .replaceAll('"', "&quot")
    .replaceAll("'", "&#39")
    .replaceAll("`", "&#96");
}

/**
 * Tag function to mark a string as HTML code.
 *
 * @remarks
 *
 * Interpolated values have their special HTML characters escaped.
 *
 * Some IDEs and extensions will properly format and highlight code inside this
 * tag.
 */
export function html(
  strings: TemplateStringsArray,
  ...values: Stringifiable[]
): string {
  const valueStrings = values.map((value) => escapeHTML(value));
  // valStrings count could be one less than strings count, so we add a dummy
  // string
  valueStrings.push("");

  return strings
    .map((string, index) => string + valueStrings[index])
    .reduce((previous, current) => previous + current);
}
