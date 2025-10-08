// Your code here.
const container = document.querySelector(".container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Handle mousedown (start dragging)
cubes.forEach((cube) => {
  cube.addEventListener("mousedown", (e) => {
    activeCube = cube;
    const rect = cube.getBoundingClientRect();

    // Calculate offset from mouse to cube corner
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Bring selected cube to top
    cube.style.position = "absolute";
    cube.style.zIndex = 1000;
  });
});

// Handle mousemove (dragging)
document.addEventListener("mousemove", (e) => {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeRect = activeCube.getBoundingClientRect();

  // Calculate new position (keeping inside container)
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxLeft = container.clientWidth - cubeRect.width;
  const maxTop = container.clientHeight - cubeRect.height;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  // Update cube position
  activeCube.style.left = newLeft + "px";
  activeCube.style.top = newTop + "px";
});

// Handle mouseup (drop)
document.addEventListener("mouseup", () => {
  if (activeCube) {
    activeCube.style.zIndex = "";
    activeCube = null;
  }
});
