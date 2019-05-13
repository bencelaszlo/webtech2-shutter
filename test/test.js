const assert = require('chai').assert;
const DAO = require('../dao/DAO');

describe('writeOrder()', () => {
    it('Write a request to MongoDB, the error should be null', function(done) {
        var testOrder = {};
        testOrder.body = "tiltBar=1&hinges=6&louvers=8&louverPins=16&glue=1&price=314&customer=Ursula+Undefined";
        DAO.writeOrder(testOrder, (res) => {
            //console.log(res);
            assert.equal(res.error, null);
            done();
        });
    });
});