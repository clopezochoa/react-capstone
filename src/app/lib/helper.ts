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
      } else if (doctor.speciality.toLowerCase().includes(words[i])) {
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

export function getToday(): string {
  const today = new Date();
  const yyyy = today.getFullYear().toString();
  let mmNum = today.getMonth() + 1;
  let ddNum = today.getDate();
  const mm = mmNum.toString();
  const dd = ddNum.toString();

  const day = (ddNum < 10) ? '0' + dd : dd;
  const month = (mmNum < 10) ? '0' + mm : mm;

  return yyyy + '-' + month + '-' + day;
}

export function getNow(): string {
  const today = new Date();
  var hhNum = today.getHours();
  const mmNum = today.getMinutes();

  const mm = mmNum.toString();

  const meridian = hhNum < 12 ? "AM" : "PM";
  hhNum = hhNum < 12 ? hhNum : hhNum - 12;
  var hh = hhNum.toString();

  const hours = (hhNum < 10) ? '0' + hh : hh;
  const mins = (mmNum < 10) ? '0' + mm : mm;

  return hours + ' : ' + mins + "  " + meridian;
}

export function getTimeSimple(): string {
  const today = new Date();
  var hours = today.getHours().toString();
  const minutes = today.getMinutes().toString();
  return hours + ":" + minutes;
}
