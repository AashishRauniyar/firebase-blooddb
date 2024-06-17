import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

import BloodCards from "./components/BloodCards";

import AddAndUpdateBlood from "./components/AddAndUpdateBlood";

const App = () => {
  const [bloods, setBloods] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    const getBloods = async () => {
      try {
        const bloodsRef = collection(db, "blood");
        const bloodsSnapshot = await getDocs(bloodsRef);
        const bloodList = bloodsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setBloods(bloodList);
      } catch (error) {
        console.log(error);
      }
    };

    getBloods();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex">
          <div className="relative flex items-center flex-grow">
            <FiSearch className="text-red text-3xl absolute ml-1" />
            <input
              type="text"
              className="flex-grow bg-transparent border border-red rounded-md h-10 pl-9"
            />
          </div>

          <FiPlusCircle onClick={onOpen} className="text-red text-5xl gap-2 cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {bloods.map((blood) => (
            <BloodCards key={blood.id} blood={blood} />
          ))}
        </div>
      </div>
     <AddAndUpdateBlood  isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default App;
