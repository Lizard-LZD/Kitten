import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAdoptions,
  applyAdoption,
  cancelApply,
} from "../Redux/Reducers/AdoptionSlice";

const AdoptionsPage = ({
  adoptions,
  loading,
  getAdoptions,
  applyAdoption,
  cancelApply,
}) => {
  useEffect(() => {
    getAdoptions();
  }, [adoptions]);

  const handleApply = (id) => {
    applyAdoption(id);
  };

  const handleCancelApply = (id) => {
    cancelApply(id);
  };

  return (
    <div>
      <h1>Adoptions Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {adoptions.map((adoption) => (
            <li key={adoption._id}>
              <h3>{adoption.kitten.breed}</h3>
              <img src={adoption.kitten.pic} alt={adoption.kitten.alt}></img>
              <button onClick={() => handleApply(adoption._id)}>Apply</button>
              <button onClick={() => handleCancelApply(adoption._id)}>
                Cancel Apply
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  adoptions: state.adoption.adoptions,
  loading: state.adoption.loading,
});

const mapDispatchToProps = {
  getAdoptions,
  applyAdoption,
  cancelApply,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdoptionsPage);
