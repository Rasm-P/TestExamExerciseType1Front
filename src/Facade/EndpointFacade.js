import { handleHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";

const endpointFacade = (() => {
  
  function fetchAllPersons() {
    const options = makeOptions("GET", false);
    const us = fetch(configuration.URL + "/api/person/allperons", options).then(
      handleHttpErrors
    );
    return us;
  }

  return {
    fetchAllPersons: fetchAllPersons
  };
})();

export default endpointFacade;
