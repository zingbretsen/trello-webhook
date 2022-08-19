import fetch from "node-fetch";
import "dotenv/config";

const key = process.env.KEY;
const token = process.env.TOKEN;
let list_id = process.env.LISTID;

export default async function handler(req, res) {
  let body = req.body;
  console.log(body);
  // let name = body.queryResult.parameters.item;
  let item = body.intent.params.item;
  console.log(item);
  let query = body.intent.params.query;
  let name = query;
  console.log(query);
  let result = await fetch(
    `https:api.trello.com/1/cards?idList=${list_id}&name=${name}&key=${key}&token=${token}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => res.status(200).json({}))
    .catch((err) => res.status(500).json({}));
}
