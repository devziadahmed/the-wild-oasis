import { useSearchParams } from "react-router-dom";

import filterCabins from "./filterCabins";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { cabins = [], isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins = filterCabins(cabins, filterValue);

  let content = null;

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  if (error) content = <p>Error</p>;
  else if (isLoading) content = <Spinner />;
  else {
    content = (
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          />
        </Table>
      </Menus>
    );
  }

  return content;
}

export default CabinTable;
