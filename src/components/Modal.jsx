// import React from 'react'
// import { createPortal } from 'react-dom'
// import { AiOutlineClose } from 'react-icons/ai'

// const Modal = ({onClose,isOpen,children} ) => {
//   return createPortal(
//     <>
//     {isOpen && (
//         <div onClick={onClose} className='grid  absolute top-0 z-40 backdrop-blur h-screen w-screen' >
//         <div className='m-auto z-50 relative min-h-[200px] min-w-[80%] bg-orange-300 p-4'>
//             <div className='flex justify-end' >
//                 <AiOutlineClose onClick={onClose} className='text-2xl text-red-400 cursor-pointer ' />
//             </div>
//             {children}
//         </div>
        
//         </div>
//       )}
//     </>
//   , document.getElementById('modal-root'))
// }

// export default Modal
import React from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ onClose, isOpen, children }) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className='grid absolute top-0 z-40 backdrop-blur h-screen w-screen'
        >
          <div
            onClick={stopPropagation}
            className='m-auto z-50 relative min-h-[200px] min-w-[80%] bg-orange-300 p-4'
          >
            <div className='flex justify-end'>
              <AiOutlineClose
                onClick={onClose}
                className='text-2xl text-red-400 cursor-pointer'
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal-root')
  );
};

export default Modal;
