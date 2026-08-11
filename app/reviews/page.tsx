import { IconButtons } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ReviewCart from "@/components/reviews/ReviewCart";
import {
  deleteReviewAction,
  fetchProductsReviewsByUser,
} from "@/utils/actions";

export default async function ReviewsPage() {
  const reviews = await fetchProductsReviewsByUser();
  if (reviews.length === 0) {
    return <SectionTitle title="you have no reviews yet" />;
  }

  return (
    <>
      <SectionTitle title="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewInfo = { comment, rating, name, image };
          return (
            <ReviewCart key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCart>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButtons actionType="delete" />
    </FormContainer>
  );
};
