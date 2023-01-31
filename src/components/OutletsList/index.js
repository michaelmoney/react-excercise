import { useState, useEffect } from "react";
import axios from "axios";

const OutletsList = () => {
  const [outlets, setOutlets] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const sort = (elements) =>
    [...elements].sort((a, b) => {
      const ratingA = a.user_rating.average_rating;
      const ratingB = b.user_rating.average_rating;
      if (ratingA > ratingB) {
        return 1;
      } else if (ratingA < ratingB) {
        return -1;
      } else {
        return 0;
      }
    });

  const a = [3, 1, 8, 9, 2];
  console.log(
    "a sorted",
    a.sort((a, b) => a - b)
  );

  useEffect(() => {
    axios
      .get("https://jsonmock.hackerrank.com/api/food_outlets?city=Houston")
      .then((data) => {
        setOutlets(data.data.data);
      });
  }, []);

  return (
    <>
      <h1>Outlets List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th
              scope="col"
              onClick={() => {
                setIsSorted(!isSorted);
                const sorted = [...outlets].sort((a, b) => {
                  const ratingA = a.user_rating.average_rating;
                  const ratingB = b.user_rating.average_rating;
                  return isSorted ? ratingA - ratingB : ratingB - ratingA;
                });
                setOutlets(sorted);
              }}
            >
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {outlets.length > 0 &&
            outlets.map((outlet) => {
              return (
                <tr key={outlet.id}>
                  <td>{outlet.id}</td>
                  <td>{outlet.name}</td>
                  <td>{outlet.user_rating.average_rating}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default OutletsList;
