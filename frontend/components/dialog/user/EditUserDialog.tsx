import axios from "axios";
import { useState } from "react";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/context/AuthContext";
import { UserType } from "@/types/userType";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useToast } from "@/hooks/use-toast";





export function EditUserDialog({ name, updateUsers, email }: UserType & { updateUsers: any; }) {
  const { token } = useAuthContext();
  const { toast } = useToast();


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    mode: 'onSubmit'
  });

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;

    axios.post('/api/config/editUser', data).then(response => (
      console.log(response)
    )).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
      updateUsers();
    });

    setOpen(false);
  }

  async function deleteUser() {
    setLoading(true);

    axios.post('/api/config/deleteUser', { token }).then(() => {
      updateUsers();
      toast({
        title: "Sucesso",
        description: `Usuário ${name} deletado com sucesso.`
      });

      setLoading(false);
      setOpen(false);
    }).catch((err) => {
      toast({
        title: "Erro",
        description: `Erro ao deletar usuário ${name}`,
        variant: "destructive"
      });

      setLoading(false);
    });
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Editar Usuário"><Pencil /></Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Mude informações do usuário e confirme para salvar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-6  p-10">
          <div className="  grid w-full grid-cols-1 items-center gap-6  ">
            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="destination" >Nome</Label>
              <Input type="text" id="name" {...register("name")} readOnly defaultValue={name} />
            </div>

            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="email" >Email</Label>
              <Input type="email" id="name" {...register("email")} readOnly defaultValue={email} />
            </div>

            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="password" >Senha</Label>
              <Input type="password" id="password" {...register("password")} readOnly />
            </div>

          </div>
          <div className="flex w-full justify-between">

            <AlertDialog>
              <AlertDialogTrigger><Button type="button" variant="destructive">Deletar</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Após confirmar o usuário será <strong>removido do sistema.</strong>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteUser()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <SubmitButton loading={loading} title="Confirmar" />
          </div>
        </form>


      </DialogContent>
    </Dialog>
  );
}
