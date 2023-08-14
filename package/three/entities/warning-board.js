import { createBoardBase } from "./bar-board";

export const createWarningBoards = options => {
  const results = [];
  const { data, width, height } = options;
  data.forEach(item => {
    const { title, content, x, y, z } = item;
    const el = createBoardBase({
      x,
      y,
      z
    });
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    const top = document.createElement("div");
    top.style.width = width + "px";
    top.style.height = height + "px";
    top.style.display = "flex";
    top.style.flexDirection = "column";
    top.style.justifyContent = "center";
    const titleContainer = document.createElement("div");
    titleContainer.innerText = title;
    const contentContainer = document.createElement("div");
    contentContainer.innerText = content;
    const tail = document.createElement("div");
    const img = document.createElement("img");
    img.style.width = "40px";
    img.style.height = "100px";
    tail.appendChild(img);
    top.appendChild(titleContainer);
    top.appendChild(contentContainer);
    el.appendChild(top);
    el.appendChild(tail);
    results.push(el);
  });
  return results;
};
