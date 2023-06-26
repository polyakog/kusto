import React from 'react';

export const Input = () => {
  return (
    <div>
      <label htmlFor="email">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Epam@epam.com"
      />

    </div>
  )
    ;
};

