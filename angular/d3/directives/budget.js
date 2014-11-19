angular.module('wijnemenjemee')

.directive('d3Test', function() {
   return {
      restrict:'EA',
      template:"<div><svg width='400' height='100'></svg></div>",
      link: function($scope, $element) {
          
        var sampleSVG = d3.select('svg', $element);
        
		sampleSVG.selectAll("circle")
		    .data($scope.data)
		    .enter().append("circle")
		    .style("stroke", "gray")
		    .style("fill", "white")
		    .attr("height", 40)
		    .attr("width", 75)
		    .attr("r", 40)
		    .attr("cx", function(d, i){return i*80})
		    .attr("cy", 40);
       }
   };
});