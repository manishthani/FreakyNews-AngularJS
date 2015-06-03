
angular.module('Asks',['Config'])
    .factory('AsksService', ['$http', 'config', function ($http, config) {
        return {
            getAsks: function () {
                return $http.get(config.origin + '/asks');
            },
            getAsk: function(id){
                return $http.get(config.origin + '/asks/' + id);
            },
            postAsk: function(text){
                return $http.post(config.origin + '/asks/',text)
            }
        };
    }])
    .controller('AsksCtrl', ['AsksService', function(AsksService){
        var self = this;
        AsksService.getAsks().then(function(response){
            self.asks = response.data;
        }, function(errResponse){
            alert("Error Asks:"+errResponse);
        });
    }])
    .controller('AskCtrl', ['AsksService','$stateParams','config', function(AsksService,$stateParams,config){
        var self = this;
        AsksService.getAsk($stateParams.id).then(function(response){
            self.ask = response.data;
            self.commentsHtml = config.backendFolder + '/comments/comments.html';
        }, function(errResponse){
            alert("Error Ask: "+errResponse);
        });
    }])
    .controller('AsksCtrl', ['AsksService', function(AsksService){
        var self = this;
        AsksService.postAsk({text: 'Soy un ask'}).then(function(response){
            self.asks = response.data;
        }, function(errResponse){
            alert("Error Asks:"+errResponse);
        });
    }])
    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; //We send JSON by default
        $httpProvider.defaults.headers.common['Accept'] = 'application/json'; //We ask for JSON by default
    }]);/**
 * Created by Ser on 03/06/2015.
 */
