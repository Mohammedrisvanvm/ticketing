"use client";
import { useRequest } from "@/hooks/use-request";
import { RegisterFormInputs, RegisterFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterForm = ({ pageUrl }: { pageUrl: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { doRequest } = useRequest({
    url: `/api/users/${pageUrl}`,
    method: "post",
    onSuccess: () => router.push("/"),
  });

  const handleRegisterForm = (data: RegisterFormInputs) => {
    doRequest(data);
  };

  return (
    <form
      className="flex flex-col "
      onSubmit={handleSubmit(handleRegisterForm)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-xs text-gray-500 font-medium">
          password
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="password"
          id="password"
          placeholder="*****"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 my-5 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default RegisterForm;
