import React, { useState, useEffect } from "react"
import styles from "./Modal.module.css"
import SpinnerSmall from "../SpinnerSmall"

const Modal = ({ children, buttonText }) => {
  const [modalIsActive, setModalIsActive] = useState(false)
  const [modalSpinner, setModalSpinner] = useState(false)

  useEffect(() => {
    setModalSpinner(true)
    setTimeout(() => {
      setModalSpinner(false)
    }, 1000)
  }, [modalIsActive])

  return modalSpinner ? (
    <div className={styles.modalContainer}>
      <SpinnerSmall />
    </div>
  ) : (
    <>
      <div
        className={`${styles.modalContainer} ${
          modalIsActive ? styles.show : styles.hide
        }`}
      >
        <button id={styles.closeModalBtn} onClick={setModalIsActive(false)}>
          x
        </button>
        {children}
      </div>
      <button onClick={setModalIsActive(true)}>{buttonText}</button>
    </>
  )
}

export default Modal
