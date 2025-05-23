const generateImage = async (prompt, style) => {
  try {
    toggleUI(false);
    
    const response = await fetch('https://tu-replit-url.repl.co/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        prompt: `${prompt}, ${getStylePrompt(style)}` 
      })
    });

    if (!response.ok) throw await response.json();
    
    const blob = await response.blob();
    displayImage(URL.createObjectURL(blob));
    currentImage = blob;

  } catch (error) {
    showError(error.suggestion || 'Error inesperado');
  } finally {
    toggleUI(true);
  }
};

const getStylePrompt = (style) => {
  const styles = {
    high_contrast: "black and white, high contrast, dramatic lighting",
    pencil_sketch: "black and white pencil sketch, grainy texture",
    noir: "film noir style, high contrast, cinematic b&w"
  };
  return styles[style] || styles.high_contrast;
};
