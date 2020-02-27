import { changeGameMode, CHANGE_GAME_MODE } from './actions';


describe('actions', () => {
	it('changeGameMode returns the mode as the gameMode in the payload', () => {
		const mode = 0
		const action =  {
			type: CHANGE_GAME_MODE,
			payload: {
				gameMode: mode
			}
		}
		expect(changeGameMode(0)).toEqual(action)
	})
})