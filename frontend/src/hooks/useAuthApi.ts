import { useMutation, useQuery } from '@tanstack/react-query';

export function useRegister() {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (body: { email: string; password: string }) => {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}

export function useAuthMe() {
  return useQuery({
    queryKey: ['auth-me'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/auth/me', {
        credentials: 'include',
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      return result;
    },
  });
}
