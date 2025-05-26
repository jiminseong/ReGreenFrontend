// openFileDialog.ts
export const prepareFileInput = (): HTMLInputElement => {
  const existing = document.getElementById("hidden-file-input");
  if (existing) existing.remove();

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.id = "hidden-file-input";
  input.style.display = "none";

  document.body.appendChild(input);
  return input;
};
