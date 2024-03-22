import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open
        opens="cabin-form"
        renderButton={(openFunction) => <Button onClick={openFunction}>Add new Cabin</Button>}
      />

      <Modal.Window
        name="cabin-form"
        renderElement={(close) => <CreateCabinForm onCloseModal={close} />}
      />

      <Modal.Open
        opens="table"
        renderButton={(openFunction) => <Button onClick={openFunction}>Show table</Button>}
      />

      <Modal.Window name="table" renderElement={() => <CabinTable />} />
    </Modal>
  );
}

export default AddCabin;
