import Button from "../../ui/Button";
import CreateCampusForm from "./CreateCampusForm";
import Modal from "../../ui/Modal";

function AddCampus() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="campus-form">
          <Button>新增校区</Button>
        </Modal.Open>
        <Modal.Window name="campus-form">
          <CreateCampusForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCampus;
