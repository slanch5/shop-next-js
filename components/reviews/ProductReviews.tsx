import { fetchProductsReviews } from "@/utils/actions";

import ReviewCard from "./ReviewCart";
import SectionTitle from "../global/SectionTitle";
export default async function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  const reviews = await fetchProductsReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle title="product reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName ?? "anonymos",
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
