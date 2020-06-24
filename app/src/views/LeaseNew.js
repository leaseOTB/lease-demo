import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const LeaseNew = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    checkUserAge(data);
  };

  // ON_CHAIN
  const [tenantAddress, setTenant] = useState(); //ETH ADDRESS
  // IPFS Object
  const [tenantName, setName] = useState(); // Full Name of Tenant
  const [DOB, setDOB] = useState(); // Tenant Date of Birth, vaildate only 18+
  const [picture, setPicture] = useState(); // Hashed Image of Unit
  const [streetAddress, setStreet] = useState(); // Street Address: 123 E 5th Street, Brooklyn NYC 20402 etc..  maybe validate with USPS/Google maps?
  const [unitNumber, setUnit] = useState(); // Unit number max 999
  const [BIN, setBIN] = useState(); // Buidling ID Number

  const [underAge, setUnderage] = useState(false);
  const checkUserAge = async ({ DOB }) => {
    const age = Math.floor((new Date() - new Date(DOB).getTime()) / 3.15576e10);
    if (age < 18) {
      setUnderage(true);
    } else {
      setUnderage(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-100 px-4 py-4 rounded"
      >
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="tenantAddress">
            Tenant Address
          </label>
          <input
            name="tenantAddress"
            ref={register({ required: true })}
            className="field"
          />
          {errors.tenantAddress && (
            <h1 className="error">Tenant address is required*</h1>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-700">Tenant Name</label>
          <div className="flex">
            <div className="mr-12">
              <input
                name="tenantFirstName"
                ref={register({ required: true })}
                className="field"
                placeholder="First name"
              />
              {errors.tenantFirstName && (
                <h1 className="error">First name is required*</h1>
              )}
            </div>
            <div>
              <input
                name="tenantLastName"
                ref={register({ required: true })}
                className="field"
                placeholder="Last name"
              />
              {errors.tenantLastName && (
                <h1 className="error">Last name is required*</h1>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="DOB" className="text-gray-700">
            Day of birth
          </label>
          <input
            ref={register({ required: true, validate: checkUserAge })}
            className="field"
            name="DOB"
            type="date"
          />
          {errors.DOB && (
            <h1 className="pt-1 text-red-600">Birthday is required*</h1>
          )}
          {underAge && (
            <h1 className="pt-1 text-red-600">You have to be over 18!</h1>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="unitNumber">
            Unit number
          </label>
          <input
            name="unitNumber"
            ref={register({ required: true, max: 999 })}
            className="field"
            type="number"
          />
          {errors.unitNumber && errors.unitNumber.type === "required" && (
            <h1 className="error">Unit number is required*</h1>
          )}
          {errors.unitNumber && errors.unitNumber.type === "max" && (
            <h1 className="error">Can't be more than 999</h1>
          )}
        </div>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="unitNumber">
            Building number
          </label>
          <input
            name="BIN"
            ref={register({ required: true, max: 999 })}
            className="field"
            type="text"
          />
          {errors.BIN && errors.unitNumber.type === "required" && (
            <h1 className="error">Building ID number is required*</h1>
          )}
        </div>
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default LeaseNew;
