import { useState, useEffect } from "react";

/**
 * Goal is to be able to choose a category,
 * Receive the data from the api the first time,
 * store it in localStorage
 * list out the names or titles
 * if the data has been called before then do not make an api call
 * instead, retrieve the data from localStorage
 */

export default function List() {
  const [category, setCategory] = useState("people");
  const [data, setData] = useState([]);

  // this state will be used to teach basics of localStorage. Not needed for app.
  // const [name, setName] = useState("");
  // const [name, setName] = useState(
  //   JSON.parse(window.localStorage.getItem("myName")) || "" // localStorage["myName"]
  // );

  useEffect(() => {
    // console.log("name", name);
    // BASIC STORAGE
    // const myName = { first: "JD", last: "Richards" };
    // window.localStorage.setItem("myName", JSON.stringify(myName)); // localStorage["myName"] = JSON.stringify(myName)

    const url = `https://ghibliapi.herokuapp.com/${category}`;
    const result = JSON.parse(window.localStorage.getItem(category));
    // We check if we have a key of the category already in local host

    if (result) {
      // If we have a the data saved in localhost we don't make a fetch request
      setData(result);
    } else {
      fetch(url)
        .then((resp) => resp.json())
        .then((res) => {
          console.log(`I ran a fetch for ${category}`);
          // We save the data from the fetch request on localhost so that next time we choose that category it goes to localhost and not to fetch
          window.localStorage.setItem(category, JSON.stringify(res));
          // I want to set my state with the data
          setData(res);
        });
    }
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
// Thoughts about saving comments in localStorage
// function Video() {
//   const { id } = useParams();
//   const [comments, setComments] = useState(
//     JSON.parse(window.localStorage.getItem(id)) || []
//   );

//   function handleSubmit(e) {
//     e.preventDefault();
//     const newComments = [...comments, "commentFromForm"];
//     window.localStorage.setItem(id, JSON.stringify(newComments));
//     setComments(newComments);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}></form>
//       {comments.map((comment) => (
//         <li>{comment}</li>
//       ))}
//     </div>
//   );
// }
