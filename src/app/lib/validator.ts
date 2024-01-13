const nameRegex = /^[a-zA-Z\-.]+$/;
const domainRegex = /^[a-zA-Z]+$/;;

function emailValidator(email: string) {
  var isValid = false;
  if(email && email.includes("@")) {
    const emailArray = email.split("@");
    if (emailArray.length === 2) {
      if (nameRegex.test(emailArray[0]) && emailArray[1].includes(".")) {
        const domainArray = emailArray[1].split('.');
        const len = domainArray[1].length;
        if (domainRegex.test(domainArray[0]) && (len === 2 || len === 3) && domainRegex.test(domainArray[1])) {
          isValid = true;
        }
      }
    }
  }
  return isValid;
}

export default emailValidator;