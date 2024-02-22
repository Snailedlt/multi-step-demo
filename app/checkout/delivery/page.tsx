import { DeliveryStepForm } from "./_components/delivery-step-form";
import { type Cart, cart } from "./data";

export default async function DeliveryStepPage() {
  return (
    <div className="flex flex-col gap-8">
      <DeliveryStepForm {...cart} />
    </div>
  );
}
