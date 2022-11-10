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
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://ghibliapi.herokuapp.com/`;
  }, []);

  return (
    <div className="list">
      <h2>Choose A Category</h2>
      <select>
        <option value=""></option>
        <option value="people">People</option>
        <option value="locations">Locations</option>
        <option value="films">Films</option>
      </select>
    </div>
  );
}
