const error_class = "error";
const default_phone_placeholder = "Enter your phone number";

function validate_phone(element) {
  var allowed = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
  if (!allowed.test(element.value) || element.value === "") {
    element.classList.add("error");
    element.placeholder = "Invalid phone number.";
    element.value = "";
  } else {
    if (element.classList.contains(error_class)) {
      element.classList.remove(error_class)
    }
  }
}

function reset_field(element) {
  if (element.classList.contains(error_class)) {
    element.placeholder = !element.value ? "" : default_phone_placeholder;
    element.classList.remove(error_class)
  }
}