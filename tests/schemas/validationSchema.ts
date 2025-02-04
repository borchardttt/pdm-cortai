import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone_contact: z.string().min(10, "Telefone inválido"),
  type: z.string(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
});

export const AuthSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const ServiceSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(3, "Descrição muito curta"),
  price: z.number().positive("O preço deve ser positivo"),
  duration: z.number().positive("A duração deve ser positiva"),
});

export const AppointmentSchema = z.object({
  id: z.number().optional(),
  client_id: z.number().positive("ID do cliente inválido"),
  barber_id: z.number().positive("ID do barbeiro inválido"),
  service_id: z.number().positive("ID do serviço inválido"),
  appointment_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  status: z.enum(["pendente", "realizado", "cancelado"]),
  value: z.number().positive("Valor deve ser positivo"),
});

export const EarningSchema = z.object({
  id: z.number().optional(),
  barber_id: z.number().positive("ID do barbeiro inválido"),
  earning_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  value: z.number().positive("Valor deve ser positivo"),
  scheduling_id: z.number().positive("ID do agendamento inválido"),
});
