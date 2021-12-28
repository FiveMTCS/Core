/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

enum ConsoleColors {
    RESET = '^0',
    RED = '^1',
    GREEN = '^2',
    YELLOW = '^3',
    BLUE = '^4',
}

globalThis.exports('ConsoleColors', () => ConsoleColors);
export default ConsoleColors;
