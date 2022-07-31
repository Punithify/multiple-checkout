import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export const handleClick = async (event) => {
  // Get Stripe.js instance
  const stripe = await stripePromise;

  // Call your backend to create the Checkout Session
  const response = await fetch("/api/checkout/session", {
    method: "POST",
  });

  const session = await response.json();

  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
};
