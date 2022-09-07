import { endpointUrl } from "./env";

export async function QueryDispatcher(params) {
  const {sparqlQuery} = params
  class SPARQLQueryDispatcher {
    constructor(endpoint) {
      this.endpoint = endpoint;
    }

    query(sparqlQuery) {
      const fullUrl =
        this.endpoint + "?query=" + encodeURIComponent(sparqlQuery);
      const headers = { Accept: "application/sparql-results+json" };

      return fetch(fullUrl, { headers }).then((body) => body.json());
    }
  }

  const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
  return await queryDispatcher.query(sparqlQuery);
}