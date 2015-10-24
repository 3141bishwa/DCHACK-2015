/**
 * Created by shitosh parajuli on 10/1/2015.
 */
(function () {

    var a = angular.module('app', ['ionic', 'App.Services']);  //creating app by angular
    /*.controller("controller-one", function($scope){

     //Private since not attached to scope
     var privateVar = "Can't see this";

     //Accesible to view since it is attached to scope
     $scope.myVariable = "I can see you";

     $scope.items = ['lol',
     '2nd item'];*/


//new controller




    a.config(function($stateProvider, $urlRouterProvider){
        //Setting default to home
        $urlRouterProvider.otherwise("/home");

        //Setting up states
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "home.html",
                controller: "homeCtrl"
            })
            .state('detail', {
                url: "/detail/:id",
                templateUrl: "detail.html",
                controller: "detailCtrl"
            });
    });



    a.controller('homeCtrl', function ($scope, $state, ParseHttpService) {
        $scope.stateInfo = $state.current;

        $scope.itemsList = {};

        $scope.inputItem = {
            value: "",
            name: "",
            room: ""
        };

        $scope.goToDetailState = function(_id) {
            $state.go("detail", {
                id: _id
            });
        };

        $scope.deleteObject = function editObject(_objectId) {
            ParseHttpService.deleteObjectById(_objectId)
                .then(function itemSaved(_deletedObject) {
                    alert("Item Deleted " + _deletedObject.objectId);

                    return populateList();

                    populateList().then(function (_data) {
                        $scope.itemsList = _data;
                    });




                }, function errorDeleting(_error) {
                    alert("Error Deleting Object " + _objectId)
                });
        };



        $scope.addItem = function addItem() {

            // separate the values
            var data = $scope.inputItem.value.split(",");

            if (data.length === 2) {
                $scope.inputItem.name = data[0].trim();
                $scope.inputItem.room = data[1].trim();

                console.log(JSON.stringify($scope.inputItem));

                ParseHttpService.addObject($scope.inputItem)
                    .then(function itemSaved(_newItem) {
                        alert("Item Saved", _newItem.objectId);
                        $scope.inputItem = {};

                        return populateList();



                    }, function errorSaving(_error) {
                        $scope.inputItem = {};
                    });
            } else {
                alert("Invalid Input: " + $scope.inputItem.value);
                $scope.inputItem = {};
            }
        };

        $scope.editObject = function editObject(_object) {

            var data = null;
            var editedObject = {};
            var objectData = prompt("Enter the Edited Information", _object.name + ", " + _object.room);


            if (objectData != null) {
                // separate the values
                data = objectData.split(",");
            }

            if (objectData && (data.length === 2)) {

                // create object parameters to save
                editedObject.name = data[0].trim();
                editedObject.room = data[1].trim();
                editedObject.objectId = _object.objectId;

                console.log(JSON.stringify(editedObject));

                ParseHttpService.updateObject(editedObject)
                    .then(function itemUpdated(_updatedItem) {
                        alert("Item Updated " + _updatedItem.objectId);

                        return populateList();

                    }, function errorSaving(_error) {
                        alert("Error Editing Object " + _error)
                    });
            } else {
                if (objectData !== null) {
                    alert("Invalid Input: " + objectData);
                }
            }
        };

        function populateList() {
            return ParseHttpService.getStuff().then(function (_listData) {
                $scope.itemsList = _listData.results;
            });
        }

        console.log('Start')

        ParseHttpService.login().then(function loginSuccess(_loggedIn) {
            alert(_loggedIn.username + " logged in");


            return ParseHttpService.getStuff();
        }).then(function getObjectSuccess(_ObjectData){
                $scope.itemsList = _ObjectData.results;


        }, function error(_error) {
                alert("Error" + _error);
        });







    });

    a.controller('detailCtrl', function($scope, $state, ParseHttpService){
        
        $scope.itemDetails = '';

        $scope.stateInfo = $state.current;

        $scope.stateParamsInfo = $state.params;

        

        //$scope.stuffDetail = ParseHttpService.getStuffbyid($state.params._id)

        ParseHttpService.getStuffbyid($state.params.id).then(function abc(_iddata){
            console.log(_iddata);
            console.log('am i working??????????')
            $scope.itemDetails = _iddata;
        }, function (_error) {
            alert("Error". _error.message);
        });
    });

})();



