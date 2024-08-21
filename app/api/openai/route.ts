// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";
// import fs from "fs";
// import path from "path";
// import { Readable } from "stream";
// import pdf from "pdf-parse";

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// // Utility function to convert ReadableStream to Node.js Readable
// function streamToReadable(stream: ReadableStream<Uint8Array>): Readable {
//   const reader = stream.getReader();
//   const readable = new Readable({
//     async read() {
//       try {
//         const { done, value } = await reader.read();
//         if (done) {
//           this.push(null);
//         } else {
//           this.push(Buffer.from(value));
//         }
//       } catch (error: any) {
//         this.destroy(error);
//       }
//     },
//   });
//   return readable;
// }

// // Utility function to save the file to a temporary directory
// async function saveFile(fileStream: Readable, filePath: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const writeStream = fs.createWriteStream(filePath);
//     fileStream.pipe(writeStream);

//     writeStream.on("finish", resolve);
//     writeStream.on("error", reject);
//   });
// }

// // Utility function to extract text from PDF
// async function extractTextFromPDF(filePath: string): Promise<string> {
//   const data = fs.readFileSync(filePath);
//   const pdfData = await pdf(data);
//   return pdfData.text;
// }

// export async function POST(req: Request) {
//   try {
//     // Parse the request body
//     const { fileUrl }: { fileUrl: string } = await req.json();
//     console.log("Fetching file from URL:", fileUrl);

//     // Download the file
//     const response = await fetch(fileUrl);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: `Failed to fetch file: ${response.statusText}` },
//         { status: 400 }
//       );
//     }

//     const fileStream = response.body;

//     if (!fileStream) {
//       return NextResponse.json(
//         { error: "File stream is empty" },
//         { status: 400 }
//       );
//     }

//     const readableStream = streamToReadable(fileStream);
//     const filePath = path.join(process.cwd(), "temp-parsed", "invoice.pdf");

//     await saveFile(readableStream, filePath);

//     // Extract text from the PDF file
//     const fileContent = await extractTextFromPDF(filePath);

//     // Use OpenAI to parse the file content
//     const result = await openai.completions.create({
//       model: "text-davinci-002",
//       prompt: `Extract invoice total, date, and seller from the following text:\n\n${fileContent}`,
//       max_tokens: 500,
//     });
//     console.log("OpenAI API response:", result);

//     // Extract the text from the response
//     const completionText = result.choices[0]?.text || "No text available";

//     return NextResponse.json({ completion: completionText });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return NextResponse.json(
//       { error: "Error processing request" },
//       { status: 500 }
//     );
//   }
// }
