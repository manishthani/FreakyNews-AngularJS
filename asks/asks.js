
angular.module('Asks',['Config'])
    .factory('AsksService', ['$http', 'config', function ($http, config) {
        return {
            getAsks: function () {
                return $http.get(config.origin + '/asks');
            },
            getAsk: function(id){
                return $http.get(config.origin + '/asks/' + id);
            },
            postAsk: function(text, User_id){
                return $http.post(config.origin + '/asks',{text: text, User_id:User_id});
            },
            like: function(type,id){
                return $http.post(config.origin + '/' + type + '/' + id + '/votes', {});
            }
        };
    }])
    //Usabais dos controladores con el mismo nombre, as� que uno reemplazaba el otro
    .controller('AsksCtrl', ['AsksService', function(AsksService){
        var self = this;
        AsksService.getAsks().then(function(response){
            self.asks = response.data;
        }, function(errResponse){
            alert("Error Asks:"+errResponse);
        });
        self.post = function() {
            AsksService.postAsk(self.text, self.User_id).then(function (response) {
                self.asks = response.data;
            }, function (errResponse) {
                alert("Error Asks:" + errResponse);
            });
        }
    }])
    .controller('AskCtrl', ['AsksService','$stateParams','config', function(AsksService,$stateParams,config){
        var self = this;
        AsksService.getAsk($stateParams.id).then(function(response){
            self.ask = response.data;
            self.commentsHtml = config.backendFolder + '/comments/comments.html';
        }, function(errResponse){
            alert("Error Ask: "+errResponse);
        });
        self.like = function(type,id){
            AsksService.like(type,id).then(function(response){
                alert('You have successfully voted. Reload the page to see the vote.');
            }, function(errResponse){
                if(errResponse.status == 403) alert('You cannot vote as you have already done it.');
                else alert('You cannot vote:' + errResponse.data);
            })
        };
    }])

    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; //We send JSON by default
        $httpProvider.defaults.headers.common['Accept'] = 'application/json'; //We ask for JSON by default
    }]);
