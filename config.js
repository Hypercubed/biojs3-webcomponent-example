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
    // MANUAL //
    "html": "github:Hypercubed/systemjs-plugin-html@master",
    "wc": "bower:webcomponentsjs@0.7.5/webcomponents-lite.min",
    "polyHTML": "bower:polymer@1.0.5/polymer.html!html",

    "d3": "github:mbostock/d3@3.5.6",
    "polymer": "bower:polymer@1.0.5",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "bower:polymer@1.0.5": {
      "webcomponentsjs": "bower:webcomponentsjs@0.7.5"
    }
  }
});
