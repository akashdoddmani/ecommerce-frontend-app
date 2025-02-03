export const loadCartState = () => {
  if (typeof window === "undefined") {
    return undefined; // Return undefined if not in a browser environment
  }

  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load cart state", err);
    return undefined;
  }
};
