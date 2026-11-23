/**
 * PLACEHOLDER / SAMPLE REVIEWS DATA
 * 
 * NOTE FOR CLIENT / DEVELOPER:
 * Real Google reviews are not yet connected. Replace the sample items below
 * with genuine verified reviews from the Angels Beauty Parlour Google Business profile
 * once retrieved via Google Business Profile API or manual export.
 */

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number; // 1-5
  relativeTime: string;
  serviceMentioned: string;
  text: string;
  isSamplePlaceholder: boolean;
}

export const GOOGLE_RATING_SUMMARY = {
  averageRating: 4.9,
  totalReviews: 239,
  googleProfileUrl: "https://maps.app.goo.gl/Eo8g6Q6LwAWUtfvW9",
  writeReviewUrl: "https://maps.app.goo.gl/Eo8g6Q6LwAWUtfvW9"
};

export const SAMPLE_REVIEWS: GoogleReview[] = [
  {
    id: "sample-1",
    authorName: "Anjali Mathew",
    relativeTime: "2 weeks ago",
    rating: 5,
    serviceMentioned: "HD Bridal Makeup & Saree Draping",
    text: "Had my wedding makeup and hair done at Angels Beauty Parlour. The staff was incredibly patient and attentive. My HD makeup stayed totally flawless even after an emotional church ceremony. Highly recommend for any Wayanad bride!",
    isSamplePlaceholder: true
  },
  {
    id: "sample-2",
    authorName: "Fathima R.",
    relativeTime: "1 month ago",
    rating: 5,
    serviceMentioned: "Korean Glass Skin Facial & Hair Spa",
    text: "The salon ambience is so tranquil and luxurious! The Korean glass skin facial gave me an immediate lit-from-within glow that lasted for weeks. Extremely hygienic and polite team in Mananthavady.",
    isSamplePlaceholder: true
  },
  {
    id: "sample-3",
    authorName: "Dr. Deepa Nair",
    relativeTime: "1 month ago",
    rating: 5,
    serviceMentioned: "Keratin Treatment & Pedicure",
    text: "Got keratin hair smoothening and a luxury pedicure with rose petals. The results exceeded my expectations. So happy to have such high standard salon care right here near St Joseph's Hospital.",
    isSamplePlaceholder: true
  },
  {
    id: "sample-4",
    authorName: "Sneha George",
    relativeTime: "2 months ago",
    rating: 5,
    serviceMentioned: "Engagement Makeup & Hair Styling",
    text: "I loved how natural yet radiant my engagement makeup looked. They listened to exactly what I wanted and didn't overdo the foundation. Everyone complimented my hair and saree drape!",
    isSamplePlaceholder: true
  },
  {
    id: "sample-5",
    authorName: "Meera K. V.",
    relativeTime: "3 months ago",
    rating: 5,
    serviceMentioned: "Nanoplastia & Skin Brightening",
    text: "My frizzy hair was completely revitalized after their Nanoplastia treatment. Silk smooth and shiny. Also love that they are open every single day from 9 AM to 8 PM with zero holiday hassle.",
    isSamplePlaceholder: true
  }
];
