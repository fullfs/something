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
            
            if (stopper === undefined) {
                break;
            }
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


var filter3 = function (messages, filters) {
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