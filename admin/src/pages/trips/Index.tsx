import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import { DashboardContent } from "../../theme/layouts/dashboard";
import { Iconify } from "../../theme/components/iconify";
import { Scrollbar } from "react-scrollbars-custom";
import { useState } from "react";
import {
  applyFilter,
  emptyRows,
  getComparator,
} from "../../theme/components/table/utils";
import { TableNoData } from "../../theme/components/table/table-no-data";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTable } from "../../components/useTable";
import { DefaultTableHead } from "../../components/table/DefaultTableHead";
import { DefaultTableToolbar } from "../../components/table/DefaultTableToolbar";
import {
  useDeleteTripMutation,
  useGetTripsQuery,
} from "../../features/trips/tripsApi";
import { Trip } from "../../features/trips/types";
import { DefaultTableRow } from "../../components/table/DefaultTableRow";
import { TableEmptyRows } from "../../theme/components/table/table-empty-rows";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Label } from "../../theme/components/label";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import Loader from "../../components/Loader";
import { deleteSwalOptions } from "../../utils/swal-options";
import { formatMinutes } from "../../utils/format-date";

dayjs.extend(duration);

export default function Index() {
  const { data: trips, isLoading, error } = useGetTripsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [deleteTrip] = useDeleteTripMutation();
  const navigate = useNavigate();

  const confirmDelete = (_slug: string) => {
    Swal.fire(deleteSwalOptions).then((result) => {
      if (result.isConfirmed) {
        deleteTrip(_slug);
      }
    });
  };

  const table = useTable();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: Trip[] | undefined = applyFilter({
    inputData: trips,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;

  if (isLoading) return <Loader />;

  return (
    <>
      <title>{`Viaggi`}</title>

      <DashboardContent>
        {error ? (
          <p>Errore nel caricamento dei viaggi</p>
        ) : (
          <>
            <Box
              sx={{
                mb: 5,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                Viaggi
              </Typography>
              <Button
                onClick={() =>
                  navigate(`/${import.meta.env.VITE_SUBFOLDER}/trips/create`)
                }
                variant="contained"
                color="inherit"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Nuovo Viaggio
              </Button>
            </Box>

            <Card>
              <DefaultTableToolbar
                numSelected={table.selected.length}
                filterName={filterName}
                onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterName(event.target.value);
                  table.onResetPage();
                }}
              />

              <Scrollbar
                style={{ width: "100%", minHeight: "100%", height: 420 }}
              >
                <TableContainer sx={{ overflow: "unset" }}>
                  <Table sx={{ minWidth: 800 }}>
                    <DefaultTableHead
                      order={table.order}
                      orderBy={table.orderBy}
                      rowCount={trips ? trips.length : 0}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          trips ? trips.map((trip) => trip.slug) : []
                        )
                      }
                      headLabel={[
                        { id: "title", label: "Title" },
                        { id: "description", label: "Descrizione" },
                        { id: "start", label: "Partenza" },
                        { id: "end", label: "Arrivo" },
                        { id: "time", label: "Tempo di percorrenza" },
                        { id: "category", label: "Categoria" },
                        { id: "" },
                      ]}
                    />
                    <TableBody>
                      {dataFiltered
                        ?.slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <DefaultTableRow
                            key={row._id}
                            selected={table.selected.includes(row.slug)}
                            onSelectRow={() => table.onSelectRow(row.slug)}
                            onShow={() =>
                              navigate(
                                `/${import.meta.env.VITE_SUBFOLDER}/trips/${row.slug}/show`
                              )
                            }
                            onEdit={() =>
                              navigate(
                                `/${import.meta.env.VITE_SUBFOLDER}/trips/${row.slug}/edit`
                              )
                            }
                            onDelete={() => confirmDelete(row.slug)}
                          >
                            <>
                              <TableCell
                                key={row.slug}
                                component="th"
                                scope="row"
                              >
                                <Box
                                  sx={{
                                    gap: 2,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {row.title}
                                </Box>
                              </TableCell>

                              <TableCell>{row.slug}</TableCell>
                              <TableCell>
                                {row.start
                                  ? dayjs(row.start).format("YYYY-MM-DD HH:mm")
                                  : ""}
                              </TableCell>
                              <TableCell>
                                {row.end
                                  ? dayjs(row.end).format("YYYY-MM-DD HH:mm")
                                  : ""}
                              </TableCell>
                              <TableCell>
                                <Label color={"success"}>
                                  {formatMinutes(parseInt(row.time))}
                                </Label>
                              </TableCell>
                              <TableCell>
                                <Label>
                                  {
                                    categories?.find(
                                      (c) => c._id === row.category
                                    )?.title
                                  }
                                </Label>
                              </TableCell>
                            </>
                          </DefaultTableRow>
                        ))}

                      <TableEmptyRows
                        height={68}
                        emptyRows={emptyRows(
                          table.page,
                          table.rowsPerPage,
                          trips ? trips.length : 0
                        )}
                      />

                      {notFound && <TableNoData searchQuery={filterName} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                component="div"
                page={table.page}
                count={trips ? trips.length : 0}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            </Card>
          </>
        )}
      </DashboardContent>
    </>
  );
}

// ----------------------------------------------------------------------
