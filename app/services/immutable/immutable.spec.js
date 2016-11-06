import immutableModule from './immutable';

describe('immutableService', () => {
    beforeEach(window.module(
        immutableModule.name
    ));

    describe('Module', () => {
        it('has as a name app.service.immutable', () => {
            expect(immutableModule.name).toBe('app.service.immutable');
        });
    });

    describe('Service', () => {
        let obj, immutableObj, immutable;

        beforeEach(window.inject((_immutable_) => {
            immutable = _immutable_;

            obj = {
                test: 'test',
                testNull: null,
                deepTest: {
                    test: 'test'
                },
                links: [
                    {
                        href: 'test'
                    }
                ]
            };

            immutableObj = immutable.turn(obj);
        }));


        describe('Nothing can be added to or removed from the properties set of a frozen object', () => {
            it('has a first level frozen object', () => {
                expect(typeof immutableObj === 'object' && Object.isFrozen(immutableObj)).toBeTruthy();
            });

            it('has a deep level frozen object', () => {
                const deepTest = immutableObj.deepTest;

                expect(typeof immutableObj === 'object' && Object.isFrozen(deepTest)).toBeTruthy();
            });

            it('has a deep level frozen object child of an array', () => {
                const deepTest = immutableObj.links[0];

                expect(typeof immutableObj === 'object' && Object.isFrozen(deepTest)).toBeTruthy();
            });

            it('should return the same value of the argument when is typeof === object', () => {
                expect(immutable.turn(obj)).toBe(obj);
            });

            it('should throw an error if the param is null', () => {
                expect(() => immutable.turn(null)).toThrowError(/Can't call method on/);
            });

            it('should throw an error if the param is undefined', () => {
                expect(() => immutable.turn(undefined)).toThrowError(/Can't call method on/);
            });
        });
    });
});
