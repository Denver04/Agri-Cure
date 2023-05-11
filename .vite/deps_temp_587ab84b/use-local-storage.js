import {
  require_react
} from "./chunk-FLAVOKRJ.js";
import {
  __commonJS
} from "./chunk-AC2VUBZ6.js";

// node_modules/use-local-storage/dist/index.js
var require_dist = __commonJS({
  "node_modules/use-local-storage/dist/index.js"(exports) {
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var react_1 = require_react();
    function useLocalStorage(key, defaultValue, options) {
      var opts = (0, react_1.useMemo)(function() {
        return __assign({ serializer: JSON.stringify, parser: JSON.parse, logger: console.log, syncData: true }, options);
      }, [options]);
      var serializer = opts.serializer, parser = opts.parser, logger = opts.logger, syncData = opts.syncData;
      var rawValueRef = (0, react_1.useRef)(null);
      var _a = (0, react_1.useState)(function() {
        if (typeof window === "undefined")
          return defaultValue;
        try {
          rawValueRef.current = window.localStorage.getItem(key);
          var res = rawValueRef.current ? parser(rawValueRef.current) : defaultValue;
          return res;
        } catch (e) {
          logger(e);
          return defaultValue;
        }
      }), value = _a[0], setValue = _a[1];
      (0, react_1.useEffect)(function() {
        if (typeof window === "undefined")
          return;
        var updateLocalStorage = function() {
          if (value !== void 0) {
            var newValue = serializer(value);
            var oldValue = rawValueRef.current;
            rawValueRef.current = newValue;
            window.localStorage.setItem(key, newValue);
            window.dispatchEvent(new StorageEvent("storage", {
              storageArea: window.localStorage,
              url: window.location.href,
              key,
              newValue,
              oldValue
            }));
          } else {
            window.localStorage.removeItem(key);
            window.dispatchEvent(new StorageEvent("storage", {
              storageArea: window.localStorage,
              url: window.location.href,
              key
            }));
          }
        };
        try {
          updateLocalStorage();
        } catch (e) {
          logger(e);
        }
      }, [value]);
      (0, react_1.useEffect)(function() {
        if (!syncData)
          return;
        var handleStorageChange = function(e) {
          if (e.key !== key || e.storageArea !== window.localStorage)
            return;
          try {
            if (e.newValue !== rawValueRef.current) {
              rawValueRef.current = e.newValue;
              setValue(e.newValue ? parser(e.newValue) : void 0);
            }
          } catch (e2) {
            logger(e2);
          }
        };
        if (typeof window === "undefined")
          return;
        window.addEventListener("storage", handleStorageChange);
        return function() {
          return window.removeEventListener("storage", handleStorageChange);
        };
      }, [key, syncData]);
      return [value, setValue];
    }
    exports.default = useLocalStorage;
  }
});
export default require_dist();
//# sourceMappingURL=use-local-storage.js.map
