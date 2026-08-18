"use client";

import { payForOrderAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PayButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    const result = await payForOrderAction(orderId);

    if (!result.paymentData) {
      alert(result.message);
      setLoading(false);
      return;
    }

    const data = result.paymentData;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://secure.wayforpay.com/pay";

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = `${key}[]`;
          input.value = String(v);
          form.appendChild(input);
        });
      } else {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <Button onClick={handlePay} disabled={loading} size="sm">
      {loading ? "Обробка..." : "Оплатити"}
    </Button>
  );
}
