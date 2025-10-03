import styles from "./Input.module.css";

function Input({ label, type = "text", placeholder, value, onChange, name }) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={styles.input}
      />
    </div>
  );
}

export default Input;
