import fetch from "node-fetch";
import "dotenv/config";

const key = process.env.KEY;
const token = process.env.TOKEN;
let list_id = process.env.LISTID;

export default function handler(req, res) {
  let body = req.body;
  console.log(body);
  let name = body.queryResult.parameters.item;
  fetch(
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
    .then((text) => console.log(text))
    .catch((err) => console.error(err));

  res.status(200).json({});
}
