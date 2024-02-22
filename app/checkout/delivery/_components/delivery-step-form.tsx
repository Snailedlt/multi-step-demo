"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useMultiStep } from "../../_components/multi-step-provider";
import { checkoutAction } from "../_actions";
import { Cart } from "../data";
import { DeliveryStepValues, deliveryStepSchema } from "../schema";
import { ProductDeliverySection } from "./delivery-methods-field";

export function DeliveryStepForm({ items }: Cart) {
  const { state, updateState, goTo } = useMultiStep();
  const form = useForm<DeliveryStepValues>({
    defaultValues: state.delivery,
    resolver: zodResolver(deliveryStepSchema),
  });
  const onSubmit = async (delivery: DeliveryStepValues) => {
    updateState({ delivery });
    const newState = { ...state, delivery };
    await checkoutAction(newState);
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="divide-y-2">
          {items.map(({ zoneId, productVariant }, index) => (
            <ProductDeliverySection
              key={productVariant.id}
              productDeliveryIndex={index}
              zoneId={zoneId}
              productVariant={productVariant}
            />
          ))}
        </div>
        <div className="flex justify-between">
          <Button type="button" onClick={() => goTo("user")}>
            Tilbake
          </Button>
          <Button>Fullfør</Button>
        </div>
      </form>
    </FormProvider>
  );
}