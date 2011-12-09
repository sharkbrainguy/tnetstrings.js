#!/usr/bin/env node
var tnetstrings = require('./tnetstrings'),
    assert = require('assert');

[
    ['0:~', null],
    ['5:false!', false],
    ['4:test,', 'test'],
    ['3:123#', 123],
    ["16:5:hello,5:12345#}", {hello: 12345}],
    ["32:5:hello,5:12345#5:hello,5:56789#]", ["hello", 12345, "hello", 56789]],
    ["9:3.1415926^", 3.1415926]
].forEach(function (test) {
    assert.deepEqual( tnetstrings.parse(test[0]).value, test[1] );
    assert.deepEqual( tnetstrings.dump(test[1]), test[0] );
});


// test escaping unicode characters as JSON strings
function roundTrip(data, opt) {
    return tnetstrings.parse(tnetstrings.dump(data, opt), opt).value;
}

assert.throws(function () { tnetstrings.dump('\u9999'); });
assert.doesNotThrow(function () { tnetstrings.dump('\u9999', {stringsAreJSON: true}); });
assert.equal('\u9999', roundTrip('\u9999', {stringsAreJSON: true}));

console.log('tests done');
