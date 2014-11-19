angular.module('wijnemenjemee')

.directive('d3Timeline', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    link: function ($scope, $element) {

      var container = d3.select('div', $element);
      var width = 500;

      var rangeLength=3;
      

       var labelColorTestData = [
        {label: "person a", times: [{"label":"Weeee", "starting_time": 1355752800000, "ending_time": 1355759900000}, {"label":"Weeee", "starting_time": 1355767900000, "ending_time": 1355774400000}]},
        {label: "person b", times: [{"label":"Weeee", "starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
        {label: "person c", times: [{"label":"Weeee", "starting_time": 1355761910000, "ending_time": 1355763910000}]},
      ];


      function timelineLabelColor() {
        var chart = d3.timeline()
          .beginning(1355752800000) // we can optionally add beginning and ending times to speed up rendering a little
          .ending(1355774400000)
          .stack() // toggles graph stacking
          .margin({left:70, right:30, top:0, bottom:0})
          ;
          var svg = container.append("svg").attr("width", width)
          .datum(labelColorTestData).call(chart);
        }


        timelineLabelColor();

      }
    }
});

