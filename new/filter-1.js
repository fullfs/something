var compare = function (what, expr) {
    var result = true;
    if (!expr) {
        return result;
    }

    var stopper;
    var gap = 0;
    for (var i = 0; i < what.length; i++) {
        if (stopper) {

            if (what[i] === stopper) {
                stopper = undefined;
            } else {
                gap++;
            }

            continue;
        }

        if (expr[i - gap] === '*') {
            stopper = expr[i - gap + 1];
            continue;
        }

        if (expr[i - gap] === '?') {
            continue;
        }

        if (what[i] !== expr[i - gap]) {
            result = false;
            break;
        }
    };

    return result;
}


var filter = function (messages, filters) {
    var result = {};

    for (var i = 0, l = filters.length; i < l; i++) {
        for (var name in messages) { 
            result[name] = result[name] || [];

            if (
                compare(messages[name].from, filters[i].from) &&
                compare(messages[name].to, filters[i].to)
            ) {
                result[name].push(filters[i].action);
            }
        };
    };

    return result;
};

module.exports = filter;


// var ok = filter({
//     msg1: {from: 'jack@example.com', to: 'jill@example.org'},
//     msg2: {from: 'noreply@spam.com', to: 'jill@example.org'},
//     msg3: {from: 'boss@work.com', to: 'jack@example.com'}
// }, [
//     {from: '*@work.com', action: 'tag work'},
//     {from: '*@spam.com', action: 'tag spam'},
//     {from: 'jack@example.com', to: 'jill@example.org', action: 'folder jack'},
//     {to: 'jill@example.org', action: 'forward to jill@elsewhere.com'}
// ])


// console.log(ok)
// 

// console.log(compare('jill@example.org', '*'))


// {
//     msg1: ['folder jack', 'forward to jill@elsewhere.com'],
//     msg2: ['tag spam', 'forward to jill@elsewhere.com'],
//     msg3: ['tag work']
// }