import { backendApi } from "@/backend/config/axios";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) return NextResponse.json({ message: 'Credenciais Inválidas' }, { status: 401 });


  try {
    const authResponse = await backendApi.post('/auth/login', {
      email,
      password
    });

    return NextResponse.json({ message: "Authenticated", token: authResponse.data.access_token }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}