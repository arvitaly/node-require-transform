var index = require('./../index');
var fixture1 = "fix1", fixture2 = "fix2";
it("when require string, should call callback and change to result", () => {
    var cb = jasmine.createSpy();
    cb.and.returnValue([fixture1, fixture2]);
    var result = index("console.log('a'); function a(){ require('b') } a()", cb);
    expect(cb.calls.allArgs()).toEqual([[["b"]]]);
    var require = jasmine.createSpy();
    eval(result);
    expect(require.calls.allArgs()).toEqual([[fixture1, fixture2]]);
})