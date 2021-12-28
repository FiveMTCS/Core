fx_version 'bodacious'
game 'gta5'

dependency 'webpack'
dependency 'yarn'

author 'Maxence Leguede'
description 'TCS gamemode'
version '1.1.0'

resource_type 'gametype' { name = 'TCS' }

webpack_config 'webpacks/server.config.js'
webpack_config 'webpacks/client.config.js'

client_script 'dist/client/main.js'
server_script 'dist/server/main.js'



ui_page('dist/web/index.html')

files {
	"lang/**/*.json",
	"dist/web/**/*"
}

