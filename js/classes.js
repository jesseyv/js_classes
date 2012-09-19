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

        function append_opts(opts) {
            for (var k in opts) {
                result[k] = opts[k];
            }
        }

        if (typeof source !== undefined) {
            append_opts(source);
        }
        if (typeof options !== undefined) {
            append_opts(options);
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