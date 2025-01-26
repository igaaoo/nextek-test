"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { taskType } from "@/types/taskType";
import { EditTaskDialog } from "@/components/dialog/task/EditTaskDialog";
import { Calendar, Check, Loader, Loader2, MapPin } from "lucide-react";


export const tasksHeaders: ColumnDef<taskType>[] = [
  {
    accessorKey: "id",
    header: undefined,
    cell: undefined,
  },
  {
    accessorKey: "user_id",
    header: undefined,
    cell: undefined,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criada" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="flex items-center gap-2">
            <Calendar size={20} />
            {
              new Date(row.getValue("created_at")).toLocaleDateString("pt-BR")
            }
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarefa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("title")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("description")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {
            row.getValue("status") === "pendente" &&
            <span className="flex items-center gap-2">
              <span>Pendente</span>
              <Loader2 size={20} />
            </span>
          }

          {
            row.getValue("status") === "em_andamento" &&
            <span className="flex items-center gap-2">
              <span>Em andamento</span>
              <MapPin size={20} />
            </span>
          }

          {
            row.getValue("status") === "concluida" &&
            <span className="flex items-center gap-2">
              <span>Concluída</span>
              <Check size={20} />
            </span>
          }
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Editar" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <EditTaskDialog
            id={row.getValue("id")}
            title={row.getValue("title")}
            description={row.getValue("description")}
            status={row.getValue("status")}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
  },
];

