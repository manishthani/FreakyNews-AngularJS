/**
 * Created by Xavier on 27/5/2015.
 */

angular.module('Users',['Config'])
    .factory('UsersService', ['$http', 'config', function ($http, config) {
        return {
            getUsers: function () {
                return $http.get(config.origin + '/users');
            },
            postUser: function(username,password,karma,about,email){
                return $http.post(config.origin + '/users',{username: username, password: password, karma:karma, about: about, email: email});
            }
        };
    }])
    .controller('UsersCtrl', ['UsersService', function(UsersService){
        var self = this;
        UsersService.getUsers().then(function(response){
            self.users = response.data;
        }, function(errResponse){
            alert("Error Users:"+errResponse);
        });
        self.post = function() {
            UsersService.postUser(self.username,self.password,self.karma, self.about, self.email ).then(function (response) {
                self.users = response.data;
            }, function (errResponse) {
                alert("Error Users:" + errResponse);
            });
        };
    }])
    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; //We send JSON by default
        $httpProvider.defaults.headers.common['Accept'] = 'application/json'; //We ask for JSON by default
    }]);