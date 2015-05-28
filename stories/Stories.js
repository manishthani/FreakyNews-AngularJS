/**
 * Created by Xavier on 27/5/2015.
 */

angular.module('Stories',[])
    .controller('StoriesCtrl', [,function(){
        StoriesService.query().then(function(response){
           this.movies = response.data;
        }, function(errResponse){
            console.log("Error");
            console.log(errResponse);
        });
    }])
    .factory('StoriesService', ['$http', function ($http) {
        return {
            query: function () {
                return $http.get('/stories');   //@todo donde coloco el nombre del dominio?
            }
        };
    }]);