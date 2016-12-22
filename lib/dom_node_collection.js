class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(el => cb(el));
  }

  html(html) {
    if (typeof html === "string") {
      this.each(node => {
        node.innerHTML = html;
      });
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(content) {
    if (this.nodes.length === 0) return this;

    if (typeof content === "object") {
      content = window.$l(content);
    }

    if (typeof content === "string") {
      this.each(node => {
        node.innerHTML += content;
      });
    }
  }
}

module.exports = DOMNodeCollection;
