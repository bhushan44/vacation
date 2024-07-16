import React, { useEffect, useState } from 'react';

const Review = ({ tourId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ review: '', rating: 5 });
  const [isFormVisible, setIsFormVisible] = useState(false);

//   useEffect(() => {
//     async function fetchReviews() {
//       const response = await fetch(`http://localhost:5000/api/v1/tours/${tourId}/reviews`);
//       const result = await response.json();
//       setReviews(result.data);
//     }
//     fetchReviews();
//   }, [tourId]);

  async function submitReview(event) {
    event.preventDefault();
    await fetch(`http://localhost:5000/api/v1/tours/${tourId}/reviews`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    });
    setNewReview({ review: '', rating: 5 });
    setIsFormVisible(false);
    // Re-fetch reviews after submission
    const response = await fetch(`http://localhost:5000/api/v1/tours/${tourId}/reviews`);
    const result = await response.json();
    setReviews(result.data);
  }

  return (
    <div className="p-5">
      <h3 className="font-bold">Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id} className="mb-2">
          <p><strong>{review.user.name}</strong> ({review.rating}/5)</p>
          <p>{review.review}</p>
        </div>
      ))}
      {1 ? (
        <form onSubmit={submitReview}>
          <textarea
            placeholder="Your review"
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            required
            className="block w-full p-2 mb-2 border rounded"
          ></textarea>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            required
            className="block w-full p-2 mb-2 border rounded"
          >
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
          <button type="submit" className="bg-green-400 rounded-lg border-2 border-solid text-white p-2">
            Submit Review
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-400 rounded-lg border-2 border-solid text-white p-2"
        >
          Add Review
        </button>
      )}
    </div>
  );
};

export default Review;
