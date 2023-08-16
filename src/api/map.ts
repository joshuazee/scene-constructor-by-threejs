import request from '.';

// export const getPoints = () => request("/data/points.json");

// export const getWaters = () => request("/data/water.geojson");

// export const getRoads = () => request("/data/roads.geojson");

// export const getFence = () => request("/data/fence.geojson");

// export const getCitiesBoundary = (url: string) => request(url);

// export const getCityPoints = (url: string) => request(url);

export const getSysConfigs = () => request.get('/config.json');

// export const getFchListByLjzh = (areaCode: string, ljzh: string) =>
//   request(
//     `/api/estate/complexQuery/getFchListByLjzh?bdcdyh=${ljzh}0001&areaCode=${areaCode}`,
//     {
//       headers: { areaCode }
//     }
//   );
