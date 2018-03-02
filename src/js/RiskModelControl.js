/*******************************************************************
Implement the LayerControl Panel.
Functionalities: 
Target Date Picker, 
AOI Ancillary Layers Picker, 
Set Model Parameters
Generate Risk Result
Adjust Opacity and Legend Display

Last Modified: Jiaqi Guo(Max) 
Date: 2018-02-21
*******************************************************************/



define(function(){
    return{

    temperatureLayer: null,
    rainLayer:null,
    pmLayer: null,
    riskDataDate2: "20160601",
    manitoba_township_map: null,
    manitoba_municipal_map: null,
    aoiType : null,
    aoiInfo: null,
    map: null,
    coords : [],


    initializeRiskModel : function(config, RiskMapGenerator)
    {


      var self = this;
      // var RiskMapGenerator = RiskMapGenerator;
      $("#datepicker2").on("change", function() 
      {
        // var rasterDataDate
        var date = document.getElementById("datepicker2").value;
        var serverDate = date.substring(6,10) + date.substring(0,2) + date.substring(3,5);
        console.log(serverDate);

        // set datepicker1's date to be same as datepicker2
        $("#datepicker1").datepicker('setDate', date);


        var rainSource = new ol.source.TileWMS
          ({
            url: config.targetLayers.rain.url,
            params: {'LAYERS': config.targetLayers.rain.params.LAYERS + serverDate},
            serverType: config.targetLayers.rain.serverType,
            crossOrigin:config.targetLayers.rain.crossOrigin
          });


        self.rainLayer.setSource(rainSource);

        var temperatureSource = new ol.source.TileWMS
        ({
            url: config.targetLayers.temperature.url,
            params: {'LAYERS': config.targetLayers.temperature.params.LAYERS + serverDate},
            serverType: config.targetLayers.temperature.serverType,
            crossOrigin: config.targetLayers.temperature.crossOrigin
        });

        self.temperatureLayer.setSource(temperatureSource);
      });







      $("#AOI").on("change", function() 
      {
         	var aoi =  document.getElementById("AOI").value;
         	console.log(typeof(aoi));
         	console.log(aoi);
          self.map.removeLayer(self.manitoba_township_map);
          self.map.removeLayer(self.manitoba_municipal_map);

         	if (aoi==0)
         	{
            if(document.getElementById("aoiIdentifyTool").value == '1')
            {
              self.finishStep2(false);
              self.updateAoiFeature(false);
              self.map.getInteractions().pop();
              var newSelect = new ol.interaction.Select();
              self.map.addInteraction(newSelect);
              self.clickAOI(newSelect,RiskMapGenerator);
            }


        		self.map.removeLayer(self.manitoba_township_map);
        		self.map.removeLayer(self.manitoba_municipal_map);
        		self.map.addLayer(self.manitoba_municipal_map);
        		document.getElementById("municipal").checked = true;
        		document.getElementById("township").checked = false;
            self.aoiType = "municipal";
        	}

         	else if (aoi==1)
         	{
            if(document.getElementById("aoiIdentifyTool").value == '1')
            {
              self.finishStep2(false);
              self.updateAoiFeature(false);
              self.map.getInteractions().pop();
              var newSelect = new ol.interaction.Select();
              self.map.addInteraction(newSelect);
              self.clickAOI(newSelect,RiskMapGenerator);
            }


        		self.map.removeLayer(self.manitoba_township_map);
        		self.map.removeLayer(self.manitoba_municipal_map);
        		self.map.addLayer(self.manitoba_township_map);
        		document.getElementById("township").checked = true;
        		document.getElementById("municipal").checked = false;
            self.aoiType = "township";
         	}

       });



      $("#aoiIdentifyTool").on("click", function() 
      {
        console.log(RiskMapGenerator);

        console.log(document.getElementById("aoiIdentifyTool").value);
        if(document.getElementById("aoiIdentifyTool").value == '0')
        {
          document.getElementById("aoiIdentifyTool").className = "mini ui icon positive button";
          document.getElementById("aoiIdentifyTool").setAttribute('data-content', "turn off the identify tool")
          document.getElementById("aoiIdentifyTool").value = "1"
          var newSelect = new ol.interaction.Select();
          self.map.addInteraction(newSelect);
          self.clickAOI(newSelect,RiskMapGenerator);

          console.log(self.coords);
        }

        else if(document.getElementById("aoiIdentifyTool").value == '1')
        {
          self.map.getInteractions().pop();
          console.log(self.map.getInteractions());
          document.getElementById("aoiIdentifyTool").className = "mini ui icon button";
          document.getElementById("aoiIdentifyTool").setAttribute('data-content', "turn on the identify tool")
          document.getElementById("aoiIdentifyTool").value = "0"
          self.finishStep2(false);
          self.updateAoiFeature(false);
        }


      });


      $("#zoomToSelection").on("click", function() 
      {

        console.log(self.currentLocationY);
        if (self.coords.length != 0)
        {
          self.map.getView().animate({

            center:[(self.coords[0] + self.coords[2])/2, (self.coords[1]+self.coords[3])/2],
            zoom: 10
          });
        }

      });



      $("#clearCurrentAoi").on("click", function() 
      {

        if(document.getElementById("aoiIdentifyTool").value == '1')
        {
          self.updateAoiFeature(false);
          self.finishStep2(false);

          self.map.getInteractions().pop();
          self.coords.length = 0;
          var newSelect = new ol.interaction.Select();
          self.map.addInteraction(newSelect);
          console.log(RiskMapGenerator);
          self.clickAOI(newSelect, RiskMapGenerator);
        }

      });
    },

    clickAOI: function (selectclick, RiskMapGenerator)
    {
      var self = this;
      // var selectclick = this.select;
      selectclick.on('select', function(e)
      { 
        console.log(self.aoiType);
        if (e.selected.length!== 0)
        {
        console.log(e)
        console.log(e.selected[0].S.MUNI_NAME);
        console.log(e.selected[0].f.target.l);
        // console.log(typeof(e.selected[0].f.target.l[0]));

        self.coords = e.selected[0].f.target.l;
        RiskMapGenerator.coords = self.coords;

        console.log(self.coords)
        if (self.aoiType == "municipal")
        {
          self.aoiInfo = e.selected[0].S.MUNI_NAME;
        }

        else if (self.aoiType == "township")
        {
          self.aoiInfo = e.selected[0].S.NAME;  
        }

        // currentLocation = ol.proj.fromLonLat([coords[0],coords[1]]);

        // self.currentLocationX = (self.coords[0] + self.coords[2])/2;
        // self.currentLocationY = (self.coords[1] + self.coords[3])/2;

        // console.log(self.currentLocationY);

        self.updateAoiFeature(true);
        // document.getElementById("aoiFeature").style.color = "LimeGreen";
        // document.getElementById("aoiFeature").innerHTML = "Feature: " + self.aoiInfo;
        // document.getElementById("step2").className = "checkmark icon";
        // document.getElementById("step2").style.color = "green";
        self.finishStep2(true);

        }
      });
    },

      finishStep2 : function(done)
      {

        if(done)
        {

        document.getElementById("step2").className = "checkmark icon";
        document.getElementById("step2").style.color = "green";

        }

        else 
        {
          document.getElementById("step2").className = "remove icon";
          document.getElementById("step2").style.color = "red";

        }

      },

      updateAoiFeature : function(done)
      {
        if(done)
        {

        document.getElementById("aoiFeature").style.color = "LimeGreen";
        document.getElementById("aoiFeature").innerHTML = "Feature: " + this.aoiInfo;

        }

        else 
        {
          document.getElementById("aoiFeature").style.color = "red";
          document.getElementById("aoiFeature").innerHTML = "(no feature selected)";

        }


      }

  }
});