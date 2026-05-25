import "@testing-library/jest-dom";

declare global {
  interface Window {
    scrollTo: (x: number, y: number) => void;
  }
}

window.scrollTo = window.scrollTo || (() => undefined);
