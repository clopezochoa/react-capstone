export function fetchImage(filename: string, filetype: string, format: string): string {
  const bucket = "https://storage.googleapis.com/carlos-private-cdn/capstone-project/";
  return `${bucket}${filetype}/${format}/${filename}.${format}`;
}