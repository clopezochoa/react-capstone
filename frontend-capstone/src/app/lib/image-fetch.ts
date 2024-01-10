export function fetchImage(filename: string, filetype: string): string {
  const bucket = "https://storage.googleapis.com/carlos-private-cdn/capstone-project/";
  const images = document.getElementsByTagName('img');
  return `${bucket}${filetype}/${filename}`;
}