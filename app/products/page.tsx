import ProductsContainer from "@/components/products/ProductsContainer";
import CategoryFilter from "@/components/products/CategoryFilter";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string; category?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  return (
    <>
      <CategoryFilter />
      <ProductsContainer layout={layout} search={search} category={category} />
    </>
  );
}
