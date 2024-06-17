import React from "react";
import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
const AddAndUpdateBlood = ({ isOpen, onClose }) => {


    const addBlood = async (blood) => {
        try {
            const bloodRef = await addDoc(collection(db, "blood"), blood);
            console.log("Blood added with ID: ", bloodRef.id);
        } catch (e) {
            console.error("Error adding blood: ", e);
        }
    }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        initialValues={{
            name: "",
            email: "",
            bloodType: "",
            location: "",
        }}
        onSubmit={(values) => {
            console.log(values);
            addBlood(values);
        } 
        }
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="name" id="name" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field className="h-8 pl-2 border rounded-md" type="email" name="email" id="email" /> 
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="bloodType">Blood Type</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="bloodType" id="bloodType" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="location">Location</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="location" id="location" />
            </div>

            <button type="submit" className="bg-red self-end text-white rounded-md border pl-5 pr-5 px-3 py-1.5 mt-2">Add</button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateBlood;
