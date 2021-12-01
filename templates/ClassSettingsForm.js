import { CharacterManager } from "../scripts/CharacterManager.js";
import { ClassManager } from "../scripts/ClassManager.js";

export class ClassSettingsForm extends FormApplication {

    constructor(className) {
        super();
        this.ClassName = className;
    }

    static get defaultOptions() {
        const defaults = super.defaultOptions;
    
        const overrides = {
            closeOnSubmit: false,
            submitOnChange: true,
            height: 200,
            width: 300,
            resizable: true,
            id: 'class-settings-form',
            template: CharacterManager.TEMPLATES.CLASSSETTINGS,
            title: 'Class Settings',
            tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "features"}]
        };
    
        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
      
        return mergedOptions;
    }
  
    getData(options) {
        return ClassManager.GetClassFeaturesFromName(this.ClassName);
    }    
}