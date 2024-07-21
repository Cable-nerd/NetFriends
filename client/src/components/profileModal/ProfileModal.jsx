import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UilPen } from "@iconscout/react-unicons";
import { UploadImage } from "../../actions/UploadAction";
import { UpdateUser } from "../../actions/UserAction";

function ProfileModal({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { password, ...other } = data;
  const dispatch = useDispatch();
  const params = useParams();

  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      if (e.target.name === "profileImage") {
        setProfileImage(img);
        console.log("Profile image set:", img);
      } else if (e.target.name === "coverImage") {
        setCoverImage(img);
        console.log("Cover image set:", img);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = { ...formData };

    if (profileImage) {
      const profileData = new FormData();
      const fileName = Date.now() + profileImage.name;
      profileData.append("name", fileName);
      profileData.append("file", profileImage);
      UserData.profilePicture = fileName;

      console.log("Profile Image FormData:", Object.fromEntries(profileData.entries()));

      try {
        await dispatch(UploadImage(profileData));
      } catch (err) {
        console.log("Profile image upload error:", err);
      }
    }

    if (coverImage) {
      const coverData = new FormData();
      const coverFileName = Date.now() + coverImage.name;
      coverData.append("name", coverFileName);
      coverData.append("file", coverImage);
      UserData.coverPicture = coverFileName;

      console.log("Cover Image FormData:", Object.fromEntries(coverData.entries()));

      try {
        await dispatch(UploadImage(coverData));
      } catch (err) {
        console.log("Cover image upload error:", err);
      }
    }

    try {
      await dispatch(UpdateUser(params.id, UserData));
    } catch (err) {
      console.log("User update error:", err);
    }

    handleClose();
  };

  return (
    <>
      <UilPen width="2rem" height="1.2rem" variant="primary" onClick={handleShow} />
      <Modal
        dialogClassName="modal-dialog modal-xl modal"
        size="xxl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "70vh", overflowY: "auto" }}
          className="modal-body"
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                className="border-0 bg-input p-3"
                name="firstname"
                onChange={handleChange}
                value={formData.firstname}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                className="border-0 bg-input p-3"
                name="lastname"
                onChange={handleChange}
                value={formData.lastname}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Works at</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your workplace"
                className="border-0 bg-input p-3"
                name="worksAt"
                onChange={handleChange}
                value={formData.worksAt}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Lives In</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your location"
                className="border-0 bg-input p-3"
                name="livesin"
                onChange={handleChange}
                value={formData.livesin}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                className="border-0 bg-input p-3"
                name="country"
                onChange={handleChange}
                value={formData.country}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Relationship Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your relationship status"
                className="border-0 bg-input p-3"
                name="relationship"
                onChange={handleChange}
                value={formData.relationship}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>About</Form.Label>
              <Form.Control
                className="border-0 bg-input p-3"
                as="textarea"
                placeholder="Tell us about yourself"
                rows={3}
                name="about"
                onChange={handleChange}
                value={formData.about}
                style={{
                  backgroundColor: "var(--inputColor)",
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                onChange={onImageChange}
                style={{
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                name="coverImage"
                onChange={onImageChange}
                style={{
                  outline: "none",
                  boxShadow: "none",
                  padding: "10px 15px",
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <button className="button info-btn" onClick={handleSubmit}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModal;










