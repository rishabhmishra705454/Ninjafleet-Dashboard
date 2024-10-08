import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { BADFAMILY } from 'dns';
import { BASE_URL } from './app/api/api';


interface FetchLoginResponse {
    success: boolean;
    message: string;
    data: {
      token: string;
      admin:{
        id:number;
        fullName:string;
        email:string;
      };
      
    };
  }

  async function loginUser(email: string, password: string): Promise<FetchLoginResponse | any> {
    try {
        const response = await fetch(`${BASE_URL}/api/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);   
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;

                 const data = await loginUser(email,password);
                 if(!data) return null;

                 if(data.success){
                    return data;
                 }
              }
       
              console.log('Invalid credentials');
            return null;
        },
      }),
  ],
});