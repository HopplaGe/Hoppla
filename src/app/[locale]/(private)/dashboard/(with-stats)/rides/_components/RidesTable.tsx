"use client";
import React from "react";
import { meterToKm } from "@/lib/tools/meterToKm";
import { secondsToHours } from "@/lib/tools/secondsToHours";
import moment, { duration } from "moment";
import "moment/locale/ka";

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
    SortDescriptor,
    AvatarGroup,
    Avatar,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { SearchIcon } from "./SearchIcon";
import { capitalize } from "./utils";
import { Prisma } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";

const statusColorMap: Record<string, ChipProps["color"]> = {
    PENDING: "warning",
    ACCEPTED: "success",
    REJECTED: "danger",
    CANCELED: "warning",
    COMPLETED: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
    "from",
    "to",
    "startDate",
    "startTime",
    "duration",
    "distance",
    "price",
    "seats",
    "status",
    "passangers",
];

type Ride = Prisma.RideGetPayload<{
    select: {
        id: true;
        from: true;
        to: true;
        startDate: true;
        startTime: true;
        duration: true;
        distance: true;
        price: true;
        seats: true;
        status: true;
        trip: {
            include: {
                passangers: true;
            };
        };
    };
}>;

export default function RidesTable({ rides }: { rides: Ride[] }) {
    const t = useTranslations("RidesTable");
    const columns = [
        { name: t("id"), uid: "id", sortable: true },
        { name: t("from"), uid: "from", sortable: true },
        { name: t("to"), uid: "to", sortable: true },
        { name: t("startDate"), uid: "startDate", sortable: true },
        { name: t("startTime"), uid: "startTime", sortable: true },
        { name: t("duration"), uid: "duration", sortable: true },
        { name: t("distance"), uid: "distance", sortable: true },
        { name: t("price"), uid: "price", sortable: true },
        { name: t("seats"), uid: "seats", sortable: true },
        { name: t("status"), uid: "status", sortable: true },
        { name: t("passangers"), uid: "passangers", sortable: true },
        { name: t("actions"), uid: "actions", sortable: false },
    ];

    const statusOptions = [
        { name: t("pending"), uid: "PENDING" },
        { name: t("accepted"), uid: "ACCEPTED" },
        { name: t("rejected"), uid: "REJECTED" },
        { name: t("canceled"), uid: "CANCELED" },
        { name: t("completed"), uid: "COMPLETED" },
    ];
    const locale = useLocale();
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
        new Set([])
    );
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "startDate",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredRides = [...rides];

        if (hasSearchFilter) {
            filteredRides = filteredRides.filter(
                (ride) =>
                    ride.from
                        .toLowerCase()
                        .includes(filterValue.toLowerCase()) ||
                    ride.to.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (
            statusFilter !== "all" &&
            Array.from(statusFilter).length !== statusOptions.length
        ) {
            filteredRides = filteredRides.filter((ride) =>
                Array.from(statusFilter).includes(ride.status)
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
        return [...items].sort((a: Ride, b: Ride) => {
            const first = a[sortDescriptor.column as keyof Ride] as number;
            const second = b[sortDescriptor.column as keyof Ride] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((ride: Ride, columnKey: React.Key) => {
        const cellValue = ride[columnKey as keyof Ride];

        switch (columnKey) {
            case "duration":
                return t("durationInHours", {
                    hours: secondsToHours(ride.duration),
                });
            case "distance":
                return t("distanceInKm", {
                    distance: meterToKm(ride.distance),
                });
            case "passangers":
                return (
                    <AvatarGroup isBordered>
                        {ride.trip?.passangers.map((p) => (
                            <Avatar key={p.id} src={p.image!} />
                        ))}
                    </AvatarGroup>
                );
            case "price":
                return t("priceIn", {
                    price: ride.price.toFixed(2),
                });
            case "startDate":
                return moment(ride.startDate)
                    .locale(locale)
                    .format("dddd, MMMM Do YYYY");
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[ride.status]}
                        size="sm"
                        variant="flat"
                    >
                        {t(cellValue?.toString().toLowerCase() as any)}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>{t("view")}</DropdownItem>
                                <DropdownItem>{t("edit")}</DropdownItem>
                                <DropdownItem>{t("delete")}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue?.toString() || "Nothing";
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

    const onRowsPerPageChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder={t("searchByFromOrTo")}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    {t("statusButton")}
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
                                    <DropdownItem
                                        key={status.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={
                                        <ChevronDownIcon className="text-small" />
                                    }
                                    variant="flat"
                                >
                                    {t("columns")}
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
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusIcon />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        {t("totalRides", {
                            length: rides.length,
                        })}
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        {t("rowsPerPage")}
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
                        ? t("allItemsSelected")
                        : t("sizeOfSizeSelected", {
                              size1: selectedKeys.size,
                              size2: filteredItems.length,
                          })}
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
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        {t("previous")}
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        {t("next")}
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            className="fira-go"
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={t("noFound")} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
