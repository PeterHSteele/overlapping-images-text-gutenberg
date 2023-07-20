/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
  const blockProps = useBlockProps.save({className: 'layout-' + attributes.layout}),
  { urlFirst, altFirst, urlSecond, backdropColor, idFirst, idSecond } = attributes

	return (
    <div { ...blockProps }>
      <div className='overlapping-imgs-backdrop' style={{background: backdropColor}}></div>
      <div className="overlapping-imgs-center-content">
        <div className="overlapping-imgs-image-one-wrap">
          { urlFirst && (
            <img 
            className={`overlapping-imgs-image-one wp-image-${idFirst}`} 
            src={urlFirst} 
            alt={altFirst} 
            sizes="(max"
            /> 
          )}
        </div>
        <div className="overlapping-imgs-image-two-wrap">
          { urlSecond && (
          <img 
          className={`overlapping-imgs-image-two wp-image-${idSecond}`} 
          src={urlSecond}
          alt='' 
          role='presentation' />
          )}
        </div>
        <div className="overlapping-imgs-innerblocks-wrap">
          <div className="overlapping-imgs-card">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    </div>
	);
}