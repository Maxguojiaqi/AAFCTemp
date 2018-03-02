<?php

// ************************************************************** 
// This code generate the model process functionality of the system

// Created By: Jiaqi Guo(Max)  
// Last Modified: 2017-09-18
// ***************************************************************




// require('../../lib/fb/fb.php');

// session_start();

// $timeStamp = $_SESSION['Tstamp'];
// FB::info("TimeStampNumber: ".$timeStamp);


// $minX = $_REQUEST['minX'];
// $minY = $_REQUEST['minY'];
// $maxX = $_REQUEST['maxX'];
// $maxY = $_REQUEST['maxY'];   




$CropDensity = $_REQUEST['DiseaseHistory'];
$DiseaseHistory = $_REQUEST['CropDensity'];
$RegionRisk = $_REQUEST['RegionalRisk'];
$WeatherForecast = $_REQUEST['WeatherForecast'];


function runPython()
{

    // $croppingHistory = "croppingHistory".$timeStamp.".tif";
    // $rainData = "rainCalc".$timeStamp.".tif";
    // $Riskmap1 = "risk".$timeStamp.".tif";
    // $Riskmap = "riskmap".$timeStamp.".tif";
    // $CropMap = "CropDensity".$timeStamp.".tif";

    // $CropDensity = $_REQUEST['CropDensity'];
    // // FB::info($CropDensity);
    // $DiseaseHistory = $_REQUEST['DiseaseHistory'];
    // // FB::info($DiseaseHistory); 
    // $RegionRisk = $_REQUEST['RegionRisk'];



    // $CropDensity = 0;
    // // FB::info($CropDensity);
    // $DiseaseHistory = 1;
    // // FB::info($DiseaseHistory); 
    // $RegionRisk = 2;
    // $WeatherForecast = 1;




    // FB::info($RegionRisk);  
    $riskArray = array($CropDensity,$DiseaseHistory,$RegionRisk,$WeatherForecast);

    echo "this is riskArray: ";
    // echo $riskArray;
    $riskValue = array();

    foreach($riskArray as $riskFactor)
    {

        echo $riskFactor;
        if($riskFactor == '0')
        {
            array_push($riskValue, 0);
            // $riskValue[] = 0;
        }

        else if ($riskFactor == '1')
        {
            array_push($riskValue, 5);
            // $riskValue[] = 5;
        }
        else 
        {            
            array_push($riskValue, 10);
            // $riskValue[] = 10;
        }
    }
    // $timeStamp = (int)$timeStamp;
    // FB::info("TimeStampNumber: ".$timeStamp);
    // array_push($riskValue,$timeStamp);
    // FB::info($riskValue);
    // FB::info(gettype($riskValue[1]));
    // $temp_cd = json_encode($riskValue[0]);
    // $temp_dh = json_encode($riskValue[1]);
    // $temp_rr = json_encode($riskValue[2]);

        $temp_array = json_encode($riskValue);


        foreach($riskValue as $temp)
        {
            echo $riskValue[2];

        }

    // echo $temp_array;
    // FB::info($temp_array);
    // FB::info(gettype($temp_array));

    $result = shell_exec('python3 ../py/riskcalc.py ' ."'".$temp_array."'");
    // $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/'.$rainData.' -B ../../../data/'.$croppingHistory.' --outfile=../../../data/'.$Riskmap1.' --calc="A+B"');
    // $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/'.$CropMap.' -B ../../../data/'.$Riskmap1.' --outfile=../../../data/'.$Riskmap.' --calc="A+B"');
}



$riskResult = runPython();


// echo json_encode(array($riskmap_path));




?>
