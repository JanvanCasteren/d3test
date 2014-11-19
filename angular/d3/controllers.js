angular.module('wijnemenjemee')
 
.controller('D3Ctrl', ['$scope', '$element', '$attrs', 'd3Data', 
    function ($scope, $element, $attrs, d3Data) 
{
    //remove d3- from tag name to obtain the chart type name
    var type = $element[0].localName.split('-')[1];
    $scope.data = d3Data.getData($attrs.docid, type);
}]);

