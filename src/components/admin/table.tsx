import * as React from "react";

import {
  // ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Combobox } from "@/components/shared/Combobox";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Filter {
  value: string;
  label: string;
}

interface Props {
  columns: any[];
  data: any[];
  filter?: Filter[];
  searchBy?: string;
  search?: string;
}

export function MyTable(props: Props) {
  const { columns, data, filter, searchBy, search } = props;
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [placeholder, setPlaceholder] = React.useState<string>(
    searchBy
      ? filter?.find((f) => f.value === searchBy)?.label || "Select Filter"
      : "Select Filter"
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilter, setSelectedFilter] = React.useState<string>(
    searchBy || (filter ? filter[0].value : "")
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const sanitizedValue = newValue.replace(/ /g, "%20");
    table.getColumn(selectedFilter)?.setFilterValue(newValue);
    navigate(`/admin/peraturan/${selectedFilter}/${sanitizedValue}`);
  };
  useEffect(() => {
    if (searchBy) {
      const selectedFilterLabel =
        filter?.find((f) => f.value === searchBy)?.label || "Select Filter";
      setPlaceholder(selectedFilterLabel);
    }
  }, [searchBy, filter]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {filter && (
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={
              search
                ? search
                : (table
                    .getColumn(selectedFilter)
                    ?.getFilterValue() as string) ?? ""
            }
            onChange={handleInputChange}
            className="max-w-sm"
          />
          <div className="w-2" />
          <Combobox
            items={filter}
            onChange={(item: any) => {
              const newSelectedFilter = item ? item.value : "";
              table.getColumn(selectedFilter)?.setFilterValue("");
              setSelectedFilter(newSelectedFilter);
              const selectedFilterLabel =
                filter?.find((f) => f.value === newSelectedFilter)?.label ||
                "Select Filter";
              setPlaceholder(selectedFilterLabel);
            }}
            placeHolder={searchBy ? placeholder : "Select Filter"}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          {table.getFilteredRowModel().rows.length} row(s)
          {/* row(s) selected. */}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
