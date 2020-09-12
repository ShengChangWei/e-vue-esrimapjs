export default class EVueErimapLoader {

  getScript() {
    return document.getElementById('ess_arcgis_js');
  }
  // load the ArcGIS API on the page
  bootstrap(callback, options = {}) {
    // default options
    if (!options.url) {
      options.url = 'http://js.arcgis.com/3.23/';
    }

    // don't reload API if it is already loaded or in the process of loading
    if (this.getScript()) {
      if (callback) {
        callback(new Error('The ArcGIS API for JavaScript is already loaded.'));
      }
      return;
    }

    // create a script object whose source points to the API
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = options.url;
    script.id = 'ess_arcgis_js';

    // once the script is loaded...
    script.onload = () => {
      // we can now use Dojo's require() to load esri and dojo AMD modules
      const _dojoRequire = window['require'];

      if (callback) {
        // let the caller know that the API has been successfully loaded
        // and as a convenience, return the require function
        // in case they want to use it directly
        callback(null, _dojoRequire);
      }
    };

    // load the script
    document.body.appendChild(script);
  }

  dojoRequire(modules, callback) {
    if (this.isLoaded()) {
      // already loaded, just call require
      window['require'](modules, callback);
    } else {
      // wait for script to load then call require
      const script = this.getScript();
      if (script) {
        // Not yet loaded but script is in the body - use callback once loaded
        const onScriptLoad = () => {
          window['require'](modules, callback);
          script.removeEventListener('load', onScriptLoad, false);
        };
        script.addEventListener('load', onScriptLoad, false);
      } else {
        // Not bootstrapped
        throw new Error('The ArcGIS API for JavaScript has not been loaded. You must first call esriLoader.bootstrap()');
      }
    }
  }
  // has ArcGIS API been loaded on the page yet?
  isLoaded() {
    // TODO: instead of checking that require is defined, should this check if it is a function?
    return typeof window['require'] !== 'undefined' && this.getScript();
  }

  // lazy load the ArcGIS API for JavaScript
  load(options) {
    return new Promise((resolve, reject) => {
      // don't try to load a second time
      if (this.isLoaded()) {
        resolve(this.dojoRequire);
      }
      // wrap bootstrap in a promise
      this.bootstrap((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.dojoRequire);
        }
      }, options);
    });
  }

  // wrap Dojo require in a promise
  loadModules(moduleNames) {
    return new Promise((resolve) => {
      this.dojoRequire(moduleNames, (...modules) => {
        resolve(modules);
      });
    });
  }

  // convenience function to allow calling Dojo require w/ callback
  require(moduleNames, callback) {
    return this.dojoRequire(moduleNames, callback);
  }
}
