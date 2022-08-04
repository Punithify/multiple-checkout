import { check } from "../../../src/bucket";
const { v4: uuidv4 } = require("uuid");

const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "wrong request" });
  }
  const { allowed, remaining } = await check("dheera");
  console.log("allowed", allowed, remaining);
  if (!allowed) {
    return res.json({
      message: "Not allowed to send requests",
      allowed,
      remaining,
    });
  }

  const payment_capture = 1;
  const options = {
    amount: 40 * 100,
    currency: "INR",
    receipt: `syn-${uuidv4()}`,
    payment_capture,
    notes: { events: "" },
  };
  try {
    const response = await instance.orders.create(options);
    console.log(response);
    return res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log("error creating ur order");
  }
  res.end();
};
