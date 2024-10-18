import styled from "styled-components";

import CreateCampusForm from "./CreateCampusForm";
import { useDeleteCampus } from "./useDeleteCampus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { useCreateCampus } from "./useCreateCampus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/TableWithSortHead";
import Menus from "../../ui/Menus";

const Campus = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Name = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Description = styled.div`
  font-family: "Sono";
  font-weight: 550;
`;

function CampusRow({ campus }) {
  const { isDeleting, deleteCampus } = useDeleteCampus();
  const { isCreating, createCampus } = useCreateCampus();

  const { id: campusId, name, description } = campus;

  return (
    <Table.Row>
      <Campus>{campusId}</Campus>
      <Name> {name}</Name>
      <Description>{description}</Description>

      <div>
        <Modal>
          <Menus.Menu>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}></Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}></Menus.Button>
            </Modal.Open>

            <Modal.Window name="edit">
              <CreateCampusForm campusToEdit={campus} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="campuss"
                disabled={isDeleting}
                onConfirm={() => deleteCampus(campusId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CampusRow;
