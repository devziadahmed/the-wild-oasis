import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((show) => !show)}>Add new cabin</Button>

      <Modal onClose={() => setIsOpenModal(false)} isOpen={isOpenModal ? "true" : "false"}>
        <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
      </Modal>
    </div>
  );
}

export default AddCabin;
