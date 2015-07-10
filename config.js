System.config({
  "baseURL": "/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "bower:*": "jspm_packages/bower/*.js"
  }
});

System.config({
  "map": {
    "Hypercubed/systemjs-plugin-html": "github:Hypercubed/systemjs-plugin-html@master",
    "d3": "github:mbostock/d3@3.5.6",
    "html": "github:Hypercubed/systemjs-plugin-html@master",
    "polyHTML": "bower:polymer@1.0.5/polymer.html!html",
    "polymer": "bower:polymer@1.0.5",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "wc": "bower:webcomponentsjs@0.7.5/webcomponents-lite.min",
    "bower:polymer@1.0.5": {
      "webcomponentsjs": "bower:webcomponentsjs@0.7.5"
    }
  }
});

