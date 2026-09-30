import { useMutation } from '@tanstack/react-query';

interface RegisterBody {
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (body: RegisterBody) => {
      const res = await fetch('http://localhost:3000/register', {
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
