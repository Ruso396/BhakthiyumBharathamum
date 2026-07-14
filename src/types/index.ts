export interface Participant {
  id: number;
  registration_number: string;
  category: 'Master' | 'Student';
  name: string;
  father_name: string;
  phone: string;
  age: number;
  address: string;
  district: string;
  state: string;
  upi_id: string;
  payment_screenshot: string;
  payment_status: 'Pending' | 'Approved' | 'Rejected';
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  total_registrations: number;
  total_masters: number;
  total_students: number;
  pending_payments: number;
  approved_payments: number;
  rejected_payments: number;
  recent_registrations: Participant[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ParticipantsResponse {
  participants: Participant[];
  districts: string[];
  total: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthData {
  token: string;
  username: string;
}

export interface RegistrationFormData {
  category: string;
  name: string;
  father_name: string;
  phone: string;
  age: string;
  address: string;
  district: string;
  state: string;
  upi_id: string;
  payment_screenshot: File | null;
}

export interface FormErrors {
  [key: string]: string;
}