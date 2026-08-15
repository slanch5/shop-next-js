import crypto from "crypto";

const MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT as string;
const MERCHANT_SECRET_KEY = process.env.WAYFORPAY_MERCHANT_SECRET_KEY as string;
const MERCHANT_DOMAIN = process.env.WAYFORPAY_MERCHANT_DOMAIN as string;

function generateSignature(fields: (string | number)[]): string {
  const str = fields.join(";");
  return crypto
    .createHmac("md5", MERCHANT_SECRET_KEY)
    .update(str)
    .digest("hex");
}

export function createPaymentData({
  orderReference,
  amount,
  productNames,
  productPrices,
  productCounts,
  clientEmail,
}: {
  orderReference: string;
  amount: number;
  productNames: string[];
  productPrices: number[];
  productCounts: number[];
  clientEmail: string;
}) {
  const orderDate = Math.floor(Date.now() / 1000);
  const currency = "UAH";

  const signatureFields = [
    MERCHANT_ACCOUNT,
    MERCHANT_DOMAIN,
    orderReference,
    orderDate,
    amount,
    currency,
    ...productNames,
    ...productCounts,
    ...productPrices,
  ];

  const merchantSignature = generateSignature(signatureFields);

  return {
    merchantAccount: MERCHANT_ACCOUNT,
    merchantDomainName: MERCHANT_DOMAIN,
    merchantSignature,
    orderReference,
    orderDate,
    amount,
    currency,
    productName: productNames,
    productPrice: productPrices,
    productCount: productCounts,
    clientEmail,
    returnUrl: `https://${MERCHANT_DOMAIN}/order-confirmation`,
    serviceUrl: `https://${MERCHANT_DOMAIN}/api/wayforpay/callback`,
  };
}
