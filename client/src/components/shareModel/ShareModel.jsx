import React from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import PostShare from "../postShare/PostShare";

function ShareModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="button r-btn" onClick={handleShow}>
        Share
      </button>
      <Modal
        dialogClassName="modal-dialog modal-xl "
        size="xxl"
        aria-labelledby="contained-modal-title-vcenter "
        centered
        show={show}
        onHide={handleClose}
      >
            <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "30vh", overflowY: "auto" }}>
          <PostShare />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShareModal;






