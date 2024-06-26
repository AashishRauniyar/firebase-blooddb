import React from "react";
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";


const BloodSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bloodType: Yup.string().required("Blood type is required"),
    location: Yup.string().required("Location is required"),
})

const AddAndUpdateBlood = ({ isOpen, onClose, isUpdate, blood }) => {


    const addBlood = async (blood) => {
        try {
            const bloodRef = await addDoc(collection(db, "blood"), blood);
            onClose();
            toast.success("Blood added successfully")
            console.log("Blood added with ID: ", bloodRef.id);
        } catch (e) {
            console.error("Error adding blood: ", e);
        }
    }


    const updateBlood = async (blood, id) => {
        try {
            const bloodRef = await updateDoc(doc(db, "blood", id), blood);
            onClose();
            toast.success("Blood updated successfully")
            console.log("Blood added with ID: ", bloodRef.id);
        } catch (e) {
            console.error("Error adding blood: ", e);
        }
    }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={BloodSchemaValidation}
        initialValues={isUpdate? {
            name: blood.name,
            email: blood.email,
            bloodType: blood.bloodType,
            location: blood.location,
        } : {
            name: "",
            email: "",
            bloodType: "",
            location: "",
        }}
        onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateBlood(values, blood.id) :
            addBlood(values);
        } 
        }
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="name" id="name" />
                <div className="text-red text-xs">
                  <ErrorMessage name="name" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field className="h-8 pl-2 border rounded-md" type="email" name="email" id="email" /> 
                <div className="text-red text-xs">
                  <ErrorMessage name="email" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="bloodType">Blood Type</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="bloodType" id="bloodType" />
                <div className="text-red text-xs">
                  <ErrorMessage name="bloodType" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="location">Location</label>
                <Field className="h-8 pl-2 border rounded-md" type="text" name="location" id="location" />
                <div className="text-red text-xs">
                  <ErrorMessage name="location" />
                </div>
            </div>

            <button type="submit" className="bg-red self-end text-white rounded-md border pl-5 pr-5 px-3 py-1.5 mt-2">{isUpdate ? "update" : "add"}</button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateBlood;
