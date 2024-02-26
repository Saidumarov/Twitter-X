import { ConnetToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/databases/user-model";
import { hash } from "bcrypt";
export async function POST(req: Request) {
  try {
    await ConnetToDatabase();
    const { searchParams } = new URL(req.url);
    const step = searchParams.get("step");

    if (step === "1") {
      const { email } = await req.json();

      const isExistingUser = await User.findOne({ email });

      if (isExistingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
      return NextResponse.json({ success: true });
    } else if (step === "2") {
      const { email, username, password, name } = await req.json();
      const isExistingUsername = await User.findOne({ username });
      if (isExistingUsername) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
      const hashedPassword = await hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
        name,
      });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
