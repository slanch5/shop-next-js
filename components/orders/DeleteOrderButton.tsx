"use client";

import { deleteOrderAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Ви впевнені, що хочете видалити це замовлення?",
    );
    if (!confirmed) return;

    setLoading(true);
    const result = await deleteOrderAction({ orderId });
    setLoading(false);

    if (result?.message) {
      router.refresh();
    }
  }

  return (
    <Button
      onClick={handleDelete}
      disabled={loading}
      size="sm"
      variant="destructive"
    >
      {loading ? "..." : "Видалити"}
    </Button>
  );
}
