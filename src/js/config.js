
define(
{
  mapConfig:
  {
	basemapUrl:"",
	mapViewParams: {
	  projection: "EPSG:4326",
	  center: [-97.5 , 50.5],
	  zoom: 7
	}
  },

  targetLayers: 
  {
  	temperature: {
	  	title: "Temperature",
	  	layerType: "raster",
	  	url: 'http://34.201.23.195:8080/geoserver/RawTemperature/ows?',
  		params:{'LAYERS': 'RawTemperature:Temperature'},
  		date: "20160601",
  		serverType: 'geoserver',
  		crossOrigin:'anonymous'
	},
	rain: {
	  	title: "Rain",
	  	layerType: "raster",
	  	url: 'http://34.201.23.195:8080/geoserver/RawRain/ows?',
  		params:{'LAYERS': 'RawRain:rain'},
  		date: "20160601",
  		serverType: 'geoserver',
  		crossOrigin:'anonymous'
	},
  	pm: {
	  	title: "PM",
	  	layerType: "raster",
	  	url:'http://34.201.23.195:8080/geoserver/RawPM/ows?',
  		params:{'LAYERS': 'RawPM:SoilMoisturePM'},
  		date: "2016060106",
  		serverType: 'geoserver',
  		crossOrigin:'anonymous'
	},
  	croppingHistory: {
	  	title: "CroppingHistory",
	  	layerType: "raster",
	    url:'http://34.201.23.195:8080/geoserver/CroppingHistory/ows?',
	    params:{'LAYERS': 'CroppingHistory:CropHist'},
	    date:"2016",
	    serverType: 'geoserver',
	    crossOrigin:'anonymous'
	}
  },

  ancillaryLayers: 
  {
	municipalBoundary:  {
	  	title: "Municipal-Boundary",
	  	layerType: "vector",
	  	url: 'http://34.201.23.195:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:MB_Municipal_Boundary&maxFeatures=5000&outputFormat=application%2Fjson',
	  	useGeoJSON: true
	  },
	legalLandSurvey:  {
	  	title: "Legal-Land-Survery",
	  	layerType: "vector",
	  	url: 'http://34.201.23.195:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:PAR_MB_TOWNSHIP&maxFeatures=5000&outputFormat=application%2Fjson',
	  	useGeoJSON: true
	  },
  }, 

   layerLegends: 
  {
	temperature:  {
	  	title: "Average Temperature in Past 3 Days",
	  	url: "http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawTemperature:Temperature20160601"
	  },
	rain:  {
	  	title: "Accumulated Precipitation in Past 2 Weeks",
	  	url: "http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawRain:rain20160601"
	  },
	pm:  {
	  	title: "Persistent Matrix",
	  	url: "http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawPM:SoilMoisturePM2016060106"
	  },
	croppingHistory:  {
	  	title: "Cropping History Since Last Time Canola Planted",
	  	url: "http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=CroppingHistory:CropHist2016"
	  },
  }

});