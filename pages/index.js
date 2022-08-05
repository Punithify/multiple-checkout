import { useEffect, useState } from "react";
import { handleClick } from "../utils/stripeCheckout";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { handleCheckout } from "../utils/razorpayCheckout";
import SVG from "../components/SVG";

export default function Home({ country }) {
  const [check, setChecked] = useState(false);
  const [stripeCheck, setStripeCheck] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const Razorpay = useRazorpay();

  country = decodeURIComponent(country);
  console.log(country);

  const displayRazorpay = useCallback(async () => {
    const res = await fetch("/api/checkout/payment");
    const data = await res.json();

    const rzpay = new Razorpay(handleCheckout(data));
    rzpay.open();
    setDisabled(false);
  }, [Razorpay]);

  const displayStripe = async () => {
    await handleClick();
  };

  const onClickHandler = () => {
    setDisabled(true);

    if (check) {
      displayRazorpay();
      return;
    }
    displayStripe();
  };

  useEffect(() => {
    if (country === "IN") {
      setChecked(true);
      return;
    } else {
      setStripeCheck(true);
    }
  }, [country]);

  return (
    <div>
      <div className="mt-10 mb-4">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Payment Checkout Flow
        </h1>
        <div>
          <h1 className="text-xl text-bold font-bold flex items-center justify-center text-amber-500 ">
            Your from {country}
          </h1>
        </div>
      </div>

      <div className="bg-slate-200 container p-12  mx-auto rounded border-b-1 border-gray-300 ">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full ">
            <h1 className=" font-bold md:text-xl text-heading ">Payment</h1>
            <span className="mb-4">
              All transactions are secure and encrypted.
            </span>

            <div className=" w-full lg:w-1/2">
              <div className="bg-gray-100 mt-4 ml-4 rounded border-b-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="mx-2 my-2 w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    checked={check}
                    disabled={check ? false : true}
                    onChange={(e) => {}}
                  />
                  <span className="ml-2 mx-2 my-2 ">
                    Netbanking/UPI (Processed via Razorpay)
                  </span>
                </label>
                {check ? (
                  <div className="mx-2 my-2">
                    <SVG />
                    <p>
                      After clicking “Pay”, you will be redirected to Razorpay
                      (Cards, UPI, NetBanking, Wallets) to complete your
                      purchase securely.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-4 ml-2 rounded border-b-0 bg-gray-100">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="mx-2 my-2  w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                    checked={stripeCheck}
                    disabled={stripeCheck ? false : true}
                    onChange={(e) => {}}
                  />
                  <span className="ml-2">
                    Credit/Debit card (Processed via Stripe)
                  </span>
                </label>
                {stripeCheck ? (
                  <div className="mx-2 my-2">
                    <SVG />
                    <p>
                      After clicking “Pay”, you will be redirected to Stripe
                      (Cards and Wallets) to complete your purchase securely.
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-4">
                <button
                  disabled={disabled}
                  className={`
                  rounded
                  w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900`}
                  onClick={onClickHandler}
                >
                  {disabled ? (
                    <>
                      <span className="ml-2">Hold On...</span>
                    </>
                  ) : (
                    <span className="text-bold">Pay</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: query,
  };
}
