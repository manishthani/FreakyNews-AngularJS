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
    .controller('MainCtrl', function(){
        var self = this;
        self.link = "link bonito";
    });