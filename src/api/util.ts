import type { AxiosResponse } from 'axios';

export const handleCommonResponse = (response: AxiosResponse) => {
  if (response.status === 200) {
    const data = response.data;
    return data;
    // if (data.code === 200) {
    //   return data.result;
    // } else {
    //   console.log(data);
    // }
  } else {
    throw response.statusText;
  }
};
