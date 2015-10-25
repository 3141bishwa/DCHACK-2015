angular.module('App.Services', [])
    .service('ParseHttpService', function ($http, $q) {

        var CurrentUser = null;
        var baseURL = "https://api.parse.com/1/";
        var authenticationHeaders = {
            "x-parse-application-id": "jYWwyHcSTkapjexeYxmYFJd5MpOGKReBvE3zZJUG",
            "x-parse-rest-api-key": "DkB9Sm1KWoatEdcCxmmV3zCEa4xrdVogXuFcH25i"
        };

        return {

            getCurrentUser: function () {
                if (CurrentUser) {
                    return $q.when(CurrentUser);
                } else {
                    return $q.reject("NO USER");
                }
            },


            /**
             * default function for logging in user
             * @param credentials
             * @returns {*}
             */
            login: function (credentials) {
                var settings = {
                    headers: authenticationHeaders,
                    // params are for query string parameters
                    params: {
                        "username": (credentials && credentials.username),
                        "password": (credentials && credentials.password)
                    }
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.get(baseURL + 'login', settings)
                    .then(function (response) {
                        
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned

                        // NEW CODE - save the current user - NEW CODE !!!
                        CurrentUser = response.data;
                        return response.data;
                    });
            },

            logout: function () {

                var tempHeaders = angular.copy(authenticationHeaders);
                angular.extend(tempHeaders, {"X-Parse-Session-Token": CurrentUser.sessionToken});

                var settings = {
                    headers: tempHeaders
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.post(baseURL + 'logout', {}, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('logout', response);
                        return response;
                    }, function (_error) {
                        console.log(_error);
                    });
            },
            
            getStuff: function () {

                // if an id is passed in then use it when querying
                // stuff data
                var settings = {
                    method: 'GET',
                    url: baseURL + 'classes/stuff/',
                    headers: authenticationHeaders
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        return response.data;
                    });

            },
            getObjectById: function (id) {

                // if an id is passed in then use it when querying
                // stuff data
                var settings = {
                    method: 'GET',
                    url: baseURL + 'classes/stuff/' + id,
                    headers: authenticationHeaders
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http(settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        return response.data;
                    });

            },

            addObject: function (_params) {

                // for POST, we only need to set the authentication header
                var settings = {
                    headers: authenticationHeaders
                };
                // for POST, we need to specify data to add, AND convert it to
                // a string before passing it in as seperate parameter data
                var dataObject = {
                    "name": _params.name,
                    "room": _params.room
                };

                var dataObjectString = JSON.stringify(dataObject);

                // $http returns a promise, which has a then function
                return $http.post(baseURL + 'classes/stuff', dataObjectString, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('addObject', response);
                        return response.data;
                    });
            },
            updateObject: function (_params) {

                // for POST, we only need to set the authentication header
                var settings = {
                    headers: authenticationHeaders
                };
                // for POST, we need to specify data to add, AND convert it to
                // a string before passing it in as seperate parameter data

                var dataObject = {
                    "name": (_params.name ? _params.name : JSON.null),
                    "room": (_params.room ? _params.room : JSON.null)
                };

                var dataObjectString = JSON.stringify(dataObject);

                var apiUrl = baseURL + 'classes/stuff/' + _params.objectId;

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.put(apiUrl, dataObjectString, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('updateObject', response);
                        return response.data;
                    });
            },
            deleteObjectById: function (_id) {

                var settings = {
                    headers: authenticationHeaders
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.delete(baseURL + 'classes/stuff/' + _id, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('deleteObjectById', response);
                        return response.data;
                    });
            }
        }
    });
