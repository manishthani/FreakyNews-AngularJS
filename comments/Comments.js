/**
 * Created by Xavier on 3/6/2015.
 */

angular.module('Comments',['Config'])
    .factory('CommentsService', ['$http', 'config', function ($http, config) {
        return {
            postComment: function(text, parent_id, User_id, Ask_id, Story_id){
                var data = {text: text, User_id: User_id};
                if(parent_id != null) data.parent_id = parent_id;
                if(Ask_id != null) data.Ask_id = Ask_id;
                if(Story_id != null) data.Story_id = Story_id;
                return $http.post(config.origin + '/comments', data);
            }
        };
    }])
    .controller('CommentsCtrl', ['CommentsService','$stateParams', function(CommentsService,$stateParams){
        var self = this;
        self.parent_id = $stateParams.parent_id;
        self.Ask_id = $stateParams.Ask_id;
        self.Story_id = $stateParams.Story_id;
        self.post = function(){
            CommentsService.postComment(
                self.text,
                typeof (self.parent_id) !== "undefined"? self.parent_id : null,
                self.User_id,
                typeof (self.Ask_id) !== "undefined"? self.Ask_id : null,
                typeof (self.Story_id) !== "undefined"? self.Story_id : null
            ).then(function(response){
                alert('Commented!');
            }, function(errResponse){
                alert("Error Comments:"+errResponse.data);
            });
        };
    }]);