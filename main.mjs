import { CharacterManager } from './scripts/classes/CharacterManager.js';
import { ClassManager } from './scripts/classes/ClassManager.js';


Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(CharacterManager.MODULE_ID);
    CharacterManager.log(false, "Registered package debug flag with DevMode");
});
  

Hooks.once('init', async function() {
    CharacterManager.log(true, `Initializing ${CharacterManager.MODULE_ID}`);
});

Hooks.once('ready', async function() {
    CharacterManager.log(false, "Ready reached");

    if (false || CharacterManager.DEBUG)
    {
        let features = {
            1: "Spellcasting"
        }
    
        await ClassManager.UpdateClassFeatures("Wizard", features);
    
        let flag = await ClassManager.GetClassFeatures("Wizard");
    
        CharacterManager.log(false, "Flags on wizard", flag);
    }
    
    
});
