import RegisterForm from "@/components/RegisterForm";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">sign up</h1>
      <div className="w-full flex  gap-8 justify-center ">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <RegisterForm pageUrl="signup" />
        </div>
      </div>
    </div>
  );
};

export default page;
