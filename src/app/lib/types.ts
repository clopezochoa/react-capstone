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
  date = "date",
  time = "time",
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

export type AlertContextModel = {
  isActive: boolean;
  updateAlert: (isActive: boolean) => void;
}

export type SessionContextModel = {
  session: Session;
  updateSession: (session: Session) => void;
}

export interface Session {
  isSession: boolean;
  user: UserData | null;
}

export function createSession(isSession: boolean = false, user?: UserData){
  return { isSession: isSession, user: user } as Session;
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
  React.MouseEvent<HTMLButtonElement, MouseEvent> |
  React.MouseEvent<HTMLImageElement, MouseEvent>;


export interface UserData {
  id: string,
  role: string,
  name: string,
  phone: string,
  email: string,
  password: string
}

export function createUserData(
  email: string,
  password: string | null,
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
  user_db: process.env.USER_DB,
  doctor_db: process.env.DOCTOR_DB,
  appointment_db: process.env.BOOK_DB,
  tip_db: process.env.TIP_DB,
  user_collection: process.env.USER_COL,
  doctor_collection: process.env.DOCTOR_COL,
  appointment_collection: process.env.BOOK_COL,
  tip_collection: process.env.TIP_COL
}

export enum Cookies {
  userSession = "user-session",
  doctorsList = "doctors-list",
  userAppointments = "user-appointments"
}

export interface DoctorData {
  id: string;
  name: string;
  ratings: number;
  experience: number;
  speciality: string;
}

export enum ServiceLink {
  instantConsultation = "Instant Consultation",
  bookAppointment = "Book an Appointment",
  selfCheckup = "Self Checkup",
  healthTips = "Health Tips and Guidance"
}

export const services = [
  ServiceLink.instantConsultation,
  ServiceLink.bookAppointment,
  ServiceLink.selfCheckup,
  ServiceLink.healthTips
];

export type ReviewData = {
  message: string;
  rating: number;
}

export function createReview(message: string, rating: number | string): ReviewData {
  return {
    message: message,
    rating: typeof rating === "string" ? parseInt(rating) : rating
  } as ReviewData;
}

export interface AppointmentData {
  id: string;
  time: string;
  date: string;
  patient: UserData;
  doctor: DoctorData;
  review: ReviewData;
}

export function createAppointment(time?: string, date?: string, patient?: UserData, doctor?: DoctorData, id?: string, review?: ReviewData) {
  return {
    time: time,
    date: date,
    patient: patient,
    doctor: doctor,
    review: review,
    id: id,
  } as AppointmentData
}

type TipImage = {
  name: string;
  type: string;
  format: string;
}

export type Tip = {
  title: string;
  subtitle: string;
  body: string;
  img?: TipImage;
}
