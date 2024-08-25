import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { extractedText } = await req.json();

    const prompt = `
    Extract the following information from the given invoice text:
    - Invoice Number
    - Invoice Date
    - Seller Name
    - Customer Name
    - Total Amount
    - Product Description
    - Quantity
    - Unit Price
    - Subtotal

    Format the output as a JSON object.

    Invoice text:
    ${extractedText}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that extracts invoice information.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    const cleanedContent = content.replace(/```json\n|\n```/g, "").trim();

    let extractedInfo;
    try {
      extractedInfo = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      console.log("Raw response:", cleanedContent);
      return NextResponse.json(
        { error: "Failed to parse OpenAI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(extractedInfo, { status: 200 });
  } catch (error) {
    console.error("Error processing with OpenAI:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
