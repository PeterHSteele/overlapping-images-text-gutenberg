/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

/*

        <RichText.Content tag="p" value={text} />
        <a href={callToActionLink}>{callToActionText}</a>
*/

/*
 <RichText.Content
        tagName="h2"
        value={ heading }
        />
*/

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

export default function save({ attributes }) {
  const blockProps = useBlockProps.save({className: 'layout-' + attributes.layout});
  const { heading, text, callToActionLink, callToActionText, urlFirst, altFirst, urlSecond, altSecond, backdropColor } = attributes
	return (
    <div { ...blockProps }>
      <div className='ps-backdrop' style={{background: backdropColor}}></div>
      <div className="ps-image-one-wrap">
        <img class="pscollage-image-one" src={urlFirst} alt={altFirst} />
      </div>
      <div className="ps-image-two-wrap">
        <img class="pscollage-image-two" src={urlSecond} alt='' role='presentation' />
      </div>
      <div className="ps-innerblocks-wrap">
        <InnerBlocks.Content />
      </div>
    </div>
	);
}