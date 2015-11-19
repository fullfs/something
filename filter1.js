// символу * в маске удовлетворяет любое число (0 или более) любых символов
// символу ? — один любой символ.
// Если свойства from или to отсутствуют в правиле фильтрования, то в качестве значения по умолчанию используется *. 
// Как следствие, если в правиле отсутствуют оба свойства from и to, то ему удовлетворяют все письма.


var filter = function (messages, filters) {
    var result = {};
    var filterFrom;
    var filterTo;

    for (var i = 0, l = filters.length; i < l; i++) {
        for (var name in messages) { 
            result[name] = result[name] || [];

            filterFrom = (filters[i].from || '*').replace(/\*/g, '.+');
            filterTo = (filters[i].to || '*').replace(/\*/g, '.+');

            if (
                messages[name].from.match(filterFrom) &&
                messages[name].to.match(filterTo)
            ) {
                result[name].push(filters[i].action);
            }
        };
    };

    return result;
};