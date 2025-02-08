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
2. Upload the `Study_area.zip` (Pokhara Metropolitan City boundary) to **GEE Assets**.
   - Go to **GEE Assets > Upload** and select the `.zip` file.
3. Copy & paste the `GEDI_Canopy_Height.js`, `DEM_from_GEE.js`, `Landsat_indices.js` file.  
4. Run the script to extract **GEDI, Landsat, and DEM data**.  
5. Export the processed dataset as a `.CSV` or `.GeoTIFF` for further analysis.  

### Steps to Execute in ArcGIS Pro:
The script processes a raster layer (GEDI_Canopy_Height_Nepal.tif) from an active map in ArcGIS Pro, filters out non-zero values, and converts the remaining raster pixels into point features. The output points are saved in a specified geodatabase.
1. Open **ArcGIS Pro** and create a new project.
2. Go to the **Insert** tab and insert a **new notebook**.
3. Copy and paste the **Python_Script_for_ArcGIS.py** script into the notebook.
4. **Run the script** to process the raster and convert it into points.
5. The resulting point features will be saved in the **specified geodatabase**.
   
## Files Included in This Repository:

- **study_area.zip**: Shapefile of the study area boundary (Pokhara Metropolitan City).
- **GEDI_Canopy_Height.js**: Google Earth Engine script for processing GEDI data.
- **DEM_from_GEE.js**: Google Earth Engine script for processing DEM data.
- **Landsat_indices.js**: Google Earth Engine script for processing Landsat data.
- **Python_Script_for_ArcGIS.py**: Python script for further processing in ArcGIS Pro.
- **Python_Script_for_Data_Analysis.py**: Python script for further processing in python environment.

---
