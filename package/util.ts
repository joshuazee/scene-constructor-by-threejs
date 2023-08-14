export const resolveShellByGeoJSON = (
  geojson: any,
  callback: (coordinates: any, properties: any) => void
) => {
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach((feature: any) => {
      if (feature.geometry) {
        if (feature.geometry.type === "Polygon") {
          callback(feature.geometry.coordinates[0], feature.properties);
        } else if (feature.geometry.type === "MultiPolygon") {
          const properties = feature.properties;
          const coordinates = feature.geometry.coordinates;
          coordinates.forEach((coord: any) => {
            callback(coord[0], properties);
          });
        }
      }
    });
  } else if (geojson.type === "GeometryCollection") {
    geojson.geometries.forEach((geometry: any) => {
      if (geometry.type === "Polygon") {
        callback(geometry.coordinates[0], undefined);
      } else if (geometry.type === "LineString") {
        callback(geometry.coordinates, undefined);
      }
    });
  } else {
    throw "请传入FeatureCollection<Polygon>";
  }
};

export const resolvePointByGeoJSON = (
  geojson: any,
  callback: (point: any, properties: any) => void
) => {
  if (geojson.type === "FeatureCollection") {
    geojson.features.forEach((feature: any) => {
      if (feature.geometry) {
        if (feature.geometry.type === "Point") {
          callback(feature.geometry.coordinates, feature.properties);
        } else if (feature.geometry.type === "MultiPoint") {
          const properties = feature.properties;
          const coordinates = feature.geometry.coordinates;
          coordinates.forEach((coord: any) => {
            callback(coord, properties);
          });
        }
      }
    });
  } else {
    throw "请传入FeatureCollection<Point>";
  }
};
