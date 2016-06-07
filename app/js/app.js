var duoshuoQuery = {short_name:"zhufengfeedback"};
(function() {
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0]
    || document.getElementsByTagName('body')[0]).appendChild(ds);
})();

var app = angular.module("feedbackApp", ["wilddog", "ngSanitize"]);
app.controller("feedbackCtrl", ['$scope','$wilddogObject','$timeout',function ($scope, $wilddogObject, $timeout) {
    var ref = new Wilddog("https://8368feedback.wilddogio.com");
    var data = $wilddogObject(ref);
    $scope.back = data;
    data.$bindTo($scope, "data");
    $scope.luck = -1;
    $scope.typed = function (name) {
        return !/^[A-Z]/.test(name);
    }

    $scope.star = function(person){
        if(person.answer && !person.stared){
            person.star = person.star +1;
            person.stared = true;
        }
    }

    $scope.choose = function () {
        var count = 0;
        var max = Math.ceil(Math.random() * $scope.back.column * $scope.back.row);
        function next(time) {
            $timeout(function () {
                if(count < max){
                    var name = $scope.back.rows[Math.floor((count) / $scope.back.column)][count % ($scope.back.column)].name;
                    var ctime = 0;
                    if($scope.typed(name)){
                        $scope.luck = count;
                        ctime = 23;
                    }
                    count++;
                    next(ctime);
                }
            }, time);
        }

        next(0);
    };
    var rowNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //上课
    $scope.class = function () {
        var rows = [];
        $scope.back.rows = [];
        for (var i = 1; i <= data.row; i++) {
            var row = [];
            var rowPrefix = [i];
            for (var j = 1; j <= data.column; j++) {
                row.push({
                    id: data.column * (i - 1) + (j - 1),
                    name: rowNames[i - 1] + j,
                    answer: "",
                    star: 0,
                    stared:false
                });
            }
            $scope.back.rows.push(row);
        }
        $scope.back.$save($scope.back.rows);
    };
    //开始答题
    $scope.start = function () {
        $scope.luck = -1;
        var rows = [];
        for (var i = 1; i <= data.row; i++) {
            for (var j = 1; j <= data.column; j++) {
                $scope.back.rows[i - 1][j - 1].answer = "";
                $scope.back.rows[i - 1][j - 1].stared = false;
            }
        }
        $scope.back.$save($scope.back.rows);

    };
    $scope.show = function (id, answer) {
        $(id).modal('show',{ backdrop: 'static' })
        $scope.inputAnswer(answer);
    }

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    $scope.$watch("inputText", function (newValue) {
        if (newValue)
            $scope.outputText = marked(newValue);
        else
            $scope.outputText = '';
    });

    $scope.inputAnswer = function (answer) {
        $scope.inputText = answer;
    }
}]).directive('tab', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('keydown', function (event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode === 9) {
                    event.preventDefault();
                    var start = this.selectionStart;
                    var end = this.selectionEnd;
                    element.val(element.val().substring(0, start)
                        + '\t' + element.val().substring(end));
                    this.selectionStart = this.selectionEnd = start + 1;
                    element.triggerHandler('change');
                }
            });
        }
    }
}).directive('enterConfirm',function(){
    return {
        link:function(scope,element,attrs){
            element.on('keypress',function(e){
                var char = e.keyCode || e.which;
                if(char == 13){
                    element.trigger('blur');
                }
            });
        }
    }
});