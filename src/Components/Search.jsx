import React, { useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { cutString } from "../helpers/cutString";
import { getTask } from "../Redux/todoSlice/todoSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const searchOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
];

const sortOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "A_Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation date oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation date newest",
    value: "creation_date_newest",
  },
  {
    label: "Completion date newest",
    value: "completion_date_newest",
  },
  {
    label: "Completion date oldest",
    value: "completion_date_oldest",
  },
];

export default function Search() {
  const [status, setStatus] = useState({
    label: "",
    value: "",
  });

  const [sort, setSort] = useState({
    label: "",
    value: "",
  });

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = () => {
    const params = {};
    search && (params.search = search);
    sort.value && (params.sort = sort.value);
    status.value && (params.status = status.value);

    console.log(params);

    dispatch(getTask(params));
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={e => setSearch(e.currentTarget.value)}
        />
        <DropdownButton
          variant="outline-primary"
          title={sort.value ? cutString(sort.label, 5) : "Sort"}
          id="input-group-dropdown-1"
        >
          {sortOptions.map((option, index) => {
            return (
              <Dropdown.Item
                key={index}
                active={sort.value === option.value}
                onClick={() => setSort(option)}
              >
                {option.label}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <DropdownButton
          variant="outline-primary"
          title={status.value ? status.label : "Status"}
          id="input-group-dropdown-1"
        >
          {searchOptions.map((option, index) => {
            return (
              <Dropdown.Item
                active={status.value === option.value}
                key={index}
                onClick={() => setStatus(option)}
              >
                {option.label}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
        <Button
          variant="outline-primary"
          id="button-addon2"
          onClick={() => handleSubmit()}
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
}
