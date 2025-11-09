import { ShippingFormInputs, shippingFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { set } from "zod";

const ShippingForm = ({
  setShippingForm,
}: {
  setShippingForm: (data: ShippingFormInputs) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  const router = useRouter();
  const handleShippingForm = (data: ShippingFormInputs) => {
    setShippingForm(data);
    router.push("/cart?step=3", { scroll: false });
  };
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Name
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="name"
          placeholder="John Doe"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>
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
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Phone
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="phone"
          placeholder="123456789"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          Address
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="address"
          placeholder="123 Main St, Anytown"
          {...register("addressLine1")}
        />
        {errors.addressLine1 && (
          <p className="text-xs text-red-500">{errors.addressLine1.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          City
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="city"
          placeholder="malappuram"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor="postalCode"
          className="text-xs text-gray-500 font-medium"
        >
          postalCode
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="postalCode"
          placeholder="123456789"
          {...register("postalCode")}
        />
        {errors.postalCode && (
          <p className="text-xs text-red-500">{errors.postalCode.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="state" className="text-xs text-gray-500 font-medium">
          state
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="state"
          placeholder="kerala"
          {...register("state")}
        />
        {errors.state && (
          <p className="text-xs text-red-500">{errors.state.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="text-xs text-gray-500 font-medium">
          country
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="country"
          placeholder="India"
          {...register("country")}
        />
        {errors.country && (
          <p className="text-xs text-red-500">{errors.country.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
