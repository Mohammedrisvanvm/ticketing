import RegisterForm from "@/components/RegisterForm";

const signin = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">sign In</h1>
      <div className="w-full flex  gap-8 justify-center ">
        {/* STEPS */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          <RegisterForm pageUrl="signin"/>
        </div>
      </div>
    </div>
  );
};

export default signin;
