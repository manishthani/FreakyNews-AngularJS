/**
 * Created by Xavier on 27/5/2015.
 */

angular.module('Stories',[])
    .factory('StoriesService', ['$http', function ($http) {
        return {
            getStories: function () {
                return $http.get('https://freakynews-ericguti90.c9.io/stories.json');   //@todo donde coloco el nombre del dominio?
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
    }]);