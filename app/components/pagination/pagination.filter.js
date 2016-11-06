export default () => {
    return function(input, total) {
        total = parseInt(total);

        for (var i = 1; i < total + 1; i++) {
            input.push(i);
        }

        return input;
    }
};