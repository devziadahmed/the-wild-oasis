import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          renderButton={(openFunction) => (
            <Button onClick={openFunction}>Add new Cabin</Button>
          )}
        />

        <Modal.Window
          name="cabin-form"
          renderElement={(close) => <CreateCabinForm onCloseModal={close} />}
        />
      </Modal>
    </div>
  );
}

export default AddCabin;
