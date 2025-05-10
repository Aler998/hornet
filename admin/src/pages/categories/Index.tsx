import { Box, Button, Card, Table, TableBody, TableCell, TableContainer, TablePagination, Typography } from '@mui/material';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '../../features/categories/categoriesApi';
import { DashboardContent } from '../../theme/layouts/dashboard';
import { Iconify } from '../../theme/components/iconify';
import { Scrollbar } from '../../theme/components/scrollbar';
import { TableEmptyRows } from '../../theme/components/table/table-empty-rows';
import { useState } from 'react';
import { applyFilter, emptyRows, getComparator } from '../../theme/components/table/utils';
import { TableNoData } from '../../theme/components/table/table-no-data';
import { Category } from '../../features/categories/types';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTable } from '../../components/useTable';
import { DefaultTableHead } from '../../components/table/DefaultTableHead';
import { DefaultTableToolbar } from '../../components/table/DefaultTableToolbar';
import { DefaultTableRow } from '../../components/table/DefaultTableRow';
import Loader from '../../components/Loader';

export default function Index() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const confirmDelete = (_slug: string) => {
    Swal.fire({
      title: "Sei sicuro?",
      text: "Non potrai tornare indietro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si conferma"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(_slug)
      }
    });
  }

  const table = useTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: Category[] | undefined = applyFilter({
    inputData: categories,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered?.length && !!filterName;

  if (isLoading) return <Loader />;

  return (

    <>
      <title>{`Categorie`}</title>

      <DashboardContent>
        {
          error ? <p>Errore nel caricamento delle categorie</p> : (
            <>
              <Box
                sx={{
                  mb: 5,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" sx={{ flexGrow: 1 }}>
                  Categorie
                </Typography>
                <Button
                  onClick={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}/categories/create`)}
                  variant="contained"
                  color="inherit"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  Nuova Categoria
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

                <Scrollbar>
                  <TableContainer sx={{ overflow: 'unset' }}>
                    <Table sx={{ minWidth: 800 }}>
                      <DefaultTableHead
                        order={table.order}
                        orderBy={table.orderBy}
                        rowCount={categories ? categories.length : 0}
                        numSelected={table.selected.length}
                        onSort={table.onSort}
                        onSelectAllRows={(checked) =>
                          table.onSelectAllRows(
                            checked,
                            categories ? categories.map((category) => category.slug) : []
                          )
                        }
                        headLabel={[
                          { id: 'title', label: 'Title' },
                          { id: 'slug', label: 'Slug' },
                          { id: '' },
                        ]}
                      />
                      <TableBody>
                        {dataFiltered?.slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                          .map((row) => (
                            <DefaultTableRow
                              key={row.slug}
                              selected={table.selected.includes(row.slug)}
                              onSelectRow={() => table.onSelectRow(row.slug)}
                              onEdit={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}/categories/${row.slug}`)}
                              onDelete={() => confirmDelete(row.slug)}
                            >
                              <>
                                <TableCell component="th" scope="row">
                                  <Box
                                    sx={{
                                      gap: 2,
                                      display: 'flex',
                                      alignItems: 'center',
                                    }}
                                  >
                                    {row.title}
                                  </Box>
                                </TableCell>

                                <TableCell>{row.slug}</TableCell></>
                            </DefaultTableRow>
                          ))}

                        <TableEmptyRows
                          height={68}
                          emptyRows={emptyRows(table.page, table.rowsPerPage, categories ? categories.length : 0)}
                        />

                        {notFound && <TableNoData searchQuery={filterName} />}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Scrollbar>

                <TablePagination
                  component="div"
                  page={table.page}
                  count={categories ? categories.length : 0}
                  rowsPerPage={table.rowsPerPage}
                  onPageChange={table.onChangePage}
                  rowsPerPageOptions={[5, 10, 25]}
                  onRowsPerPageChange={table.onChangeRowsPerPage}
                />
              </Card>
            </>
          )
        }
      </DashboardContent>
      );
    </>
  );
}

// ----------------------------------------------------------------------
