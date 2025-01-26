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


import { Clipboard, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/context/AuthContext";
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { useDataContext } from "@/context/DataContext";
import { Textarea } from "@/components/ui/textarea";


export function CreateTaskDialog() {
  const { token } = useAuthContext();
  const { getTasksData } = useDataContext();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const { register, handleSubmit, reset } = useForm({
    mode: 'onSubmit'
  });

  async function onSubmit(data: any) {
    setLoading(true);
    data.token = token;

    axios.post('/api/tasks', data).then(() => {
      setLoading(false);
      toast({
        title: 'Tarefa Criada',
        description: 'A tarefa irá aparecer na lista de tarefas.',
      });
    }
    ).catch((err) => {
      console.log(err);
      setLoading(false);
      toast({
        title: 'Erro ao criar tarefa',
        description: 'Ocorreu um erro ao criar a tarefa. Tente novamente mais tarde.',
        variant: 'destructive'
      });
    }).finally(() => {
      getTasksData();
      reset();
    });

    setOpen(false);
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Criar Tarefa" className="flex items-center gap-2 whitespace-nowrap" variant="agree">Criar Tarefa<Clipboard size={20} /></Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para criar uma nova tarefa.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-6  p-10">
          <div className="  grid w-full grid-cols-1 items-center gap-6  ">
            <div className=" items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="title" >Título</Label>
              <Input type="text" id="title" {...register("title")} />
            </div>

            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="description" >Descrição</Label>
              <Textarea id="description" {...register("description")} />
            </div>

          </div>
          <div className="flex w-full justify-end">
            <SubmitButton loading={loading} title="Confirmar" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
