import { backendApi } from "@/backend/config/axios";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const token = request.headers.get('token');
  if (!token) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    const tasksResponse = await backendApi.get(`/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ tasks: tasksResponse.data.tasks }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { title, description, token } = await request.json();
  if (!token) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    await backendApi.post('/tasks', {
      title,
      description
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ result: "Tarefa criada" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { id, title, description, status, token } = await request.json();
  if (!token) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    await backendApi.put(`/tasks/${id}`, {
      title,
      description,
      status
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ result: "Tarefa atualizada" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = request.headers.get('id');
  const token = request.headers.get('token');
  if (!token || !id) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    await backendApi.delete(`/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return NextResponse.json({ result: "Tarefa deletada" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Não autorizado' }, { status: 500 });
  }
}