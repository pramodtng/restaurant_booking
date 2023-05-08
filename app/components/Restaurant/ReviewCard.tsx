import { Review } from '@prisma/client'
import React from 'react'
import ReviewsCard from './ReviewsCard'

const ReviewCard = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length === 1 ? "person" : "people"} are
        saying
      </h1>
      <div>
        {
          reviews.map((review) => (
            <ReviewsCard
              review={review}
              key={review.id}
            />
          ))
        }
      </div>
    </div>
  )
}

export default ReviewCard