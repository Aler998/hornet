import { Box, Button, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { VisuallyHiddenInput } from "../../utils/VisuallyHiddenInput";
import Swal from "sweetalert2";
import { deleteSwalOptions } from "../../utils/SwalOptions";
import { useDeleteTripTrackMutation } from "../../features/trips/tripsApi";
import { ChangeEvent, useState } from "react";
import { CreateTripDto, Trip } from "../../features/trips/types";
import { uuidv4 } from "minimal-shared/utils";
import { Label } from "../../theme/components/label";

interface TrackPreview {
  uuid: string;
  filename: string;
}

type GPXUploadProps = {
  form: CreateTripDto;
  setForm: React.Dispatch<React.SetStateAction<CreateTripDto>>;
  isEdit: boolean;
  existingTrip: Trip | undefined;
};

const GPXUpload: React.FC<GPXUploadProps> = ({
  form,
  setForm,
  isEdit,
  existingTrip,
}) => {
  const [trackPreviews, setTrackPreviews] = useState<TrackPreview[]>([]);

  const [deleteTripTrack] = useDeleteTripTrackMutation();

  function confirmTrackDelete(_slug: string, _track: string): void {
    Swal.fire(deleteSwalOptions).then((result) => {
      if (result.isConfirmed) {
        deleteTripTrack({ slug: _slug, track: _track });
      }
    });
  }

  const unsetTrack = (index: number) => {
    if (form.tracks) {
      const newTracks = form.tracks.filter((_, i) => i !== index);
      setForm({ ...form, tracks: newTracks });
    }

    const newPreviews = trackPreviews.filter((_, i) => i !== index);
    setTrackPreviews(newPreviews);
  };

  const handleTracksChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    setForm({ ...form, tracks: filesArray });
    setTrackPreviews(
      filesArray.map((file: File) => ({ uuid: uuidv4(), filename: file.name }))
    );
  };

  return (
    <Stack spacing={2}>
      <Typography>Tracciati .gpx</Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        color="inherit"
      >
        Upload tracks
        <VisuallyHiddenInput
          type="file"
          onChange={handleTracksChange}
          multiple
          accept=".gpx"
        />
      </Button>
      {trackPreviews.length > 0 ? (
        <>
          <Typography>Previews</Typography>
          <Stack direction="row" spacing={2}>
            {trackPreviews.map((preview, i) => (
              <Box
                key={preview.uuid}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Label>{preview.filename}</Label>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => unsetTrack(i)}
                >
                  Rimuovi
                </Button>
              </Box>
            ))}
          </Stack>
        </>
      ) : (
        ""
      )}
      {isEdit && existingTrip && existingTrip.tracks.length > 0 ? (
        <>
          <Typography>Percorsi Caricati</Typography>
          <Stack direction="column" sx={{ flexWrap: "wrap" }} spacing={2}>
            {existingTrip.tracks.map((track) => (
              <Box key={track.uuid} display="flex" alignItems="center" gap={1}>
                <Label>{track.filename}</Label>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() =>
                    confirmTrackDelete(existingTrip.slug, track.uuid)
                  }
                >
                  Rimuovi
                </Button>
              </Box>
            ))}
          </Stack>
        </>
      ) : (
        ""
      )}
    </Stack>
  );
};

export default GPXUpload;
