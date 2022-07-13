import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { AppContext } from "../Context/AppContext";

function Dashboard() {
  const [state,dispatch] = useContext(AppContext);
  const [searhcParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searhcParams.get("page")) || 1);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {});
  }, [page]);

  useEffect(() => {
    setSearchParams({
      page
    });
  }, [page, setSearchParams]);
  return (
    <div>
      <h3>Dashboard</h3>
      <h4 data-testid="token">{state.token}</h4>
      <button data-testid="logout-btn" onClick={()=>dispatch({type:"LOGOUT_SUCCESS"})}>Logout</button>
      <ul data-testid="item-container">
        {data.map((item) => (
          <li data-testid="item" key={item.id}>
            {" "}
            {item.title}
          </li>
        ))}
      </ul>
      <div data-testid="pagination-container">
        <Pagination
          changePage={(page) => setPage(page)}
          total={5}
          current={page}
        />
      </div>
    </div>
  );
}

export default Dashboard;
