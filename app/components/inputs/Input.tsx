"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

/**
 * Input component.
 *
 * This is a functional component that renders an input field along with its label.
 * It uses 'react-hook-form' for form management, and 'clsx' for conditionally
 * applying classnames based on the presence of errors or if the input is disabled.
 * The input field is styled with Tailwind CSS classes.
 *
 * @param {Object} props The props that are passed to this component.
 * @param {string} props.label The label for the input field.
 * @param {string} props.id The unique identifier for the input field.
 * @param {string} [props.type] The type of the input field, defaults to 'text'.
 * @param {boolean} [props.required] Specifies whether the input field is required.
 * @param {function} props.register The register function from 'react-hook-form'.
 * @param {Object} props.errors The error object from 'react-hook-form'.
 * @param {boolean} [props.disabled] Specifies whether the input field is disabled.
 *
 * @returns {JSX.Element} Returns a labeled input field.
 */

const Input: React.FC<InputProps> = ({
  label,
  id,
  disabled,
  type,
  required,
  register,
  errors,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 leading-6 select-none"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            `
                    form-input
                    block
                    w-full
                    rounded-md
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6`,
            errors[id] && "ring-rose-500 ring-2",
            disabled && "cursor-default opacity-50",
          )}
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    </div>
  );
};

export default Input;
