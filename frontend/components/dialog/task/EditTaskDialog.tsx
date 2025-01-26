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
import { SubmitButton } from "@/components/buttons/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { taskType } from "@/types/taskType";

export function EditTaskDialog({ id, title, description, status }: taskType) {
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
    // data.taskStatus = taskStatus;

    axios.post('/api/task', data).then(response => (
      console.log(response)
    )).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
      // updateTasks();
    });

    setOpen(false);
  }

  async function deleteTask() {
    setLoading(true);

    axios.delete('/api/task', {
      headers: {
        token,
        id
      }
    }).then(() => {
      // updateTasks();
      toast({
        title: "Sucesso",
        description: `Tarefa de id: ${id} deletada`
      });

      setLoading(false);
      setOpen(false);
    }).catch((err) => {
      toast({
        title: "Erro",
        description: `Erro ao deletar tarefa de id ${id}`,
        variant: "destructive"
      });

      setLoading(false);
    });
  }



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button title="Editar Tarefa" className="flex items-center gap-2" variant="secondary">Editar Tarefa<Pencil size={20} /></Button>
      </DialogTrigger>
      <DialogContent className="min-w-[30%]">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Mude informações da tarefa e confirme para salvar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-6  p-10">
          <div className="  grid w-full grid-cols-1 items-center gap-6  ">
            <div className=" items-center gap-2">
              <Label className="font-medium text-gray-700" htmlFor="title" >Título</Label>
              <Input type="text" id="title" {...register("title")} readOnly defaultValue={title} />
            </div>

            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="description" >Descrição</Label>
              <Input type="text" id="description" {...register("description")} readOnly defaultValue={description} />
            </div>

            <div className=" items-center gap-2">
              <Label className=" font-medium text-gray-700" htmlFor="status" >Status</Label>
              <Select {...register("status")} defaultValue={status}>
                <SelectTrigger>
                  <SelectValue>{status}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em andamento</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
          <div className="flex w-full justify-between">
            <AlertDialog>
              <AlertDialogTrigger><Button type="button" variant="destructive">Deletar</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Após confirmar a tarefa será <strong>removida do sistema.</strong>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteTask()}>Confirmar</AlertDialogAction>
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
