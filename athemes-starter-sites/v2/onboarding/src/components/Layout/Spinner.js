/**
 * Loading spinner component.
 *
 * @return {JSX.Element} Loading spinner.
 */
function Spinner() {
	return (
	<div className="atss-onboarding-wizard__loading">
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
	</div>
	);
}

export default Spinner;