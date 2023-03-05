import { LitElement, html, unsafeCSS } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { ImageCompareElement } from "./imgcmp";
import styles from "./multiimgcmp.scss?string";

/** A selectable option for the image comparison. */
type Option = {
  /** Display name of the option. */
  name: string;
  /** URL of the image represented by the option. */
  imageSource: string;
};

@customElement("x-multiimgcmp")
export class MultiImageCompareElement extends LitElement {
  static override styles = unsafeCSS(styles);

  /** Maps option names to image sources */
  @state()
  private options: Map<string, Option> = new Map();

  /**
   * Name of the default option used when the selected first option is invalid
   * or empty.
   */
  @state()
  private defaultOption1: string | null = null;

  /**
   * Name of the default option used when the selected second option is invalid
   * or empty.
   */
  @state()
  private defaultOption2: string | null = null;

  /** Name of the currently selected first option */
  @state()
  private selected1: string | null = null;

  /** Name of the currently selected second option */
  @state()
  private selected2: string | null = null;

  /** Underlying image comparator element */
  @state()
  private imgcmp: ImageCompareElement = new ImageCompareElement();

  /** First option selector element. */
  @query("#sel1")
  private select1!: HTMLInputElement | null;

  /** Second option selector element. */
  @query("#sel2")
  private select2!: HTMLInputElement | null;

  /** Returns the names of the selected options. */
  get selectedOptions() {
    return [this.select1, this.select2].map((input) => input?.value || null);
  }

  /** Sets the default options. */
  set default(options: [string, string]) {
    [this.defaultOption1, this.defaultOption2] = [
      options[0].toLowerCase(),
      options[1].toLowerCase(),
    ];
  }

  constructor() {
    super();

    [this.imgcmp.imageText1, this.imgcmp.imageText2] = [
      "First image",
      "Second image",
    ];
  }

  /** Manually selects the options */
  select(left?: string | null, right?: string | null) {
    if (left != null) {
      left = left.toLowerCase();

      this.selected1 = left;
    }
    if (right != null) {
      right = right.toLowerCase();

      this.selected2 = right;
    }
  }

  /** Adds a new option or modifies an existing one */
  setOption(name: string, source: string) {
    this.options.set(name.toLowerCase(), { name, imageSource: source });
    this.requestUpdate();

    this.validateInputs();
  }

  /** Clears all options. */
  clearOptions() {
    this.options.clear();
    this.requestUpdate();

    this.validateInputs();
  }

  /** Returns the list of options, as HTML */
  private getOptionsHTML() {
    return map(
      this.options,
      ({ 1: { name } }) => html`<option>${name}</option>`
    );
  }

  private onInput1(event: Event) {
    const target = event.target as HTMLSelectElement;
    const nameLower = target.value.toLowerCase();

    const source = this.options.get(nameLower) ?? null;

    this.selected1 = source ? nameLower : null;

    this.validateInputs();
  }

  private onInput2(event: Event) {
    const tgt = event.target as HTMLSelectElement;
    const nameLower = tgt.value.toLowerCase();

    const source = this.options.get(nameLower) ?? null;

    this.selected2 = source ? nameLower : null;

    this.validateInputs();
  }

  private validateInputs() {
    if (this.select1 != null && this.select2 != null)
      for (const input of [this.select1, this.select2])
        if (this.options.has(input.value.toLowerCase()))
          input.classList.remove("invalid");
        else input.classList.add("invalid");
  }

  override render() {
    // Set sources to the selected options, otherwise the default options (if available), otherwise null
    this.imgcmp.imageSource1 =
      (this.selected1 && this.options.get(this.selected1)?.imageSource) ??
      (this.defaultOption1 &&
        this.options.get(this.defaultOption1)?.imageSource) ??
      null;
    this.imgcmp.imageSource2 =
      (this.selected2 && this.options.get(this.selected2)?.imageSource) ??
      (this.defaultOption2 &&
        this.options.get(this.defaultOption2)?.imageSource) ??
      null;

    return html`
      <div id="top-bar">
        <div id="selectors" role="group" aria-label="Shaderpack selector">
          <input
            id="sel1"
            list="shaders"
            placeholder="Pick a shaderpack"
            @input=${this.onInput1}
            aria-label="First shaderpack selector"
          />
          <input
            id="sel2"
            list="shaders"
            placeholder="Pick a shaderpack"
            @input=${this.onInput2}
            aria-label="Second shaderpack selector"
          />
          <datalist id="shaders">${this.getOptionsHTML()}</datalist>
          <div id="arrow" aria-hidden="true">
            <ion-icon name="caret-down-outline"></ion-icon>
          </div>
        </div>
      </div>
      ${this.imgcmp}
    `;
  }
}
