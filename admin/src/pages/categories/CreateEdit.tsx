import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from '../../features/categories/categoriesApi';
import { CreateCategoryDto } from '../../features/categories/types';
import slugify from 'slugify'
import { DashboardContent } from '../../theme/layouts/dashboard';
import Swal from 'sweetalert2';
import { APIError } from '../../utils/interfaces/ApiError';

export default function CreateEdit() {
  const { slug } = useParams<{ slug: string }>();
  const isEdit = slug ? true : false;
  const { data: existingCategory, isError, error } = useGetCategoryQuery(slug!, { skip: !isEdit });
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateCategoryDto>({
    title: '',
    slug: '',
  });

  useEffect(() => {
    if (existingCategory) {
      setForm({
        title: existingCategory.title,
        slug: existingCategory.slug,
      });
    }
  }, [existingCategory]);

  useEffect(() => {
    if (isError && error && "status" in error && error.status === 404) {
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/404`);
    }
  }, [isError, error, navigate]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ title: e.target.value, slug: slugify(e.target.value).toLowerCase() })
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, slug: slugify(e.target.value).toLowerCase() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && existingCategory) {
        await updateCategory({ title: form.title, newSlug: form.slug, slug: existingCategory.slug }).unwrap();
        Swal.fire({
          icon: "success",
          title: "Categoria Modificata",
          text: `La categoria ${existingCategory.title} è stata modificata`
        });
      } else {
        await createCategory(form).unwrap();
        Swal.fire({
          icon: "success",
          title: "Nuova Categoria",
          text: "Nuova categoria creata"
        });
      }
      navigate(`/${import.meta.env.VITE_SUBFOLDER}/categories`);
    } catch (error: APIError | any) {
      if (error.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.data.message
        });
      }
    }
  };

  return (
    <>
      <title>{`Categorie`}</title>

      <DashboardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h6">Nuova Categoria</Typography>
          <Button
            color="inherit" onClick={() => navigate(`/${import.meta.env.VITE_SUBFOLDER}/categories`)} variant="text">Indietro</Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField id="title" name="title" label="Nome" variant="outlined" value={form.title}
                onChange={handleTitleChange}
                required fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <TextField id="slug" name='slug' label="Slug" variant="outlined" value={form.slug}
                onChange={handleSlugChange}
                required fullWidth />
            </Grid>
            <Grid>
              <Button
                color="inherit" variant='contained' type='submit'>{isEdit ? 'Salva Modifiche' : 'Crea Categoria'}</Button>
            </Grid>

          </Grid>
        </form>
      </DashboardContent>
    </>
  );
}
