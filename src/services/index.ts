import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { IScanRequest, IScanResponse } from "../types";

const api: AxiosInstance = Axios.create({
  baseURL: 'http://localhost:8080'
})

async function postScan(payload: IScanRequest): Promise<IScanResponse> {
  try {
    const res: AxiosResponse<IScanResponse> = await api.post("/scan", payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    });
    return res.data;
  } catch (err) {
    if (Axios.isAxiosError(err) && err.response) {
      return err.response.data
    } else {
      throw err;
    }
  }
}

export {
  postScan
}
