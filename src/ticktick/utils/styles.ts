import { appId } from "src/ticktick/common/constants";

const cssStyles: Record<string, object> = {};

export const createCssClass = (className: string, css: object) => {
  cssStyles[className] = css;
};

export const useCssClass = (element: HTMLElement, className: string) => {
  const cn = `${appId}_${className}`;
  element.classList.remove(cn);
  element.classList.add(cn);
};

export const getStylesHTML = () => {
  return Object.entries(cssStyles)
    .map(([className, css]) => {
      const values = Object.entries(css)
        .map(([key, value]) => ` ${key}: ${value};\n`)
        .join("");
      return `.${appId}_${className} {\n${values}\n}\n`;
    })
    .join("");
};
