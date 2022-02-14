// import React from "react";
import { useState } from "react";

function useForm(initial) {
  console.log(initial);
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);

    setInputs({ ...inputs, [name]: value });
  }
  return {
    inputs,
    handleChange,
  };
}

export default useForm;
