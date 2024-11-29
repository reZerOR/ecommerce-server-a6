/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export interface PaymentData {
  transactionId: string;
  orderId: string;
  totalPrice: number;
  custormerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhone: string;
  callbackUrl: string;
}

export const initiatePayment = async (
  paymentData: PaymentData
): Promise<any> => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: paymentData.transactionId,
      success_url: `${config.base_url}/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}&orderId=${paymentData.orderId}&callbackUrl=${paymentData.callbackUrl}/success?id=${paymentData.orderId}&status=success`,
      fail_url: `${config.base_url}/api/v1/payment/confirmation?transactionId=${paymentData.transactionId}&orderId=${paymentData.orderId}&callbackUrl=${paymentData.callbackUrl}/failed&status=failed`,
      cancel_url: `${paymentData.callbackUrl}`,
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.custormerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.customerPhone,
      type: "json",
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Payment initiation failed!");
  }
};

export const verifyPayment = async (tnxId: string): Promise<any> => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Payment validation failed!");
  }
};
