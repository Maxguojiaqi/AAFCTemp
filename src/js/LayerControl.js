/*******************************************************************
Implement the LayerControl Panel.
Functionalities: 
AOI Ancillary Layers Picker, 
Target Date Picker, 
Target Layer Picker, 
Adjust Opacity and Legend Display

Last Modified: Jiaqi Guo(Max) 
Date: 2018-02-21
*******************************************************************/

define(function(){
	return{
			map: null,
			_generator: null,
			manitoba_municipal_map: null,
			manitoba_municipal_source: null,
			manitoba_township_map: null,
			manitoba_township_source: null,
			temperatureLayer: null,
			temperatureSource: null,
			rainLayer:null,
			rainSource:null,
			pmLayer: null,
			pmSource: null,
			CropHisLayer: null,
			CropHisSource : null,
			riskDataDate1: "20160601",

			setGenerator: function(generator){
				this._generator
			},

			initializeLayers: function(config){

			 console.log(config);
			 var map = this.map;

			  this.manitoba_municipal_source = new ol.source.Vector
		      ({
		        url: config.ancillaryLayers.municipalBoundary.url,
		        format: new ol.format.GeoJSON()
		      });

		      // create the Vector layer for manitoba municipall boundary data

		      this.manitoba_municipal_map =  new ol.layer.Vector
		      ({
		        source: this.manitoba_municipal_source,
		      });    


		      // create the Vector source for manitoba municipall boundary data

		      this.manitoba_township_source = new ol.source.Vector
		      ({
		        url: config.ancillaryLayers.legalLandSurvey.url,
		        format:  new ol.format.GeoJSON()
		      });


		      // create the Vector layer for manitoba municipall boundary data

		      this.manitoba_township_map =  new ol.layer.Vector
		      ({
		        source: this.manitoba_township_source,
		      });    


		      // create tilewms source for temperature data
		      this.temperatureSource = new ol.source.TileWMS
		      ({
		        url: config.targetLayers.temperature.url,
		        params: {'LAYERS': config.targetLayers.temperature.params.LAYERS + config.targetLayers.temperature.date},
		        serverType: config.targetLayers.temperature.serverType,
		        crossOrigin: config.targetLayers.temperature.crossOrigin
		      });

		      console.log(config.targetLayers.temperature);


		      // create wmslayer from temperature data 
		      this.temperatureLayer = new ol.layer.Tile
		      ({
		        source: this.temperatureSource
		      });


		      // create tilewms source for rain data
		      this.rainSource = new ol.source.TileWMS
		      ({
		        url: config.targetLayers.rain.url,
		        params: {'LAYERS': config.targetLayers.rain.params.LAYERS + config.targetLayers.rain.date},
		        serverType: config.targetLayers.rain.serverType,
		        crossOrigin:config.targetLayers.rain.crossOrigin
		      });


		      // create wmslayer from rain data 
		      this.rainLayer = new ol.layer.Tile
		      ({
		        source: this.rainSource
		      });

		      // create tilewms source for PM data
		      this.pmSource = new ol.source.TileWMS
		      ({
		        url: config.targetLayers.pm.url,
		        params: {'LAYERS': config.targetLayers.pm.params.LAYERS + config.targetLayers.pm.date},
		        serverType: config.targetLayers.pm.serverType,
		        crossOrigin: config.targetLayers.pm.crossOrigin
		      });


		      // create wmslayer from PM data 
		      this.pmLayer = new ol.layer.Tile
		      ({
		        source: this.pmSource
		      });


		      // create tilewms source for PM data
		      this.CropHisSource = new ol.source.TileWMS
		      ({
		        url: config.targetLayers.croppingHistory.url,
		        params: {'LAYERS': config.targetLayers.croppingHistory.params.LAYERS + config.targetLayers.croppingHistory.date},
		        serverType: config.targetLayers.croppingHistory.serverType,
		        crossOrigin: config.targetLayers.croppingHistory.crossOrigin,
		      });


		      // create wmslayer from PM data 
		      this.CropHisLayer = new ol.layer.Tile
		      ({
		        source: this.CropHisSource
		      });

			// Create date variable that used in datepicker1 and datepicker2 
			// var date = this._generator.riskDataDate;

			// Initiate datepicker1 and datepicker2 
			$( function() {
				$( "#datepicker1" ).datepicker();
			} );


			$( function() {
			$( "#datepicker2" ).datepicker();
			} );


			// when finish loading, set the default data and range for datepickers
			$(document).ready(function() {
				$("#datepicker1").datepicker('setDate',"06/01/2016");
				$("#datepicker1").datepicker('option',"minDate","06/01/2016");
				$("#datepicker1").datepicker('option',"maxDate","06/15/2016");
				$("#datepicker2").datepicker('setDate',"06/01/2016");
				$("#datepicker2").datepicker('option',"minDate","06/01/2016");
				$("#datepicker2").datepicker('option',"maxDate","06/15/2016");
			});


			// Date Picker
			// Based on the user selected date for datepicker1, change the Geoserver Endpoint
			var self = this;
			$("#datepicker1").on("change", function() 
			{
				
				var date = document.getElementById("datepicker1").value;
				// this._generator.riskDataDate = date;
				var serverDate = date.substring(6,10) + date.substring(0,2) + date.substring(3,5);
				console.log(serverDate);
				self.riskDataDate1 = date;


				self.rainSource = new ol.source.TileWMS
			      ({
			        url: config.targetLayers.rain.url,
			        params: {'LAYERS': config.targetLayers.rain.params.LAYERS + serverDate},
			        serverType: config.targetLayers.rain.serverType,
			        crossOrigin:config.targetLayers.rain.crossOrigin
			      });

				self.rainLayer.setSource(self.rainSource);

				self.temperatureSource = new ol.source.TileWMS
				({
		        url: config.targetLayers.temperature.url,
		        params: {'LAYERS': config.targetLayers.temperature.params.LAYERS + serverDate},
		        serverType: config.targetLayers.temperature.serverType,
		        crossOrigin: config.targetLayers.temperature.crossOrigin
		      	});

				self.temperatureLayer.setSource(self.temperatureSource);



				self.pmSource = new ol.source.TileWMS
				({
		        url: config.targetLayers.pm.url,
		        params: {'LAYERS': config.targetLayers.pm.params.LAYERS + serverDate + "06"},
		        serverType: config.targetLayers.pm.serverType,
		        crossOrigin: config.targetLayers.pm.crossOrigin
		      	});

				self.pmLayer.setSource(self.pmSource);


				// set datepicker2's date to be same as datepicker1
				$("#datepicker2").datepicker('setDate', date);
			});



			// Implement Opacity Slider functionality

			var slider = document.getElementById("myRange");
			var output = document.getElementById("opacity");
			output.innerHTML = slider.value;

			slider.oninput = function() 
			{
				var Opacity = this.value / 100;
				self.temperatureLayer.setOpacity(Opacity);
				self.rainLayer.setOpacity(Opacity);
				self.pmLayer.setOpacity(Opacity);
				output.innerHTML = this.value;
			}



			// Set the AOI Vector layer to when checked, only one boundary allowed 
			$( "#municipal" ).on( "click", function() 
			{

			  if(document.getElementById("municipal").checked == true)
			  {
			  	map.addLayer(self.manitoba_municipal_map);
			  	aoiType = "municipal";

			  	if((document.getElementById("municipal").checked == true)&&(document.getElementById("township").checked == true))
			  	{
			  		document.getElementById("aoiDropdown").innerHTML = "";
			  	}

			  }

			  else
			  {
			  	
			  	map.removeLayer(self.manitoba_municipal_map);


			  	if((document.getElementById("municipal").checked == false)&&(document.getElementById("township").checked == false))
			  	{
			  		document.getElementById("aoiDropdown").innerHTML = "";
			  	}
			  }

			});

			$( "#township" ).on( "click", function() 
			{

			  if(document.getElementById("township").checked == true)
			  {
			  	map.addLayer(self.manitoba_township_map);
			  	aoiType = "township";
			  	if((document.getElementById("municipal").checked == true)&&(document.getElementById("township").checked == true))
			  	{
			  		document.getElementById("aoiDropdown").innerHTML = "";
			  	}
			  }

			  else
			  {
			  	map.removeLayer(self.manitoba_township_map);

			  	if((document.getElementById("municipal").checked == false)&&(document.getElementById("township").checked == false))
			  	{
			  		document.getElementById("aoiDropdown").innerHTML = "";
			  	}
			  }

			});


			// Layer Picker
			// Add target Layer and Layer's legend to the panel

			$("#layerdropdown").on("change", function() 
			{
			   	var layerType =  document.getElementById("layerdropdown").value;
			   	console.log(typeof(layerType));
			   	console.log(layerType);

			   	if (layerType==0)
			   	{
			   		map.getLayers().insertAt(1,self.temperatureLayer);
					map.removeLayer(self.rainLayer);
					map.removeLayer(self.pmLayer);
					map.removeLayer(self.CropHisLayer);
					document.getElementById("layerLegend").src=config.layerLegends.temperature.url;
			   		document.getElementById("legendTitle").innerHTML = config.layerLegends.temperature.title;
			   	}

			   	else if (layerType==1)
			   	{
			   		map.getLayers().insertAt(1,self.rainLayer);
					console.log(self.rainLayer);
					map.removeLayer(self.temperatureLayer);
					map.removeLayer(self.pmLayer);
					map.removeLayer(self.CropHisLayer);
					document.getElementById("layerLegend").src= config.layerLegends.rain.url;
					document.getElementById("legendTitle").innerHTML = config.layerLegends.rain.title;
				}
			   	else if (layerType==2)
			   	{
			   		map.getLayers().insertAt(1,self.pmLayer);
			   		console.log(self.pmLayer);
					map.removeLayer(self.rainLayer);
					map.removeLayer(self.temperatureLayer);
					map.removeLayer(self.CropHisLayer);
					document.getElementById("layerLegend").src=config.layerLegends.pm.url;
					document.getElementById("legendTitle").innerHTML = config.layerLegends.pm.title;
			   	}

			   	else if (layerType==3)
			   	{
			   		map.getLayers().insertAt(1,self.CropHisLayer);
			   		map.removeLayer(self.temperatureLayer);
			   		map.removeLayer(self.rainLayer);
			   		map.removeLayer(self.pmLayer);
			   		document.getElementById("layerLegend").src=config.layerLegends.croppingHistory.url
					document.getElementById("legendTitle").innerHTML = config.layerLegends.croppingHistory.title;
			   	}

			   	else
			   	{
			   		map.removeLayer(self.temperatureLayer);
			   		map.removeLayer(self.rainLayer);
			   		map.removeLayer(self.pmLayer);
			   		map.removeLayer(self.CropHisLayer);
			   	}
			   	
			});
		},

		updateDateBasedLayers : function(date)
		{
			this._updateDateBasedLayer(temperatureLayer, config.dataLayers.temperature, date)
			this._updateDateBasedLayer(rainLayer, config.dataLayers.rain, date)
		},

		_updateDateBasedLayer : function(layer, layerConfig, date)
		{
	      var source = new ol.source.TileWMS
	      ({
	        url: layerConfig.url,
	        params:{'LAYERS': 'RawRain:rain'+ date},
	        serverType: 'geoserver',
	        crossOrigin:'anonymous'
	      });

	      layer.setSource(source);

		}

	}
});