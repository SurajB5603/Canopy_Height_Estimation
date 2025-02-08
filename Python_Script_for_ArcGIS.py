import arcpy
import os

# Check out the Spatial Analyst extension
arcpy.CheckOutExtension("Spatial")

# Get the current ArcGIS Pro project and map
aprx = arcpy.mp.ArcGISProject("CURRENT")
map_obj = aprx.activeMap

# Set the geodatabase path
output_gdb = r"C:\Personal\Research\MyProject\MyProject.gdb"  # Replace with your geodatabase path
arcpy.env.overwriteOutput = True

# Loop through layers to find GEDI_Canopy_Height_Nepal.tif
for layer in map_obj.listLayers():
    if layer.isRasterLayer and layer.name == "GEDI_Canopy_Height_Nepal.tif":  # Match specific raster name
        raster_path = layer.dataSource
        raster_name = arcpy.ValidateTableName(layer.name.split('.')[0], output_gdb)  # Strip extension for GDB name
        temp_raster = "in_memory/temp_raster"
        output_points = os.path.join(output_gdb, f"{raster_name}_points")

        # Apply a raster calculation to filter non-null and non-zero values
        print(f"Filtering raster {raster_path} for non-zero values...")
        filtered_raster = arcpy.sa.Con(raster_path, raster_path, "", "Value > 0")
        filtered_raster.save(temp_raster)
        
        # Convert filtered raster to points
        print(f"Processing {raster_path}...")
        arcpy.RasterToPoint_conversion(
            in_raster=temp_raster,
            out_point_features=output_points,
            raster_field="Value"  # Extract the pixel values
        )
        
        # Clean up temporary raster
        arcpy.management.Delete(temp_raster)
        
        print(f"Points created for non-zero pixels of {raster_name}. Output saved in {output_gdb}")
        break
else:
    print("GEDI_Canopy_Height_Nepal.tif not found in the map.")

# Check in the Spatial Analyst extension
arcpy.CheckInExtension("Spatial")

print("Script execution completed!") what is this code 