export const handleCheckout = (order) => {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: "3000",
    currency: "INR",
    name: "Mutiple Checkout",
    description: "Test Transaction",
    image: "https://example.com/your_logo",
    order_id: order.id,
    handler: (res) => {
      console.log(res);
    },
    // modal: {
    //   ondismiss: function () {
    //     window.location.replace("http://localhost:3000");
    //   },
    // },
    prefill: {
      name: "Piyush Garg",
      email: "youremail@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
};
