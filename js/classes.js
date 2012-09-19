//      Classes inheritance tools

//      Started to write in September 2012 by Alexei Ilyin,
//      alexei.iljin@gmail.com

// Defining `log()` function for simple logging
var log = window.console.log.bind(window.console);

(function(w) {
    'use strict';

    // `extend_opts()` creates options object
    //
    // Usage:
    //
    // - `extend_opts(source, additional_opts)`
    // - `extend_opts(additional_opts)`
    w.extend_opts = function(source, options) {
        var result = {};

        if (typeof source !== undefined) {
            for (var sKey in source) {
                result[sKey] = source[sKey];
            }
        }
        if (typeof options !== undefined) {
            for (var oKey in options) {
                result[oKey] = options[oKey];
            }
        }

        return result;
    };

    // `extend()` makes inheritance of objects
    //
    // Usage:
    //
    // - extend(ChildClass, ParentClass)
    w.extend = function(Child, Parent) {
        var F = function () {};
        F.prototype = Parent.prototype;
        var f = new F();

        for (var prop in Child.prototype) {
            f[prop] = Child.prototype[prop];
        }
        Child.prototype = f;
        Child.prototype['super'] = Parent.prototype;
    };

}(window));