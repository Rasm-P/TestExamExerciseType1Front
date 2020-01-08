import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { catchHttpErrors } from "../utils";
import { Prompt } from "react-router-dom";

const Adminpage = ({ loggedIn, allCategories, CategoryFacade, setUpdate }) => {
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <div>
          <h1>Admin Page</h1>
          <CategoryCount
            allCategories={allCategories}
            CategoryFacade={CategoryFacade}
            setUpdate={setUpdate}
          />
          <hr />
          <CreateCateogry
            CategoryFacade={CategoryFacade}
            setUpdate={setUpdate}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const CategoryCount = ({ allCategories, CategoryFacade, setUpdate }) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    CategoryFacade.FetchCategoryCount(category.value)
      .then(data => setNumber(data))
      .catch(catchHttpErrors);
    event.target.reset();
    setIsBlocking(false);
  }

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    setCategory({ ...category, value });
    setIsBlocking(true);
  };

  const deleteCategory = id => {
    CategoryFacade.DeleteCategory(id);
    setNumber("");
    setCategory("");
    setUpdate(true);
  };

  return (
    <div>
      <h2>Category count</h2>
      <p>
        Select one of the categories and get a count for number of interactions
      </p>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <input
            className="form-control"
            list="categories"
            name="category"
            placeholder="Enter categories"
          />
          <datalist id="categories">
            {allCategories.map(category => {
              return <option key={category.id} value={category.category} />;
            })}
          </datalist>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Get count
          </button>
        </div>
      </form>
      {!(number === "") ? (
        <div className="form-group">
          <ul>
            <li>Category: {category.value}</li>
            <li>Count: {number.count}</li>
            <li>Id: {number.id}</li>
            <li>
              <button
                onClick={() => {
                  deleteCategory(number.id);
                }}
                className="btn btn-primary"
              >
                Delete category
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const CreateCateogry = ({ CategoryFacade, setUpdate }) => {
  const emptyCategory = { category: "", requestList: [] };
  const [category, setCategory] = useState({ ...emptyCategory });
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    setCategory({ ...category, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (category.category !== "") {
      CategoryFacade.AddCategory(category);
    }
    setCategory({ ...emptyCategory });
    event.target.reset();
    setUpdate(true);
    setIsBlocking(false);
  }

  return (
    <div>
      <h2>Create a category</h2>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <div>
            <input
              className="form-control"
              id="category"
              placeholder="Enter the new category name"
              defaultValue={category.category}
            />
          </div>
        </div>
        <div className="form-group">
          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminpage;
