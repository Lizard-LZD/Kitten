import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getKittens,
  addKitten,
  updateKitten,
  deleteKitten,
} from "../Redux/Reducers/KittenSlice";
import {
  getAdoptions,
  createAdoption,
  removeAdoption,
} from "../Redux/Reducers/AdoptionSlice";

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const KittenPage = ({
  kittens,
  adoptions,
  loading,
  getKittens,
  addKitten,
  updateKitten,
  deleteKitten,
  getAdoptions,
  createAdoption,
  removeAdoption,
}) => {
  useEffect(() => {
    getKittens();
    getAdoptions();
  }, [kittens,adoptions]);

  const [formData, setFormData] = useState({
    breed: "",
    alt: "",
    pic: "", // Add pic field if needed
  });

  const [formData2, setFormData2] = useState({
    breed: "",
    alt: "",
    pic: "", // Add pic field if needed
  });

  const [editKittenId, setEditKittenId] = useState(null); // Track the kitten being edited

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setFormData({ ...formData, pic: base64 });
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addKitten(formData);
    setFormData({
      breed: "",
      alt: "",
      pic: "",
    });
  };

  const handleUpdate = (kittenId) => {
    updateKitten(kittenId, formData2);
    setEditKittenId(null);
    setFormData2({
      breed: "",
      alt: "",
      pic: "",
    });
  };

  const handleDelete = (kittenId) => {
    deleteKitten(kittenId);
  };

  const handleEdit = (kittenId) => {
    const editedKitten = kittens.find((kitten) => kitten._id === kittenId);
    setFormData2({
      breed: editedKitten.breed,
      alt: editedKitten.alt,
      pic: "", // Add pic field if needed
    });
    setEditKittenId(kittenId);
  };

  const handleCreateAd = (kittenId) => {
    createAdoption(kittenId);
  };

  const handleRemoveAd = (kittenId, adoptions) => {
    adoptions = adoptions.filter((adoption) => adoption.kitten == kittenId);
    removeAdoption(adoptions[0]._id);
  };

  return (
    <div>
      <h1>Kitten Page</h1>
      {/* Add form for adding a new kitten */}
      <form>
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="alt"
          value={formData.alt}
          onChange={handleChange}
        />
        <input
          type="file"
          name="pic"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />

        {/* Add input fields for other kitten information */}
        <button type="button" onClick={handleAdd}>
          Add Kitten
        </button>
      </form>

      {loading ? (
        <p>Loading kittens...</p>
      ) : (
        <ul>
          {kittens.map((kitten) => (
            <li key={kitten._id}>
              {editKittenId === kitten._id ? ( // Check if the kitten is being edited
                <div>
                  <input
                    type="text"
                    name="breed"
                    value={formData2.breed}
                    onChange={handleChange2}
                  />
                  <input
                    type="text"
                    name="alt"
                    value={formData2.alt}
                    onChange={handleChange2}
                  />
                  <button onClick={() => handleUpdate(kitten._id)}>Save</button>
                  <button onClick={() => setEditKittenId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{kitten.breed}</h3>
                  <p>{kitten.alt}</p>
                  <img src={kitten.pic} alt={kitten.alt}/>
                  
                  <button onClick={() => handleEdit(kitten._id)}>Edit</button>
                  <button onClick={() => handleDelete(kitten._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleCreateAd(kitten._id)}>
                    Create adoption
                  </button>
                  <button onClick={() => handleRemoveAd(kitten._id, adoptions)}>
                    Delete adoption{" "}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  adoptions: state.adoption.adoptions,
  kittens: state.kitten.kittens,
  loading: state.kitten.loading,
});

const mapDispatchToProps = {
  getKittens,
  addKitten,
  updateKitten,
  deleteKitten,
  getAdoptions,
  createAdoption,
  removeAdoption,
};

export default connect(mapStateToProps, mapDispatchToProps)(KittenPage);