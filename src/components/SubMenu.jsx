import React from 'react'


const SubMenu = ({ category }) => {
  let title;
  let description;

  switch (category) {
    case "cloth":
      title = "Cloth";
      description = "Shop the Latest trends in Women's Fashion";
      break;
    case "bags":
      title = "Bags";
      description = "Discover our range of stylish bags";
      break;
    case "beauty":
      title = "Beauty";
      description = "Explore our beauty products";
      break;
    default:
      title = "Shop";
      description = "Shop the Latest trends in Women's Fashion";
  }

  return (
    <div className="shop">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SubMenu