/**
 * Run state of the starter-site import, kept for the life of the page.
 *
 * The Import step reads and writes it, so a remount resumes the import
 * instead of starting over, and never runs a finished import again. The
 * wizard context reads isImportRunning() so history navigation cannot
 * unmount a running import.
 *
 * @package Athemes Starter Sites
 */

/**
 * The run state. Its identity never changes: resets assign new values.
 *
 * - signature:         demo, builder and step keys the step tracking belongs to.
 * - attempt:           1 on the first run, plus one per Try Again or remount.
 * - completedStepKeys: keys of the steps that completed.
 * - resumeStepKey:     key of the step a run stopped at, or null.
 * - issues:            steps that failed without aborting the import.
 * - finishedSignature: signature of the import whose step loop finished, or ''.
 * - finishedIssues:    the Issues of that finished import.
 *
 * @type {Object}
 */
const importRunState = {};

/**
 * Whether an import run is in progress.
 *
 * @type {boolean}
 */
let isRunning = false;

/**
 * Get the run state.
 *
 * @return {Object} The run state object.
 */
export const getImportRunState = () => importRunState;

/**
 * Forget the step tracking of an import. The finished marker stays.
 */
export const resetImportStepTracking = () => {
	Object.assign( importRunState, {
		signature: '',
		attempt: 0,
		completedStepKeys: new Set(),
		resumeStepKey: null,
		issues: [],
	} );
};

/**
 * Forget everything: step tracking, the finished marker and the running flag.
 */
export const resetImportRunState = () => {
	resetImportStepTracking();

	importRunState.finishedSignature = '';
	importRunState.finishedIssues = [];
	isRunning = false;
};

/**
 * Whether an import run is in progress.
 *
 * @return {boolean} True between the start and the end of a run.
 */
export const isImportRunning = () => isRunning;

/**
 * Mark an import run as started or ended.
 *
 * @param {boolean} running True when a run starts, false when it ends for any reason.
 */
export const setImportRunning = ( running ) => {
	isRunning = !! running;
};

resetImportRunState();
