/**
 * A class with some main constants and general functions
 */
export class CharacterManager {
    static MODULE_ID = 'character-manager';
    static MODULE_NAME = 'Character Manager';
    static COMPNDIUMNAME = 'class-manager-classes';
    static DEBUG = () => game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_ID);


    static FLAGS = {
        CLASS: 'class',
        SUBCLASS: 'subclass'
    }

    static TEMPLATES = {
        CLASSSETTINGS: `modules/${this.MODULE_ID}/templates/ClassSettingsForm.hbs`,
    };


    /**
     * A small helper function which leverages developer mode flags to gate debug logs.
     * 
     * @param {boolean} force - forces the log even if the debug flag is not on
     * @param  {...any} args - what to log
     */
    static log(force, ...args) {
        try {
            const isDebugging = game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_ID);

            if (force || isDebugging) {
                console.log(this.MODULE_ID, '|', ...args);
            }
        } catch (e) {
            console.error(e.message);
        }
    }

}