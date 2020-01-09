import React, { useState } from "react";
import { catchHttpErrors } from "../utils";
import { Route, useRouteMatch, Link } from "react-router-dom";

const SearchByHobby = ({ allHobbies, EndpointFacade }) => {
  const inputfield = { input: "" };
  const [search, setSearch] = useState(inputfield);
  const [filteredData, setFilteredData] = useState([]);
  const match = useRouteMatch();

  const handleSubmit = event => {
    event.preventDefault();
    EndpointFacade.fetchAllPersonsByHobby(search.input.toLowerCase())
      .then(data => setFilteredData(data))
      .catch(catchHttpErrors);
    event.target.reset();
  };

  const handleChange = event => {
    event.preventDefault();
    setSearch({ ...search, [event.target.id]: event.target.value });
    setFilteredData([]);
  };

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>Search by hobby</h1>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <input
          className="form-control"
          id="input"
          placeholder="Search by hobby like Swimming, Tennis..."
        />
        <button type="submit" className="btn btn-primary">
          Get persons
        </button>
        {filteredData && filteredData.length && search.input !== "" ? (
          <table className="table">
            <thead>
              <tr className="header">
                <th>Id</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`${match.url}/${item.id}`}>
                      {" "}
                      {item.firstName} {item.lastName}{" "}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </form>
      <hr />
      <Route
        path={`${match.path}/:id`}
        render={({ match }) => (
          <PersonLink match={match} filteredData={filteredData} />
        )}
      />
      <div>
        <AllHobbies allHobbies={allHobbies} />
      </div>
    </div>
  );
};

const AllHobbies = ({ allHobbies }) => {
  return (
    <div>
      <h2>A list of all hobbies</h2>
      {allHobbies && allHobbies.length
        ? allHobbies.map(hobby => (
            <ul key={hobby.id}>
              <li>
                {hobby.name}, {hobby.description}
              </li>
            </ul>
          ))
        : null}
    </div>
  );
};

const PersonLink = ({ match, filteredData }) => {
  const chosenPerson = filteredData.find(x => {
    return x.id == match.params.id;
  });
  return (
    <div>
      {chosenPerson != null ? (
        <div>
          <Link to={`/searchbyhobby`}>
            <h5>
              {chosenPerson.firstName} {chosenPerson.lastName} information
            </h5>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Address</th>
                <th>Hobby</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>{chosenPerson.id}</li>
                    <li>{chosenPerson.firstName}</li>
                    <li>{chosenPerson.lastName}</li>
                    <li>{chosenPerson.email}</li>
                    <li>{chosenPerson.phone}</li>
                  </ul>
                </td>
                <td>
                  <ul>
                    <li>{chosenPerson.address.id}</li>
                    <li>{chosenPerson.address.city}</li>
                    <li>{chosenPerson.address.street}</li>
                    <li>{chosenPerson.address.zip}</li>
                  </ul>
                </td>
                <td>
                  {chosenPerson.hobbyList && chosenPerson.hobbyList.length ? (
                    chosenPerson.hobbyList.map(hobby => (
                      <ul key={hobby.id}>
                        <li>{hobby.id}</li>
                        <li>{hobby.name}</li>
                        <li>{hobby.description}</li>
                      </ul>
                    ))
                  ) : (
                    <li>This person has no hobbies!</li>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SearchByHobby;
