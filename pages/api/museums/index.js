// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QueryDispatcher } from "../../../shared/sparql";
export default async function handler(req, res) {
  let { offset, limit, city } = req.query;

  if (!offset) {
    offset = 0;
  }
  if (!limit) {
    limit = 10;
  }
  if (!city) {
    res.status(200).json({
      offset: 0,
      limit: 0,
      length: 0,
      vars: [],
      data: [],
    })
  }
  console.debug(city)
  const query = `
  SELECT DISTINCT ?item ?name ?coord ?lat ?lon ?link ?pic
  WHERE
  {
    hint:Query hint:optimizer "None" .
    ?item wdt:P131* wd:${city} .
    ?item wdt:P31/wdt:P279* wd:Q33506 .
    ?item wdt:P625 ?coord .
    ?item p:P625 ?coordinate .
    ?coordinate psv:P625 ?coordinate_node .
    ?coordinate_node wikibase:geoLatitude ?lat .
    ?coordinate_node wikibase:geoLongitude ?lon .
     ?item wdt:P18 ?pic
    OPTIONAL {?item wdt:P856 ?link.}
    #OPTIONAL {?item wdt:P18 ?pic}
    SERVICE wikibase:label {
    bd:serviceParam wikibase:language "es" .
    ?item rdfs:label ?name
    }
   }
  ORDER BY DESC (?name)
  OFFSET ${offset}
  limit ${limit}
  `;

  try {
    const { head, results } = await QueryDispatcher({ sparqlQuery: query });
    res.status(200).json({
      offset,
      limit,
      length: results?.bindings?.length,
      vars: head?.vars,
      data: results?.bindings,
    });

  } catch (error) {
    console.log(`ERROR: ${error}`);
    res.status(500).json({
      code: 500,
      error,
    });
  }
}
