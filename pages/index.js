import { useEffect, useState } from "react";
import { getCountryCode } from "../http/axios";

export default function Home({ countryCode }) {
  const [check, setChecked] = useState(false);
  const [stripeCheck, setStripeCheck] = useState(false);

  useEffect(() => {
    if (!countryCode) {
      return;
    } else if (countryCode === "IN") {
      setChecked(true);
    }
  }, []);

  const displayRazorpay = () => {
    console.log("razorpay");
  };

  const displayStripe = () => {
    console.log("stripe");
  };
  return (
    <div>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Payment Checkout Flow
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Payment mode
            </h2>

            <div className="w-full lg:w-1/2">
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    checked={check}
                    onChange={(e) => {}}
                  />
                  <span className="ml-2">Pay using Razorpay</span>
                </label>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    checked={stripeCheck}
                    onChange={(e) => {}}
                  />
                  <span className="ml-2">Pay using Stripe</span>
                </label>
              </div>
              <div className="mt-4">
                <button
                  onClick={check ? displayRazorpay : displayStripe}
                  className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                >
                  Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await getCountryCode();
  const countryCode = data.country_code;

  return {
    props: { countryCode },
  };
}
