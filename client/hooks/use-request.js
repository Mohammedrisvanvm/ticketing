import axios from "axios";
import { useState } from "react";

export const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (data = {}) => {
    try {
        setErrors(null);
      const response = await axios[method](url, { ...body, ...data });
      return response.data;
    } catch (errors) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
