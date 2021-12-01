import { CharacterManager } from './CharacterManager.js';

/**
 * Tracks DnD class specific details used to help with leveling up
 */
export class ClassManager {

    static async GetClassCompendium() {
        
        let compendium = game.packs.get(`world.${CharacterManager.COMPNDIUMNAME}`);

        if (compendium === undefined) {
            CharacterManager.log(true, "Class Compendium not found. Creating compendum...")

            compendium = await CompendiumCollection.createCompendium({
                entity: 'Item',
                label: `CM Classes`,
                name: compendiumName,
                package: "world",
            });
        }

        return compendium;
    }

    static async GetClasses() {
        let classPack = await this.GetClassCompendium();
        let classes = await classPack.getDocuments();
        let classNames = classes.map(c => c.name);

        CharacterManager.log(false, "Classes found", classNames);

        return classes;
    }


    static async GetClass(name) {
        let classes = await this.GetClasses();
        let result = classes.find(c => c.name === name);

        return result;
    }


    static async GetClassFeaturesFromName(className) {
        let classToRead = await this.GetClass(className);

        let features = await classToRead.getFlag(CharacterManager.MODULE_ID, CharacterManager.FLAGS.CLASS);

        return features;
    }


    static async GetClassFeatures(classToRead) {
        let features = await classToRead.getFlag(CharacterManager.MODULE_ID, CharacterManager.FLAGS.CLASS);

        return features;
    }

    


    static async UpdateClassFeatures(className, features) {
        CharacterManager.log(false, `Features to add to ${className}`, features);

        let classToUpdate = await this.GetClass(className);

        classToUpdate.setFlag(CharacterManager.MODULE_ID, CharacterManager.FLAGS.CLASS, features);
    }
}