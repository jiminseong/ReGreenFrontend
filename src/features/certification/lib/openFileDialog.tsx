export const openFileDialog = (): Promise<{ file: File | null; previewUrl: string | null }> => {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => resolve({ file, previewUrl: reader.result as string });
        reader.readAsDataURL(file);
      } else {
        resolve({ file: null, previewUrl: null });
      }
    };
    input.click();
  });
};
