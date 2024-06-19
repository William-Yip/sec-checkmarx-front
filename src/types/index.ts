 export interface IScanRequest {
  path: string,
  codeType: string,
  checks: string[]
}

export interface IScanResponse {
  issues?: Issue[],
  error?: string
}

export interface Issue {
  file: string,
  details: string,
  line: string,
  column: string
}