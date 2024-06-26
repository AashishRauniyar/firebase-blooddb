import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import BloodCards from "./components/BloodCards";

import AddAndUpdateBlood from "./components/AddAndUpdateBlood";
import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundBlood from "./components/NotFoundBlood";

const App = () => {
  const [bloods, setBloods] = useState([]);

  const {onClose, onOpen, isOpen} = useDisclouse(false);


  useEffect(() => {
    const getBloods = async () => {
      try {
        const bloodsRef = collection(db, "blood");
        

        onSnapshot(bloodsRef, (snapshot) => {
          const bloodList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
  
          setBloods(bloodList);
          return bloodList;
        })

        
      } catch (error) {
        console.log(error);
      }
    };

    getBloods();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    
    const bloodsRef = collection(db, "blood");
        

        onSnapshot(bloodsRef, (snapshot) => {
          const bloodList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
  
          const filteredBloods = bloodList.filter((blood) => {
            return blood.name.toLowerCase().includes(value.toLowerCase());
          }
          );

          setBloods(filteredBloods);

          

          return filteredBloods;
        })

    
  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex">
          <div className="relative flex items-center flex-grow">
            <FiSearch  className="text-red text-3xl absolute ml-1" />
            <input
              onChange={filterContacts}
              type="text"
              className="flex-grow bg-transparent border border-red rounded-md h-10 pl-9"
            />
          </div>

          <FiPlusCircle onClick={onOpen} className="text-red text-5xl gap-2 cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {bloods.length <=0 ? <NotFoundBlood/> : bloods.map((blood) => (
            <BloodCards key={blood.id} blood={blood} />
          ))}
        </div>
      </div>
     <AddAndUpdateBlood  isOpen={isOpen} onClose={onClose} />
     <ToastContainer 
     position="bottom-center"
     />
    </>
  );
};

export default App;
