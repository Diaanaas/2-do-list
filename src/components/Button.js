import { useState } from "react";
import './Button.css'

export default function Button({
  handleSubmit
}) {
  return (
    <>
      <form id="addTaskForm" className="addForm" onSubmit={handleSubmit}>
        <section className="formCard">
          <label className="todoInputContainer">
            <input type="text" placeholder='Learn more WEB' name="todoText">
            </input>
          </label>
        </section >
        <button
          className="addButton"
        >
          Add todo
        </button>
      </form>
    </>
  );
}