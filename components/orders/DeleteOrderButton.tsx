"use client";

import { deleteOrderAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteOrderAction({ orderId });
    setLoading(false);

    if (result?.message) {
      router.refresh();
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={loading} size="sm" variant="destructive">
          {loading ? "..." : "Видалити"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Видалити замовлення?</AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію неможливо скасувати. Замовлення буде видалено назавжди.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Скасувати</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Видалити</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
