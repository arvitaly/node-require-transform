var fixture1 = "fix1";
it("when require string, should call callback and change to result", () => {
    var index = require('./../index');
    var cb = jasmine.createSpy();
    cb.and.returnValue(fixture1);
    var result = index("console.log('a'); require('b')", cb);
    expect(cb.calls.allArgs()).toEqual([["b"]]);
    expect(result).toBe("console.log('a'); require('" + fixture1 + "')");
})