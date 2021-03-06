angular.module('wijnemenjemee')

/**
 * d3Data service pulls json data for a table with given docId from google fusion
 * @param  {[type]} $http
 * @return {[type]}
 */
.factory('d3Data', ['$http', function ($http)
{ 
	return { 
		/**
		 * [getData description]
		 * @param  {[string]} docId Google Fusion docId
		 * @param  {[string]} type Type of d3 chart, eg directive d3-planning has type planning
		 * @return {[type]}
		 */
		getData: function (docId, type) 
			{   
				var response = $http(
				{
			        url: 'https://www.googleapis.com/fusiontables/v2/query?sql=SELECT * FROM ' + docId + 
			        	'&key=AIzaSyA-kp-PRLXevsoNdo7EK0Eb27Em0BPzY6o',
			        	method: "GET"
				})
				.then(function (response) 
		        { 
		        	switch(type) {
		        		case 'json':
		        			return planning(response.data);
		        			break;
		        		case 'planning':
		        			return planning(response.data);
		        			break;
                        case 'planning2':
                            return planning2(response.data);
                            break;
		        		case 'budget':
		        			return budget(response.data);
		        			break;
		        		default:
		        			console.error('Unknown d3 chart type (' + type + ')');
							return {};
		        	}
    			});
    			
    			return response;  

    			/**
    			 * Rewrites the given data to a structure that suits the
    			 * d3-planning directive
    			 * @param  {[object]} rows of data in json format, columns
    			 * "Station","Sublocatie","Startdatum","Einddatum","Werk","Type"
    			 * are expected
    			 * @return {[object]}
    			 */
    			function planning(data) {

    				var expectedColumns = ["Station","Sublocatie","Startdatum","Einddatum","Werk","Type"];
    				
    				//check for expected columns
    				for (var i = expectedColumns.length - 1; i >= 0; i--) {
    					if (data.columns.indexOf(expectedColumns[i]) === -1) {
    						//TODO: ik weet nog niet hoe ik error handling
							//moet implementeren in Angular
							console.error('Missing column ' + expectedColumns[i] + ' in planning data');
							return {};
    					}
    				}

    				preparedData = [];
    				var indexWerk = data.columns.indexOf('Werk');
    				var indexStartdatum = data.columns.indexOf('Startdatum');
    				var indexEinddatum = data.columns.indexOf('Einddatum');

    				for (var i = 0; i < data.rows.length; i++) {
    					var index;
    					var obj = {
    						label: data.rows[i][indexWerk],
    						slug: '',
    						times: [{
    							//"starting_time": 1355752800000, 
    							"starting_time": Math.round(new Date(data.rows[i][indexStartdatum]).getTime()), 
    							//"ending_time": 1355759900000}]
    							"ending_time": Math.round(new Date(data.rows[i][indexEinddatum]).getTime())}]
    					};
    					preparedData.push(obj);
    				};

    				return preparedData;
    			}


                function planning2(data) {

                    var expectedColumns = ["Station","Sublocatie","Startdatum","Einddatum","Werk","Type"];
                    
                    //check for expected columns
                    for (var i = expectedColumns.length - 1; i >= 0; i--) {
                        if (data.columns.indexOf(expectedColumns[i]) === -1) {
                            //TODO: ik weet nog niet hoe ik error handling
                            //moet implementeren in Angular
                            console.error('Missing column ' + expectedColumns[i] + ' in planning data');
                            return {};
                        }
                    }

                    preparedData = [];
                    var indexWerk = data.columns.indexOf('Werk');
                    var indexStartdatum = data.columns.indexOf('Startdatum');
                    var indexEinddatum = data.columns.indexOf('Einddatum');

                    for (var i = 0; i < data.rows.length; i++) {
                        var index;
                        var obj = {
                            label: '',
                            slug: '',
                            times: [{
                                label: data.rows[i][indexWerk],
                                //"starting_time": 1355752800000, 
                                starting_time: Math.round(new Date(data.rows[i][indexStartdatum]).getTime()), 
                                //"ending_time": 1355759900000}]
                                ending_time: Math.round(new Date(data.rows[i][indexEinddatum]).getTime())}]
                        };
                        preparedData.push(obj);
                    };

                    return preparedData;
                }
    		}
		}
}])