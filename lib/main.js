const DOMNodeCollection = require("./dom_node_collection");

const _docCbs = [];
let _docReady = false;

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
      break;
    case "function":
      if (_docReady) arg();
      else _docCbs.push(arg);
  }
};

window.$l.extend = (base, ...args) => {
  args.forEach( arg => {
    for (let i = 0; i < args.length; i++) {
      base[i] = args[i];
    }
  });
  return base;
};

window.$l.ajax = (options) => {
  
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    data: {},
    success: () => {},
    error: () => {}
  };

  options = window.$l.extend(defaults, options);

  request.open(options.method, options.url);
  request.onload = (e) => {
    if (request.status === 200) options.success(request.response);
    else options.error(request.response);
  };
  request.send(JSON.stringify(options.data));

};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docCbs.forEach( fn => fn() );
});
