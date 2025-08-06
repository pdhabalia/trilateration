export interface CellInfo {
  mcc: number;
  mnc: number;
  lac: number;
  cid: number;
}

export interface LocationResponse {
  lat: number;
  lng: number;
}