fx_version 'bodacious'
game 'gta5'

author 'Maxence Leguede'
description 'TCS gamemode'
version '1.1.0'

resource_type 'gametype' { name = 'TCS' }



client_scripts {
	'build/src/**/mixed_*.enum.js',
	'build/src/**/cli_*.enum.js',
	'build/assets/mixed_*.js',
	'build/assets/cli_*.js',
	'build/assets/config/**/mixed_*.js',
	'build/assets/config/**/cli_*.js',
	'build/src/mixed_code.min.js',
	'build/src/cli_code.min.js',
	'build/src/**/mixed_*.js',
	'build/src/**/cli_*.js',
	'build/src/**/cli_*.min.js'
} 



server_script	'build/src/**/mixed_*.enum.js'
server_script	'build/src/**/srv_*.enum.js'
server_script	'build/assets/mixed_*.js'
server_script	'build/assets/srv_*.js'
server_script	'build/assets/config/**/mixed_*.js'
server_script	'build/assets/config/**/srv_*.js'
server_script	'build/src/mixed_code.min.js'
server_script	'build/src/srv_code.min.js'
server_script	'build/src/**/mixed_*.js'
server_script	'build/src/**/srv_*.js'
server_script	'build/src/**/srv_*.min.js'

ui_page('build/web/index.html')

files {
	"build/assets/lang/**/*.json",
	"build/assets/ui/**/*.png",
	"build/assets/ui/**/*.jpeg",
	"build/assets/ui/**/*.jpg",
	"build/assets/ui/**/*.ttf",
	"build/src/modules/**/lang/**/*.json",
	"build/web/**/*"
}

