import React, { useState } from "react";
import { Redirect, Prompt } from "react-router-dom";
import { catchHttpErrors } from "../utils";

const Adminpage = props => {
  const {
    loggedIn,
    setUpdate,
    EndpointFacade,
    allPersons,
    allAddresses,
    allHobbies
  } = props;
  const [isBlocking, setIsBlocking] = useState(false);
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <div>
          <h1>Admin Page</h1>
          <AddEditDeletePersons
            allPersons={allPersons}
            allAddresses={allAddresses}
            setUpdate={setUpdate}
            EndpointFacade={EndpointFacade}
            setIsBlocking={setIsBlocking}
            isBlocking={isBlocking}
          />
          <hr />
          <AddEditDeleteHobbies
            allHobbies={allHobbies}
            setUpdate={setUpdate}
            EndpointFacade={EndpointFacade}
            setIsBlocking={setIsBlocking}
            isBlocking={isBlocking}
          />
          <hr />
          <AddEditDeleteAddresses
            allAddresses={allAddresses}
            setUpdate={setUpdate}
            EndpointFacade={EndpointFacade}
            setIsBlocking={setIsBlocking}
            isBlocking={isBlocking}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const AddEditDeletePersons = ({
  allPersons,
  allAddresses,
  EndpointFacade,
  setUpdate,
  isBlocking,
  setIsBlocking
}) => {
  const emptyPerson = {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    hobbyList: [],
    address: { id: "", street: "", city: "", zip: "" }
  };
  const [personToAddEdit, setPersonToAddEdit] = useState({ ...emptyPerson });

  const storeAddEditPerson = person => {
    EndpointFacade.addEditPerson(person).catch(catchHttpErrors);
  };

  const deletePerson = id => {
    EndpointFacade.deletePerson(id).catch(catchHttpErrors);
    setUpdate(true);
  };

  const editPerson = person => {
    const edit = { ...person };
    setPersonToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setPersonToAddEdit({ ...personToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const address = allAddresses.find(x => {
      return x.id == personToAddEdit.address;
    });
    if (
      personToAddEdit != emptyPerson &&
      personToAddEdit.address.id != 0 &&
      address != null
    ) {
      personToAddEdit.address = address;
      window.alert(
        "Values to be submitted: " + JSON.stringify(personToAddEdit)
      );
      storeAddEditPerson(personToAddEdit);
      setPersonToAddEdit({ ...emptyPerson });
      event.target.reset();
      setIsBlocking(false);
      setUpdate(true);
    } else {
      window.alert("Plase change the values in the fields before submition!");
    }
  }

  return (
    <div>
      <h5>Add/Edit/Delete Persons</h5>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              id="id"
              placeholder="Id"
              value={personToAddEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="firstName">
            First name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="firstName"
              placeholder="Enter first name"
              value={personToAddEdit.firstName}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="lastName">
            Last name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="lastName"
              placeholder="Enter last name"
              value={personToAddEdit.lastName}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="email">
            Email:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={personToAddEdit.email}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="phone">
            Phone:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="phone"
              placeholder="Enter phone"
              value={personToAddEdit.phone}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="address">
            Address:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="address"
              placeholder="Enter address id"
              value={personToAddEdit.address.id}
            />
          </div>
        </div>
        {personToAddEdit.hobbyList.map(hobby => (
          <div key={hobby.id} className="form-group">
            <label className="control-label col-sm-3" htmlFor={hobby}>
              {"Hobby:" + hobby.name}
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                id="hobby"
                placeholder="Enter hobby"
                value={hobby.id}
              />
            </div>
          </div>
        ))}

        {/* 
        <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="{hobby}">
              New Hobby
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                id="hobby"
                placeholder="Enter hobby"
                value={hobby.id}
              />
            </div>
          </div>
          */}

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {allPersons.map(person => (
            <tr key={person.id}>
              <th>{person.id}</th>
              <th>{person.firstName}</th>
              <th>{person.lastName}</th>
              <th>{person.email}</th>
              <th>{person.phone}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editPerson(person);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deletePerson(person.id);
                  }}
                >
                  delete)
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddEditDeleteHobbies = ({
  allHobbies,
  setUpdate,
  EndpointFacade,
  setIsBlocking,
  isBlocking
}) => {
  const emptyHobby = {
    name: "",
    description: ""
  };
  const [hobbyToAddEdit, setHobbyToAddEdit] = useState({ ...emptyHobby });

  const storeAddEditHobby = hobby => {
    EndpointFacade.addEditHobby(hobby).catch(catchHttpErrors);
  };

  const deleteHobby = id => {
    EndpointFacade.deleteHobby(id).catch(catchHttpErrors);
    setUpdate(true);
  };

  const editHobby = hobby => {
    const edit = { ...hobby };
    setHobbyToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setHobbyToAddEdit({ ...hobbyToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (hobbyToAddEdit != emptyHobby) {
      window.alert("Values to be submitted: " + JSON.stringify(hobbyToAddEdit));
      storeAddEditHobby(hobbyToAddEdit);
      setHobbyToAddEdit({ ...emptyHobby });
      event.target.reset();
      setIsBlocking(false);
      setUpdate(true);
    } else {
      window.alert("Plase change the values in the fields before submition!");
    }
  }

  return (
    <div>
      <h5>Add/Edit/Delete Hobbies</h5>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              id="id"
              placeholder="Id"
              value={hobbyToAddEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Name:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={hobbyToAddEdit.name}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="description">
            Description:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="description"
              placeholder="Enter description"
              value={hobbyToAddEdit.description}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allHobbies.map(hobby => (
            <tr key={hobby.id}>
              <th>{hobby.id}</th>
              <th>{hobby.name}</th>
              <th>{hobby.description}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editHobby(hobby);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteHobby(hobby.id);
                  }}
                >
                  delete)
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AddEditDeleteAddresses = ({
  allAddresses,
  setUpdate,
  EndpointFacade,
  setIsBlocking,
  isBlocking
}) => {
  const emptyAddress = {
    street: "",
    city: "",
    zip: "",
    personList: []
  };
  const [addressToAddEdit, setAddressToAddEdit] = useState({ ...emptyAddress });

  const storeAddEditAddress = address => {
    EndpointFacade.addEditAddress(address).catch(catchHttpErrors);
  };

  const deleteAddress = id => {
    EndpointFacade.deleteAddress(id).catch(catchHttpErrors);
    setUpdate(true);
  };

  const editAddress = address => {
    const edit = { ...address };
    setAddressToAddEdit(edit);
  };

  const handleChange = event => {
    const target = event.target;
    const name = target.id;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAddressToAddEdit({ ...addressToAddEdit, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (addressToAddEdit != emptyAddress) {
      window.alert(
        "Values to be submitted: " + JSON.stringify(addressToAddEdit)
      );
      storeAddEditAddress(addressToAddEdit);
      setAddressToAddEdit({ ...emptyAddress });
      event.target.reset();
      setIsBlocking(false);
      setUpdate(true);
    } else {
      window.alert("Plase change the values in the fields before submition!");
    }
  }

  return (
    <div>
      <h5>Add/Edit/Delete Addresses</h5>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <label className="control-label col-sm-3">Id:</label>
          <div className="col-sm-9">
            <input
              className="form-control"
              readOnly
              id="id"
              placeholder="Id"
              value={addressToAddEdit.id}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="street">
            Street:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="street"
              placeholder="Enter street"
              value={addressToAddEdit.street}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="city">
            City:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="city"
              placeholder="Enter city"
              value={addressToAddEdit.city}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
            Zip:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="zip"
              placeholder="Enter zip"
              value={addressToAddEdit.zip}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Street</th>
            <th>City</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {allAddresses.map(address => (
            <tr key={address.id}>
              <th>{address.id}</th>
              <th>{address.street}</th>
              <th>{address.city}</th>
              <th>{address.zip}</th>
              <td>
                (
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    editAddress(address);
                  }}
                >
                  edit
                </a>
                ,
                <a
                  href="xx"
                  onClick={e => {
                    e.preventDefault();
                    deleteAddress(address.id);
                  }}
                >
                  delete)
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminpage;
