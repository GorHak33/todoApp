// import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (values.name === "") {
      alert("please fill all fields");
      return;
    }
    fetch(`http://localhost:3001/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async response => {
        const res = await response.json();
        if (response.status >= 400 && response.status <= 600) {
          if (res.error) {
            throw res.error;
          } else {
            throw new Error("smth went wrong");
          }
        }

        console.log("success");
        setValues({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch(error => {
        console.log(" catch error", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact List</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={values.name}
            className={styles.input}
            placeholder="Name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            className={styles.input}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <input
            type="textarea"
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Write your message..."
            required
          />
        </div>

        <input type="submit" value={"Send"} className={styles.button} />
      </form>
    </div>
  );
}
