import * as React from "react"
import { format, formatDistanceToNow } from "date-fns"
import { useRouter } from "next/router"
import { Box, Text, Badge, Td } from "@chakra-ui/react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from "@chakra-ui/react"

import { useCourses } from "@/api/hooks"
import type { SerializedCourse } from "@/api/types"

const columnHelper = createColumnHelper<SerializedCourse>()

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("slug", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => <Badge>{info.getValue()}</Badge>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => format(new Date(info.getValue()), "yyyy-MM-dd HH:mm"),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("updatedAt", {
    header: "Updated At",
    cell: (info) => formatDistanceToNow(new Date(info.getValue()), { addSuffix: true }),
    footer: (info) => info.column.id,
  }),
]

type AdminCourseListProps = {
  onSelect?: (courseId: string) => void
}

const AdminCourseList: React.FC<AdminCourseListProps> = ({ onSelect }) => {
  const { data = [] } = useCourses()
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  })

  const handleSelect = React.useCallback(
    (courseId: string) => () => {
      if (onSelect) {
        onSelect(courseId)
        return
      }
      router.push(`/panel/courses/${courseId}`)
    },
    [onSelect, router.push]
  )

  let component = <Box>Loading...</Box>

  if (data.length) {
    component = (
      <Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id} cursor="pointer" _hover={{ bg: "gray.50" }} onClick={handleSelect(row.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  return component
}

export default React.memo(AdminCourseList)
