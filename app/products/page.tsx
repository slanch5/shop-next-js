import ProductsContainer from "@/components/products/ProductsContainer";

export function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";
  return (
    <ProductsContainer layout={layout} search={search}>
      ProductsPage
    </ProductsContainer>
  );
}

export default ProductsPage;
