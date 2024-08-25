import { NextRequest } from "next/server";
import { POST } from "@/app/api/parse-pdf/route";
import { TextractClient } from "@aws-sdk/client-textract";

const testingURL = process.env.NEXT_PUBLIC_TESTING_ENVIRONMENT;

jest.mock("@aws-sdk/client-textract");

describe("Textract API Route", () => {
  let mockSend: jest.Mock;

  beforeEach(() => {
    mockSend = jest.fn();
    (TextractClient as jest.Mock).mockImplementation(() => ({
      send: mockSend,
    }));
  });

  it("should process document bytes correctly", async () => {
    const mockRequest = new NextRequest(`${testingURL}/parse-pdf`, {
      method: "POST",
      body: JSON.stringify({
        documentBytes: "base64EncodedString",
      }),
    });

    mockSend.mockResolvedValue({
      Blocks: [
        { BlockType: "LINE", Text: "Sample text 1" },
        { BlockType: "LINE", Text: "Sample text 2" },
      ],
    });

    const response = await POST(mockRequest);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual({ text: "Sample text 1\nSample text 2" });
  });
});
