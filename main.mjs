import { CharacterManager } from './scripts/CharacterManager.js';
import { ClassManager } from './scripts/ClassManager.js';
import { ClassSettingsForm } from './templates/ClassSettingsForm.js'


Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(CharacterManager.MODULE_ID);
    CharacterManager.log(false, "Registered package debug flag with DevMode");
});
  

Hooks.once('init', async function() {
    CharacterManager.log(true, `Initializing ${CharacterManager.MODULE_ID}`);
});

Hooks.once('ready', async function() {
    CharacterManager.log(false, "Ready reached");

    // Add basic features to wizard class in compendium
    if (false && CharacterManager.DEBUG)
    {
        CharacterManager.log(false, "Setting up basic test wizard");

        let features = {
            features: [
                {
                    level: 1,
                    name: "Spellcasting"
                },
                {
                    level: 1,
                    name: "Arcane Recovery"
                },
                {
                    level: 2,
                    name: "Arcane Tradition"
                }
            ],
            spells: [],
            subclasses: []
        } 
    
        await ClassManager.UpdateClassFeatures("Wizard", features);
    
        let flag = await ClassManager.GetClassFeaturesFromName("Wizard");
    
        CharacterManager.log(false, "Flags on wizard", flag);
    }


    // Show wizard ClassSttingsForm
    if (false) {
        CharacterManager.log(false, "Showing wizard ClassSttingsForm");

        let wizard = await ClassManager.GetClass("Wizard");

        let form = new ClassSettingsForm(wizard);

        form.render(true);
    }
    
    
});


Hooks.on('renderCompendium', (compendium, html) => {

    CharacterManager.log(false, "Compendium Opened");

    if (compendium.metadata.name === CharacterManager.COMPNDIUMNAME) {
        CharacterManager.log(false, "Plugin Compendium Opened");

        const classes = html.find(`li.directory-item`);

        CharacterManager.log(false, "Found the following classes", classes);

        // insert a button at the end of each element
        classes.append(
            "<button type='button' class='character-manager-add-button flex0'>" +
                '<i class="fas fa-user-cog"></i>' +
            "</button>"
        );

        html.on('click', '.character-manager-add-button', (event) => {
            CharacterManager.log(false, 'Button Clicked!');

            const className = $(event.currentTarget).siblings(".entry-name").text();
            //.parents('[data-document-id]')?.data()?.documentId;
            const clickedClass = ClassManager.GetClass(className);
            //compendium.collection.index.get(classId);

            CharacterManager.log(false, 'Class settings clicked', clickedClass);
            
            new ClassSettingsForm(className).render(true, {title: className});
        });
    }
        
});