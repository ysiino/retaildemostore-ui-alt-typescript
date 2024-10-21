import React, { useState, useEffect } from "react";
import "./styles.css";
import ItemsApi from "./ItemsApi";
import IsoTopeGrid from "react-isotope";

export default function App() {
  const [items, setItems] = useState<any[]>([]);
  const [filters, updateFilters] = useState<any[]>([]);

  useEffect(() => {
    ItemsApi.fetchAll().then((items: any) => {
      const newItems = [...items];
      newItems.map((item) => (item.filter = [item.style]));
      setItems(newItems);

      const styles = new Set(newItems.map((item) => item.style));

      const newStyles = Array.from(styles).map((style) => {
        return { label: style, isChecked: true };
      });

      updateFilters(newStyles);
    });
  }, []);

  const onFilter = (event: any) => {
    const {
      target: { value, checked },
    } = event;

    updateFilters((state) =>
      state.map((f) => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked,
          };
        }

        return f;
      })
    );
  };
  
  return (
    <div className="App">
      <h1>Retail Demo Store UI</h1>

      <div>
        {filters.map((f) => (
          <button className="filter">
            <input
              key={`${f.label}_key`}
              type="checkbox"
              id={f.label}
              value={f.label}
              onChange={onFilter}
              checked={f.isChecked}
            />
            <label htmlFor={f.label}>{f.label}</label>
          </button>
        ))}
      </div>

      <div>
        <IsoTopeGrid
          gridLayout={items}
          noOfCols={2}
          unitWidth={300}
          unitHeight={200}
          filters={filters}
        >
          {items.map((item) => (
            <div key={item.id} className={`item`}>
              <a href={item.url?.replace('/#/', '/')} target="_blank">
                <img style={{ maxWidth: "100%", maxHeight: "90%" }} src={item.image} />
              </a>
            </div>
          ))}
        </IsoTopeGrid>
      </div>
    </div>
  );
}
