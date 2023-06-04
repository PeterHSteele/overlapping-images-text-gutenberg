const { imageSizes } = useSelect(
  select => {
    const { getSettings } = select( blockEditorStore )
    const settings = getSettings();
    return { 
      imageSizes: settings.imageSizes
    }
  }
)

console.log(imageSizes)