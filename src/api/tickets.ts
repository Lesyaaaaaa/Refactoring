import { apiClient, authHeaders } from "./http";

export const reserveTicket = (ticketId: number, token: string) => {
  return apiClient.post(
    `/tickets/${ticketId}/reserve`,
    {},
    { headers: authHeaders(token) }
  );
};