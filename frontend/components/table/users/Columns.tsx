"use client";

import { UserType } from "@/types/userType";
import { ColumnDef } from "@tanstack/react-table";

export const usersHeaders: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="flex items-center">
          <span>Nome</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="flex items-center">
          <span>Email</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
  },
  {
    accessorKey: "id",
    header: undefined,
    cell: undefined,
  },
];
