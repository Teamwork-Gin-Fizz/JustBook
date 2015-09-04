console.log('tests-config.js loaded');
System.config({
    baseURL: "../../../",
    defaultJSExtensions: true,
    transpiler: "babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system"
        ]
    },
    paths: {
        "github:*": "user/jspm_packages/github/*",
        "npm:*": "user/jspm_packages/npm/*"
    },

    map: {
        "babel": "npm:babel-core@5.8.23",
        "babel-runtime": "npm:babel-runtime@5.8.20",
        "bootstrap": "github:twbs/bootstrap@3.3.5",
        "chai": "npm:chai@3.2.0",
        "core-js": "npm:core-js@1.1.3",
        "handlebars": "github:components/handlebars.js@4.0.0",
        "jquery": "github:components/jquery@2.1.4",
        "mocha": "npm:mocha@2.3.0",
        "sammy": "npm:sammy@0.7.6",
        "github:jspm/nodelibs-buffer@0.1.0": {
            "buffer": "npm:buffer@3.4.3"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.1": {
            "process": "npm:process@0.10.1"
        },
        "github:twbs/bootstrap@3.3.5": {
            "jquery": "github:components/jquery@2.1.4"
        },
        "npm:babel-runtime@5.8.20": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:buffer@3.4.3": {
            "base64-js": "npm:base64-js@0.0.8",
            "ieee754": "npm:ieee754@1.1.6",
            "is-array": "npm:is-array@1.0.1"
        },
        "npm:chai@3.2.0": {
            "assertion-error": "npm:assertion-error@1.0.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "deep-eql": "npm:deep-eql@0.1.3",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0",
            "type-detect": "npm:type-detect@1.0.0"
        },
        "npm:core-js@1.1.3": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:deep-eql@0.1.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "type-detect": "npm:type-detect@0.1.1"
        },
        "npm:mocha@2.3.0": {
            "css": "github:systemjs/plugin-css@0.1.15"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:sammy@0.7.6": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        }
    }
});
