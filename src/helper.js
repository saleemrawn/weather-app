export function updateNavSelected(button) {
  const navButtons = document.querySelectorAll("nav button");

  navButtons.forEach((button) => {
    if (button.classList.contains("selected")) button.classList.remove("selected");
  });

  button.target.classList.add("selected");
}
