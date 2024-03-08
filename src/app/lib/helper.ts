import { AppointmentData, DoctorData, UserData } from "./types";

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

export function capitalizeFirstLetter(input?: string) {
  if(!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getFirstWord(input: string) {
  return input.split(" ")[0];
}

export function getFirstNameFromUserData(user: UserData | null) {
  if(!user) return "";
  return capitalizeFirstLetter(getFirstWord(user.name));
}

export function filterDoctors(doctors: Array<DoctorData>, input: string) {
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
  const hhNum = today.getHours();
  const mmNum = today.getMinutes();

  const mm = mmNum.toString();
  const hh = hhNum.toString();

  const hours = (hhNum < 10) ? '0' + hh : hh;
  const mins = (mmNum < 10) ? '0' + mm : mm;

  return hours + ':' + mins;
}

export function compareDate(refDate: string, refTime: string, forwardTime: boolean = false): boolean {
  const today = getToday();
  const day = parseInt(today.slice(8,10));
  const month = parseInt(today.slice(5,7));
  const year = parseInt(today.slice(0,4));

  const refDay = parseInt(refDate.slice(8,10));
  const refMonth = parseInt(refDate.slice(5,7));
  const refYear = parseInt(refDate.slice(0,4));

  if(year > refYear) {
    return true;
  } else if(year === refYear && month > refMonth) {
    return true;
  } else if(month === refMonth && year === refYear && day > refDay) {
    return true;
  } else if(day === refDay && month === refMonth && year === refYear) {
    const timeComparison = compareTime(refTime);
    return !forwardTime ? timeComparison : !timeComparison;
  } else {
    return false;
  }
}

export function compareTime(ref: string): boolean {
  const now = getNow();
  const hours = parseInt(now.slice(0,2));
  const minutes = parseInt(now.slice(3,5));
  const totalMinutes = (hours * 60) + minutes;
  const refHours = parseInt(ref.slice(0,2));
  const refMinutes = parseInt(ref.slice(3,5));
  const totalRefMinutes = (refHours * 60) + refMinutes;
  if(totalMinutes >= totalRefMinutes) {
    return true;
  } else {
    return false;
  }
}

export function stringToMonth(input: string) {
  switch (input) {
    case "01":
      return("January");
    case "02":
      return("February");
    case "03":
      return("March");
    case "04":
      return("April");
    case "05":
      return("May");
    case "06":
      return("June");
    case "07":
      return("July");
    case "08":
      return("August");
    case "09":
      return("September");
    case "10":
      return("October");
    case "11":
      return("December");
      case "12":
    default:
      return(input);
  }
}

export function setEuropeanDateFormat (appointment: AppointmentData) {
  const dateArray = appointment.date.split("-");
  return dateArray[2] + " - " + stringToMonth(dateArray[1]) + " - " + dateArray[0];
}
