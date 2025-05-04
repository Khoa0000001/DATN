import { useState } from "react";
import Step1Form from "./Step1Form";
import Step2QR from "./Step2QR";
import { useAppSelector } from "@/store/hooks";

interface CheckoutModalProps {
  onClose: () => void;
}

export default function CheckoutModal({ onClose }: CheckoutModalProps) {
  const shippingInfo = useAppSelector((state) => state.carts.shippingInfo);
  const [step, setStep] = useState(
    shippingInfo?.phone && shippingInfo?.address ? 2 : 1
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {step === 1 && (
          <Step1Form shippingInfo={shippingInfo} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <Step2QR shippingInfo={shippingInfo} onBack={() => setStep(1)} />
        )}
      </div>
    </div>
  );
}
