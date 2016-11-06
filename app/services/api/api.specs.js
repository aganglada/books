import apiModule from './api';

describe('apiService', () => {
    beforeEach(window.module(
        apiModule.name,
        ($provide) => {
            $provide.service('constants', () => {
                return {
                    getByKey: () => '/api'
                };
            });
        }
    ));

    describe('Module', () => {
        it('has as a name app.service.api', () => {
            expect(apiModule.name).toBe('app.service.api');
        });
    });

    describe('Service', () => {
        let api,
            url,
            defer,
            httpBackend,
            q,
            rootScope;

        beforeEach(window.inject((
            _$httpBackend_,
            _$q_,
            _$rootScope_,
            _api_
        ) => {
            api = _api_;
            httpBackend = _$httpBackend_;
            q = _$q_;
            rootScope = _$rootScope_;

            defer = _$q_.defer();
            url = '/test';
            url = `/api${url}`;
        }));

        afterEach(() => {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        const apiMethodsWithoutData = [
            {
                type: 'destroy',
                method: 'DELETE'
            },
            {
                type: 'load',
                method: 'GET'
            }
        ];
        const apiMethodsWithData = [
            {
                type: 'change',
                method: 'PATCH'
            },
            {
                type: 'create',
                method: 'POST'
            },
            {
                type: 'update',
                method: 'PUT'
            }
        ];
        const apiMethods = apiMethodsWithoutData.concat(apiMethodsWithData);

        apiMethodsWithoutData.forEach((item) => {
            describe(item.type, () => {
                const whenMethod = `when${item.method}`;

                it('should return the data with the response value', () => {
                    let success;

                    const response = 'test-response';

                    httpBackend[whenMethod](url).respond(200, response);
                    api[item.type](url).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.data).toBe(response);
                });

                it('should return the Headers Accept as "application/vnd.api+json"', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.headers.Accept).toBe('application/vnd.api+json');
                });

                it('should return the Headers Accept updated with the option change of "application/json"', () => {
                    let success;

                    const headers = {
                        Accept: 'application/json'
                    };

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, {headers: headers}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.headers).toEqual(headers);
                });

                it('should not change the url', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, {url: '/url-changed'}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.url).toEqual(url);
                });

                it('should not change the method', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, {method: 'POST'}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.method).toEqual(item.method);
                });
            });
        });

        apiMethodsWithData.forEach((item) => {
            describe(item.type, () => {
                let data;

                const whenMethod = `when${item.method}`;

                beforeEach(() => {
                    data = 'test-data';
                });

                it('should return the data with the response value', () => {
                    let success;

                    const response = 'test-response';

                    httpBackend[whenMethod](url).respond(200, response);
                    api[item.type](url, data).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.data).toBe(response);
                });

                it('should return the Headers Accept as "application/vnd.api+json"', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.headers.Accept).toBe('application/vnd.api+json');
                });

                it('should return the Headers Accept updated with the option change of "application/json"', () => {
                    let success;

                    const headers = {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    };

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, data, {headers: headers}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.headers).toEqual(headers);
                });

                it('should not change the url', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, {url: '/url-changed'}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.url).toEqual(url);
                });

                it('should not change the method', () => {
                    let success;

                    httpBackend[whenMethod](url).respond(200);
                    api[item.type](url, {method: 'POST'}).then((res) => success = res);
                    httpBackend.flush();

                    expect(success.config.method).toEqual(item.method);
                });
            });
        });

        apiMethods.forEach((item) => {
            let response;

            const whenMethod = `when${item.method}`;

            describe(item.type, () => {
                beforeEach(() => {

                    response = 'test-error-response';

                    spyOn(defer, 'reject').and.callThrough();
                    spyOn(defer, 'resolve').and.callThrough();
                });

                describe('Status 400', () => {
                    it('should reject promise', () => {
                        let error;

                        httpBackend[whenMethod](url).respond(400, response);
                        api[item.type](url).catch((res) => {
                            error = res;
                        });
                        httpBackend.flush();

                        expect(error.data).toBe(response);
                    });
                });

                describe('Status 401', () => {
                    it('should reject promise', () => {
                        let error;

                        httpBackend[whenMethod](url).respond(401, response);
                        api[item.type](url).catch((res) => {
                            error = res;
                        });
                        httpBackend.flush();

                        expect(error.data).toBe(response);
                    });
                });

                describe('Status 404', () => {
                    it('should reject promise', () => {
                        let error;

                        httpBackend[whenMethod](url).respond(404, response);
                        api[item.type](url).catch((res) => {
                            error = res;
                        });
                        httpBackend.flush();

                        expect(error.data).toBe(response);
                    });
                });

                describe('Status 500', () => {
                    it('should reject promise', () => {
                        let error;

                        httpBackend[whenMethod](url).respond(500, response);
                        api[item.type](url).catch((res) => {
                            error = res;
                        });
                        httpBackend.flush();

                        expect(error.data).toBe(response);
                    });
                });
            });
        })

    });
});
