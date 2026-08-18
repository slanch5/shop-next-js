import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/SectionTitle";
import { fetchUserOrders } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import PayButton from "@/components/orders/PayButton";
import DeleteOrderButton from "@/components/orders/DeleteOrderButton";

export default async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
    <>
      <SectionTitle title="Your Orders" />
      <div>
        <Table>
          <TableCaption>Total orders : {orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Tax</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const {
                id,
                products,
                orderTotal,
                tax,
                shipping,
                createdAt,
                isPaid,
              } = order;

              return (
                <TableRow key={id}>
                  <TableCell>{products}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{formatCurrency(tax)}</TableCell>
                  <TableCell>{formatCurrency(shipping)}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell>
                    {isPaid ? (
                      <span className="text-green-600">Оплачено</span>
                    ) : (
                      <PayButton orderId={id} />
                    )}
                  </TableCell>
                  <TableCell>
                    <DeleteOrderButton orderId={id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
