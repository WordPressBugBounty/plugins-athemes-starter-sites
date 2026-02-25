/**
 * Custom Colors Control component.
 *
 * @package Athemes Starter Sites
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ColorPicker, Popover, Icon } from '@wordpress/components';
import { rotateLeft } from '@wordpress/icons';
import { generateColorScheme } from '../../utils/color-utils';
import previewBridge from '../../utils/preview-bridge';

/**
 * Custom Colors Control component.
 *
 * @param {Object}   props                     Component props.
 * @param {string}   props.label               Label for the control.
 * @param {Array}    props.colorSchemes        Array of color scheme objects.
 * @param {string}   props.value               Currently selected color scheme ID.
 * @param {Function} props.onChange            Callback when selection changes.
 * @param {Function} props.onCustomColors      Callback when custom colors are generated.
 * @param {Object}   props.customColors        Previously saved custom colors (if any).
 * @param {string}   props.customPrimaryColor  Previously saved primary color (if any).
 * @param {Function} props.onPrimaryColorChange Callback when primary color changes.
 * @param {string}   props.themeName           Theme name (sydney, botiga, etc.) for generating CSS variables.
 * @return {JSX.Element} CustomColorsControl component.
 */
function CustomColorsControl( { label, colorSchemes = [], value, onChange, onCustomColors, customColors = {}, customPrimaryColor: savedPrimaryColor = '', onPrimaryColorChange, themeName = 'sydney' } ) {
	const [ customPrimaryColor, setCustomPrimaryColor ] = useState( savedPrimaryColor || '#cf2c2c' );
	const [ generatedColors, setGeneratedColors ] = useState( customColors );
	const [ contrastWarnings, setContrastWarnings ] = useState( [] );
	const [ isPickerOpen, setIsPickerOpen ] = useState( false );
	const colorSwatchRef = useRef( null );
	
	/**
	 * Get the first 3 colors from a color scheme.
	 *
	 * @param {Object} scheme Color scheme object with colors property.
	 * @return {Array} Array of color values.
	 */
	const getFirstThreeColors = ( scheme ) => {
		if ( ! scheme || ! scheme.colors ) {
			return [];
		}
		
		const colorValues = Object.values( scheme.colors );
		return colorValues.slice( 0, 3 );
	};

	/**
	 * Handle color scheme selection.
	 *
	 * @param {string} schemeId The ID of the selected color scheme.
	 */
	const handleSelect = ( schemeId ) => {
		if ( onChange ) {
			onChange( schemeId );
		}
	};
	
	/**
	 * Handle reset action.
	 */
	const handleReset = () => {
		if ( onChange ) {
			onChange( '' );
		}
		// Reset custom colors state
		setCustomPrimaryColor( '#cf2c2c' );
		setGeneratedColors( {} );
		setContrastWarnings( [] );
		if ( onCustomColors ) {
			onCustomColors( {} );
		}
		if ( onPrimaryColorChange ) {
			onPrimaryColorChange( '' );
		}
		// Reset colors in the preview iframe
		previewBridge.resetColors();
	};
	
	/**
	 * Handle custom primary color change.
	 *
	 * @param {string} color The new primary color.
	 */
	const handlePrimaryColorChange = ( color ) => {
		setCustomPrimaryColor( color );
		
		// Generate the color scheme with the theme name for proper CSS variable format
		const scheme = generateColorScheme( color, themeName );
		setGeneratedColors( scheme.colors );
		setContrastWarnings( scheme.warnings );
		
		// Notify parent component of generated colors and primary color
		if ( onCustomColors ) {
			onCustomColors( scheme.colors );
		}
		if ( onPrimaryColorChange ) {
			onPrimaryColorChange( color );
		}
	};
	
	/**
	 * Sync state with props from parent when they change.
	 * Only sync if we're not on custom mode, or if the colors are actually custom-generated.
	 */
	useEffect( () => {
		// Only sync customColors from props if we're not in custom mode
		// When in custom mode, we generate colors from primary color instead
		if ( value !== 'custom' && customColors && Object.keys( customColors ).length > 0 ) {
			setGeneratedColors( customColors );
		}
	}, [ customColors, value ] );
	
	useEffect( () => {
		if ( savedPrimaryColor ) {
			setCustomPrimaryColor( savedPrimaryColor );
		}
	}, [ savedPrimaryColor ] );
	
	/**
	 * Generate colors when custom is selected.
	 * This runs when switching to custom mode, ensuring we always show generated colors.
	 */
	useEffect( () => {
		if ( value === 'custom' ) {
			// Always regenerate colors when switching to custom mode
			// This ensures we show the palette based on the primary color, not the last scheme
			const scheme = generateColorScheme( customPrimaryColor, themeName );
			setGeneratedColors( scheme.colors );
			setContrastWarnings( scheme.warnings );
			
			// Notify parent component of generated colors and primary color
			if ( onCustomColors ) {
				onCustomColors( scheme.colors );
			}
			if ( onPrimaryColorChange ) {
				onPrimaryColorChange( customPrimaryColor );
			}
		}
	}, [ value, customPrimaryColor, themeName, onCustomColors, onPrimaryColorChange ] );

	return (
		<div className="atss-control atss-custom-colors-control">
			{ label && (
				<div className="atss-control__label-wrapper flex items-center">
					<label className="atss-control__label text-sm font-medium">
						{ label }
					</label>
					{ value && (
						<button
							type="button"
							className="atss-control__reset-button"
							onClick={ handleReset }
							aria-label={ __( 'Reset selection', 'athemes-starter-sites' ) }
						>
							<Icon icon={ rotateLeft } />
						</button>
					) }
				</div>
			) }
			
			<div className="atss-colors-control__grid">
				{ colorSchemes.map( ( scheme ) => {
					const colors = getFirstThreeColors( scheme );
					const isSelected = value === scheme.id;
					
					return (
						<button
							key={ scheme.id }
							type="button"
							className={ `atss-colors-control__option ${ isSelected ? 'atss-colors-control__option--selected' : '' }` }
							onClick={ () => handleSelect( scheme.id ) }
							aria-label={ scheme.name }
							aria-pressed={ isSelected }
						>
							<div className="atss-colors-control__circles">
								{ colors.map( ( color, index ) => (
									<span
										key={ index }
										className="atss-colors-control__circle"
										style={ { backgroundColor: color } }
									/>
								) ) }
							</div>
						</button>
					);
				} ) }
				
				{/* Custom color option - placeholder for future implementation */}
				<button
					type="button"
					className={ `atss-colors-control__option atss-colors-control__option--custom ${ value === 'custom' ? 'atss-colors-control__option--selected' : '' }` }
					onClick={ () => handleSelect( 'custom' ) }
					aria-label={ __( 'Custom Colors', 'athemes-starter-sites' ) }
					aria-pressed={ value === 'custom' }
				>
					<div className="atss-colors-control__circles">
						<span className="atss-colors-control__circle atss-colors-control__circle--dashed" />
						<span className="atss-colors-control__circle atss-colors-control__circle--dashed" />
						<span className="atss-colors-control__circle atss-colors-control__circle--dashed" />
					</div>
				</button>
			</div>
			
			{/* Custom color picker panel */}
			{ value === 'custom' && (
				<div className="atss-colors-control__custom-panel">
					<div className="atss-colors-control__picker-section">
						<label className="atss-colors-control__picker-label">
							{ __( 'Pick a Primary Color', 'athemes-starter-sites' ) }
						</label>
						<div className="atss-colors-control__picker-row">
							<div className="atss-colors-control__picker-trigger">
								<button
									ref={ colorSwatchRef }
									type="button"
									className="atss-colors-control__color-swatch"
									onClick={ () => setIsPickerOpen( ! isPickerOpen ) }
									aria-expanded={ isPickerOpen }
									aria-label={ __( 'Select color', 'athemes-starter-sites' ) }
								>
									<span
										className="atss-colors-control__color-preview"
										style={ { backgroundColor: customPrimaryColor } }
									/>
								</button>
								<input
									type="text"
									className="atss-colors-control__color-input"
									value={ customPrimaryColor }
									onChange={ ( e ) => handlePrimaryColorChange( e.target.value ) }
									placeholder="#cf2c2c"
								/>
								{ isPickerOpen && (
									<Popover
										anchor={ colorSwatchRef.current }
										placement="top-start"
										offset={ 10 }
										onClose={ () => setIsPickerOpen( false ) }
										className="atss-colors-control__picker-popover"
									>
										<ColorPicker
											color={ customPrimaryColor }
											onChange={ handlePrimaryColorChange }
											enableAlpha={ false }
											copyFormat="hex"
										/>
									</Popover>
								) }
							</div>
						</div>
					</div>
					
					{/* Contrast warnings */}
					{ contrastWarnings.length > 0 && (
						<div className="atss-colors-control__warnings">
							{ contrastWarnings.map( ( warning, index ) => (
								<p key={ index } className="atss-colors-control__warning">
									{ warning.message }
								</p>
							) ) }
						</div>
					) }
					
					{/* Generated color swatches */}
					{ Object.keys( generatedColors ).length > 0 && (
						<div className="atss-colors-control__swatches">
							<div className="atss-colors-control__swatches-grid">
								{ Object.entries( generatedColors ).map( ( [ key, color ] ) => (
									<div
										key={ key }
										className="atss-colors-control__swatch"
										style={ { backgroundColor: color } }
										title={ color }
									/>
								) ) }
							</div>
						</div>
					) }
					
					{/* Helper text */}
					<p className="atss-colors-control__helper-text">
						{ __( 'You can adjust the color palette later from the Customizer.', 'athemes-starter-sites' ) }
					</p>
				</div>
			) }
		</div>
	);
}

export default CustomColorsControl;

