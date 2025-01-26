'use client';
import axios from "axios";

import { usersHeaders } from "@/components/table/users/Columns";
import { useAuthContext } from "@/context/AuthContext";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { UserPlus2, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UsersTable } from "@/components/table/users/UsersTable";
import { UserType } from "@/types/userType";
import { useToast } from "@/hooks/use-toast";


export default function IndexPage() {
  const { token } = useAuthContext();
  const { toast } = useToast();

  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });


  useEffect(() => {
    if (token) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;

    axios.post('/api/users', data).then(() => {
      toast({
        title: 'Usuário criado com sucesso!',
        description: 'O usuário foi criado com sucesso!',
      });
      setLoading(false);
      getUsers();
    }
    ).catch(() => {
      toast({
        title: 'Erro ao criar usuário!',
        description: 'Ocorreu um erro ao criar o usuário. Tente novamente mais tarde.',
      });
      setLoading(false);
    });
  }

  async function getUsers() {
    axios.get('/api/users', { headers: { token } })
      .then(async (response) => {
        const users = await response.data.result.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
        }));
        setUsers(users);
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <section className="flex w-full justify-center">
      <div className="flex flex-col gap-4 overflow-auto rounded-lg  p-2 py-4  md:p-10 lg:p-10">
        <h2 className=" bg-muted rounded border-b p-2 text-center text-xl font-bold shadow">Gestão de Usuários</h2>
        <div className="grid w-full grid-cols-1 gap-y-4  md:grid-cols-3 md:gap-x-4 lg:grid-cols-3 lg:gap-x-4">
          <Card className="h-fit w-full border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Criar Usuário</CardTitle>
              <CardDescription>Preencha as informações abaixo para criar um usuário</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">

                  <div className="flex flex-col space-y-1.5">
                    <Input id="name" {...register("name")} placeholder="Nome" required />

                    <Input id="email" type="email" {...register("email")} placeholder="Email" required />

                    <Input id="password" type="password" {...register("password")} placeholder="Senha" required />
                  </div>
                </div>
                <CardFooter className="mt-4 flex w-full justify-end p-0">
                  <Button type="submit" disabled={loading} className=" h-full items-center bg-emerald-500 hover:bg-emerald-800">{loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" />Aguarde...</div> : <div className="flex items-center gap-2"><UserPlus2 />Criar Usuário</div>}</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="col-span-2">
            <UsersTable updateUsers={
              getUsers
            } columns={usersHeaders} data={users} />
          </div>
        </div>
      </div>
    </section>
  );
}
