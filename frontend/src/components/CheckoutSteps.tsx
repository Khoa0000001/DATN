import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCreditCard,
  faCheck,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export default function CheckoutSteps({
  currentStep,
}: {
  currentStep: number;
}) {
  const steps = [
    { label: "Giỏ hàng", icon: faBagShopping },
    { label: "Thông tin đặt hàng", icon: faIdCard },
    { label: "Thanh toán", icon: faCreditCard },
    { label: "Hoàn tất", icon: faCheck },
  ];

  return (
    <div className="flex items-center justify-center py-4 bg-red-50">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="flex items-center flex-col">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all 
              ${
                index <= currentStep
                  ? "bg-red-600 text-white"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={step.icon} />
            </div>
            <span
              className={
                index <= currentStep
                  ? "text-red-600 font-semibold text-[12px]"
                  : "text-gray-500 text-[12px]"
              }
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-16 h-px bg-gray-400"></div>
          )}
        </div>
      ))}
    </div>
  );
}
