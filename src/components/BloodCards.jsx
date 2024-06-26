import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateBlood from "./AddAndUpdateBlood";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const BloodCards = ({ blood }) => {
  const { onClose, onOpen, isOpen } = useDisclouse(false);

  const deleteBlood = async (id) => {
    try {
      await deleteDoc(doc(db, "blood", id));
      toast.success("Blood deleted successfully")
      console.log("Blood deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting blood: ", e);
    }
  };

  return (
    <>
      <div
        key={blood.id}
        className="bg-slate-200 flex justify-between items-center rounded-lg p-3"
      >
        <div className="flex gap-7">
          <HiOutlineUserCircle className="text-red text-2xl gap-2 cursor-pointer " />
          <div className="">
            <h2 className="">{blood.name}</h2>
            <p className="text-sm font-medium">{blood.email}</p>
            <p className="text-sm font-medium">{blood.bloodType}</p>
            <p className="text-sm font-medium">{blood.location}</p>
          </div>
        </div>
        <div className="flex gap-1 ">
          <RiEditCircleLine
            onClick={onOpen}
            className="text-xl cursor-pointer"
          />
          <IoMdTrash
            onClick={() => deleteBlood(blood.id)}
            className="text-2xl text-orange-400 cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateBlood blood={blood} isUpdate isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default BloodCards;
