import constantsModule from './constants';

describe('constants', () => {
    const constantsMockedObject = {
        TEST: 'Test Constant'
    };

    beforeEach(window.module(
        constantsModule.name,
        ($provide) => {
            $provide.service('immutable', () => {
                return {
                    turn: () => constantsMockedObject
                };
            });
        }
    ));

    describe('Module', () => {
        it('has as a name app.service.constants', () => {
            expect(constantsModule.name).toBe('app.service.constants');
        });
    });

    describe('Service', () => {
        let constants;

        beforeEach(window.inject((_constants_) => {
            constants = _constants_;
        }));

        it('should return a constant value by key', () => {
            expect(constants.getByKey('TEST')).toBe(constantsMockedObject.TEST);
        });

        it('should throw an error if the param do not exist as a key', () => {
            expect(() => constants.getByKey('MOCK_KEY_DO_NOT_EXIST')).toThrowError(/do not exist as a constant/);
        });
    });
});
