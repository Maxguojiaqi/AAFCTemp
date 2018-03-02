/*******************************************************************
Generate the basemap using OpenLayers API 
Area of interest boundary vector data and raster layer data stored in Geoserver

Last Modified: Jiaqi Guo(Max) 
Date: 2018-02-21
*******************************************************************/



// creating the container for the popups


define(function(){
  return{
  // var container = document.getElementById('popup');
  // var content = document.getElementById('popup-content');
  // var closer = document.getElementById('popup-closer');
    map : null,
    aoiInfo : null,
    aoiType: null,
    currentLocation : null,
  // var select = new ol.interaction.Select();


    initializeMap: function(config)
    {
      // create the popup overlay
      // var overlay = new ol.Overlay({
      //   element: container,
      //   autoPan: true,
      //   autoPanAnimation: {
      //     duration: 250
      //   }
      // });

      // closer.onclick = function() {
      // overlay.setPosition(undefined);
      // closer.blur();
      // return false;
      // };


      // Basemap layer, OSM source using bing map aerial
      //
      var OSM_layer = new ol.layer.Tile
      ({
        // source: new ol.source.OSM()
          source: new ol.source.BingMaps({
          key: 'Ao3gqEs-MVTd_WIvPO4XGqlFW6poGriaAu_hgkaln2H1d7ckV0ndV96HO5YdhAHP',
          imagerySet: 'Aerial'})
      });



      // create map view, specify the initial location, zoom level and projection 
      var view = new ol.View(config.mapConfig.mapViewParams);

      // Create scaleline control
      var scaleline = new ol.control.ScaleLine();

      // create map interface 

      this.map = new ol.Map
      ({
          controls: [scaleline],  //, attr
          interactions: ol.interaction.defaults
          ({
              doubleClickZoom: false
          }),
          layers: [OSM_layer],
          target: 'map',
          // overlays: [overlay],
          view: view
      });

      // console.log(map);

      // when double click, openup a popup with cell info in it
      // map.on('dblclick', function(evt) 
      // {
      //   var coordinate = evt.coordinate;
      //   var viewResolution = /** @type {number} */ (view.getResolution());
      //   var url = temperatureSource.getGetFeatureInfoUrl(
      //       evt.coordinate, viewResolution, 'EPSG:3857',
      //       {'INFO_FORMAT': 'text/html'});
      //   if (url) {

      //         overlay.setPosition(coordinate);
      //   };

      //   var xhttp = new XMLHttpRequest();
      //   xhttp.onreadystatechange = function() 
      //   {
      //     if (this.readyState == 4 && this.status == 200) 
      //     {
      //         content.innerHTML = this.responseText;
      //     }
      //   };
      //   xhttp.open("GET", url, true);
      //   xhttp.send();

      //   console.log(url);
      // });


      // create pointer, click on the map and trigger popups
      // this.map.on('pointermove', function(evt) {
      //   if (evt.dragging) {
      //     return;
      //   }
      //   var pixel = this.map.getEventPixel(evt.originalEvent);
      //   var hit = this.map.forEachLayerAtPixel(pixel, function() {
      //     return true;
      //   });
      //   this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      // });




      // adding the interaction method single click to map to acquire the extent of the AOI
      // map.addInteraction(select);
    }
  }
});
