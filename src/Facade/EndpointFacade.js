import { handleHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";

const endpointFacade = (() => {
  const URL = configuration.URL;

  function fetchAllPersons() {
    const options = makeOptions("GET", false);
    const us = fetch(configuration.URL + "/api/person/allperons", options).then(
      handleHttpErrors
    );
    return us;
  }

  function fetchAllPersonsByHobby(hobby) {
    const options = makeOptions("GET", false);
    const us = fetch(
      configuration.URL + "/api/person/allperonsbyhobby/" + hobby,
      options
    ).then(handleHttpErrors);
    return us;
  }

  function fetchAllHobbies() {
    const options = makeOptions("GET", false);
    const us = fetch(configuration.URL + "/api/hobby/allhobbies", options).then(
      handleHttpErrors
    );
    return us;
  }

  function fetchAllAddresses() {
    const options = makeOptions("GET", false);
    const us = fetch(
      configuration.URL + "/api/address/alladdresses",
      options
    ).then(handleHttpErrors);
    return us;
  }

  function addEditHobby(hobby) {
    let fetchUrl = URL + "/api/hobby";
    if (typeof hobby.id === "undefined") {
      const options = makeOptions("POST", true, hobby);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, hobby);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function deleteHobby(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/hobby/" + id, options).then(handleHttpErrors);
  }

  function addEditPerson(person) {
    let fetchUrl = URL + "/api/person";
    if (typeof person.id === "undefined") {
      const options = makeOptions("POST", true, person);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, person);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function deletePerson(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/person/" + id, options).then(handleHttpErrors);
  }

  function addEditAddress(address) {
    let fetchUrl = URL + "/api/address";
    if (typeof address.id === "undefined") {
      const options = makeOptions("POST", true, address);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    } else {
      const options = makeOptions("PUT", true, address);
      return fetch(fetchUrl, options).then(handleHttpErrors);
    }
  }

  function deleteAddress(id) {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/address/" + id, options).then(handleHttpErrors);
  }

  return {
    fetchAllPersons: fetchAllPersons,
    fetchAllPersonsByHobby: fetchAllPersonsByHobby,
    fetchAllHobbies: fetchAllHobbies,
    addEditHobby: addEditHobby,
    deleteHobby: deleteHobby,
    addEditPerson: addEditPerson,
    deletePerson: deletePerson,
    fetchAllAddresses: fetchAllAddresses,
    addEditAddress: addEditAddress,
    deleteAddress: deleteAddress
  };
})();

export default endpointFacade;
