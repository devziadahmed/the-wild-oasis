import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import CabinTable from "./CabinTable";

function AddCabin() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <CabinTable />

      <Button onClick={() => setShowForm((show) => !show)}>Add new cabin</Button>

      <div className={showForm ? "visible" : "hidden"}>
        <CreateCabinForm />
      </div>
    </div>
  );
}

export default AddCabin;
