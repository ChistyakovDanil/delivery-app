import { InputHTMLAttributes } from 'react';

export interface InputAuthProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title: string;
  type?: string;
  placeholder?: string;
  error?: string | null;
}
