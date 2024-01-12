const bucket = "https://storage.googleapis.com/carlos-private-cdn/capstone-project/";
const images = document.getElementsByTagName('img');

document.addEventListener('DOMContentLoaded', function() {
  for (const img of images) {
    const updated_value = get_img_url(img);
    img.setAttribute('src', updated_value);
  }
});

const get_img_url = (img) => {
  const value = img.getAttribute('filename');
  const type = img.getAttribute('filetype');
  return `${bucket}${type}/${value}`;
} 