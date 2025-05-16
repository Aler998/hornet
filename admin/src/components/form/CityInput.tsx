import { Autocomplete, LinearProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateTripDto, Place, Trip } from "../../features/trips/types";
import axios from "axios";

const BASE_URL =
  "https://nominatim.openstreetmap.org/search?format=json&countrycodes=IT&addressdetails=0&dedupe=0";

type CityInputProps = {
  form: CreateTripDto;
  setForm: React.Dispatch<React.SetStateAction<CreateTripDto>>;
  isEdit: boolean;
  existingTrip: Trip | undefined;
};

const CityInput: React.FC<CityInputProps> = ({
  form,
  setForm,
  isEdit,
  existingTrip,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      isEdit &&
      existingTrip &&
      existingTrip.places &&
      existingTrip.places.length > 0
    ) {
      setSelectedOptions(existingTrip.places);
    }
    
  }, [isEdit, existingTrip]);

  useEffect(() => {
    if (inputValue.trim() === "") return;

    const timeoutId = setTimeout(() => {
      setLoading(true);

      axios
        .get(`${BASE_URL}&q=${encodeURIComponent(inputValue)}`)
        .then((res) => {
          const newOptions = res.data.map((item: Place) => item);
          setOptions(newOptions);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 1000); // 1 secondo di debounce

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const onInputSelected = (value: Place[]) => {
    setSelectedOptions(value);
    setInputValue("");
    setForm({ ...form, places: value });
  };

  return (
    <Autocomplete<Place, true, false, false>
      multiple
      options={options}
      getOptionLabel={(option) => option.display_name}
      filterSelectedOptions
      onChange={(_event, value) => onInputSelected(value)}
      value={selectedOptions}
      loading={loading}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cerca indirizzi"
          placeholder="Scrivi un indirizzo"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <LinearProgress /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CityInput;
