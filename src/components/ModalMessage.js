import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalMessage = ({ show, handleClose }) => {
  return (
    <div>
      {" "}
      <Modal show={show.status} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{show.message}</Modal.Body>
        <Modal.Footer>
          <Button
            className="bluButton"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalMessage;
