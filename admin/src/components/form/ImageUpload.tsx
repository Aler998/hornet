import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { VisuallyHiddenInput } from "../../utils/visually-hidden-input";
import { ChangeEvent, useState } from "react";
import { CreateTripDto, Trip } from "../../features/trips/types";
import { uuidv4 } from "minimal-shared/utils";
import Swal from "sweetalert2";
import { deleteSwalOptions } from "../../utils/swal-options";
import { useDeleteTripImageMutation } from "../../features/trips/tripsApi";

interface ImagePreview {
  url: string;
  uuid: string;
}

type ImageUploadProps = {
  form: CreateTripDto;
  setForm: React.Dispatch<React.SetStateAction<CreateTripDto>>;
  isEdit: boolean;
  existingTrip: Trip | undefined;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  form,
  setForm,
  isEdit,
  existingTrip,
}) => {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const [deleteTripImage] = useDeleteTripImageMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    previews.forEach((imagePreview) => URL.revokeObjectURL(imagePreview.url));

    // const filesArray = Array.from(e.target.files);
    const filesArray = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setForm({ ...form, images: filesArray });
    setPreviews(
      filesArray.map((file) => ({
        uuid: uuidv4(),
        url: URL.createObjectURL(file),
      })),
    );
  };

  const unsetImage = (index: number) => {
    if (form.images) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm({ ...form, images: newImages });
    }

    URL.revokeObjectURL(previews[index].url);

    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
  };

  function confirmImageDelete(_slug: string, _image: string): void {
    Swal.fire(deleteSwalOptions).then((result) => {
      if (result.isConfirmed) {
        deleteTripImage({ slug: _slug, image: _image });
      }
    });
  }

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const cols = isXs ? 2 : isSm ? 3 : isMd ? 4 : 5;

  return (
    <Stack spacing={2}>
      <Typography>Immagini</Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        color="inherit"
      >
        Upload images
        <VisuallyHiddenInput
          type="file"
          onChange={handleImageChange}
          multiple
        />
      </Button>
      {previews.length > 0 ? (
        <>
          <Typography>Preview</Typography>
          <ImageList cols={cols} rowHeight={164}>
            {previews.map((imagePreview, i) => (
              <ImageListItem key={imagePreview.uuid} sx={{ width: "100%" }}>
                <img
                  srcSet={imagePreview.url}
                  src={imagePreview.url}
                  width={164}
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`Rimuovi`}
                      onClick={() => unsetImage(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        ""
      )}
      {isEdit &&
      existingTrip &&
      existingTrip.images &&
      existingTrip.images?.length > 0 ? (
        <>
          <Typography>Immagini</Typography>
          <ImageList cols={cols} rowHeight={164}>
            {existingTrip.images.map((images) => (
              <ImageListItem key={images.uuid} sx={{ width: "100%" }}>
                <img
                  srcSet={`${import.meta.env.VITE_ASSETS_URL}${images.path}`}
                  src={`${import.meta.env.VITE_ASSETS_URL}${images.path}`}
                  width={164}
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`Rimuovi`}
                      onClick={() =>
                        confirmImageDelete(existingTrip.slug, images.uuid)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default ImageUpload;
