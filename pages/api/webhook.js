import fetch from "node-fetch";
import "dotenv/config";

const key = process.env.KEY;
const token = process.env.TOKEN;
let list_id = process.env.LISTID;

export default async function handler(req, res) {
  let body = req.body;
  console.log(body);

  let query = body.intent.query;
  let item_string = query.match(/^add (.*)/);
  if (item_string === null) {
    return res.status(400).json({});
  }

  let items = item_string[1]
    .split(/,?\band\b/i)
    .map((item) => item.replace(/,?[ ]*$/, ""));

  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    console.log(item);
    let result = await fetch(
      `https:api.trello.com/1/cards?idList=${list_id}&description=${query}&name=${item}&key=${key}&token=${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response.text());
      })
      .catch((err) => res.status(500).json({}));
  }
  return res.status(200).json({});
}
