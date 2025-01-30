// Interfaces
export interface UserInterface {
  id?: number;
  name: string;
  email: string;
  phone_contact: string;
  type: string;
  password?: string;
}

export interface AuthResponse {
  authenticated: boolean;
  user: Omit<UserInterface, 'password'>;
  token: string;
}

export interface Service {
  id?: number;
  description: string;
  price: number;
  duration: number;
}

export interface Appointment {
  id?: number;
  client_id: number;
  barber_id: number;
  service_id: number;
  appointment_date: string;
  status: string;
  value: number;
}

export interface Earning {
  id?: number;
  barber_id: number;
  earning_date: string;
  value: number;
  scheduling_id: number;
}