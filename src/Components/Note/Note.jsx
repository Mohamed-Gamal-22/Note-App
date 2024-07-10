import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";

export default function Note({ note, deleteNote, getAllNotes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function submitEdit(values) {
    console.log(values);
    let { data } = await axios
      .put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });

    getAllNotes();
  }

  const formik = useFormik({
    initialValues: {
      title: note.title,
      content: note.content,
    },
    onSubmit: submitEdit,
  });

  return (
    <>
      <div className="col-md-3 text-dark">
        <div className="notes ">
          <div className="note bg-danger p-2 rounded-3">
            <p>title : {note.title}</p>
            <p className="mb-1">content : {note.content}</p>
            <i
              onClick={() => deleteNote(note._id)}
              className="fa-solid fa-trash cursor-pointer"
            ></i>
            <i
              onClick={handleShow}
              className=" ms-3 fa-solid fa-pen-to-square cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
      {/* --------------------------------- */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control my-2"
              placeholder="title"
              name="title"
              defaultValue={note.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <input
              type="text"
              className="form-control my-2"
              placeholder="content"
              name="content"
              defaultValue={note.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              formik.handleSubmit();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
