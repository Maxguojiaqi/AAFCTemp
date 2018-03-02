
<?php
// *************************************************************
// This code generate the data download functionality of the system
// Created By: Jiaqi Guo(Max)  
// Last Modified: 2017-09-18
// **************************************************************

// Request data from JavaScript
// if (empty($_REQUEST["minX"]) || empty($_REQUEST["minY"]) || empty($_REQUEST["maxX"]) || empty($_REQUEST["maxY"]) || !is_numeric($_REQUEST["minX"]) || !is_numeric($_REQUEST["minY"]) || !is_numeric($_REQUEST["maxX"]) || !is_numeric($_REQUEST["maxY"]))
// {
//     // Throws error if inputs aren't entered or numeric. 
//     $errMsg = "*Error, All fields are required and must be WGS84 coordinates.";    
// }
// else
// {
$minX = $_REQUEST['minX'];
$minY = $_REQUEST['minY'];
$maxX = $_REQUEST['maxX'];
$maxY = $_REQUEST['maxY'];   	     
// }     
	// $minX = '-98.68136015599995';
	// $minY = '49.35433829400003';
	// $maxX = '-98.545076601';
	// $maxY = '49.443506193000104'; 

$rainfall = "rainfall.tif";
$temperature = "temperature.tif";
$pm = "pm.tif";




$url_temperature = 'http://34.201.23.195:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=Average_Temperature:TT_Avg3day20160601&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';


$url_rainfall = 'http://34.201.23.195:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=Rainfall:PR_Acc2w20160601&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';

$url_pm = 'http://34.201.23.195:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=Presistence_Matrix:PM_Avg20160601_06&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';


function downloadData ($serverUrl, $fileName)
{
// Setup the headers and post options, then execute curlPOST  
	$ch_work = curl_init();   

	curl_setopt($ch_work, CURLOPT_URL, $serverUrl);
	curl_setopt($ch_work, CURLOPT_RETURNTRANSFER, 1);
	$ch_result = curl_exec($ch_work);
	$contentType = curl_getinfo($ch_work, CURLINFO_CONTENT_TYPE);
	curl_close($ch_work);
	$filesave = "../../../data/".$fileName;
	file_put_contents($filesave, $ch_result);
}


downloadData($url_rainfall, $rainfall);
downloadData($url_temperature, $temperature);
downloadData($url_pm, $pm);
?>