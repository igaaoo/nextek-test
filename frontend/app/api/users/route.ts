import { backendApi } from "@/backend/config/axios";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const token = request.headers.get('token');

  if (!token) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    const usersResponse = await backendApi.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ result: usersResponse.data }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, email, password, token } = await request.json();
  if (!token) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    await backendApi.post('/users', {
      name,
      email,
      password
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ result: "Usuário Criado" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}