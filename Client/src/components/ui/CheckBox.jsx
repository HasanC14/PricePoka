import React from "react";

// A reusable checkbox component that follows composition pattern
const Checkbox = React.forwardRef(
  (
    {
      id,
      name,
      checked,
      onChange,
      disabled,
      size = { h: 5, w: 5 },
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative flex items-center ${className}`}>
        <input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer absolute h-full w-full opacity-0 cursor-pointer z-10"
          {...props}
        />

        <div
          className={`
              rounded border-2 flex items-center justify-center
              transition-all duration-150
              border-gray-300 bg-white
              peer-checked:border-blue-500 peer-checked:bg-blue-500
              peer-focus:ring-2 peer-focus:ring-blue-200
              peer-disabled:border-gray-300 peer-disabled:bg-gray-100
              dark:border-gray-600 dark:bg-gray-700
              dark:peer-checked:border-blue-500 dark:peer-checked:bg-blue-500
              dark:peer-focus:ring-blue-600/30
              dark:peer-disabled:border-gray-600 dark:peer-disabled:bg-gray-700/50
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
              text-white
              peer-checked:[&_svg]:opacity-100 
            `}
          style={{
            height: `${size.h * 4}px`,
            width: `${size.w * 4}px`,
          }}
        >
          <svg
            className="opacity-0 transition-opacity duration-150"
            style={{
              width: `${size.w * 4 * 0.8}px`,
              height: `${size.h * 4 * 0.8}px`,
            }}
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

// Label component
Checkbox.Label = ({ children, htmlFor, disabled, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        ml-2 text-sm font-medium
        text-gray-700 dark:text-gray-300
        ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </label>
  );
};

Checkbox.Label.displayName = "CheckboxLabel";

// Group component for proper spacing
Checkbox.Group = ({ children, className = "" }) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};

Checkbox.Group.displayName = "CheckboxGroup";

export default Checkbox;
