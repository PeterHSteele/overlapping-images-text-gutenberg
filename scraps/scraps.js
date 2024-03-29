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

const genSrcset = media => {
  let srcset = ''
  const wantedSizes = [ 'medium', 'medium_large', 'large', 'full' ];
  if ( media.hasOwnProperty( 'sizes' )){
    const { sizes } = media
    wantedSizes.forEach( size => {
      if ( sizes[size] ){
        srcset += sizes[size]?.url + ' ' + sizes[size]?.width + 'w'
        if ( 'full' != size ) srcset += ', '
      }
    })
  } else {
    const { sizes } = media.media_details
    wantedSizes.forEach( size => {
      let sizeObj = sizes[size]
      if ( sizeObj ){
        srcset += sizeObj.source_url + ' ' + sizeObj.width+'w'
        if ( 'full' != size ) srcset += ', '
      }
    })
  }
  return srcset;
}

<div>
            <div className="suggested-size">
              <p>
                <span>{__( 'Suggested Size:', 'overlapping-images' )}</span>
                <span>{__('Width: 960px', 'overlapping-images')}</span>
                <span>{__('Height: 1200px')}</span>
              </p>
            </div>
            <MediaPlaceholder 
            onSelect={ onSelect('First') }
            icon={icon}
            accept={"image/*"}
            allowedTypes={['image']}
            onError={onUploadError("First")}
            />
          </div>