// Define the study area boundary
var boundary = ee.FeatureCollection("users/surajbashyal5603/Pokhara2");

// Load the Landsat 8 Surface Reflectance dataset
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(boundary) // Replace with your study area boundary
  .filterDate('2019-01-01', '2023-12-31') // Specify the date range
  .filter(ee.Filter.lt('CLOUD_COVER', 10)) // Filter images with <10% cloud cover
  .select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5']); // Select relevant bands (B2, B3, B4, B5)

// Function to calculate NDWI, SAVI, and EVI
var calculateIndices = function(image) {
  var ndvi = image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  
  // NDWI: (Green - NIR) / (Green + NIR)
  var ndwi = image.normalizedDifference(['SR_B3', 'SR_B5']).rename('NDWI');
  
  // SAVI: ((NIR - Red) / (NIR + Red + L)) * (1 + L), where L = 0.5
  var savi = image.expression(
    '((NIR - Red) / (NIR + Red + L)) * (1 + L)', {
      'NIR': image.select('SR_B5'),
      'Red': image.select('SR_B4'),
      'L': 0.5
    }).rename('SAVI');
  
  // EVI: 2.5 * (NIR - Red) / (NIR + C1 * Red - C2 * Blue + L), where C1 = 6, C2 = 7.5, L = 1
  var evi = image.expression(
    '2.5 * ((NIR - Red) / (NIR + C1 * Red - C2 * Blue + L))', {
      'NIR': image.select('SR_B5'),
      'Red': image.select('SR_B4'),
      'Blue': image.select('SR_B2'),
      'C1': 6,
      'C2': 7.5,
      'L': 1
    }).rename('EVI');
  
  return image.addBands([ndvi, ndwi, savi, evi]);
};

// Apply the function to calculate indices for the collection
var indicesCollection = dataset.map(calculateIndices);

// Reduce the collection to median values for each index
var indicesMedian = indicesCollection.select(['NDVI', 'NDWI', 'SAVI', 'EVI']).median();

// Clip the indices to the Nepal boundary
var indicesClipped = indicesMedian.clip(boundary);

// Add indices to the map
Map.centerObject(boundary, 11);

Map.addLayer(indicesClipped.select('NDVI'), {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
Map.addLayer(indicesClipped.select('NDWI'), {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDWI');
Map.addLayer(indicesClipped.select('SAVI'), {min: 0, max: 1, palette: ['brown', 'yellow', 'green']}, 'SAVI');
Map.addLayer(indicesClipped.select('EVI'), {min: -1, max: 1, palette: ['red', 'white', 'blue']}, 'EVI');

// Print the range of values for each index
var stats = indicesClipped.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: boundary,
  scale: 30,
  bestEffort: true
});
print('Index Ranges:', stats);

// Export NDVI
Export.image.toDrive({
  image: indicesClipped.select('NDWI'),
  description: 'NDWI_Landsat8',
  scale: 30,
  region: boundary,
  fileFormat: 'GeoTIFF'
});

// Export NDWI
Export.image.toDrive({
  image: indicesClipped.select('NDWI'),
  description: 'NDWI_Landsat8',
  scale: 30,
  region: boundary,
  fileFormat: 'GeoTIFF'
});

// Export SAVI
Export.image.toDrive({
  image: indicesClipped.select('SAVI'),
  description: 'SAVI_Landsat8',
  scale: 30,
  region: boundary,
  fileFormat: 'GeoTIFF'
});

// Export EVI
Export.image.toDrive({
  image: indicesClipped.select('EVI'),
  description: 'EVI_Landsat8',
  scale: 30,
  region: boundary,
  fileFormat: 'GeoTIFF'
});