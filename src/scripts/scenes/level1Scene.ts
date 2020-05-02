import Level from './level';
import Tutorial from '../objects/tutorial';

export default class Level1Scene extends Level{

    constructor(){
        // Name this scene Level1Scene,
        // Use json map with key 'level1'
        // 'Level2Scene' indicates which scene to jump to after.
        super('Level1Scene', 'level1', 'Level2Scene');
    }

    // Handle movement when level1scene starts
    init(){
        Tutorial.handleMovement(this);
    }
}