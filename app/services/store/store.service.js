function storeService($rootScope, immutable) {
    let cache = {};

    function add(key, value) {
        if (typeof key !== 'string') {
            throw new Error('The param key value is not a string.');
        }

        cache[key] = immutable.turn(value);

        $rootScope.$broadcast(key);
    }

    function load(key) {
        let data;

        if (cache.hasOwnProperty(key)) {
            data = cache[key];
        }

        return data;
    }

    function destroy(key) {
        if (cache.hasOwnProperty(key)) {
            cache[key] = null;
        }
    }

    function remove(key) {
        if (cache.hasOwnProperty(key)) {
            delete cache[key];
        }
    }

    return {
        add,
        load,
        destroy,
        remove,
        update: add
    };
}

export default storeService;
