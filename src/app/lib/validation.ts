import { InputValidity, InputType, ValidationFunction, InputState, initialValidation, createInputState, InputEvent, ValidationFunctionModel } from "./types";

const lettersNumbersHyphenDotRegex = /^[a-zA-Z0-9.-]+$/;
const lettersRegex = /^[a-zA-Z]+$/;
const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/;

const validationFunction = new Map<InputType, ValidationFunction> ([
  [InputType.email, emailValidation],
  [InputType.phone, phoneValidation],
  [InputType.password, passwordValidation],
]);

export function validate(
  state: InputState,
): InputState {
  if (state.validity !== InputValidity.pending) return state;
  state.validity = InputValidity.idle;
  var validity = InputValidity.idle;
  if (state.value) {
    const validation = validationFunction.get(state.type);
    validity = validation ? validation(state.value) : validity;
  }
  const result = createInputState(state.type, validity, state.value);
  return result;
}

export function getStringFromEvent(e: InputEvent) {
  if (e) {
    return (e.target as HTMLInputElement).value;
  } else {
    throw Error("There is no valid event.");
  }
}

export const handleInputValue = (value: string, type: InputType, form: ValidationFunctionModel) => {
  const state = form.getState(type);
  if(state) {
    form.setInputState(createInputState(state.type, InputValidity.pending, value));
  } 
};

export const handleInputEvent = (e: InputEvent, resetFunction: Map<InputType, Function> | null, form: ValidationFunctionModel) => {
  e.preventDefault();
  resetFunction =  resetFunction ?? new Map<InputType, Function> ([]);
  const value = getStringFromEvent(e);
  const type = (e.target as HTMLInputElement).id as InputType;
  if (e.type === "input") {
    const reset = resetFunction.get(type);
    if (reset) reset();
  }
  const state = form.getState(type);
  if(state) {
    form.setInputState(createInputState(state.type, InputValidity.pending, value));
  } 
};

function emailValidation(email: string): InputValidity {
  var isValid = InputValidity.invalid;
  if(email && email.includes("@")) {
    const emailArray = email.split("@");
    if (emailArray.length === 2) {
      if (lettersNumbersHyphenDotRegex.test(emailArray[0]) && emailArray[1].includes(".")) {
        const domainArray = emailArray[1].split('.');
        const len = domainArray[1].length;
        if (lettersRegex.test(domainArray[0]) && (len === 2 || len === 3) && lettersRegex.test(domainArray[1])) {
          isValid = InputValidity.valid;
        }
      }
    }
  }
  return isValid;
}

function phoneValidation(phone: string): InputValidity {
  var isValid = InputValidity.invalid;
  if (phoneRegex.test(phone)) {
    isValid = InputValidity.valid;
  }
  return isValid;
}

function passwordValidation(password: string): InputValidity {
  var isValid = InputValidity.invalid;
  if (passwordRegex.test(password)) {
    isValid = InputValidity.valid;
  }
  return isValid;
}
