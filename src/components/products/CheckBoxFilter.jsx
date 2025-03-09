const CheckboxFilter = ({
  items,
  selectedItems,
  onChange,
  singleSelect = false,
}) => {
  return items.map((item) => (
    <div key={item} className="mb-2">
      <input
        type="checkbox"
        id={item}
        className="mr-2"
        checked={
          singleSelect ? selectedItems === item : selectedItems.includes(item)
        }
        onChange={() => onChange(item)}
        aria-label={`Select ${item}`}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  ));
};

export default CheckboxFilter;
