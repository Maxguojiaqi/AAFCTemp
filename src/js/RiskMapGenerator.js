

define(function(){
    return{

        cropDensity : null ,
        diseaseHistory : null,
        regionRisk : null,
        weatherForecast : null,
        modelType : null,
        modelParam: [],
        collectParamSucceed: false,
        coords: null,
        riskMapDate: null,

        initializeRiskMapGenerator : function()
        {
          var self = this;
          $("#DiseaseHistory").on("change", function()
          {
              self.getParamValue();
              console.log(self.diseaseHistory);
              console.log("being triggerd")
              console.log(self.collectParamSucceed);

          }); 
          $("#Cropdst").on("change", function()
          {
              self.getParamValue();
              console.log(self.cropDensity);
              console.log("being triggerd")
              console.log(self.collectParamSucceed);

          }); 
          $("#RegionR").on("change", function()
          {
              self.getParamValue();
              console.log(self.regionRisk);
              console.log("being triggerd")
              console.log(self.collectParamSucceed);

          }); 
          $("#WeatherForecast").on("change", function()
          {
              self.getParamValue();
              console.log(self.weatherForecast);
              console.log("being triggerd")
              console.log(self.collectParamSucceed);

          }); 
          $("#ModelType").on("change", function()
          {
              self.getParamValue();
              console.log(self.modelType);
              console.log("being triggerd")
              console.log(self.collectParamSucceed);

          }); 



          $("#GenerateRiskData").click(function()
          {
            console.log(self.modelParam);
            $("#loadingIndicator").addClass("ui active centered inline text loader");
            $("#loadingIndicator").append("Generating the Riskmap...");
            console.log(self.coords);
            $.post("../lib/php/RiskDataDownload.php", 
            {     
               minX: String(self.coords[0]),
               minY: String(self.coords[1]),
               maxX: String(self.coords[2]),
               maxY: String(self.coords[3]),
            }).done(function()
              {
                $.post("../lib/php/riskAnalysis.php", 
                  { 
                     DiseaseHistory: String(self.modelParam[0]),
                     CropDensity: String(self.modelParam[1]),
                     RegionalRisk: String(self.modelParam[2]),
                     WeatherForecast: String(self.modelParam[3]),    
                  }).done(function()
                    {
                      document.getElementById("loadingIndicator").removeAttribute("class");
                      $("#loadingIndicator").empty();
                    });
              });       
          });
        },






// $("#AoiData").click(function()
//   {
//     console.log(coords[0]);
//     // Make sure button is hidden before data is succsessfully downloaded
//     document.getElementById("buttonDownload1").style.visibility="hidden";
//     document.getElementById("buttonDownload2").style.visibility="hidden";
//     // document.getElementById("buttonDisplayRain").style.visibility="hidden";
//     // map.removeLayer(wms_map);
//     $.post("../lib/php/riskDownload.php", 
//       { 
//        minX: String(coords[0]),
//        minY: String(coords[1]),
//        maxX: String(coords[2]),
//        maxY: String(coords[3]),
//       })


//       .done(function(data, status)
//       {
//         $("#status").html("done");
//           data = jQuery.parseJSON(data);
//           console.log(data[0]);

//           $("#buttonDownload1").attr("href",data[0]);
//           $("#buttonDownload2").attr("href",data[1]);


//           // var link = "../../data/rain-data.tif";
          
//           //Show button when data is succsessfully downloaded
//           document.getElementById("buttonDownload1").style.visibility="visible";
//           document.getElementById("buttonDownload2").style.visibility="visible";
//           // 

//        });
//      });


          getParamValue : function()
          {
            // clear the array 
            this.modelParam = [];

            // getting the value from the dropdowns
            this.diseaseHistory = document.getElementById("DiseaseHistory").value;
            if(this.diseaseHistory != '')
            {
              this.modelParam.push(this.diseaseHistory);
            } 
            this.cropDensity = document.getElementById("Cropdst").value;
            if(this.cropDensity != '')
            {
              this.modelParam.push(this.cropDensity);
            }
            this.regionRisk = document.getElementById("RegionR").value;
            if(this.regionRisk != '')
            {
              this.modelParam.push(this.regionRisk);
            }
            this.weatherForecast = document.getElementById("WeatherForecast").value;
            if(this.weatherForecast != '')
            {
              this.modelParam.push(this.weatherForecast);
            }
            this.modelType = document.getElementById("ModelType").value;
            if(this.modelType != '')
            {
              this.modelParam.push(this.modelType);
            }

            console.log("current length: " + this.modelParam.length);


            if (this.modelParam.length == 5)
            {
              this.collectParamSucceed = true;
            }

            this.finishStep3(this.collectParamSucceed);

            console.log(this.modelParam);
            console.log(typeof(this.modelParam[0]));
          
          },


          finishStep3 : function(done)
          {
            if(done)
            {

            document.getElementById("step3").className = "checkmark icon";
            document.getElementById("step3").style.color = "green";

            }

            else 
            {
              document.getElementById("step3").className = "remove icon";
              document.getElementById("step3").style.color = "red";

            }

          }
      }
  });