import axios from "axios";


export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  roleType: "USER" | "ADMIN";
  gender: "MALE" | "FEMALE";
  createdAt: string;
  updatedAt: string;
}


export async function getCurrentUser(token: string): Promise<User> {
  const response = await axios.get("http://91.142.94.183:8080/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}


export async function updateCurrentUser(
  token: string,
  data: Partial<Pick<User, "firstName" | "lastName" | "email" | "age" | "gender">>
): Promise<User> {
  const response = await axios.put("http://91.142.94.183:8080/users/me", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
