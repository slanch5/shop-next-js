import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

const MERCHANT_SECRET_KEY = process.env.WAYFORPAY_MERCHANT_SECRET_KEY as string;

function generateSignature(fields: (string | number)[]): string {
  const str = fields.join(";");
  return crypto
    .createHmac("md5", MERCHANT_SECRET_KEY)
    .update(str)
    .digest("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode,
    cardPan,
    transactionStatus,
    reasonCode,
    merchantSignature,
  } = body;

  // Перевірка підпису запиту від WayForPay
  const expectedSignature = generateSignature([
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode ?? "",
    cardPan ?? "",
    transactionStatus,
    reasonCode,
  ]);

  if (expectedSignature !== merchantSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Якщо оплата успішна — оновлюємо замовлення
  if (transactionStatus === "Approved") {
    await db.order.updateMany({
      where: { orderReference },
      data: { isPaid: true },
    });
  }

  // Обов'язкова відповідь у форматі, який очікує WayForPay
  const responseTime = Math.floor(Date.now() / 1000);
  const responseSignature = generateSignature([
    orderReference,
    "accept",
    responseTime,
  ]);

  return NextResponse.json({
    orderReference,
    status: "accept",
    time: responseTime,
    signature: responseSignature,
  });
}
