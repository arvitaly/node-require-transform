var index = require('./../index');
var f = require('fixture2')();
it("when require string, should call callback and change to result", () => {
    var cb = jasmine.createSpy();
    cb.and.callFake((args) => {
        if (args[0].type == "Literal") {
            return [
                f("arg1", { type: "Literal", value: f("request1"), raw: "'" + f("request1") + "'" }),
                f("arg2", { type: "Literal", value: f("request2"), raw: "'" + f("request2") + "'" })
            ];
        }
    });
    var result = index("console.log('a'); function a(){ require('b'); require('m' + 'a'); } a()", cb);
    expect(cb.calls.count()).toBe(2);
    var require = jasmine.createSpy();
    eval(result);
    expect(require.calls.allArgs()).toEqual([[f("request1"), f("request2")], ['ma']]);
})