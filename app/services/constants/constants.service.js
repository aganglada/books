function constantsService(immutable) {
    const freezeObjectOfConstants = immutable.turn({
        'STATE::LIBRARY': 'library',
        'URL::LIBRARY': '/',
        'STATE::BOOK': 'book',
        'URL::BOOK': '/book/:id'
    });

    function getConstantByKey(key) {
        if (!freezeObjectOfConstants.hasOwnProperty(key)) {
            throw new Error(`The key "${key}" do not exist as a constant.`);
        }

        return freezeObjectOfConstants[key];
    }

    return {
        getByKey: getConstantByKey
    };
}

export default constantsService;
