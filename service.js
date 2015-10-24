/**
 * Created by shitosh parajuli on 10/1/2015.
 * And edited by Bishwa
 */
(function (){




    var a = angular.module('App.Services', []);


    a.service('ParseHttpService', function ($http) {

        var baseURL = "https://api.parse.com/1/";
        var authenticationHeaders = {
            "x-parse-application-id": "jYWwyHcSTkapjexeYxmYFJd5MpOGKReBvE3zZJUG",
            "x-parse-rest-api-key": "DkB9Sm1KWoatEdcCxmmV3zCEa4xrdVogXuFcH25i"
        };

        return {
            /**
             * function for logging in
             * @returns {Promise}
             */
            login: function () {

                var credentials = {
                    "username": "admin",
                    "password": "test"

                };

                var settings = {
                    method: 'GET',
                    url: baseURL + 'login',
                    headers: authenticationHeaders,
                    // params are for query string parameters
                    params: credentials
                };

                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.get(baseURL + 'login', settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('login', response);
                        return response.data;
                    });
            },

            getStuff: function (_id) {


                var settings = {
                    method: 'GET',
                    url: baseURL + 'classes/stuff/',
                    headers: authenticationHeaders
                };


                return $http.get(settings.url, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getStuff', response);
                        return response.data;
                    });
            },

            getStuffbyid: function (_id) {


                var settings = {
                    //method: 'GET',
                    url: baseURL + 'classes/stuff/',
                    headers: authenticationHeaders
                };


                return $http.get(settings.url + _id, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('getstuffbyid', response);
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
            },

            addObject: function (_params){

                var settings = {
                    headers: authenticationHeaders
                };

                var dataObject;
                dataObject = {
                    "name": _params.name,
                    "room": _params.room
                };

                var dataObjectString = JSON.stringify(dataObject);



                // $http returns a promise, which has a then function,
                // which also returns a promise
                return $http.post(baseURL + 'classes/stuff', dataObjectString, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('addObject', response);
                        return response.data;
                    });
            },

            updateObject: function (_params) {


                var settings = {
                    headers: authenticationHeaders
                };

                var dataObject = {
                    "name": (_params.name ? _params.name : JSON.null),
                    "room": (_params.room ? _params.room : JSON.null)
                };

                var dataObjectString = JSON.stringify(dataObject);

                var apiUrl = baseURL + 'classes/stuff/' + _params.objectId;


                return $http.put(apiUrl, dataObjectString, settings)
                    .then(function (response) {
                        // In the response resp.data contains the result
                        // check the console to see all of the data returned
                        console.log('updateObject', response);
                        return response.data;
                    });
            }
        }
    });

})();