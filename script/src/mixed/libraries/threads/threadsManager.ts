/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsThreadsManager {
  private threadsList: TcsThread[]

  /**
   * Initialize the threads manager
   * Should only be called by the core
   */
  constructor() {
    this.threadsList = []
  }

  /**
   * Create a new thread
   * @param module Module that creates the thread
   * @param timer Delay between each executions
   * @param exec Function to execute
   * @returns Created thread id
   */
  createThread(module: string = GetCurrentResourceName(), timer: number, exec: Function): string {
    let found = false
    const currentThread =
      this.threadsList.find((thread) => {
        if (thread.getThreadTimer() == timer && !thread.isThreadFull) {
          found = true
          return true
        }
        return false
      }) || new TcsThread(timer)
    if (!found) {
      this.threadsList.push(currentThread)
    }

    return currentThread.appendThread(module, exec)
  }

  /**
   * Stop and deletes a thread
   * @param id Id of the thread to delete
   */
  removeThread(id: string) {
    this.threadsList.forEach((thread, index) => {
      if (thread.containsThreadById(id)) {
        const shouldDeleteThread = thread.removeThread(id)

        if (shouldDeleteThread) {
          this.threadsList.splice(index, 1)
        }

        return
      }
    })
  }

  /**
   * Stop all the threads that come from the specified module
   * @param module Module from which the threads to stop come from
   */
  removeThreadByModule(module: string = GetCurrentResourceName()) {
    this.threadsList.forEach((thread, index) => {
      const shouldDeleteThread = thread.removeModuleThreads(module)

      if (shouldDeleteThread) {
        this.threadsList.splice(index, 1)
        return this.removeThreadByModule(module)
      }
    })
  }
}
