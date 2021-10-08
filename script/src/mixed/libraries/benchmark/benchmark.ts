/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsBenchmark {
	private start: number;

	/**
	 * Starts the timer for the benchmark
	 */
	constructor() {
		this.start = GetGameTimer();
	}

	/**
	 * Stop the timer of the current benchmark and tells the ms difference between the start and the stop
	 * @returns The time difference in ms
	 */
	stop() {
		const difference = GetGameTimer() - this.start;
		return difference;
	}
}
