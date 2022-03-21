import React from "react";

import "./App.css";

function App() {
  let [data, setData] = React.useState({
    name: "",
    gender: "",
    department: "",
    role: "",
    salary: 0,
  });

  let [dataArray, setDataArray] = React.useState([]);

  let [filterArray, setFilterArray] = React.useState([]);

  let [filterOn, setFilterOn] = React.useState(false);

  let handleChange = (e) => {
    let { value, checked, name, type } = e.target;

    setData((oldData) => {
      return {
        ...oldData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(`http://localhost:3000/employees`)
      .then((res) => res.json())
      .then((res) => setDataArray(res))

      .catch((err) => console.log(err));
  }

  var showData = "";

  var displayData = (arr) => {
    showData = arr.map((old) => {
      return (
        <div className="box" key={old.id}>
          <div>Name: {old.name}</div>
          <div>Gender: {old.gender}</div>
          <div>Department: {old.department}</div>
          <div>Role: {old.role}</div>
          <div>Salary: {old.salary}</div>
          <br />
        </div>
      );
    });
  };
  displayData(dataArray);

  // console.log(data);
  function addToServer() {
    const payload = JSON.stringify(data);
    fetch(`http://localhost:3004/employees`, {
      method: "POST",
      body: payload,
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      getData();
    });
  }

  // let showFilterData = "";
  var showFilterData = filterArray.map((e) => {
    return (
      <div className="box" key={e.id}>
        <div>Name: {e.name}</div>
        <div>Gender: {e.gender}</div>
        <div>Department: {e.department}</div>
        <div>Role: {e.role}</div>
        <div>Salary: {e.salary}</div>
        <br />
      </div>
    );
  });

  function filterResult(value) {
    value == 1 ? setFilterOn(false) : setFilterOn(true);
    // console.log(filterOn)
    var temp = dataArray.filter((e) => {
      return value == e.department;
    });
    console.log(temp);
    setFilterArray(temp);
  }

  function sortedResult(str) {
  let sorted = [];
    if(str == "Asc" ){
      console.log("ASC")
      if(filterOn){
       sorted =  dataArray.sort((a, b) => {
          return a.salary - b.salary;
        })

        setDataArray(sorted)
      }else{
        sorted =  filterArray.sort((a, b) => {
          return a.salary-b.salary;
        })
        setFilterArray(sorted);

      }
    }
   // console.log(sorted)  ~ uncomment to see in console


  }

  return (
    <div className="App">
      <input
        name="name"
        type="text"
        value={data.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <br />

      <input
        name="gender"
        type="text"
        value={data.gender}
        placeholder="Gender"
        onChange={handleChange}
      />
      <br />

      <input
        name="department"
        type="text"
        value={data.department}
        placeholder="Department"
        onChange={handleChange}
      />
      <br />

      <input
        name="role"
        type="text"
        value={data.role}
        placeholder="Role"
        onChange={handleChange}
      />
      <br />

      <input
        name="salary"
        type="number"
        value={data.salary}
        placeholder="Salary"
        onChange={handleChange}
      />
      <br />

      <button onClick={addToServer}>ADD EMPLOYEE</button>
      <hr />
      <button onClick={() => filterResult(1)}>Show All Department</button>
      <button onClick={() => filterResult("Marketing")}>Show Marketing</button>
      <button onClick={() => filterResult("HR")}>Show HR</button>
      <button onClick={() => filterResult("IT")}>Show IT</button>
      <button onClick={() => filterResult("Finance")}>Show Finance</button>
      <hr />
      <button >Sort By Salary Ascending</button>
      <button >Sort By Salary Descending</button>
      <hr />
      {!filterOn && <div>{showData}</div>}
      {filterOn && <div>{showFilterData}</div>}
    </div>
  );
}

export default App;