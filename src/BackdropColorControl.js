import { Dropdown, ToolbarButton } from '@wordpress/components'
import { brush } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

export default ({renderContent}) => {
  return (
    <Dropdown 
    popoverProps={{
      className: 'ps-collage-bg-color-control',
      headerTitle: __('Backdrop Color', 'ps-collage'),
      variant: 'toolbar',
      placement: 'bottom-start'
    }}
    renderContent={renderContent}
    renderToggle={({isOpen, onToggle})=>{
      return (
        <ToolbarButton 
        icon={brush}
        subscript={__('Backdrop Color','ps-collage')}
        describedBy={__('Choose backdrop color', 'ps-collage')}
        label={__('Backdrop Color', 'ps-collage')}
        showTooltip={true}
        onClick={onToggle}
        />
      )
    }}
    />
  )
}