//      Classes inheritance tools tests

// Options extend tests
// --------------------
test('Options extend', function() {
    var default_opts = {
        opt1: 'option 1'
    };
    var addition_opts = {
        opt2: null
    };
    // Testing with two 'dicts': default options and addition options
    var extended_opts = window.extend_opts(default_opts, addition_opts);

    equal(extended_opts.opt1, 'option 1');
    equal(extended_opts.opt2, null);
    equal(extended_opts.nonexistent, undefined);

    // Testing with single options
    // (needs if we want to get `undefined`, insted of exception)
    var extended_opts_v2 = window.extend_opts(addition_opts);

    equal(extended_opts.opt2, null);
    equal(extended_opts.nonexistent, undefined);
});

// Class inheritance tests
// -----------------------
test('Class inheritance', function() {
    // Preparing test classes
    // ----------------------

    // Base class
    function BaseClass() {
        this.name = 'Base';
        this.repr_string = '['+this.name+']';
    }
    BaseClass.prototype = {
        constructor: BaseClass,
        getName: function() {
            return this.name;
        },
        getReprString: function() {
            return this.repr_string;
        }
    };

    // Child class
    function ChildClass(options) {
        this.opts = window.extend_opts(options);
        BaseClass.call(this, this.opts);
        this.parent_name = this.name;

        this.name = 'Child';
        this.repr_string = '['+this.parent_name+'] => ['+this.name+']';
    }
    ChildClass.prototype = {
        constructor: ChildClass
    };
    window.extend(ChildClass, BaseClass);


    // Tests
    // -----

    // ChildClass tests
    var c1 = new ChildClass({});
    
    equal(c1.getName(), 'Child');
    equal(c1.getReprString(), '[Base] => [Child]');


    // Another child class
    function AnotherChildClass(options) {
        ChildClass.call(this, options);
        log(this);
    }
    AnotherChildClass.prototype = {
        constructor: ChildClass,
        parmHandler: function(parm) {
            return '('+parm+') '+this.getReprString();
        }
    };
    window.extend(AnotherChildClass, ChildClass);

    // Tests
    var c2 = new AnotherChildClass({});
    
    equal(c2.parmHandler(), '(undefined) [Base] => [Child]');
    equal(c2.parmHandler('test'), '(test) [Base] => [Child]');
});