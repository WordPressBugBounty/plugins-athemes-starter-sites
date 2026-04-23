import isBotiga from '../../utils/is-botiga';

/**
 * Loading spinner component.
 *
 * @return {JSX.Element} Loading spinner.
 */
function Spinner( { fill = '#335EEA' } ) {
	return (
	<div className="atss-onboarding-wizard__loading">
		{ isBotiga && (
			<svg className="atss-onboarding-wizard__spinner" viewBox="0 0 33 33" fill={ fill } xmlns="http://www.w3.org/2000/svg">
				<path d="M19.047 2.984c0 1.125-.625 2.063-1.5 2.625-.938.563-2.125.563-3 0-.938-.562-1.5-1.5-1.5-2.625 0-1.062.562-2 1.5-2.562.875-.563 2.062-.563 3 0 .875.562 1.5 1.5 1.5 2.562Zm0 26c0 1.125-.625 2.063-1.5 2.625-.938.563-2.125.563-3 0-.938-.562-1.5-1.5-1.5-2.625 0-1.062.562-2 1.5-2.562.875-.563 2.062-.563 3 0 .875.562 1.5 1.5 1.5 2.562Zm-16-10c-1.125 0-2.063-.562-2.625-1.5-.563-.875-.563-2.062 0-3 .562-.875 1.5-1.5 2.625-1.5 1.062 0 2 .625 2.562 1.5.563.938.563 2.125 0 3-.562.938-1.5 1.5-2.562 1.5Zm29-3c0 1.125-.625 2.063-1.5 2.625-.938.563-2.125.563-3 0-.938-.562-1.5-1.5-1.5-2.625 0-1.062.562-2 1.5-2.562.875-.563 2.062-.563 3 0 .875.562 1.5 1.5 1.5 2.562ZM8.922 27.297c-.75.812-1.813 1.062-2.875.812-1.063-.312-1.813-1.062-2.125-2.125-.25-1.062 0-2.125.812-2.875.75-.812 1.813-1.062 2.875-.812a3.279 3.279 0 0 1 2.125 2.125c.25 1.062 0 2.125-.812 2.875Zm0-18.375c-.75.812-1.813 1.062-2.875.812C4.984 9.422 4.234 8.61 3.922 7.61c-.25-1.062 0-2.125.812-2.937.688-.75 1.813-1.063 2.875-.813 1.063.25 1.938 1.063 2.188 2.125.25 1.063-.063 2.188-.875 2.938Zm14.187 18.375c-.812-.75-1.062-1.813-.812-2.875a3.279 3.279 0 0 1 2.125-2.125c1.062-.25 2.125 0 2.937.812.75.75 1 1.813.75 2.875-.312 1.063-1.062 1.813-2.125 2.125-1.062.25-2.125 0-2.875-.812Z"/>
			</svg>
		) }

		{ ! isBotiga && (
		<svg
			className="atss-onboarding-wizard__spinner"
			viewBox="0 0 36 36"
			fill="none"
		>
			<path
				d="M34 18C34 15.8989 33.5861 13.8183 32.7821 11.8771C31.978 9.93586 30.7994 8.17203 29.3137 6.68629C27.828 5.20055 26.0641 4.022 24.1229 3.21793C22.1817 2.41385 20.1011 2 18 2C15.8988 2 13.8183 2.41385 11.8771 3.21793C9.93585 4.022 8.17203 5.20055 6.68629 6.68629C5.20055 8.17203 4.022 9.93586 3.21793 11.8771C2.41385 13.8183 2 15.8989 2 18"
				stroke="url(#atss-spinner-gradient-0)"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray="0.1 8"
			/>
			<path
				d="M3.21793 24.1229C4.022 26.0641 5.20055 27.828 6.68629 29.3137C8.17203 30.7994 9.93585 31.978 11.8771 32.7821C13.8183 33.5861 15.8988 34 18 34C20.1011 34 22.1817 33.5861 24.1229 32.7821C26.0641 31.978 27.828 30.7994 29.3137 29.3137C30.7994 27.828 31.978 26.0641 32.7821 24.1229"
				stroke="url(#atss-spinner-gradient-1)"
				strokeWidth="4"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeDasharray="0.1 8"
			/>
			<defs>
				<linearGradient
					id="atss-spinner-gradient-0"
					x1="34"
					y1="18"
					x2="2"
					y2="18"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor" />
					<stop offset="1" stopColor="currentColor" stopOpacity="0.5" />
				</linearGradient>
				<linearGradient
					id="atss-spinner-gradient-1"
					x1="33"
					y1="23.5"
					x2="3"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopOpacity="0" stopColor="currentColor" />
					<stop offset="1" stopColor="currentColor" stopOpacity="0.48" />
				</linearGradient>
			</defs>
		</svg>
		) }
	</div>
	);
}

export default Spinner;
