import { NextRequest } from "next/server";
import { POST } from "@/app/api/openai-invoice-data/route";
import OpenAI from "openai";
const testingURL = process.env.NEXT_PUBLIC_TESTING_ENVIRONMENT;

jest.mock("openai");
const MockedOpenAI = OpenAI as jest.MockedClass<typeof OpenAI>;

describe("OpenAI API Route", () => {
  let mockCreateCompletion: jest.Mock;

  beforeEach(() => {
    mockCreateCompletion = jest.fn();
    MockedOpenAI.prototype.chat = {
      completions: {
        create: mockCreateCompletion,
      },
    } as any;
  });

  it("should process extracted text correctly", async () => {
    const mockRequest = new NextRequest(`${testingURL}/openai-invoice-data`, {
      method: "POST",
      body: JSON.stringify({
        extractedText:
          "BJ Global Supply Chain Co., Ltd INVOICE LB403, Building 1, UpperHills (South) Commercial Complex, Invoice Number: BGS Futian District, Shenzhen, Guangdong, China BJ20220830008 Abby Yang 15708437457 Invoice Date: Global Commerce Partner abby@sellersuccess.co 2022/8/30 Customer Information: Billing Address: Shipping Address: Company: WDLHQC, INC Company: Name: Edith Wang Name: Phone: Phone: Designated Address +86 136 8499 8151 30 N Gould St Ste 25209 Sheridan, Address: Address: WY 82801 United States Shipping Method: Truck Order Information: Amount No. Customer SKU Product Description Qty Each/RMB Amount/RMB 1 CZ-B-2L-03 Outdoor cover for motorcycle dustproof(2L) 4500 35.66 ¥ 160,470.00 2 3 4 5 6 7 8 9 10 11 12 13 Subtotal: ¥ ¥ 160,470.00 Shipping: ¥0.00 Exchange Rate: 6.9080 Service Fee: ¥8,023.50 Grand Total: $24,391.07 Payment: 100% Deposit BJ Bank Account Details: Beneficiary Account Name: BJ Global Supply Chain Co., Ltd Beneficiary Account 44250 10000 33000 01973 Number: SWIFT Code: PCBCCNBJSZX Bank Name: CHINA CONSTRUCTION BANK, SHENZHEN BRANCH, SHENZHEN, CHINA",
      }),
    });

    const mockOpenAIResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              "Invoice Number": "BJ20220830008",
              "Invoice Date": "2022/8/30",
              "Seller Name": "BJ Global Supply Chain Co., Ltd",
              "Customer Name": "Edith Wang",
              "Total Amount": "$24,391.07",
              "Product Description":
                "Outdoor cover for motorcycle dustproof(2L)",
              Quantity: 4500,
              "Unit Price": "35.66",
              Subtotal: "¥ 160,470.00",
            }),
          },
        },
      ],
    };

    mockCreateCompletion.mockResolvedValue(mockOpenAIResponse);

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toEqual({
      invoiceNumber: "12345",
      invoiceDate: "2023-04-01",
      sellerName: "ABC Corp",
      customerName: "XYZ Inc",
      totalAmount: 1000,
    });
  });

  it("should handle OpenAI errors correctly", async () => {
    const mockRequest = new NextRequest(`${testingURL}/openai-invoice-data`, {
      method: "POST",
      body: JSON.stringify({
        extractedText: "Sample invoice text",
      }),
    });

    mockCreateCompletion.mockRejectedValue(new Error("OpenAI error"));

    const response = await POST(mockRequest);
    expect(response.status).toBe(500);

    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "OpenAI error" });
  });

  it("should handle JSON parsing errors", async () => {
    const mockRequest = new NextRequest(`${testingURL}/openai-invoice-data`, {
      method: "POST",
      body: JSON.stringify({
        extractedText: "Sample invoice text",
      }),
    });

    const mockOpenAIResponse = {
      choices: [
        {
          message: {
            content: "Invalid JSON",
          },
        },
      ],
    };

    mockCreateCompletion.mockResolvedValue(mockOpenAIResponse);

    const response = await POST(mockRequest);
    expect(response.status).toBe(500);

    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Failed to parse OpenAI response" });
  });
});
