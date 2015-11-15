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


var ok = filter({
    msg1: {from: 'jack@example.com', to: 'jill@example.org'},
    msg2: {from: 'noreply@spam.com', to: 'jill@example.org'},
    msg3: {from: 'boss@work.com', to: 'jack@example.com'},
    msg4: {from: 'gfdgdfgfd@ggg.com', to: 'gdf@example.com'}
}, [
    {from: '*@work.com', action: 'tag work'},
    {from: '*@spam.com', action: 'tag spam'},
    {from: 'jack@example.com', to: 'jill@example.org', action: 'folder jack'},
    {to: 'jill@example.org', action: 'forward to jill@elsewhere.com'}
])


console.log(ok)


// {
//     msg1: ['folder jack', 'forward to jill@elsewhere.com'],
//     msg2: ['tag spam', 'forward to jill@elsewhere.com'],
//     msg3: ['tag work']
// }