import storyConfig from './config.json'

import macros from './macro'
import templates from './template'

import Core, { game, getScene } from './GameEngine/Core'
import { logger } from '@util/Logging'
import { loadGameData, saveGameData } from '@GameEngine/utils'
import { showHUD } from './HUD'
Config = {
	...Config, ...storyConfig, saves: {
		autoload: checkAutoload(),
		autosave: false,
		id: 'acp',
		isAllowed: function () { return State.passage === 'eventScenario' },
		slots: 8
	},
	ui: { stowBarInitially: true }
};

setup.ImagePath = "assets/";

((Config, State, Story, Engine, Dialog, $document) => {
	$(document.head).append('<link rel="stylesheet" href="./assets/Fork-Awesome-1.2.0/css/fork-awesome.min.css">')

	// Set State Variables
	variables().debug = Config.debug
	variables().version = 'Prototype'
	variables().subLevel = Config.subLevel

	// Config Auto Load if not on Start passage
	// Fixes Phaser not being avaliable on initial render
	$(document).on(':storyready', function (ev) {
		if (checkAutoload())
			Save.autosave.load()
		else
			Engine.play('Start')
	})

	// Setup noreturn
	$(document).on(':passagestart', function (ev) {
		loadPhaser(LoadScreen.lock(), ev)
	});

	// Config saving
	Save.onSave.add(function (save, details) {
		logger('Saving...')
		switch (details.type) {
			case 'serialize':
				logger('serialize')
				break
			case 'autosave':
			case 'disk':
			default:
				save.GameData = saveGameData()
		}
		save.title = getScene('EventInteraction').eventName
	})

	// Config loading
	Save.onLoad.add(function (save) {
		logger('Loading...')
		loadGameData(save.GameData)
	})
})(Config, State, Story, Engine, Dialog, $(document));

function checkAutoload() {
	return State.passage === 'eventScenario' && !_.isEmpty(State.passage) && Save.autosave.ok() && Save.autosave.has()
}

function passageStartRoutine(ev) {
	if (!ev.passage.tags.includes('noreturn'))
		variables().return = ev.passage.title;
	if (!ev.passage.tags.includes('nohud') && !$('#hud').length)
		showHUD()
}

function loadPhaser(lockID, ev) {
	if (!getScene('MainLoop'))
		setTimeout(loadPhaser, 100, lockID, ev)
	else {
		passageStartRoutine(ev)
		LoadScreen.unlock(lockID)
	}
}