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
import { useBlockProps, MediaPlaceholder, RichText, MediaReplaceFlow, InspectorControls, BlockControls, InnerBlocks } from '@wordpress/block-editor';

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

import { Popover, ColorPicker, ToolbarButton, PanelBody, TextControl } from '@wordpress/components';

import SelectWrap from './SelectWrap'; 
import BackdropColorControl from './BackdropColorControl'

import { useState, useRef } from 'react'
import { image as icon, brush } from '@wordpress/icons'
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data'
import { getBlobByURL, isBlobURL } from '@wordpress/blob';

export default function Edit({ attributes, setAttributes }) {

  let { idFirst, urlFirst } = attributes

  let [ selectedEl, setSelectedEl ] = useState(1)
  let [ picker, setPicker ] = useState(false)
  let [ anchor, setAnchor] = useState()
  let [ isEditingURL, setIsEditingURL ] = useState(false)

  const handleSelectEl = el => {
    return () => {
      return setSelectedEl( el )
    }
  }

  const onSelect = whichImage => {
    return media => {
      if (isBlobURL( media.url )) {
        return;
      }

      let attributes = {}
      attributes['url'+whichImage] = media.url
      attributes['id'+whichImage] = media.id
      attributes['alt'+whichImage] = media.alt
  
      setAttributes( attributes )
    }
  }

  const { createErrorNotice } = useDispatch( noticesStore )
  const onUploadError = message => {
    createErrorNotice( message, { type: 'snackbar', explicitDismiss: true } )
    setAttributes({
      urlFirst: undefined
    })
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

// <div className='ps-backdrop' style={{background: attributes.backdropColor}}>
	return (
		<div { ...useBlockProps() }>
      <BlockControls>
        {[1,2].includes(selectedEl) && (
        <MediaReplaceFlow 
        url={attributes.urlFirst} 
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
      <div className="ps-backdrop" ref={setAnchor} style={{background: attributes.backdropColor}}></div>
      <SelectWrap 
      className={`ps-image-one-wrap ${ 1==selectedEl? 'el-selected' : '' }`}
      handleClick={handleSelectEl(1)}
      >
      { attributes.urlFirst ?
        <img src={attributes.urlFirst} class="pscollage-image-one"  alt={attributes.altFirst} /> :
        <MediaPlaceholder 
        onSelect={ onSelect('First') }
        icon={icon}
        accept={"image/*"}
        allowedTypes={['image']}
        onError={onUploadError}
        />
      }
      </SelectWrap>
      <SelectWrap 
      className={`ps-image-two-wrap ${ 2 == selectedEl ? 'el-selected' : ''}`} 
      handleClick={handleSelectEl(2)}
      >
      {
        attributes.urlSecond ?
        <img src={attributes.urlSecond} class="pscollage-image-two" alt={attributes.altSecond} /> :
        <MediaPlaceholder 
        onSelect={ onSelect('Second') }
        icon={icon}
        accept={"image/*"}
        allowedTypes={['image']}
        onError={onUploadError}
        />
      }
      </SelectWrap>
      <SelectWrap 
      className={`ps-innerblocks-wrap ${ 3 == selectedEl ? 'el-selected' : ''}`}
      handleClick={handleSelectEl(3)}
      >
        <InnerBlocks />
      </SelectWrap>
		</div>
	);
}
//<Placeholder label={__('Collage Block', 'ps-collage')}>
//<FormFileUpload onChange={ value => alert(value )} >Select File</FormFileUpload>
//</Placeholder>

/*
<div>
        <img src={attributes.urlFirst} />
      </div>

      <TextControl label="Heading" value={attributes.heading} onChange={heading=>setAttributes({heading})} /> 

      <RichText 
        tagName='h2'
        value={ attributes.heading }
        onchange={ heading => setAttributes({heading})}
        allowedFormats={ [ 'core/bold', 'core/italic' ] }
        aria-label={__('Heading for the textual portion of the block.', 'ps-collage')}
        placeholder={__('Work With Us!', 'ps-collage')}
        />

        <SelectWrap
      handleClick={handleSelectEl(0)}
      className={`ps-backdrop ${ 0===selectedEl? 'el-selected' : '' }`}
      style={{background: attributes.backdropColor}}
      > 
      </SelectWrap>

      <RichText
        tagName='p'
        value={ attributes.callToActionText }
        onChange={callToActionText => setAttributes({ callToActionText })}
        allowedFormats={[ 'core/bold', 'core/italic', 'core/link']}
        aria-label={__('Enter text for call to action button.', 'ps-collage' )}
        placeholder={__('Learn More', 'ps-collage')}
        />

        {
          3 == selectedEl && (
            <LinkControl 
            value={{callToActionLink}}
            onChange={({
              url: newURL = ''
            })=>{
              setAttributes({url: prependHTTP(newURL)})
            }
            }
            />
          )
        } 


  <SelectWrap 
      className={`ps-text-wrap ${ 3 == selectedEl ? 'el-selected' : ''}`}
      handleClick={handleSelectEl(3)}
      >
        <RichText 
        tagName='h2'
        value={ attributes.heading }
        onChange={ heading => setAttributes({heading})}
        allowedFormats={ [ 'core/bold', 'core/italic' ] }
        aria-label={__('Heading for the textual portion of the block.', 'ps-collage')}
        placeholder={__('Work With Us!', 'ps-collage')}
        />
        <RichText
        tagName='p'
        value={ attributes.text }
        onChange={ text => setAttributes({ text })}
        allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
        aria-label={__('Body Text', 'ps-collage' )}
        placeholder={__("Flavor Text...", 'ps-collage')}
        />
        <div className="ps-buttonrow">
          <div class="ps-button">
            <RichText
            tagName='p'
            value={ attributes.callToActionText }
            className="ps-cta-button"
            onChange={handleLinkTextChange}
            withoutInteractiveFormatting
            aria-label={__('Enter text for call to action button.', 'ps-collage' )}
            placeholder={__('Learn More', 'ps-collage')}
            />
          </div>
        </div>
      </SelectWrap>
      <InspectorControls>
        <PanelBody title={__('Settings', 'ps-collage')}>
          <TextControl 
          value={attributes.callToActionLink}
          onChange={callToActionLink=>setAttributes({callToActionLink})}
          label={__('Link URL for Call to Action Button', 'ps-collage')}
          />
        </PanelBody>
      </InspectorControls>
*/

