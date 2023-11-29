/**
 * The event prop can be customized using style and className.
 * Using Tailwind ClassName may not be optimal since Tailwind doesn't allow dynamic values.
 * So, use CSS style for any dynamic customization.
 */

// Tailwind colors: https://tailwindcss.com/docs/customizing-colors
const COLORS = {
  0: "#60a5fa", // blue-400 <-- reserved for self event
  1: "#f87171", // red-400
  2: "#fb923c", // orange-400
  3: "#4ade80", // green-400
  4: "#a78bfa", // violet-400
  5: "#f472b6", // pink-400
  6: "#22d3ee", // cyan-400
};

// Alpha-hex value table: https://borderleft.com/toolbox/rrggbbaa/
const OPACITY = {
  0: "80", // 70%
  1: "ff", // 100$
};

// Self event background color is colors[0].
// Opacity and visibility is determined by display setting option.
export const getSelfEventProp = (isOpaque, isDisplayed) => {
  let prop = { style: {}, className: "" };
  prop.style.backgroundColor = COLORS[0] + OPACITY[Number(isOpaque)];
  prop.style.color = "#ffffff" + OPACITY[Number(isOpaque)];
  prop.style.visibility = isDisplayed ? "visible" : "hidden";
  return prop;
};

// Group event background color ranges colors[1] to colors[n].
// Opacity and visibility is determined by display setting option.
export const getGroupEventProp = (groupId, isOpaque, isDisplayed) => {
  let prop = { style: {}, className: "" };
  prop.style.backgroundColor =
    getColorById(groupId) + OPACITY[Number(isOpaque)];
  prop.style.color = "#ffffff" + OPACITY[Number(isOpaque)];
  prop.style.visibility = isDisplayed ? "visible" : "hidden";
  return prop;
};

// Color index will cycle between [1, n] using modulo
// Colors will range colors[1] to colors[n]
export const getColorById = (id) => {
  if (id === 0) {
    return COLORS[id];
  }
  const totalColors = Object.keys(COLORS).length - 1;
  const colorIndex = id % totalColors || totalColors;
  return COLORS[colorIndex];
};