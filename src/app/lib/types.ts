import { MongoClient } from "mongodb";
import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export enum InputValidity {
  valid = "valid",
  invalid = "invalid",
  idle = "idle",
  none = "none",
  pending = "pending"
};

export enum InputType {
  role = "role-input",
  name = "name-input",
  email = "email-input",
  phone = "phone-input",
  password = "password-input",
  none = "none",
};

export enum InputStyle {
  valid = "input-field-valid",
  invalid = "input-field-invalid",
  fadeIn = "input-field-fade-in",
  fadeOut = "input-field-fade-out",
  default = "input-field",
};


export type InputState = {
  type: InputType;
  validity: InputValidity;
  value: string;
}

export function createInputState(type: InputType, validity: InputValidity, value: string) {
  return {type: type, validity: validity, value: value} as InputState;
}

export const initialValidation = {
  type: InputType.none,
  status: InputValidity.none,
  value: ""
}

export enum Role {
  default = "Select your role",
  patient = "Patient",
  doctor = "Doctor"
}

export type ValidationFunction = (value: string) => InputValidity;

export type SessionContextModel = {
  session: Session;
  updateSession: (session: Session) => void;
}

export interface Session {
  isSession: boolean;
  userName?: string;
}

export function createSession(isSession: boolean = false, userName?: string){
  return { isSession: isSession, userName: userName } as Session;
}

export type ContextModel = {
  tasks: Task[];
  update: (tasks: Task | Task[], mode: UpdateTaskMode) => void;
}

export type Task = {
  name: string;
  payload: any;
}

export enum UpdateTaskMode {
  add = "add",
  remove = "remove"
}

export const initialFormState = [
  createInputState(InputType.role, InputValidity.none, ''),
  createInputState(InputType.name, InputValidity.none, ''),
  createInputState(InputType.email, InputValidity.none, ''),
  createInputState(InputType.phone, InputValidity.none, ''),
  createInputState(InputType.password, InputValidity.none, ''),
];

export type ValidationFunctionModel = {
  inputFormState: Array<InputState> | null;
  outputFormState: Array<InputState> | null;
  getState: (type: InputType) => InputState | undefined;
  setInputState: (state: InputState) => void;
}

export type StyleFunctionModel = {
  style: string;
  resetStyle: () => void;
}

export type InputEvent =
  Event |
  React.FocusEvent<HTMLInputElement, Element> |
  React.FormEvent<HTMLInputElement> |
  React.SyntheticEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLSelectElement> |
  React.MouseEvent<HTMLButtonElement, MouseEvent>;


export interface UserData {
  id?: string,
  role?: string,
  name?: string,
  phone?: string,
  email: string,
  password: string
}

export function createUserData(
  email: string,
  password: string,
  role?: string,
  name?: string,
  phone?: string,
  id?: string
) {
  return {
    id: id,
    role: role,
    name: name,
    phone: phone,
    email: email,
    password: password
  } as UserData;
}

export const apiHeader = {
  app_id: process.env.APP_ID,
  db_uri: process.env.DB_URI,
  db_name: process.env.DB_NAME,
  colleciton_name: process.env.COL_NAME
}

export enum Cookies {
  userSession = "user-session",
}