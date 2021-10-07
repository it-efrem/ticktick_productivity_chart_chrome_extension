import {appId} from "../common/constants";

const cssStyles = {};

export const createCssClass = (className, css) => {
  cssStyles[className] = css;
}

export const useCssClass = (element, className) => {
  const cn = `${appId}_${className}`
  element.classList.add(cn);
}

export const getStylesHTML = () => {
  return Object.entries(cssStyles).map(([className, css]) => {
    if (css) {
      const values = Object.entries(css).map(([key, value]) => ` ${key}: ${value};\n`).join('');
      return `.${appId}_${className} {\n${values}\n}\n`;
    }
    return null;
  }).join('');
}
