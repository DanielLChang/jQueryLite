/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	window.$l = (arg) => {
	  switch (typeof(arg)) {
	    case "string":
	      const nodes = document.querySelectorAll(arg);
	      const nodesArray = Array.from(nodes);
	      return new DOMNodeCollection(nodesArray);
	    case "object":
	      if (arg instanceof HTMLElement) {
	        return new DOMNodeCollection([arg]);
	      }
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);