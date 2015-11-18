var one = require('./filter-default');
var two = require('./filter-1');

var go = function(name) {
    return name({
        msg1: {from: 'jack@example.com', to: 'jill@example.org'},
        msg2: {from: 'noreply@spam.com', to: 'jill@example.org'},
        msg3: {from: 'boss@work.com', to: 'jack@example.com'}
    }, [
        {from: '*@work.com', action: 'tag work'},
        {from: '*@spam.com', action: 'tag spam'},
        {from: 'jack@example.com', to: 'jill@example.org', action: 'folder jack'},
        {to: 'jill@example.org', action: 'forward to jill@elsewhere.com'}
    ])
}




console.time('launch1')
for (var i = 100000; i >= 0; i--) {
    go(one)
};
console.timeEnd('launch1')



console.time('launch2')
for (var i = 100000; i >= 0; i--) {
    go(two)
};
console.timeEnd('launch2')