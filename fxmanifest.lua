fx_version 'bodacious'
game 'gta5'

author 'Maxence Leguede'
description 'TCS gamemode'
version '1.1.0'

resource_type 'gametype' { name = 'TCS' }


client_script 'build/assets/mixed_*.js'
client_script 'build/assets/cli_*.js'
client_script	'build/assets/config/**/mixed_*.js'
client_script	'build/assets/config/**/cli_*.js'
client_script 'build/src/mixed/**/*.js'
client_script 'build/src/client/libraries/**/*.js'
client_script 'build/src/client/types/**/*.js'
client_script 'build/src/client/tcs.js'
client_script	'build/src/client/main.js'
client_script 'build/src/client/modules/**/components/**/*.js'
client_script 'build/src/client/modules/**/main.js'

client_script 'build/src/mixed.min.js'
client_script 'build/src/client.min.js'


server_script 'build/assets/mixed_*.js'
server_script	'build/assets/srv_*.js'
server_script	'build/assets/config/**/mixed_*.js'
server_script	'build/assets/config/**/srv_*.js'
server_script 'build/src/mixed/**/*.js'
server_script 'build/src/server/libraries/**/*.js'
server_script 'build/src/server/types/**/*.js'
server_script 'build/src/server/tcs.js'
server_script	'build/src/server/main.js'
server_script 'build/src/server/modules/**/components/**/*.js'
server_script 'build/src/server/modules/**/main.js'


server_script 'build/src/mixed.min.js'
server_script 'build/src/server.min.js'



ui_page('build/web/index.html')

files {
	"build/assets/lang/**/*.json",
	"build/web/**/*"
}

