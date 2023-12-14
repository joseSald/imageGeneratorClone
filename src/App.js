import { useState } from 'react';
import Modal from './components/Modal';
const App = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);
  const surpriseOptions = [
    'A blue ostrich eating melon',
    'A matisse style shark on the telephone',
    'A pineapple sunbathing on an island',
  ];

  const surpriseMe = () => {
    setImages(null);
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];

    setValue(randomValue);
  };

  const getImages = async () => {
    setImages(null);
    if (value === null) {
      setError('Prompt cant be empty!');
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          prompt: value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      };
      const response = await fetch('http://localhost:8000/images', options);
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setSelectedImage(e.target.files[0]);
    try {
      const options = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        'http://localhost:8000/imageAsPrompt',
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <section className="search-section">
        <p>
          Start with a detailed description
          <span className="surprise" onClick={surpriseMe}>
            Surprise me
          </span>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="An impressionist oilpainting of a sunflower in a purple vase..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getImages}>Generate</button>
        </div>

        <p className="extra-info">
          Or,
          <span>
            <label htmlFor="files"> upload an image </label>
            <input
              onChange={uploadImage}
              id="files"
              accept="image/*"
              type="file"
              hidden
            />
          </span>
          to generate variations
        </p>
        {error && <p>{error}</p>}
        {modalOpen && (
          <div className="overlay">
            <Modal
              setModalOpen={setModalOpen}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
            />
          </div>
        )}
      </section>
      <section className="image-section">
        {images?.map((image, _index) => (
          <img
            key={_index}
            src={image.url}
            alt={`generated image of ${value}`}
          />
        ))}
      </section>
    </div>
  );
};

export default App;
