import User from "@/databases/user-model";
import { ConnetToDatabase } from "@/lib/mongoose";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await ConnetToDatabase();

    const { email, password } = await req.json();
    const isExistingUser = await User.findOne({ email });
    if (!isExistingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const isPasswordValid = await compare(password, isExistingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, user: isExistingUser });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
