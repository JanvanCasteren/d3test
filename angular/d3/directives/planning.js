angular.module('wijnemenjemee')

/**
 * Width of svg element will adapt to the width of the parent container of the
 * directive element
 * Note: I don't use isolated scope, so put the controller directive inside the
 * tag of each d3-planning element if you use more of them on the same page
 */
 .directive('d3Planning', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function (scope, $element) {

            var container = d3.select('div', $element);
           
            //met angular.element($element) heb ik wel
            //de parent() functie beschikbaar, maar niet
            //de width() functie
            //daarom toch met jquery
            var width = $($element).parent().width();

            //omdat de data asynchroon geladen wordt heb ik
            //een watch nodig, 
            //zie http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply
            scope.$watch('data', function (newData, oldData) {
                if(newData)
                {
                   var chart = d3.timeline()
                       .width(width)
                       .stack()
                       .tickFormat({ format: d3.time.format("%Y"),
                          tickTime: d3.time.years,
                          tickInterval: 1,
                          tickSize: 5 });

                    var svg = container.append("svg").attr("width", width)
                        .datum(newData).call(chart);

                     }
                 });
        }
    };
});