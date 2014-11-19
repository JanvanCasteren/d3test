angular.module('wijnemenjemee')

/**
 * Width of svg element will adapt to the width of the parent container of the
 * directive element
 * @return {[type]}
 */
.directive('d3Planning', function () {
    return {
        restrict: 'E',
        //template: '<div></div>',
        template: '<div></div>',
        link: function ($scope, $element) {
         
            var container = d3.select('div', $element);
  console.log(container);
            //met angular.element($element) heb ik wel
            //de parent() functie beschikbaar, maar niet
            //de width() functie

            //daarom toch met jquery
            var width = $($element).parent().width();


            //omdat de data asynchroon geladen wordt heb ik
            //een watch nodig, 
            //zie http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply

            $scope.$watch('data', function (newData, oldData) {
                if(newData)
                {

        //             newData = [{label: "Roltrappen", slug: "kraaiennest", times: [{"starting_time": 1483916400000, "ending_time": 1509490800000}]},
        // {label: "Bestrating perrons", slug: "gaasperplas", times: [{"starting_time": 1452294000000, "ending_time": 1484002800000},]},
        // {label: "Rails", slug: "gein", times: [{"starting_time": 1456786800000, "ending_time": 1467324000000}, {"starting_time": 1494280800000, "ending_time": 1509490800000} ]},
        // {label: "Overdekking", slug: "bullewijk", times: [{"starting_time": 1436392800000, "ending_time": 1469397600000}, ]},
        // {label: "inrichting perrons", slug: "ganzenhoef", times: [{"starting_time": 1459807200000, "ending_time": 1498860000000}]}]
        //             //DATA kloppen nog niet
        //             //misschien is bij sommige rijen einddatum kleiner dan begindatum?

        //         //versie met data joera
                 var chart = d3.timeline()
                          .width(width)
                         .stack()
                         .tickFormat({ format: d3.time.format("%Y"),
                                  tickTime: d3.time.years,
                                  tickInterval: 1,
                                  tickSize: 5 });
                         // .beginning(1420066800000)
                         //.ending(1514761200000)
                         // .colors(kleuren)
                
                         var svg = container.append("svg").attr("width", width)
                      .datum(newData).call(chart);


                    //andere versie
                    // var chart = d3.timeline()
                    //   //.beginning(1354752800000) // we can optionally add beginning and ending times to speed up rendering a little
                    //  // .ending(1356759900000)
                    //   .stack() // toggles graph stacking
                    //   .margin({left:70, right:30, top:0, bottom:0})
                    //   ;
                    //   var svg = container.append("svg").attr("width", width)
                    //   .datum(newData).call(chart);
                }
            });

       

      }
  };
});