type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: "/", label: "головна" },
  { href: "/about", label: "про нас" },
  { href: "/products", label: "товари" },
  { href: "/favorites", label: "обране" },
  { href: "/reviews", label: "відгуки" },
  { href: "/cart", label: "кошик" },
  { href: "/orders", label: "замовлення" },
  { href: "/admin/sales", label: "панель керування" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/sales", label: "продажі" },
  { href: "/admin/products", label: "мої товари" },
  { href: "/admin/products/create", label: "створити товар" },
];
