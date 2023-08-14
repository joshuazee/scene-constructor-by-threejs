import { ref, computed } from "vue";
// import { type Region, useRegions } from "@/utils/region";
import * as d3 from "d3-geo";
import { Vector3, Spherical, TextureLoader } from "three";

let projection: d3.GeoProjection | undefined = undefined;

export const useProjection = (projectionOpt: {
  center: [number, number];
  scale: number;
}) => {
  if (projectionOpt && projectionOpt.center && projectionOpt.scale) {
    projection = d3
      .geoMercator()
      .center(projectionOpt.center)
      .scale(projectionOpt.scale)
      .translate([0, 0]);
  }
  return projection;
};

export const formatFeatureCollectionData = (
  featureCollection: any,
  projection: any
) => {
  const formated = featureCollection.features.map((feature: any) => {
    return feature.geometry.coordinates[0][0].map((point: any) => {
      let [x, y] = projection(point);
      return [x, -y];
    });
  });
  return formated;
};

export const formatFeatureCollectionData2 = (
  featureCollection: any,
  projection: any
) => {
  const formated = featureCollection.features.map((feature: any) => {
    return {
      properties: feature.properties,
      points: feature.geometry.coordinates[0][0].map((point: any) => {
        let [x, y] = projection(point);
        return [x, -y];
      })
    };
  });
  return formated;
};

const toRadians = (deg: number) => {
  return (deg / 180) * Math.PI;
};

export const calcCameraPosition = (
  radius: number,
  phi: number,
  theta: number
) => {
  const spherical = new Spherical(radius, toRadians(phi), toRadians(theta));
  const position = new Vector3();
  position.setFromSpherical(spherical);
  return position;
};

/**
 * 该方法采用不转换透明度参数的方式，只将透明度单独列出
 * @param {*} rgba
 * @returns
 */
export const RGBAToHex2 = (rgba: any) => {
  const values = rgba
    .replace(/rgba?\(/, "")
    .replace(/\)/, "")
    .replace(/[\s+]/g, "")
    .split(",");
  const transparent = parseFloat(values[3] || 1);
  const r = Math.floor(parseInt(values[0]));
  const g = Math.floor(values[1]);
  const b = Math.floor(values[2]);
  const hex =
    "#" +
    ("0" + r.toString(16)).slice(-2) +
    ("0" + g.toString(16)).slice(-2) +
    ("0" + b.toString(16)).slice(-2);
  return {
    hex,
    transparent
  };
};
