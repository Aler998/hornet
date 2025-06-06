import { useNavigate } from "react-router-dom";
import MeLayout from "../../components/Layout/MeLayout";
import SearchBar from "../../components/SearchBar";
import { useGetMeQuery } from "../../features/auth/authApi";
import { useEffect } from "react";

function Index() {
  const { data: me, isLoading, isError } = useGetMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/500");
    }
  }, [isError, navigate]);
  return (
    <MeLayout isLoading={isLoading} me={me} title="IlMotoDiario">
      <SearchBar classes="hidden sm:block sm:mb-12" />
    </MeLayout>
  );
}

export default Index;
