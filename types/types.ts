
export type ApodResponse = {
  date: string,
  explanation: string,
  hdurl?: string,
  media_type: 'image'| 'video',
  service_version: string,
  thumbnail_url: string,
  title: string,
  url: string
}[]

export type ErrorResponse = {
  code: number,
  message: string
}
