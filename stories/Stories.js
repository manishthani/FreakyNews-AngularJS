/**
 * Created by Xavier on 27/5/2015.
 */

angular.module('Stories',['Config'])
    .factory('StoriesService', ['$http', 'config', function ($http, config) {
        return {
            getStories: function () {
                return $http.get(config.origin + '/stories');
            }
        };
    }])
    .controller('StoriesCtrl', ['StoriesService', function(StoriesService){
        var self = this;
        StoriesService.getStories().then(function(response){
            self.stories = response.data;
        }, function(errResponse){
            console.log("Error");
            console.log(errResponse);
        });
    }])
    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; //We ask for JSON by default
        $httpProvider.defaults.headers.common['Accept'] = 'application/json'; //We ask for JSON by default
    }]);