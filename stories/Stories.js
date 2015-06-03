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
            },
            like: function (type,id){
                return $http.post(config.origin + '/' + type + '/' + id + '/votes', {});
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
        self.like = function(type,id){
            StoriesService.like(type,id).then(function(response){
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