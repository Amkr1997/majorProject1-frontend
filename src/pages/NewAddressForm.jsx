import { useEffect, useState } from "react";
import styles from "../components/css/newForm.module.css";
import { useDispatch } from "react-redux";
import { addAddress, editAddress } from "../features/addressSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const NewAddressForm = () => {
  const [formDetails, setFormDetails] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const oldValues = location.state?.address;

  const handleFormChange = (e) => {
    const { value, name } = e.target;

    setFormDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (oldValues) {
      setFormDetails({
        street: oldValues.street,
        city: oldValues.city,
        state: oldValues.state,
        country: oldValues.country,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldValues) {
      if (
        formDetails.street !== "" &&
        formDetails.city !== "" &&
        formDetails.state !== "" &&
        formDetails.country !== ""
      ) {
        dispatch(editAddress({ ...formDetails, _id: oldValues._id }));
        toast.success("Address Edited!");

        setFormDetails({
          street: "",
          city: "",
          state: "",
          country: "",
        });
      } else {
        toast.error("Enter full form first!");
      }
    } else {
      if (
        formDetails.street !== "" &&
        formDetails.city !== "" &&
        formDetails.state !== "" &&
        formDetails.country !== ""
      ) {
        dispatch(addAddress(formDetails));
        toast.success("Address Submitted!");

        setFormDetails({
          street: "",
          city: "",
          state: "",
          country: "",
        });
      } else {
        toast.error("Enter full form first!");
      }
    }
  };

  return (
    <>
      <section className="container mt-5 w-75">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Street
            </label>
            <input
              type="text"
              name="street"
              value={formDetails.street}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formDetails.city}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="exampleCheck1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formDetails.state}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="exampleCheck1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formDetails.country}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleFormChange}
            />
          </div>
          <div className="d-flex gap-3 mt-4">
            <button type="submit" className={`${styles.submitBtn} w-50`}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewAddressForm;