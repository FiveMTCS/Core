/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

import TcsBenchmark from '../benchmark/benchmark';
import * as Config from '@config/index';
import { error, warning } from '../logs/fivemConsole';
import IThreadExec from '../../types/threads/threadInterface';
import ConsoleColors from '../../types/consoleColors';

class TcsThread {
    private threadId: number;
    private execs: Array<IThreadExec>;
    private timer: number;
    private tick: number;

    isThreadFull: boolean;

    /**
     * Create a new thread with the specified delay
     *
     * @param {number} timer Delay between each executions
     */
    constructor(timer: number) {
        this.execs = [];
        this.timer = timer;
        this.isThreadFull = false;
        this.threadId = +new Date();

        this.tick = setTick(async () => {
            await this.delay(this.timer);

            const benchmark = new TcsBenchmark();
            this.execs.forEach((thread) => {
                try {
                    if (Config.Tcs.debugMode) this.debugExec(thread);
                    else thread.exec();
                } catch (e) {
                    error(
                        `Error encountered in thread ${ConsoleColors.YELLOW}${thread.id}${ConsoleColors.RED}: \n${e}`,
                    );
                }
            });
            const time = benchmark.stop();

            if (time > Config.Tcs.maxExecTimePerThread) {
                this.isThreadFull = true;
            }
        });
    }

    /**
     * Get current thread delay between each executions
     *
     * @returns {number} Thread delay
     */
    getThreadTimer = (): number => {
        return this.timer;
    };

    /**
     * Execute a thread function in debug mode
     *
     * @param {IThreadExec} thread Thread to execute
     */
    debugExec = (thread: IThreadExec) => {
        const debugBenchmark = new TcsBenchmark();
        thread.exec();
        const time = debugBenchmark.stop();

        if (time >= 1) {
            warning(
                `Thread ${
                    thread.id.split('-')[1]
                } took ${time} ms to execute !`,
            );
        }
    };

    /**
     * Wait the specified time
     *
     * @param {number} time Time of the delay
     * @returns {Promise<null>} Promise that is resolved after the delay
     */
    delay = (time: number): Promise<null> =>
        new Promise((resolve) => setTimeout(resolve, time));

    /**
     * Append a function to execute after the delay in the current thread
     *
     * @param {string} module Resource name the thread comes from
     * @param {() => void} exec Function to execute
     * @returns {string} Created thread id
     */
    appendThread = (
        module: string = GetCurrentResourceName(),
        exec: () => void,
    ): string => {
        const threadId = `${this.threadId}-${module}-${this.execs.length}`;
        const thread: IThreadExec = {
            id: threadId,
            exec: exec,
        };

        this.execs.push(thread);

        return threadId;
    };

    /**
     * Stop and remove the specified thread
     *
     * @param {string} id Id of the thread to remove
     * @returns {boolean} True if the current thread has to be deleted, false if not
     */
    removeThread = (id: string): boolean => {
        this.execs = this.execs.filter((thread) => thread.id !== id);
        if (this.execs.length == 0) {
            clearTick(this.tick);
            return true;
        }

        return false;
    };

    /**
     * Stop and remove the specified thread
     *
     * @param {string} module Resource from which the threads have to be stopped
     * @returns {boolean} True if the current thread has to be deleted, false if not
     */
    removeModuleThreads = (
        module: string = GetCurrentResourceName(),
    ): boolean => {
        this.execs = this.execs.filter(
            (thread) => thread.id.split('-')[1] !== module,
        );
        if (this.execs.length == 0) {
            clearTick(this.tick);
            return true;
        }

        return false;
    };

    /**
     * Get if a thread is actually contained in
     *
     * @param {string} id Id to search for
     * @returns {boolean} True if the thread is contained, false else
     */
    containsThreadById = (id: string): boolean => {
        return this.execs.find((thread) => thread.id === id) != null;
    };
}

export default TcsThread;
