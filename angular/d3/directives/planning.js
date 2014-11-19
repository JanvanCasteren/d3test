angular.module('wijnemenjemee')

.directive('d3Planning', function () {
    return {
        restrict: 'E',
        //TODO: one-time binding met :: lijkt op
        template: '<div></div>',
        link: function ($scope, $element) {
           
            var container = d3.select('div', $element);
            var width = 500;

            //omdat de data asynchroon geladen wordt heb ik
            //een watch nodig, 
            //zie http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply

            $scope.$watch('data', function (newData, oldData) {
                if(newData)
                {

                    return;
                    //DATA kloppen nog niet
                    //misschien is bij sommige rijen einddatum kleiner dan begindatum?

                    var chart = d3.timeline()
                      .beginning(1354752800000) // we can optionally add beginning and ending times to speed up rendering a little
                      .ending(1356759900000)
                      .stack() // toggles graph stacking
                      .margin({left:70, right:30, top:0, bottom:0})
                      ;
                      var svg = container.append("svg").attr("width", width)
                      .datum(newData).call(chart);
                }
            });

       

      }
  };
});