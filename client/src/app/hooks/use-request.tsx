import axios, { AxiosError, AxiosResponse } from "axios";
import React, { ReactElement, useState } from "react";

interface UseRequestProps {
  url: string;
  method: "get" | "post" | "put" | "delete";
  body?: object;
  onSuccess:Function
}

export const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: UseRequestProps) => {
  const [errors, setErrors] = useState<ReactElement | null>(null);

  const doRequest = async (data = {}) => {
    try {
      setErrors(null);
      const response: AxiosResponse = await axios[method](url, {
        ...body,
        ...data,
      });
      if (response) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ errors: { message: string }[] }>;
      console.log(err.response?.data?.errors,"8979");
      
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response?.data?.errors?.map((error: { message: string }) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
