let debounceTimeout: ReturnType<typeof setTimeout>;
function debounce(func: () => void, delay: number) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
}

export default debounce;
