import fetch from "node-fetch";
import "dotenv/config";

const key = process.env.KEY;
const token = process.env.TOKEN;
let list_id = process.env.LISTID;

export default async function handler(req, res) {
  let body = req.body;
  console.log(body);
  let items = body.intent.params.item.resolved;
  console.log(body.intent.params.item);
  console.log(body.scene.slots.item);
  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    let result = await fetch(
      `https:api.trello.com/1/cards?idList=${list_id}&name=${item}&key=${key}&token=${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((text) => res.status(200).json({}))
      .catch((err) => res.status(500).json({}));
  }
}
