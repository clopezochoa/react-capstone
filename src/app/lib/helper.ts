import { Doctor } from "./types";

export function intersect<T>(arrayOne: Array<T>, arrayTwo: Array<T>) {
  var arrayLong = arrayOne;
  var arrayShort = arrayTwo;
  if (arrayTwo.length > arrayOne.length) {
    arrayLong = arrayTwo;
    arrayShort = arrayOne;
  }
  return arrayShort.filter((e) => {
      return arrayLong.indexOf(e) > -1;
  });
}

export function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getFirstWord(input: string) {
  return input.split(" ")[0];
}

export function filterDoctors(doctors: Array<Doctor>, input: string) {
  const words = input.toLowerCase().split(" ") as Array<string>;
  const result = doctors.filter(doctor => {
    let result = false;
    const doctorName = doctor.name.toLowerCase().split(" ").slice(1).reduce((a,b) => a+b) as string;
    for(let i = 0; i < words.length; i++) {
      if(doctorName.includes(words[i])) {
        result = true;
      } else {
        result = false;
        break;
      }
    }
    return result;
  });
  return result;
}