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
  const blockProps = useBlockProps.save({className: 'layout-' + attributes.layout});
  const { urlFirst, altFirst, urlSecond, backdropColor, srcsetFirst, srcsetSecond } = attributes
	return (
    <div { ...blockProps }>
      <div className='overlapping-imgs-backdrop' style={{background: backdropColor}}></div>
      <div className="overlapping-imgs-image-one-wrap">
        { urlFirst && (
          <img class="overlapping-imgs-image-one" 
          src={urlFirst} 
          alt={altFirst} 
          srcset={srcsetFirst} 
          sizes="(max-width: 650px) 282px, (max-width: 768px) 360px, (max-width: 1368px) 532px, 2560px"
          /> 
        )}
      </div>
      <div className="overlapping-imgs-image-two-wrap">
        { urlSecond && (
        <img 
        class="overlapping-imgs-image-two" 
        src={urlSecond}
        srcset={srcsetSecond}
        sizes="(max-width: 650px) 282px, (max-width: 768px) 360px, (max-width: 1368px) 532px, 2560px" 
        alt='' 
        role='presentation' />
        )}
      </div>
      <div className="overlapping-imgs-innerblocks-wrap">
        <InnerBlocks.Content />
      </div>
    </div>
	);
}