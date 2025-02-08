//Insert_your_Study_area_boundary
var boundary = ee.FeatureCollection("users/surajbashyal5603/Pokhara2");

// Load a DEM dataset (SRTM in this case)
var dem = ee.Image('USGS/SRTMGL1_003');
// Clip the DEM to Nepal's boundary
var demNepal = dem.clip(boundary);

// Calculate topographic variables
var slope = ee.Terrain.slope(demNepal);         // Slope in degrees
var aspect = ee.Terrain.aspect(demNepal);       // Aspect in degrees
var hillshade = ee.Terrain.hillshade(demNepal); // Hillshade for visualization

// Curvature (second derivative of elevation)
var curvature = demNepal.reduceNeighborhood({
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.variance(),
    sharedInputs: true
  }),
  kernel: ee.Kernel.circle({radius: 1})
});

// Visualization parameters
var demVis = {min: 0, max: 6000, palette: ['blue', 'green', 'brown', 'white']};
var slopeVis = {min: 0, max: 60, palette: ['white', 'yellow', 'red']};
var aspectVis = {min: 0, max: 360, palette: ['blue', 'green', 'yellow', 'red']};

// Add layers to the map
Map.centerObject(boundary, 11);
Map.addLayer(demNepal, demVis, 'Elevation');
Map.addLayer(slope, slopeVis, 'Slope');
Map.addLayer(aspect, aspectVis, 'Aspect');
Map.addLayer(hillshade, {}, 'Hillshade');

// Export variables (e.g., slope) to Google Drive
Export.image.toDrive({
  image: slope,
  description: 'Slope_Nepal',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'Slope_Nepal',
  region: boundary.geometry(),
  scale: 30,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

Export.image.toDrive({
  image: demNepal,
  description: 'Dem_Nepal',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'Dem_Nepal',
  region: boundary.geometry(),
  scale: 30,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

Export.image.toDrive({
  image: aspect,
  description: 'Aspect_Nepal',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'Aspect_Nepal',
  region: boundary.geometry(),
  scale: 30,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});

Export.image.toDrive({
  image: hillshade,
  description: 'Hillshade_Nepal',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'Hillshade_Nepal',
  region: boundary.geometry(),
  scale: 30,
  maxPixels: 1e13,
  crs: 'EPSG:4326'
});
