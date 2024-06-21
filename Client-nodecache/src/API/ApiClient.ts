
import { SignInFormData } from "../Pages/Login";

import { RegisterForm } from "../Pages/Register";
import { UserFormData } from "../contexts/AppContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || " ";
export const register = async (formData: RegisterForm) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: JSON.stringify(formData),
    });
  
    const responseBody = await response.json();
  
    if (!response.ok) {
      console.log("1");
      console.log(responseBody);
      throw new Error(responseBody.message);
    }
  };
  
  export const SignIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };
  
  export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      console.log(response);
      throw new Error("Token invalid");
    }
  
    return response.json();
  };
  
  export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };
  
  export const viewInfo = async (): Promise<UserFormData> => {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error fetching user");
    }
    return response.json();
  }

  export const updateInfo = async (data: UserFormData) => {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Error updating info');
    }
    return response.json();
  };