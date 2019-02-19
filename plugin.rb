# name: discourse-hiveon-homepage
# about: Show custom Hiveon homepage
# version: 1.0
# author: Val
# url: https://github.com/vgolovach/hiveon-forum-plugin

enabled_site_setting :hiveon_homepage_enabled
PLUGIN_NAME = "hiveon_forum_plugin".freeze

register_asset "stylesheets/hiveon-homepage-base.scss"
register_asset "javascripts/hiveon-homepage-base.js"

