import axios from 'axios';
import { UserInterface, AuthResponse, Service, Appointment, Earning } from '@/interfaces/common-interfaces';

const API_URL = 'https://restapi-cortai.onrender.com/api';

export const apiService = {
  createUser: async (user: UserInterface) => {
    const response = await axios.post<UserInterface>(`${API_URL}/users`, user);
    return response.data;
  },

  getUsers: async () => {
    const response = await axios.get<UserInterface[]>(`${API_URL}/users`);
    return response.data;
  },

  getBarbers: async () => {
    const response = await axios.get<UserInterface[]>(`${API_URL}/users/barbers`);
    return response.data;
  },

  authenticate: async (email: string, password: string) => {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth`, { email, password });
    return response.data;
  },

  getServices: async () => {
    const response = await axios.get<Service[]>(`${API_URL}/services`);
    return response.data;
  },

  createService: async (service: Service) => {
    const response = await axios.post<Service>(`${API_URL}/services`, service);
    return response.data;
  },

  getAppointments: async () => {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments`);
    return response.data;
  },

  getClientAppointments: async (clientId: number) => {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments/client/${clientId}`);
    return response.data;
  },

  getBarberAppointments: async (barberId: number) => {
    const response = await axios.get<Appointment[]>(`${API_URL}/appointments/barber/${barberId}`);
    return response.data;
  },

  createAppointment: async (appointment: Appointment) => {
    try {
      const response = await axios.post<Appointment>(`${API_URL}/appointments`, appointment);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao criar agendamento:", error.response?.data);
        throw new Error(error.response?.data || "Erro desconhecido ao criar agendamento");
      } else {
        console.error("Erro inesperado:", error);
        throw new Error("Erro inesperado ao criar agendamento");
      }
    }
  },

  // ✅ Função unificada para atualizar status e criar earning
  completeAppointment: async (appointmentId: number) => {
    try {
      const response = await axios.put(`${API_URL}/appointments/${appointmentId}/complete`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao concluir agendamento:", error.response?.data);
        throw new Error(error.response?.data || "Erro desconhecido ao concluir agendamento");
      } else {
        console.error("Erro inesperado:", error);
        throw new Error("Erro inesperado ao concluir agendamento");
      }
    }
  },

  getEarnings: async () => {
    const response = await axios.get<Earning[]>(`${API_URL}/earnings`);
    return response.data;
  },

  getBarberEarnings: async (barberId: number) => {
    const response = await axios.get<Earning[]>(`${API_URL}/earnings/barber/${barberId}`);
    return response.data;
  },

  testConnection: async () => {
    const response = await axios.get<{ now: string }>(`${API_URL}/test-connection`);
    return response.data;
  },
};
