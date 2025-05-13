import { LinearProgress } from "@mui/material";

function Loader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LinearProgress color="inherit" />
    </div>
  );
}

export default Loader;
