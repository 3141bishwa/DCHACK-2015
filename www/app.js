angular.module('app', ['ionic', 'App.Controllers'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        // Now set up the states
        $stateProvider

            .state('app', {
                url: "/app",
                template: '<ion-nav-view></ion-nav-view>',
                abstract: true,
                resolve: {
                    resolvedUser: function CheckForAuthenticatedUser(ParseHttpService, $state) {
                        return ParseHttpService.getCurrentUser().then(function (_user) {
                            // if resolved successfully return a user object that will set
                            // the variable `resolvedUser`
                            return _user;
                        }, function (_error) {
                            $state.go('login');
                        })
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                templateUrl: "views/home.html",
                controller: "homeCtrl",
                resolve: {
                    CurrentUser: function (resolvedUser) {
                        return resolvedUser;
                    }
                }
            })

            .state('app.detail', {
                url: "app/detail/:objectId",
                templateUrl: "views/detail.html",
                controller: "detailCtrl"
            })

            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "loginCtrl",
            });
    });










