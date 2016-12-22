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

  append(outerHTML) {
    if (this.nodes.length === 0) return this;

    if (typeof outerHTML === "object") {
      outerHTML = window.$l(outerHTML);
    }

    if (typeof outerHTML === "string") {
      this.each(node => {
        node.innerHTML += outerHTML;
      });
    }
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each(node => {
        node.setAttribute(key, val);
      });
    } else {
      return this.node[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(switchClass) {
    this.each(node => node.classList.toggle(switchClass));
  }

  children() {
    let childrenNodes = [];

    this.each(node => {
      childrenNodes = childrenNodes.concat(Array.from(node.children));
    });

    return new DOMNodeCollection(childrenNodes);
  }

  parent() {
    const parentNodes = [];

    this.each(node => {
      parentNodes.push(node.parentNode);
    });

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let foundNodes = [];

    this.each(node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });

    return foundNodes;
  }

  remove() {
    this.each(node => {
      node.parentNode.removeChild(node);
    });
  }

  on(eventType, cb) {
    this.each(node => {
      node.addEventListener(eventType, cb);
      const key = `${eventType}`;
      if (typeof node[key] === "undefined") {
        node[key] = [];
      }

      node[key].push(cb);
    });
  }

  off(eventType) {
    this.each(node => {
      const key = `${eventType}`;
      if (node[key]) {
        node[key].forEach(cb => {
          node.removeEventListener(eventType, cb);
        });
      }
      
      node[key] = [];
    });
  }
}

module.exports = DOMNodeCollection;
