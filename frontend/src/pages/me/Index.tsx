import MeLayout from "../../components/Layout/MeLayout";
import SearchBar from "../../components/SearchBar";

function Index() {

  return (
    <MeLayout isLoading={false} title="IlMotoDiario">
      <SearchBar classes="hidden sm:block sm:mb-12" />
    </MeLayout>
  );
}

export default Index;
