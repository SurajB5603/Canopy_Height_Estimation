# 🌳 GEDI Canopy Height Estimation using Machine Learning  

## 📌 Overview  
This project estimates **canopy height** in **Pokhara Metropolitan City, Nepal** using **GEDI LiDAR, Landsat 8, and DEM** datasets. The data is processed in **Google Earth Engine (GEE) and Python**, with machine learning models applied to predict canopy heights.  

---

## 📂 Data Sources and Description  

### **🌍 Data Acquired from Google Earth Engine (GEE):**  
#### **📡 GEDI (Global Ecosystem Dynamics Investigation)**  
- **Source:** NASA GEDI L2A  
- **Resolution:** 25m footprint  
- **Data:** Canopy height (RH98), ground elevation  

#### **🛰️ Landsat 8 Surface Reflectance**  
- **Source:** USGS Landsat Collection  
- **Resolution:** 30m  
- **Bands Used:** Blue, Green, Red, NIR, SWIR1, SWIR2  
- **Vegetation Indices:** NDVI, EVI, SAVI, NDWI  

#### **🌄 Digital Elevation Model (DEM)**  
- **Source:** NASA SRTM  
- **Resolution:** 30m  
- **Attributes:** Elevation, slope, aspect, hillshade  

---

## 🛠 Workflow Process  

1️⃣ **Data Acquisition**: DEM, Landsat, and GEDI data extracted from **Google Earth Engine**  
2️⃣ **Preprocessing & Feature Extraction**:  
   - Normalization  
   - Vegetation index calculations (NDVI, EVI, SAVI, NDWI)  
   - Filtering GEDI points  
3️⃣ **Data Integration & Preparation**:  
   - Aligning **GEDI points** with **DEM and Landsat pixels**  
   - Exporting final dataset for Machine Learning  

*(🚧 Work is completed until this step. The next steps will be added later.)*  

---

## 📜 Running the Code  

### **🔹 Google Earth Engine (GEE)**  
1. Open **[Google Earth Engine Code Editor](https://code.earthengine.google.com/)**.  
2. Copy & paste the `GEDI_Canopy_Height.js`, `DEM_from_GEE.js`, `Landsat_indices.js` file.  
3. Run the script to extract **GEDI, Landsat, and DEM data**.  
4. Export the processed dataset as a `.CSV` or `.GeoTIFF` for further analysis.  

### **🔹 ArcGIS Pro (Python Script - Spatial Processing)**  
1. Open **ArcGIS Pro** and create a new project.  
2. Go to the **Insert** and install dependencies (if required):  
   ```python
   pip install arcpy numpy pandas geopandas rasterio
