angular.module('wijnemenjemee')

.directive('d3Json', function () {
    return {
        restrict: 'E',
        template: '<div><pre>{{data | json}}</pre></div>',
   
    };
});