import { InputState, InputType } from "./enum";

const lettersNumbersHyphenDotRegex = /^[a-zA-Z0-9.-]+$/;
const lettersRegex = /^[a-zA-Z]+$/;
const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

const validationFunction = new Map ([
  ["email", emailValidation],
  ["phone", phoneValidation],
]);

export class Validation {
  private inputType: InputType;
  private statusSetter: React.SetStateAction<any>;
  private defaultTime: number;
  private timeout: NodeJS.Timeout | null;

  private static instanceMap: Map<string, Validation> = new Map([]);

  constructor(inputType: InputType, statusSetter: React.SetStateAction<any>, defaultTime: number) {
    this.inputType = inputType;
    this.statusSetter = statusSetter;
    this.defaultTime = defaultTime;
    this.timeout = null;
  }

  public static getInstance(inputType: InputType, statusSetter: React.SetStateAction<any>, defaultTime: number): Validation {
    if (!Validation.instanceMap.has(inputType)) {
      Validation.instanceMap.set(inputType, new Validation(inputType, statusSetter, defaultTime));
    }
    return Validation.instanceMap.get(inputType) as Validation;
  }

  private getStringFromEvent(e: React.FormEvent<HTMLInputElement>) {
    if (e) {
      return (e.target as HTMLInputElement).value;
    } else {
      return null;
    }
  }
    
  public validate(
    event?: React.FormEvent<HTMLInputElement>,
    time?: number
  ) {
    if(this.timeout) clearTimeout(this.timeout);
    if(event) {
      const value = this.getStringFromEvent(event);
      const timeout = setTimeout(() => {
        if (value) {
          const validation = validationFunction.get(this.inputType) as Function;
          this.statusSetter(validation(value) ? InputState.valid : InputState.invalid)
        } else {
          this.statusSetter(InputState.idle);
        }
      }, time ?? this.defaultTime)
      this.timeout = timeout;
    } else {
      this.statusSetter(InputState.idle);
    }
  }
}

function emailValidation(email: string) {
  var isValid = false;
  if(email && email.includes("@")) {
    const emailArray = email.split("@");
    if (emailArray.length === 2) {
      if (lettersNumbersHyphenDotRegex.test(emailArray[0]) && emailArray[1].includes(".")) {
        const domainArray = emailArray[1].split('.');
        const len = domainArray[1].length;
        if (lettersRegex.test(domainArray[0]) && (len === 2 || len === 3) && lettersRegex.test(domainArray[1])) {
          isValid = true;
        }
      }
    }
  }
  return isValid;
}

function phoneValidation(phone: string) {
  var isValid = false;
  if (phoneRegex.test(phone)) {
    isValid = true;
  }
  return isValid;
}
