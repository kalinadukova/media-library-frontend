import type { ChangeEvent, FC, InputHTMLAttributes } from "react";
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Input.css";

type InputProps = {
  id: string;
  name: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  isRequired?: boolean;
  error?: string;
  requirements?: string;
  placeholder: string;
  focus?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = ({
  name,
  id,
  type,
  isRequired = true,
  error,
  requirements,
  placeholder,
  focus = false,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="input-wrapper">
      <label className="input-label" htmlFor={id}>
        {name} {isRequired && <span className="input-required">*</span>}
      </label>
      <input
        className={`input ${(type === "password" || isVisible) && "input--padded-end"}`}
        id={id}
        type={!isVisible ? type : "text"}
        required={isRequired}
        placeholder={placeholder}
        autoFocus={focus}
        onChange={onChange}
      />
      {requirements && <p className="input-requirements">{requirements}</p>}
      {type === "password" && !isVisible && (
        <FaEye className="input-icon" onClick={() => setIsVisible(true)} />
      )}
      {type === "password" && isVisible && (
        <FaEyeSlash
          className="input-icon"
          onClick={() => setIsVisible(false)}
        />
      )}
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default Input;
