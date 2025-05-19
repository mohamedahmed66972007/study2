import { apiRequest } from "./queryClient";

interface AdminCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: AdminCredentials): Promise<boolean> => {
  try {
    const response = await apiRequest("POST", "/api/auth/login", credentials);
    const data = await response.json();

    return response.ok && data.success === true;
  } catch (error) {
    console.error("Login failed:", error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiRequest("POST", "/api/auth/logout", {});
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const checkAdminStatus = async (): Promise<boolean> => {
  try {
    const response = await apiRequest("GET", "/api/auth/status");
    const data = await response.json();
    return response.ok && data.isAdmin === true;
  } catch (error) {
    console.error("Failed to check admin status:", error);
    return false;
  }
};
