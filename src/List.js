import { useState, useEffect } from "react";

/**
 * Goal is to be able to choose a category,
 * Receive the data from the api the first time,
 * store it in localStorage
 * list out the names or titles
 * if the data has been called before then do not make an api call
 * instead, retrieve the data from localStorage
 *
 */

export default function List() {
  const [category, setCategory] = useState("people");
  const [data, setData] = useState([]);

  // this state will be used to teach basics of localStorage. Not needed for app.
  // const [name, setName] = useState("");
    // const [name, setName] = useState(
    //   JSON.parse(window.localStorage.getItem("myName")) || ""
    // );

  useEffect(() => {
    // console.log("name", name);
    //BASIC STORAGE
    // const myName = { first: "JD", last: "Richards" };

    // window.localStorage.setItem("myName", JSON.stringify(myName));
    const url = `https://ghibliapi.herokuapp.com/${category}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((res) => {
        console.log(`I ran a fetch for ${category}`);
        // I want to set my state with the data
        setData(res);
        // I want to reset the category to prevent an infinite loop
      });
  }, [category]);

  return (
    <div className="list">
      <h2>Choose A Category</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=""></option>
        <option value="people">People</option>
        <option value="locations">Locations</option>
        <option value="films">Films</option>
      </select>
      {data &&
        data.map((item) => <h2 key={item.id}>{item.name || item.title}</h2>)}
    </div>
  );
}
