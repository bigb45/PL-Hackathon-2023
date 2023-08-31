import React, { useState } from "react";
import { Dropdown } from "@nextui-org/react";
import { useSelect } from "../app/custom hooks/useSelect";

function ProximitySelector(props) {
  const [locations, setLocations] = useSelect(
    new Set(["Distance from the ocean"])
    // props.setMonths
  );
  const selectedValue = React.useMemo(
    () => Array.from(locations).join(", ").replaceAll("_", " "),
    [locations]
  );
  return (
    <div>
      <Dropdown>
        <Dropdown.Button flat>
          {selectedValue || "Distance from the ocean"}
        </Dropdown.Button>
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={locations}
          onSelectionChange={setLocations}
          aria-label="Static Actions"
        >
          <Dropdown.Item key="Island">Island</Dropdown.Item>
          <Dropdown.Item key="Near bay">Near bay</Dropdown.Item>
          <Dropdown.Item key="Near Ocean">Near Ocean</Dropdown.Item>
          <Dropdown.Item key="> 1 hour drive">{">"} 1 hour drive</Dropdown.Item>
          <Dropdown.Item key="Inland">Inland</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ProximitySelector;
