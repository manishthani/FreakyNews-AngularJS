/**
 * Created by Xavier on 27/5/2015.
 */

angular.module('Stories',['Config'])
    .factory('StoriesService', ['$http', 'config', function ($http, config) {
        return {
            getStories: function () {
                return $http.get(config.origin + '/stories');
            },
            getStory: function(id){
                return $http.get(config.origin + '/stories/' + id);
            },
            postStory: function(text,link,User_id){
                return $http.post(config.origin + '/stories',{text: text, link: link, User_id:User_id});
            }
        };
    }])
    .controller('StoriesCtrl', ['StoriesService', function(StoriesService){
        var self = this;
        StoriesService.getStories().then(function(response){
            self.stories = response.data;
        }, function(errResponse){
            alert("Error Stories:"+errResponse);
        });
        self.post = function() {
            StoriesService.postStory(self.text,self.link,self.User_id).then(function (response) {
                self.stories = response.data;
            }, function (errResponse) {
                alert("Error Stories:" + errResponse);
            });
        }
    }])
    .controller('StoryCtrl', ['StoriesService','$stateParams','config', function(StoriesService,$stateParams,config){
        var self = this;
        StoriesService.getStory($stateParams.id).then(function(response){
           self.story = response.data;
            self.commentsHtml = config.backendFolder + '/comments/comments.html';
        }, function(errResponse){
            alert("Error Story: "+errResponse);
        });
    }])
    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json'; //We send JSON by default
        $httpProvider.defaults.headers.common['Accept'] = 'application/json'; //We ask for JSON by default
    }]);