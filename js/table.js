var MEM = {};
/**
 * 
 * @param {Array} data - 2d array of data
 *
 */
 var TabularForm = function(data) {
	this.numberOfRows = data.length;
	this.numberOfColumns = data[0].length;
	this.data = data;
}


TabularForm.prototype.render  = function() {
	for (var i = 0 ; i <this.numberOfRows; i++) {
		if(this.data[i].length == this.numberOfColumns) {
			continue;
		} else { 
			alert("data is not in proper form");
			return false;	
		}
	}	

	var html = $('#rows').apply({rows: this.numberOfRows, columns: this.numberOfColumns, data: this.data});
	return html;
}