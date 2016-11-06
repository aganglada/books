import storeModule from './store';

describe('storeService', () => {
    beforeEach(window.module(
        storeModule.name,
        ($provide) => {
            $provide.value('$document', angular.element(document));
            $provide.service('constants', () => {
                return {
                    getByKey: () => {}
                };
            });
            $provide.service('immutable', () => {
                return {
                    turn: () => {}
                };
            });
        }
    ));

    describe('Module', () => {
        it('has as a name app.service.store', () => {
            expect(storeModule.name).toBe('app.service.store');
        });
    });

    describe('Service', () => {
        let $rootScope;
        let immutable;
        let store;

        beforeEach(window.inject((_$rootScope_, _immutable_, _store_) => {
            $rootScope = _$rootScope_;
            immutable = _immutable_;
            store = _store_;

            spyOn($rootScope, '$broadcast').and.callThrough();
        }));

        beforeEach(() => {
            store.add('test-str', 'test-value');
            store.add('test-object', {});
        });

        it('should call $rootScope.$broadcast on create test-str', () => {
            expect($rootScope.$broadcast).toHaveBeenCalledWith('test-str');
        });

        it('should call $rootScope.$broadcast on freeze test-object', () => {
            expect($rootScope.$broadcast).toHaveBeenCalledWith('test-object');
        });

        it('has key test set with value test-value', () => {
            spyOn(immutable, 'turn').and.returnValue('test-value');
            store.add('test-str', 'test-value');

            expect(store.load('test-str')).toBe('test-value');
        });

        [false, true, [], {}, undefined, null].forEach((item) => {
            const newItem = JSON.stringify(item);

            it(`should not add a ${newItem} as a key, is not a string`, () => {
                expect(() => store.add(item)).toThrowError(/is not a string/);
            });
        });

        it('doesn\'t has a key if it is not added before', () => {
            expect(store.load('test2')).toBeFalsy();
        });

        it('should not get a item without key', () => {
            expect(store.load()).toBeUndefined();
        });

        it('should destroy the item with the key test', () => {
            store.destroy('test-str');

            expect(store.load('test-str')).toBeNull();
        });

        it('should do not destroy the item if the key do not exist', () => {
            store.destroy('__test__');

            expect(store.load('__test__')).toBeUndefined();
        });

        it('should remove the item with the key test', () => {
            store.remove('test-str');

            expect(store.load('test-str')).toBeUndefined();
        });

        it('should do not remove the item if the key do not exist', () => {
            store.remove('__test__');

            expect(store.load('__test__')).toBeUndefined();
        });

        it('should set a new value to the store created', () => {
            spyOn(immutable, 'turn').and.returnValue('test-new-value');
            store.update('test-str', 'test-new-value');

            expect(store.load('test-str')).toBe('test-new-value');
        });
    });
});
