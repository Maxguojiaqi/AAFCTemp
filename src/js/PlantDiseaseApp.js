// require(["../js/LayerControl"], function(config, MapUI, LayerControl, RiskModelControl, RiskMapGenerator){


// 	RiskMapGenerator.initialize(config);

// 	var riskDataDate = null;

// 	MapUI.createMap(config.mapConfig);
// 	LayerControl.map = MapUI.map;
// 	LayerControl.initializeLayers(config.dataLayers, config.ancillaryLayers);
// 	LayerControl.setGenerator(RiskMapGenerator);

// 	RiskModelControl.initialize(config);
// 	RiskModelControl.setGenerator(RiskMapGenerator);

// 	var layerControl = LayerControl;
// 	layerControl.initializeLayers();
// 	window.LayerControl = layerControl;
// 	//console.log(LayerControl.riskDataDate);
	
// })


require(["../js/config.js", "../js/MapUI.js", "../js/LayerControl.js", "../js/RiskModelControl.js", "../js/RiskMapGenerator.js"], function(config,MapUI,LayerControl,RiskModelControl, RiskMapGenerator)

{

	console.log(config);
	console.log(config.mapConfig.mapViewParams.projection);
	console.log(config.targetLayers.rain.params.LAYERS);
	// console.log(LayerControl);
	// console.log(RiskModelControl);


	MapUI.initializeMap(config);
	LayerControl.map = MapUI.map;
	LayerControl.initializeLayers(config);
	RiskModelControl.temperatureLayer = LayerControl.temperatureLayer;
	RiskModelControl.rainLayer = LayerControl.rainLayer;
	RiskModelControl.pmLayer = LayerControl.pmLayer;
	RiskModelControl.manitoba_township_map = LayerControl.manitoba_township_map;
	RiskModelControl.manitoba_municipal_map = LayerControl.manitoba_municipal_map;
	RiskModelControl.map = MapUI.map;

	RiskModelControl.initializeRiskModel(config,RiskMapGenerator);

	// RiskMapGenerator.coords = RiskModelControl.coords;

	RiskMapGenerator.initializeRiskMapGenerator();

	// RiskModelControl.initializeRiskModel();

	// RiskModelControl.temperatureLayer = LayerControl.temperatureLayer;

	// console.log(MapUI);
	console.log(LayerControl);
	console.log(RiskModelControl);
	console.log(RiskMapGenerator);
	
});