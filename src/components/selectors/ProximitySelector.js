import React, { useState } from "react";
import { Dropdown } from "@nextui-org/react";
import { useSelect } from "../../app/custom hooks/useSelect";

function MonthSelector(props) {
  const [months, setMonths] = useSelect(new Set(["January"]), props.setMonths);
  const selectedValue = React.useMemo(
    () => Array.from(months).join(", ").replaceAll("_", " "),
    [months]
  );
  return (
    <div>
      <Dropdown>
        <Dropdown.Button flat className="">
          {selectedValue || "Select a day"}
        </Dropdown.Button>
        <Dropdown.Menu
          selectionMode="multiple"
          selectedKeys={months}
          onSelectionChange={setMonths}
          aria-label="Static Actions"
        >
          <Dropdown.Item key="January">January</Dropdown.Item>
          <Dropdown.Item key="February">February</Dropdown.Item>
          <Dropdown.Item key="March">March</Dropdown.Item>
          <Dropdown.Item key="April">April</Dropdown.Item>
          <Dropdown.Item key="May">May</Dropdown.Item>
          <Dropdown.Item key="June">June</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default MonthSelector;
