// символу * в маске удовлетворяет любое число (0 или более) любых символов
// символу ? — один любой символ.
// Если свойства from или to отсутствуют в правиле фильтрования, то в качестве значения по умолчанию используется *. 
// Как следствие, если в правиле отсутствуют оба свойства from и to, то ему удовлетворяют все письма.
var compare = function(what, to) {
    var match = true;
    var stopper;
    var gap = 0;
    for (var i = 0; i < what.length; i++) {
        if (stopper) {
            gap++;
            if (what[i] === stopper) {
                stopper = undefined;
            }
            continue;
        }

        if (to[i - gap] === '?') {
            continue;
        }
        if (to[i - gap] === '*') {
            stopper = to[i + 1];
            gap++;
            continue;
        }
        if (what[i] !== to[i - gap]) {
            match = false;
            break;
        }
    };

    return match;
}

var filter2 = function (messages, filters) {
    var result = {};

    for (var i = 0, l = filters.length; i < l; i++) {
        for (var name in messages) { 
            result[name] = result[name] || [];

            if (
                compare(messages[name].from, filters[i].from || '*') &&
                compare(messages[name].to, filters[i].to || '*')
            ) {
                result[name].push(filters[i].action);
            }
        };
    };

    return result;
};