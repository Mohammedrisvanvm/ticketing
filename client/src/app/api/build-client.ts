import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

export interface CurrentUser {
  id: string;
  email: string;
  iat: number;
}
export async function getCurrentUser() {
  try {
    const header = await headers();
    const headersObject: Record<string, string> = {};
    header.forEach((value, key) => {
      headersObject[key] = value;
    });

    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",

      {
        headers: headersObject,
      }
    );

    return data.currentUser;
  } catch (err) {
    return null;
  }
}
