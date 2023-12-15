import { useState, useRef } from 'react';

const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generateVariations }) => {
  const [error, setError] = useState(null);
  const ref = useRef(null)
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };
  const checkSize = () =>{
    if(ref.current.width == 256 && ref.current.height==256){
      generateVariations()

    }else {
      setError('Error: images cannot be bigger than 256px x 256px')
    }
  }
  return (
    <div className="modal">
      <div onClick={closeModal} style={{cursor:'pointer'}}>✖</div>
      {console.log(selectedImage)}
      <div className="img-container">
        {setSelectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="selectedimg" />}
      </div>
      <p>{error || "Image dimentions must be 256 x 256"}</p>
      {!error && <button onClick={checkSize}>Generate</button>}
      {error && <button onClick={closeModal}>Close this and try again</button>}
      
    </div>
  ); 
  
};

export default Modal;
