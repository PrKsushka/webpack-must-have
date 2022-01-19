const toggleBodyOverflow = (overflow = true) => {
  const { body } = document;
  if (overflow) {
    body.style.overflow = "auto";
  } else {
    body.style.overflow = "hidden";
  }
};
export default toggleBodyOverflow;
