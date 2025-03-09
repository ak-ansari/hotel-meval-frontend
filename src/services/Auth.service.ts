import axios from "axios"
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export async function handleLogin(cred: {
  email: string;
  password: string;
}): Promise<{accessToken: string, refreshToken: string}> {
  try {
    const { data } = await axios.post<{ accessToken: string, refreshToken: string }>(
      `${baseUrl}auth/sign-in`,
      cred
    );
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error
  }
}
export async function handleSignUp(cred: {
  email: string;
  password: string;
}): Promise<void> {
  try {
    await axios.post<{ accessToken: string, refreshToken: string }>(
      `${baseUrl}auth/sign-up`,
      cred
    );
    alert("signup successful")
  } catch (error) {
    console.error("Error during sign up:", error?.response?.data?.message);
    throw error
  }
}
