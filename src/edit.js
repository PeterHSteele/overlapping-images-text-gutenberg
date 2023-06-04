/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, MediaPlaceholder, MediaReplaceFlow, InspectorControls, BlockControls, InnerBlocks, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

import { ColorPicker, Button, Panel, PanelBody, __experimentalGrid as Grid } from '@wordpress/components';

import SelectWrap from './SelectWrap'; 
import BackdropColorControl from './BackdropColorControl'

import { useState } from 'react'
import { image as icon } from '@wordpress/icons'
import { store as noticesStore } from '@wordpress/notices';
import { useSelect, useDispatch } from '@wordpress/data'
import { isBlobURL } from '@wordpress/blob';
import { layoutButtonData } from './constants';

const genSrcset = media => {
  let srcset = ''
  if ( media.hasOwnProperty( 'sizes' )){
    ['medium', 'large', 'full'].forEach( size => {
      srcset += media.sizes[size]?.url + ' ' + media.sizes[size]?.width + 'w'
      if ( 'full' != size ) srcset += ', '
    })
  } else {
    [ 'medium', 'large', 'full' ].forEach( size => {
      let sizeObj = media.media_details.sizes[size]
      srcset += sizeObj.source_url + ' ' + sizeObj.width+'w'
      if ( 'full' != size ) srcset += ', '
    })
    
  }

  if (!srcset){
    console.log('srcset failed')
  }

  return srcset;
}

export default function Edit({ attributes, setAttributes }) {
  let [ selectedEl, setSelectedEl ] = useState(1)
  let [ picker, setPicker ] = useState(false)
  let [ anchor, setAnchor] = useState()
 
  const handleSelectEl = el => {
    return () => {
      return setSelectedEl( el )
    }
  }

  const onSelect = whichImage => {
    return media => {
      let attributes = {}

      if ( isBlobURL( media.url ) ){
        return
      }
      
      if ( !media || !media.url || isBlobURL( media.url ) ) {
        attributes['url' + whichImage] = '',
        attributes['alt' + whichImage] =  '',
        attributes['srcset' + whichImage] = '',
        attributes['id' + whichImage] = ''

        setAttributes( attributes )
        return;
      }

      let srcset = genSrcset( media )

      attributes['url'+whichImage] = media.url
      attributes['srcset'+whichImage] = srcset
      attributes['id'+whichImage] = media.id
      attributes['alt'+whichImage] = media.alt
  
      setAttributes( attributes )
    }
  }

  const { createErrorNotice } = useDispatch( noticesStore )

  const onUploadError = whichImage => message => {
    createErrorNotice( message, { type: 'snackbar' } )
    const newAttributes = {
      ['url'+whichImage]: undefined
    }
    setAttributes(newAttributes)
  }

  const togglePicker = () => setPicker(!picker)

  const bgPicker = () => (
    <ColorPicker 
    as="div"
    color={attributes.backdropColor}
    copyFormat="hex"
    onChange={ backdropColor => setAttributes({backdropColor})}
    />
  )

  const renderDropdownContent = pickerVisible => pickerVisible ? bgPicker() : null
  const { layout, backdropColor, altFirst, urlFirst } = attributes

	return (
		<div { ...useBlockProps({ className: 'layout-' + layout }) }>
      <BlockControls>
        {[1,2].includes(selectedEl) && (
        <MediaReplaceFlow 
        url={urlFirst} 
        allowedTypes={['image']}
        accept="image/*"
        onSelect={onSelect( 1 == selectedEl ? "First" : "Second" )}
        />
        )}
        <BackdropColorControl 
        handleClick={togglePicker}
        renderContent={renderDropdownContent}
        />
      </BlockControls>
      <div className="overlapping-imgs-backdrop" ref={setAnchor} style={{background: backdropColor}}></div>
      <SelectWrap 
      className={`overlapping-imgs-image-one-wrap ${ 1==selectedEl? 'el-selected' : '' }`}
      handleClick={handleSelectEl(1)}
      >
      { attributes.urlFirst ?
        <img src={urlFirst} class="overlapping-imgs-image-one"  alt={altFirst} /> :
        <MediaPlaceholder 
        onSelect={ onSelect('First') }
        icon={icon}
        accept={"image/*"}
        allowedTypes={['image']}
        onError={onUploadError("First")}
        />
      }
      </SelectWrap>
      <SelectWrap 
      className={`overlapping-imgs-image-two-wrap ${ 2 == selectedEl ? 'el-selected' : ''}`} 
      handleClick={handleSelectEl(2)}
      >
      {
        attributes.urlSecond ?
        <img src={attributes.urlSecond} class="overlapping-imgs-image-two" alt={attributes.altSecond} /> :
        <MediaPlaceholder 
        onSelect={ onSelect('Second') }
        icon={icon}
        accept={"image/*"}
        allowedTypes={['image']}
        onError={onUploadError("Second")}
        />
      }
      </SelectWrap>
      <SelectWrap 
      className={`overlapping-imgs-innerblocks-wrap ${ 3 == selectedEl ? 'el-selected' : ''}`}
      handleClick={handleSelectEl(3)}
      >
        <InnerBlocks />
      </SelectWrap>
      <InspectorControls>
        <Panel>
          <PanelBody 
          title={__('Layouts', 'overlapping-images')}
          opened={true}
          >
            <Grid
            columns={2}
            rows={2}>
            {layoutButtonData.map((layoutButton) => (
              <Button
              variant="secondary"
              label={layoutButton.label}
              className={`overlapping-imgs-layout-button ${layoutButton.name == layout? 'current-layout' : ''}`}
              onClick={()=>setAttributes({layout: layoutButton.name})}
              >
                {layoutButton.icon}
              </Button>
            ))}
            </Grid>
          </PanelBody>
        </Panel>
      </InspectorControls>
		</div>
	);
}