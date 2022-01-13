import React from "react";

interface Titles {
  titles: Array<string>;
}
const Thead: React.FunctionComponent<Titles> = function ({ titles }) {
  return (
    <thead>
      <tr>
        {titles.map((el, i) => (
          <td key={i}>{el}</td>
        ))}
      </tr>
    </thead>
  );
};
export default Thead;
