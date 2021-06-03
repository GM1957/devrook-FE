const colors = [
  "red",
  "orange",
  "darkgreen",
  "olive",
  "green",
  "teal",
  "blue",
  "violet",
  "purple",
  "pink",
  "brown",
  "coral",
  "crimson",
  "blueviolet",
  "deeppink",
];

const randomColor = () => {
  return colors[Math.floor(Math.random() * 16)];
};

export default randomColor;
