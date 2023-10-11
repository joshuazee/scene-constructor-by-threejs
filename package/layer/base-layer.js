export class BaseLayer {
  constructor(options) {
    this.key = options.key || '';
    this.visible = options.visible || true;
    this.type = options.type;
    this.title = options.title;
    this.options = options;
  }
  setVisible(visible) {
    this.origin && (this.origin.visible = visible);
  }
}
