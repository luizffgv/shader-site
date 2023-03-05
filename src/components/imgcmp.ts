import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./imgcmp.scss?string";

/** Lets you compare two images by hovering over them */
@customElement("x-imgcmp")
export class ImageCompareElement extends LitElement {
  static override styles = unsafeCSS(styles);

  /** Percentage where the first image will be cut */
  @state()
  private cutoff: number = 50;

  /** First image's source */
  @property({ attribute: false })
  imageSource1: string | null = null;

  /** Second image's source */
  @property({ attribute: false })
  imageSource2: string | null = null;

  /** First image's alt text */
  @property({ attribute: false })
  imageText1: string | null = null;

  /** Second image's alt text */
  @property({ attribute: false })
  imageText2: string | null = null;

  constructor() {
    super();

    this.addEventListener("mousemove", (event) => {
      const { left, width } = this.getBoundingClientRect();
      const leftOffset = event.x - left;
      this.cutoff = (leftOffset / width) * 100;
    });
  }

  override render() {
    if (
      [
        this.imageSource1,
        this.imageSource2,
        this.imageText1,
        this.imageText2,
      ].every((element) => element != null)
    )
      return html`
        <div id="container">
          <img
            id="first"
            draggable="false"
            src=${this.imageSource1}
            alt=${this.imageText1}
          /><img
            id="second"
            draggable="false"
            style="clip-path: inset(0 0 0 ${this.cutoff}%);"
            src=${this.imageSource2}
            alt=${this.imageText2}
          />
          <div id="divider" style="left: ${this.cutoff}%"></div>
        </div>
      `;

    return html`<p>Missing image sources or alt text</p>`;
  }
}
