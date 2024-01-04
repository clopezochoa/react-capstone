function toggle_password(element) {
  const node = element.parentNode.children[0]; 
  const img = element.children[0]
  if (node.type === "password") {
    node.type = "text";
    img.setAttribute('filename', "visible.png");
    const updated_value = get_img_url(img);
    img.setAttribute('src', updated_value);
  } else {
    node.type = "password";
    img.setAttribute('filename', "non-visible.png");
    const updated_value = get_img_url(img);
    img.setAttribute('src', updated_value);
  }
}