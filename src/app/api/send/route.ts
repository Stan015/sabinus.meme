import { EmailTemplate } from "@/components/email-template";
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { form } = await request.json();

    if (!form || !form.email || !form.name || !form.message) {
      return NextResponse.json(
        { error: "Invalid input. Please provide email, name, and message." },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "team@sabinus.meme",
      to: "azistanley17@gmail.com",
      subject: "New Message From Sabinus.meme",
      react: EmailTemplate({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully", data });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}
