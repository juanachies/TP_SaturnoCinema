import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./confirmModal.css";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      className="confirm-modal"
    >
      <div className="fade-in">
        <Modal.Header closeButton className="confirm-modal-header">
          <Modal.Title> Confirmar acción</Modal.Title>
        </Modal.Header>

        <Modal.Body className="confirm-modal-body">
          <p>¿Estás seguro de que querés eliminar este elemento?</p>
        </Modal.Body>

        <Modal.Footer className="confirm-modal-footer">
          <Button variant="secondary" className="btn-cancel" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" className="btn-confirm" onClick={onConfirm}>
            Eliminar
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ConfirmModal;