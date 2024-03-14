"use client";
import {
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Input } from "@nextui-org/react";
import {
  ArrowUpAZ,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  Search,
} from "lucide-react";

export type BasicTableProps = {
  data: any;
  columns: any;
  options?: boolean;
};

export const BasicTable = ({ data, columns, options }: BasicTableProps) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onGlobalFilterChange: setFiltering,
  });

  const handleTableSorting = () => {
    table.setSorting([
      {
        id: "name",
        desc: true,
      },
    ]);
  };

  if (!data || !columns) {
    return null;
  }

  return (
    <div className="fira-go">
      <div className="sm:flex sm:items-center justify-between gap-4">
        <div className="flex flex-grow flex-row items-center gap-4 w-72">
          <Input
            size={"sm"}
            // label={"ძებნა"}
            placeholder={"ძებნა"}
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            onClear={() => setFiltering("")}
            startContent={<Search size={20} className={"text-default-500"} />}
          />
        </div>
        <div className="flex gap-1">
          <Button
            className={"py-2 min-w-unit-0"}
            size={"md"}
            variant={"light"}
            onClick={handleTableSorting}
          >
            <ArrowUpAZ size={16} />
          </Button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full rounded-xl overflow-hidden">
              <thead className="bg-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 sm:pl-3 cursor-pointer select-none"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className={"flex flex-row gap-1 items-center"}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "asc" ? (
                                <ChevronUp size={10} />
                              ) : (
                                <ChevronDown size={10} />
                              )
                            ) : (
                              <ChevronsUpDown size={10} />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody className="bg-default-100">
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      index === 0 ? "border-gray-300" : "border-gray-200",
                      "border-t hover:bg-white hover:shadow-lg transition duration-150 ease-in-out cursor-pointer select-none",
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {options && (
              <div
                className={"flex flex-row bg-default-100 rounded-xl my-2 p-2"}
              >
                {table.getAllLeafColumns().map((column) => {
                  return (
                    <div key={column.id} className="px-1">
                      <label>
                        <input
                          {...{
                            type: "checkbox",
                            checked: column.getIsVisible(),
                            onChange: column.getToggleVisibilityHandler(),
                          }}
                        />{" "}
                        {String(column.columnDef.header)}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
            <div
              className={cn(
                "flex justify-between items-center mt-4",
                table.getPageCount() === 0 ? "hidden" : "visible",
              )}
            >
              <div className={"text-sm text-gray-700"}>
                {table.getPageCount() > 0 && (
                  <span>
                    Showing <b>{table.getState().pagination.pageIndex + 1}</b>{" "}
                    to <b>{table.getPageCount()}</b> of{" "}
                    <b>{table.getRowCount()}</b> results
                  </span>
                )}
                {/*Showing {table.getPageStart()} to {table.getPageEnd()} of {table.getRowCount()} results*/}
              </div>

              <div className={"flex gap-1"}>
                <Button
                  className={
                    "py-2 min-w-unit-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-default-100"
                  }
                  size={"sm"}
                  variant={"light"}
                  onClick={() => table.setPageIndex(0)}
                >
                  <ChevronsLeft size={16} />
                </Button>
                <Button
                  className={"py-2 min-w-unit-0"}
                  size={"sm"}
                  variant={"light"}
                  isDisabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  className={"py-2 min-w-unit-0"}
                  size={"sm"}
                  variant={"light"}
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  <ChevronRight size={16} />
                </Button>
                <Button
                  className={
                    "py-2 min-w-unit-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-default-100"
                  }
                  size={"sm"}
                  variant={"light"}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                  <ChevronsRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
BasicTable.displayName = "BasicTable";
