import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchAdminOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";

export default async function SalesPage() {
  const orders = await fetchAdminOrders();

  return (
    <div>
      <Table>
        <TableCaption>Усього замовлень: {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ел. пошта</TableHead>
            <TableHead>Товари</TableHead>
            <TableHead>Сума замовлення</TableHead>
            <TableHead>Податок</TableHead>
            <TableHead>Доставка</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Статус</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const {
              id,
              productNames,
              products,
              orderTotal,
              tax,
              shipping,
              createdAt,
              email,
              isPaid,
            } = order;

            return (
              <TableRow key={id}>
                <TableCell>{email}</TableCell>
                <TableCell>{productNames}</TableCell>
                <TableCell>{formatCurrency(orderTotal)}</TableCell>
                <TableCell>{formatCurrency(tax)}</TableCell>
                <TableCell>{formatCurrency(shipping)}</TableCell>
                <TableCell>{formatDate(createdAt)}</TableCell>
                <TableCell>
                  {isPaid ? (
                    <span className="text-green-600">Оплачено</span>
                  ) : (
                    <span className="text-orange-500">Очікує оплати</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
