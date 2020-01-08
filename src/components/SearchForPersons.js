import React, { useState } from "react";
import { catchHttpErrors } from "../utils";
import uuid from "uuid/v1";
import { Prompt, Route, useRouteMatch, Link } from "react-router-dom";

const Jokesbycategory = ({ loggedIn, allPersons, EndpointFacade }) => {
  const inputfield = { input: "" };
  const [search, setSearch] = useState(inputfield);

  const match = useRouteMatch();
  const lowercasedFilter = search.input.toLowerCase();
  const filteredData = allPersons.filter(item => {
    return Object.keys(item).some(key =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(lowercasedFilter)
    );
  });

  const handleChange = event => {
    event.preventDefault();
    setSearch({ ...search, [event.target.id]: event.target.value });
  };

  return (
    <div className="col-sm-offset-3 col-sm-9">
      <h1>Search for a person</h1>
      <form className="form-horizontal">
        <input
          onChange={handleChange}
          className="form-control"
          id="input"
          placeholder="Search by id, phone, emaril, name..."
        />
        {!(search.input === "") ? (
          <table className="table">
            <thead>
              <tr className="header">
                <th>Id</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            {filteredData && filteredData.length ? (
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
            ) : (
              <i>No results were found!</i>
            )}
          </table>
        ) : null}
      </form>
      <hr />
      <Route
        path={`${match.path}/:id`}
        render={({ match }) => (
          <PersonLink match={match} allPersons={allPersons} />
        )}
      />
    </div>
  );
};

const PersonLink = ({ match, allPersons }) => {
  const chosenPerson = allPersons.find(x => {
    return x.id == match.params.id;
  });
  return (
    <div>
      {chosenPerson != null ? (
        <div>
          <Link to={`/searchforpersons`}>
            <h5>Person information</h5>
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>Person</th>
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
                {chosenPerson.hobbyList && chosenPerson.hobbyList.length
                  ? chosenPerson.hobbyList.map(hobby => (
                      <td key={hobby.id}>
                        <ul>
                          <li>{hobby.id}</li>
                          <li>{hobby.name}</li>
                          <li>{hobby.description}</li>
                        </ul>
                      </td>
                    ))
                  : null}
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Jokesbycategory;
