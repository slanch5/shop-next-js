import { fetchUserFavorites } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";

export default async function FavoritesPage() {
  const favorites = await fetchUserFavorites();
  if (favorites.length === 0)
    return <SectionTitle title="У вас ще немає обраних товарів." />;

  return (
    <div>
      <SectionTitle title="Обране" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  );
}
