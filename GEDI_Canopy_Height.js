// Define the study area boundary
var boundary = ee.FeatureCollection("users/surajbashyal5603/Pokhara2");

// Function to mask GEDI data based on quality flags
var qualityMask = function(image) {
  return image.updateMask(image.select('quality_flag').eq(1))
              .updateMask(image.select('degrade_flag').eq(0));
};

// Load the GEDI dataset, apply quality mask, and filter by date range
var dataset = ee.ImageCollection('LARSE/GEDI/GEDI02_A_002_MONTHLY')
                .map(qualityMask)
                .filterDate('2019-01-01', '2023-12-31') // Filter data from 2019 to 2023
                .select('rh98')
                .median(); // Get median canopy height value over the specified period

// Clip the dataset to the study area boundary
var vegetationHeight = dataset.clip(boundary);

// Visualization parameters for GEDI data
var gediVis = {
  min: 1,
  max: 60,
  palette: 'darkred,red,orange,green,darkgreen',
};

// Set the map center to study area and add the layers
Map.centerObject(boundary, 11); // Center coordinates of Nepal
Map.addLayer(boundary, {color: 'blue', fillColor: '00000000'}, 'Study Area Boundary');
Map.addLayer(vegetationHeight, gediVis, 'GEDI Canopy Height (rh98)');

// Export the vegetation height image to Google Drive
Export.image.toDrive({
  image: vegetationHeight,
  description: 'Vegetation_Height_Nepal',
  region: boundary.geometry(),
  scale: 30,
  maxPixels: 1e13
});
