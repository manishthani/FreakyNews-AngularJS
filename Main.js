/**
 * Created by Xavier on 27/5/2015.
 */
angular.module('Main',['ui.router', 'Stories', 'Asks'] ).config(
  function($urlRouterProvider,$stateProvider){
      $stateProvider.state('story',{
          url:'/stories/:id',
          templateUrl:'stories/story.html',
          controller:'StoryCtrl as StoryC'
      }).state('stories',{
          url:'/stories',
          templateUrl:'stories/stories.html',
          controller:'StoriesCtrl as StoriesC'
      }).state('ask',{
          url:'/asks/:id',
          templateUrl:'asks/ask.html',
          controller:'AskCtrl as AskC'
      }).state('asks',{
          url:'/asks',
          templateUrl:'asks/asks.html',
          controller:'AsksCtrl as AsksC'
      })
      ;
      $urlRouterProvider.otherwise("/stories")
      }
    )
    .factory('MainService',['$http', 'config', function ($http, config) {
        return {
            like: function (type,id) {
                return $http.post(config.origin + '/' + type + '/' + id + '/votes', {});
            }
        };
    }])
    .controller('MainCtrl',['MainService', function(MainService){
        var self = this;
        self.link = "link bonito";
        self.like = function(type, id){
            MainService.like(type,id).then(function(response){
                alert('You have successfully voted. Reload the page to see the vote.');
            }, function(errResponse){
                if(errResponse.status == 403) alert('You cannot vote as you have already done it.');
                else alert('You cannot vote:' + errResponse.data);
            })
        };
    }]);
