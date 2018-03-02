define(["config.json", "https://openlayers.org/en/v4.2.0/build/ol.js"], function(config, OpenLayers){
	_url: config.manitobaSourceUrl,
	setServerUrl: function(url){
		this._url = url;
	},



	prepareLayerForExport: function(coords){
		if (_url == ""){
			throw Exception("No URL defined.");
		}

	return $.post(_url, 
      { 
       minX: String(coords[0]),
       minY: String(coords[1]),
       maxX: String(coords[2]),
       maxY: String(coords[3]),
      })


      .done(function(data, status)
      {
        // OpenLayers.createLayer()
        $("#status").html("done");
          data = jQuery.parseJSON(data);
          console.log(data[0]);

          // Trigger event so page is refreshed accordingly?

          // Call the publishing service?

          return "";//publishedUrl;
      });

	},

	generateRiskMap: function(/*???*/){

	}
})