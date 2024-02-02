"use client"

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
} from "@nextui-org/react";
import {ChevronDownIcon, Printer, Share2} from "lucide-react";
import {SearchIcon} from "@nextui-org/shared-icons";
import moment from "moment";
import 'moment/locale/ka';
import Link from "next/link";


const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "სახელი", uid: "name", sortable: true},
    {name: "ფასი", uid: "price", sortable: true},
    {name: "მგზავრები", uid: "seats", sortable: true},
    // {name: "გაჩერებები", uid: "stops.count()", sortable: true},
    {name: "ავტომობილი", uid: "car"},
    {name: "სტატუსი", uid: "status", sortable: true},
    {name: "გაზიარება", uid: "actions"},
];

const statusOptions = [
    {name: "მომლოდინე", uid: "PENDING"},
    {name: "დადასტურებული", uid: "ACCEPTED"},
    {name: "უარყოფილი", uid: "REJECTED"},
    {name: "გაუქმებული", uid: "CANCELED"},
    {name: "დასრულებული", uid: "COMPLETED"},
];


export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    PENDING: "warning",
    ACCEPTED: "success",
    REJECTED: "danger",
    CANCELED: "danger",
    COMPLETED: "success",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "price", "status", "actions"];

interface IMyRides {
    rides: any
}

const MyRides = ({rides}: IMyRides) => {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredRides = [...rides];

        if (hasSearchFilter) {
            filteredRides = filteredRides.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredRides = filteredRides.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredRides;
    }, [rides, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: IMyRides, b: IMyRides) => {
            const first = a[sortDescriptor.column as keyof IMyRides] as number;
            const second = b[sortDescriptor.column as keyof IMyRides] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((ride: any, columnKey: React.Key) => {
        const cellValue = ride[columnKey as keyof IMyRides];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">
                            <Link href={`/ride/${ride.id}`}>{cellValue}</Link>
                        </p>
                        <p className="text-bold text-tiny capitalize text-default-400">{moment(ride.startDate).format("LL")} - <span
                            className="bg-danger-100 px-1 py-0.5 rounded-md text-danger-700">{ride.startTime}</span></p>
                    </div>
                );
            case "price":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue.toFixed(2)}₾</p>
                        <p className="text-bold text-tiny capitalize text-default-400">
                            ერთი მგზავრი: {(ride.price / ride.seats).toFixed(2)}₾
                        </p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[ride.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Button variant="flat" color="primary" size="sm">
                            <Share2 width={14}/>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="მოძებნე მარშრუტების მიხედვით..."
                        startContent={<SearchIcon/>}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    სტატუსი
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">
                                    სვეტები
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<Printer/>}>
                            ამობეჭდვა
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">სულ {rides.length} მგზავრობა</span>
                    <label className="flex items-center text-default-400 text-small">
                        რიგები თითო გვერდზე:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        rides.length,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "ყველა მონიშნულია"
              : `${filteredItems.length}-დან ${selectedKeys.size} მონიშნული`}
        </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        წინა
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        შემდეგი
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="მგზავრობები"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px] shadow-none border border-default-100 rounded-xl",
            }}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns} className="shadow-none">
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                        className="shadow-none border-0 bg-gray-100"
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"მგზავრობა ვერ მოიძებნა"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>
                            {renderCell(item, columnKey)}
                        </TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
};

export default MyRides;
