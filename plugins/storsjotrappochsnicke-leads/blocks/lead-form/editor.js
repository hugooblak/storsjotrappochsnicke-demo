/**
 * Editor side of the Offertformulär block. No build step: plain JavaScript using WordPress's globals.
 * The preview is rendered by the same PHP as the live site, so what you see is what visitors get.
 */
( function ( wp ) {
	var el = wp.element.createElement;
	var __ = wp.i18n.__;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var PanelBody = wp.components.PanelBody;
	var SelectControl = wp.components.SelectControl;
	var TextControl = wp.components.TextControl;
	var Disabled = wp.components.Disabled;
	var ServerSideRender = wp.serverSideRender;

	wp.blocks.registerBlockType( 'storsjotrappochsnicke/lead-form', {
		edit: function ( props ) {
			var a = props.attributes;
			return el(
				'div',
				useBlockProps(),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Formulärinställningar', 'storsjotrappochsnicke-leads' ) },
						el( SelectControl, {
							label: __( 'Formulärtyp', 'storsjotrappochsnicke-leads' ),
							value: a.variant,
							options: [
								{ label: __( 'Start (Postnummer only, for heroes and page ends)', 'storsjotrappochsnicke-leads' ), value: 'start' },
								{ label: __( 'Fullt (alla fyra steg, för offertsidan)', 'storsjotrappochsnicke-leads' ), value: 'full' },
							],
							onChange: function ( v ) { props.setAttributes( { variant: v } ); },
						} ),
						a.variant === 'start' && el( TextControl, {
							label: __( 'Knapptext', 'storsjotrappochsnicke-leads' ),
							help: __( 'Leave empty for "Räkna på mitt tak".', 'storsjotrappochsnicke-leads' ),
							value: a.buttonText,
							onChange: function ( v ) { props.setAttributes( { buttonText: v } ); },
						} ),
						el( 'p', { style: { color: '#555' } }, __( 'Questions and answer choices are set in the AB Storsjö Trapp & Snickerifabrik Leads plugin (includes/fields.php). Leads appear under Leads in the admin menu.', 'storsjotrappochsnicke-leads' ) )
					)
				),
				el( Disabled, null, el( ServerSideRender, { block: 'storsjotrappochsnicke/lead-form', attributes: a } ) )
			);
		},
		save: function () { return null; },
	} );
} )( window.wp );
