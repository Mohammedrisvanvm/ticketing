import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

const signin = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">sign In</h1>
      <div className="w-full flex  gap-8 justify-center ">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <RegisterForm pageUrl="signin" />
          <div className="flex justify-center text-center text-sm text-gray-600">
            {" "}
            <p>
              If you don’t have an account, please{" "}
              <Link href="/signup" className="text-blue-600 underline">
                click here
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signin;
