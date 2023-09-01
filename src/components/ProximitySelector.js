import React, { useEffect, useState } from "react";
import { Dropdown } from "@nextui-org/react";
import { useSelect } from "../app/custom hooks/useSelect";

function ProximitySelector(props) {
  const [location, setLocation] = useSelect(
    new Set(["Distance from the ocean"])
  );
  const [selectedValue, setSelectedValue] = useState(location);

  useEffect(() => {
    setSelectedValue(location);
    props.handleChange(location[Object.keys(location)[0]]);
  }, [location]);
  return (
    <div>
      <Dropdown>
        <Dropdown.Button flat>
          {selectedValue || "Distance from the ocean"}
        </Dropdown.Button>
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={location}
          onSelectionChange={setLocation}
          aria-label="Static Actions"
        >
          <Dropdown.Item key="ISLAND">Island</Dropdown.Item>
          <Dropdown.Item key="NEAR BAY">Near bay</Dropdown.Item>
          <Dropdown.Item key="NEAR OCEAN">Near Ocean</Dropdown.Item>
          <Dropdown.Item key="<1H OCEAN"> 1 hour drive</Dropdown.Item>
          <Dropdown.Item key="INLAND">Inland</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ProximitySelector;
