export function renderComponentBasedOnState(newState) {
  // Update your component based on newState
  // ...

  // Update the URL without reloading
  const newUrl = `${newState}`;
  window.history.pushState({ state: newState }, '', newUrl);
}
