"use client";
import { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import { statusFilter } from "../filters";


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;


  return (

    <div className="flex w-full  flex-col-reverse items-center justify-between gap-2 space-x-2 md:flex-row">
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="Filtrar..."
          onChange={(event) =>
            table.setGlobalFilter(event.target.value.toString())
          }
          className="h-8  w-full md:w-72"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
        <Label>Exibir</Label>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 40].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statusFilter}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <Eraser className=" size-4" />
          </Button>
        )}

      </div>

    </div>

  );
}
