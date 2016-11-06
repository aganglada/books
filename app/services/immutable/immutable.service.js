/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function immutableService() {
    function immutable(obj) {
        Object.keys(obj)
            .forEach((name) => {
                const prop = obj[name];

                if (typeof prop === 'object' && prop !== null) {
                    immutable(prop);
                }
            });

        return Object.freeze(obj);
    }

    return {
        turn: immutable
    };
}

export default immutableService;
