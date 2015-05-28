/**
 * Created by Xavier on 27/5/2015.
 */
angular.module('Main',['ui.router'] ).config(
  function($urlRouterProvider,$stateProvider){
      $stateProvider.state('stories',{
          url:'/stories',
          templateUrl:'stories/stories.html',
          controller:'StoriesCtrl as StoriesC'
      })
      }
    )
    .controller('MainCtrl', function(){

    });