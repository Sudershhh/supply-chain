import { NextRequest, NextResponse } from "next/server";
import {
  TextractClient,
  AnalyzeDocumentCommand,
  FeatureType,
  Block,
} from "@aws-sdk/client-textract";

const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;
const awsRegion = process.env.AWS_REGION;
const textractClient = new TextractClient({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKeyId,
    secretAccessKey: awsSecretAccessKey,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documentBytes, s3Bucket, s3Key } = body;

    const params = {
      Document: {
        Bytes: documentBytes ? Buffer.from(documentBytes, "base64") : undefined,
        S3Object:
          s3Bucket && s3Key ? { Bucket: s3Bucket, Name: s3Key } : undefined,
      },
      FeatureTypes: ["TABLES", "FORMS", "LAYOUT"] as FeatureType[],
    };

    const command = new AnalyzeDocumentCommand(params);

    const response = await textractClient.send(command);

    const extractedText = extractTextFromBlocks(response.Blocks || []);

    return NextResponse.json({ text: extractedText }, { status: 200 });
  } catch (error) {
    console.error("Error analyzing document:", error);

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

function extractTextFromBlocks(blocks: Block[]): string {
  let text = "";
  for (const block of blocks) {
    if (block.BlockType === "LINE" && block.Text) {
      text += block.Text + "\n";
    }
  }
  return text.trim();
}
