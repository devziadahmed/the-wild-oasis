import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, descreption } = cabin;

  async function handleDuplicate() {
    createCabin({
      name: `${name} - copy`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      descreption,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <button disabled={isCreating} onClick={() => handleDuplicate()}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open
            opens="edit"
            renderButton={(openFunction) => (
              <button onClick={openFunction}>
                <HiPencil />
              </button>
            )}
          />

          <Modal.Window
            name="edit"
            renderElement={(close) => (
              <CreateCabinForm cabinToEdit={cabin} onCloseModal={close} />
            )}
          />

          <Modal.Open
            opens="delete"
            renderButton={(openFunction) => (
              <button onClick={openFunction}>
                {isDeleting ? "Deleting..." : <HiTrash />}
              </button>
            )}
          />

          <Modal.Window
            name="delete"
            renderElement={(close) => (
              <ConfirmDelete
                resourceName="cabin"
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
                onCloseModal={close}
              />
            )}
          />
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
