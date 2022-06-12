# Autogenerated config.py
#
# NOTE: config.py is intended for advanced users who are comfortable
# with manually migrating the config file on qutebrowser upgrades. If
# you prefer, you can also configure qutebrowser using the
# :set/:bind/:config-* commands without having to write a config.py
# file.
#
# Documentation:
#   qute://help/configuring.html
#   qute://help/settings.html

# Change the argument to True to still load settings configured via autoconfig.yml
config.load_autoconfig(False)

# Which cookies to accept. With QtWebEngine, this setting also controls
# other features with tracking capabilities similar to those of cookies;
# including IndexedDB, DOM storage, filesystem API, service workers, and
# AppCache. Note that with QtWebKit, only `all` and `never` are
# supported as per-domain values. Setting `no-3rdparty` or `no-
# unknown-3rdparty` per-domain on QtWebKit will have the same effect as
# `all`. If this setting is used with URL patterns, the pattern gets
# applied to the origin/first party URL of the page making the request,
# not the request URL. With QtWebEngine 5.15.0+, paths will be stripped
# from URLs, so URL patterns using paths will not match. With
# QtWebEngine 5.15.2+, subdomains are additionally stripped as well, so
# you will typically need to set this setting for `example.com` when the
# cookie is set on `somesubdomain.example.com` for it to work properly.
# To debug issues with this setting, start qutebrowser with `--debug
# --logfilter network --debug-flag log-cookies` which will show all
# cookies being set.
# Type: String
# Valid values:
#   - all: Accept all cookies.
#   - no-3rdparty: Accept cookies from the same origin only. This is known to break some sites, such as GMail.
#   - no-unknown-3rdparty: Accept cookies from the same origin only, unless a cookie is already set for the domain. On QtWebEngine, this is the same as no-3rdparty.
#   - never: Don't accept cookies at all.
config.set('content.cookies.accept', 'all', 'chrome-devtools://*')

# Which cookies to accept. With QtWebEngine, this setting also controls
# other features with tracking capabilities similar to those of cookies;
# including IndexedDB, DOM storage, filesystem API, service workers, and
# AppCache. Note that with QtWebKit, only `all` and `never` are
# supported as per-domain values. Setting `no-3rdparty` or `no-
# unknown-3rdparty` per-domain on QtWebKit will have the same effect as
# `all`. If this setting is used with URL patterns, the pattern gets
# applied to the origin/first party URL of the page making the request,
# not the request URL. With QtWebEngine 5.15.0+, paths will be stripped
# from URLs, so URL patterns using paths will not match. With
# QtWebEngine 5.15.2+, subdomains are additionally stripped as well, so
# you will typically need to set this setting for `example.com` when the
# cookie is set on `somesubdomain.example.com` for it to work properly.
# To debug issues with this setting, start qutebrowser with `--debug
# --logfilter network --debug-flag log-cookies` which will show all
# cookies being set.
# Type: String
# Valid values:
#   - all: Accept all cookies.
#   - no-3rdparty: Accept cookies from the same origin only. This is known to break some sites, such as GMail.
#   - no-unknown-3rdparty: Accept cookies from the same origin only, unless a cookie is already set for the domain. On QtWebEngine, this is the same as no-3rdparty.
#   - never: Don't accept cookies at all.
config.set('content.cookies.accept', 'all', 'devtools://*')

# Value to send in the `Accept-Language` header. Note that the value
# read from JavaScript is always the global value.
# Type: String
config.set('content.headers.accept_language', '', 'https://matchmaker.krunker.io/*')

# User agent to send.  The following placeholders are defined:  *
# `{os_info}`: Something like "X11; Linux x86_64". * `{webkit_version}`:
# The underlying WebKit version (set to a fixed value   with
# QtWebEngine). * `{qt_key}`: "Qt" for QtWebKit, "QtWebEngine" for
# QtWebEngine. * `{qt_version}`: The underlying Qt version. *
# `{upstream_browser_key}`: "Version" for QtWebKit, "Chrome" for
# QtWebEngine. * `{upstream_browser_version}`: The corresponding
# Safari/Chrome version. * `{qutebrowser_version}`: The currently
# running qutebrowser version.  The default value is equal to the
# unchanged user agent of QtWebKit/QtWebEngine.  Note that the value
# read from JavaScript is always the global value. With QtWebEngine
# between 5.12 and 5.14 (inclusive), changing the value exposed to
# JavaScript requires a restart.
# Type: FormatString
config.set('content.headers.user_agent', 'Mozilla/5.0 ({os_info}) AppleWebKit/{webkit_version} (KHTML, like Gecko) {upstream_browser_key}/{upstream_browser_version} Safari/{webkit_version}', 'https://web.whatsapp.com/')

# User agent to send.  The following placeholders are defined:  *
# `{os_info}`: Something like "X11; Linux x86_64". * `{webkit_version}`:
# The underlying WebKit version (set to a fixed value   with
# QtWebEngine). * `{qt_key}`: "Qt" for QtWebKit, "QtWebEngine" for
# QtWebEngine. * `{qt_version}`: The underlying Qt version. *
# `{upstream_browser_key}`: "Version" for QtWebKit, "Chrome" for
# QtWebEngine. * `{upstream_browser_version}`: The corresponding
# Safari/Chrome version. * `{qutebrowser_version}`: The currently
# running qutebrowser version.  The default value is equal to the
# unchanged user agent of QtWebKit/QtWebEngine.  Note that the value
# read from JavaScript is always the global value. With QtWebEngine
# between 5.12 and 5.14 (inclusive), changing the value exposed to
# JavaScript requires a restart.
# Type: FormatString
config.set('content.headers.user_agent', 'Mozilla/5.0 ({os_info}; rv:90.0) Gecko/20100101 Firefox/90.0', 'https://accounts.google.com/*')

# User agent to send.  The following placeholders are defined:  *
# `{os_info}`: Something like "X11; Linux x86_64". * `{webkit_version}`:
# The underlying WebKit version (set to a fixed value   with
# QtWebEngine). * `{qt_key}`: "Qt" for QtWebKit, "QtWebEngine" for
# QtWebEngine. * `{qt_version}`: The underlying Qt version. *
# `{upstream_browser_key}`: "Version" for QtWebKit, "Chrome" for
# QtWebEngine. * `{upstream_browser_version}`: The corresponding
# Safari/Chrome version. * `{qutebrowser_version}`: The currently
# running qutebrowser version.  The default value is equal to the
# unchanged user agent of QtWebKit/QtWebEngine.  Note that the value
# read from JavaScript is always the global value. With QtWebEngine
# between 5.12 and 5.14 (inclusive), changing the value exposed to
# JavaScript requires a restart.
# Type: FormatString
config.set('content.headers.user_agent', 'Mozilla/5.0 ({os_info}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99 Safari/537.36', 'https://*.slack.com/*')

# Load images automatically in web pages.
# Type: Bool
config.set('content.images', True, 'chrome-devtools://*')

# Load images automatically in web pages.
# Type: Bool
config.set('content.images', True, 'devtools://*')

# Enable JavaScript.
# Type: Bool
config.set('content.javascript.enabled', True, 'chrome-devtools://*')

# Enable JavaScript.
# Type: Bool
config.set('content.javascript.enabled', True, 'devtools://*')

# Enable JavaScript.
# Type: Bool
config.set('content.javascript.enabled', True, 'chrome://*/*')

# Enable JavaScript.
# Type: Bool
config.set('content.javascript.enabled', True, 'qute://*/*')

# CSS border value for hints.
# Type: String
c.hints.border = '1px solid #282a36'

# Padding (in pixels) for the statusbar.
# Type: Padding
c.statusbar.padding = {'top': 6, 'right': 8, 'bottom': 6, 'left': 8}

# Scaling factor for favicons in the tab bar. The tab size is unchanged,
# so big favicons also require extra `tabs.padding`.
# Type: Float
c.tabs.favicons.scale = 1

# Padding (in pixels) around text for tabs.
# Type: Padding
c.tabs.padding = {'top': 6, 'right': 8, 'bottom': 6, 'left': 8}

# Width (in pixels) of the progress indicator (0 to disable).
# Type: Int
c.tabs.indicator.width = 1

# Text color of the completion widget. May be a single color to use for
# all columns or a list of three colors, one for each column.
# Type: List of QtColor, or QtColor
c.colors.completion.fg = '#abb2bf'

# Background color of the completion widget for odd rows.
# Type: QssColor
c.colors.completion.odd.bg = '#353b45'

# Background color of the completion widget for even rows.
# Type: QssColor
c.colors.completion.even.bg = '#282c34'

# Foreground color of completion widget category headers.
# Type: QtColor
c.colors.completion.category.fg = '#e5c07b'

# Background color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.bg = '#282c34'

# Top border color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.border.top = '#282c34'

# Bottom border color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.border.bottom = '#282c34'

# Foreground color of the selected completion item.
# Type: QtColor
c.colors.completion.item.selected.fg = '#abb2bf'

# Background color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.bg = '#3e4451'

# Top border color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.border.top = '#3e4451'

# Bottom border color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.border.bottom = '#3e4451'

# Foreground color of the matched text in the selected completion item.
# Type: QtColor
c.colors.completion.item.selected.match.fg = '#98c379'

# Foreground color of the matched text in the completion.
# Type: QtColor
c.colors.completion.match.fg = '#98c379'

# Color of the scrollbar handle in the completion view.
# Type: QssColor
c.colors.completion.scrollbar.fg = '#abb2bf'

# Color of the scrollbar in the completion view.
# Type: QssColor
c.colors.completion.scrollbar.bg = '#282c34'

# Background color of the context menu. If set to null, the Qt default
# is used.
# Type: QssColor
c.colors.contextmenu.menu.bg = '#282c34'

# Foreground color of the context menu. If set to null, the Qt default
# is used.
# Type: QssColor
c.colors.contextmenu.menu.fg = '#abb2bf'

# Background color of the context menu's selected item. If set to null,
# the Qt default is used.
# Type: QssColor
c.colors.contextmenu.selected.bg = '#3e4451'

# Foreground color of the context menu's selected item. If set to null,
# the Qt default is used.
# Type: QssColor
c.colors.contextmenu.selected.fg = '#abb2bf'

# Background color of disabled items in the context menu. If set to
# null, the Qt default is used.
# Type: QssColor
c.colors.contextmenu.disabled.bg = '#353b45'

# Foreground color of disabled items in the context menu. If set to
# null, the Qt default is used.
# Type: QssColor
c.colors.contextmenu.disabled.fg = '#565c64'

# Background color for the download bar.
# Type: QssColor
c.colors.downloads.bar.bg = '#282c34'

# Color gradient start for download text.
# Type: QtColor
c.colors.downloads.start.fg = '#282c34'

# Color gradient start for download backgrounds.
# Type: QtColor
c.colors.downloads.start.bg = '#61afef'

# Color gradient end for download text.
# Type: QtColor
c.colors.downloads.stop.fg = '#282c34'

# Color gradient stop for download backgrounds.
# Type: QtColor
c.colors.downloads.stop.bg = '#56b6c2'

# Color gradient interpolation system for download backgrounds.
# Type: ColorSystem
# Valid values:
#   - rgb: Interpolate in the RGB color system.
#   - hsv: Interpolate in the HSV color system.
#   - hsl: Interpolate in the HSL color system.
#   - none: Don't show a gradient.
c.colors.downloads.system.bg = 'none'

# Foreground color for downloads with errors.
# Type: QtColor
c.colors.downloads.error.fg = '#e06c75'

# Background color for downloads with errors.
# Type: QtColor
c.colors.downloads.error.bg = '#282a36'

# Font color for hints.
# Type: QssColor
c.colors.hints.fg = '#282c34'

# Background color for hints. Note that you can use a `rgba(...)` value
# for transparency.
# Type: QssColor
c.colors.hints.bg = '#e5c07b'

# Font color for the matched part of hints.
# Type: QtColor
c.colors.hints.match.fg = '#abb2bf'

# Text color for the keyhint widget.
# Type: QssColor
c.colors.keyhint.fg = '#abb2bf'

# Highlight color for keys to complete the current keychain.
# Type: QssColor
c.colors.keyhint.suffix.fg = '#abb2bf'

# Background color of the keyhint widget.
# Type: QssColor
c.colors.keyhint.bg = '#282c34'

# Foreground color of an error message.
# Type: QssColor
c.colors.messages.error.fg = '#282c34'

# Background color of an error message.
# Type: QssColor
c.colors.messages.error.bg = '#e06c75'

# Border color of an error message.
# Type: QssColor
c.colors.messages.error.border = '#e06c75'

# Foreground color of a warning message.
# Type: QssColor
c.colors.messages.warning.fg = '#282c34'

# Background color of a warning message.
# Type: QssColor
c.colors.messages.warning.bg = '#c678dd'

# Border color of a warning message.
# Type: QssColor
c.colors.messages.warning.border = '#c678dd'

# Foreground color of an info message.
# Type: QssColor
c.colors.messages.info.fg = '#abb2bf'

# Background color of an info message.
# Type: QssColor
c.colors.messages.info.bg = '#282c34'

# Border color of an info message.
# Type: QssColor
c.colors.messages.info.border = '#282c34'

# Foreground color for prompts.
# Type: QssColor
c.colors.prompts.fg = '#abb2bf'

# Border used around UI elements in prompts.
# Type: String
c.colors.prompts.border = '#282c34'

# Background color for prompts.
# Type: QssColor
c.colors.prompts.bg = '#282c34'

# Foreground color for the selected item in filename prompts.
# Type: QssColor
c.colors.prompts.selected.fg = '#abb2bf'

# Background color for the selected item in filename prompts.
# Type: QssColor
c.colors.prompts.selected.bg = '#3e4451'

# Foreground color of the statusbar.
# Type: QssColor
c.colors.statusbar.normal.fg = '#98c379'

# Background color of the statusbar.
# Type: QssColor
c.colors.statusbar.normal.bg = '#282c34'

# Foreground color of the statusbar in insert mode.
# Type: QssColor
c.colors.statusbar.insert.fg = '#282c34'

# Background color of the statusbar in insert mode.
# Type: QssColor
c.colors.statusbar.insert.bg = '#61afef'

# Foreground color of the statusbar in passthrough mode.
# Type: QssColor
c.colors.statusbar.passthrough.fg = '#282c34'

# Background color of the statusbar in passthrough mode.
# Type: QssColor
c.colors.statusbar.passthrough.bg = '#56b6c2'

# Foreground color of the statusbar in private browsing mode.
# Type: QssColor
c.colors.statusbar.private.fg = '#282c34'

# Background color of the statusbar in private browsing mode.
# Type: QssColor
c.colors.statusbar.private.bg = '#353b45'

# Foreground color of the statusbar in command mode.
# Type: QssColor
c.colors.statusbar.command.fg = '#abb2bf'

# Background color of the statusbar in command mode.
# Type: QssColor
c.colors.statusbar.command.bg = '#282c34'

# Foreground color of the statusbar in private browsing + command mode.
# Type: QssColor
c.colors.statusbar.command.private.fg = '#abb2bf'

# Background color of the statusbar in private browsing + command mode.
# Type: QssColor
c.colors.statusbar.command.private.bg = '#282c34'

# Foreground color of the statusbar in caret mode.
# Type: QssColor
c.colors.statusbar.caret.fg = '#282c34'

# Background color of the statusbar in caret mode.
# Type: QssColor
c.colors.statusbar.caret.bg = '#c678dd'

# Foreground color of the statusbar in caret mode with a selection.
# Type: QssColor
c.colors.statusbar.caret.selection.fg = '#282c34'

# Background color of the statusbar in caret mode with a selection.
# Type: QssColor
c.colors.statusbar.caret.selection.bg = '#61afef'

# Background color of the progress bar.
# Type: QssColor
c.colors.statusbar.progress.bg = '#61afef'

# Default foreground color of the URL in the statusbar.
# Type: QssColor
c.colors.statusbar.url.fg = '#abb2bf'

# Foreground color of the URL in the statusbar on error.
# Type: QssColor
c.colors.statusbar.url.error.fg = '#e06c75'

# Foreground color of the URL in the statusbar for hovered links.
# Type: QssColor
c.colors.statusbar.url.hover.fg = '#abb2bf'

# Foreground color of the URL in the statusbar on successful load
# (http).
# Type: QssColor
c.colors.statusbar.url.success.http.fg = '#56b6c2'

# Foreground color of the URL in the statusbar on successful load
# (https).
# Type: QssColor
c.colors.statusbar.url.success.https.fg = '#98c379'

# Foreground color of the URL in the statusbar when there's a warning.
# Type: QssColor
c.colors.statusbar.url.warn.fg = '#c678dd'

# Background color of the tab bar.
# Type: QssColor
c.colors.tabs.bar.bg = '#282c34'

# Color gradient start for the tab indicator.
# Type: QtColor
c.colors.tabs.indicator.start = '#61afef'

# Color gradient end for the tab indicator.
# Type: QtColor
c.colors.tabs.indicator.stop = '#56b6c2'

# Color for the tab indicator on errors.
# Type: QtColor
c.colors.tabs.indicator.error = '#e06c75'

# Color gradient interpolation system for the tab indicator.
# Type: ColorSystem
# Valid values:
#   - rgb: Interpolate in the RGB color system.
#   - hsv: Interpolate in the HSV color system.
#   - hsl: Interpolate in the HSL color system.
#   - none: Don't show a gradient.
c.colors.tabs.indicator.system = 'none'

# Foreground color of unselected odd tabs.
# Type: QtColor
c.colors.tabs.odd.fg = '#abb2bf'

# Background color of unselected odd tabs.
# Type: QtColor
c.colors.tabs.odd.bg = '#353b45'

# Foreground color of unselected even tabs.
# Type: QtColor
c.colors.tabs.even.fg = '#abb2bf'

# Background color of unselected even tabs.
# Type: QtColor
c.colors.tabs.even.bg = '#282c34'

# Foreground color of selected odd tabs.
# Type: QtColor
c.colors.tabs.selected.odd.fg = '#abb2bf'

# Background color of selected odd tabs.
# Type: QtColor
c.colors.tabs.selected.odd.bg = '#3e4451'

# Foreground color of selected even tabs.
# Type: QtColor
c.colors.tabs.selected.even.fg = '#abb2bf'

# Background color of selected even tabs.
# Type: QtColor
c.colors.tabs.selected.even.bg = '#3e4451'

# Foreground color of pinned unselected odd tabs.
# Type: QtColor
c.colors.tabs.pinned.odd.fg = '#c8ccd4'

# Background color of pinned unselected odd tabs.
# Type: QtColor
c.colors.tabs.pinned.odd.bg = '#98c379'

# Foreground color of pinned unselected even tabs.
# Type: QtColor
c.colors.tabs.pinned.even.fg = '#c8ccd4'

# Background color of pinned unselected even tabs.
# Type: QtColor
c.colors.tabs.pinned.even.bg = '#56b6c2'

# Foreground color of pinned selected odd tabs.
# Type: QtColor
c.colors.tabs.pinned.selected.odd.fg = '#abb2bf'

# Background color of pinned selected odd tabs.
# Type: QtColor
c.colors.tabs.pinned.selected.odd.bg = '#3e4451'

# Foreground color of pinned selected even tabs.
# Type: QtColor
c.colors.tabs.pinned.selected.even.fg = '#abb2bf'

# Background color of pinned selected even tabs.
# Type: QtColor
c.colors.tabs.pinned.selected.even.bg = '#3e4451'

config.source('qutebrowser-themes/themes/onedark.py')

config.set("colors.webpage.darkmode.enabled", True)

c.url.searchengines = {
#    'DEFAULT':  'https://duckduckgo.com?p={}',
    'DEFAULT':  'https://www.google.com/search?q={}',
    '!gs':      'https://google.com/search?hl=en&q={}',
    '!a':       'https://www.amazon.com/s?k={}',
    '!d':       'https://duckduckgo.com/?ia=web&q={}',
    '!dd':      'https://thefreedictionary.com/{}',
    '!e':       'https://www.ebay.com/sch/i.html?_nkw={}',
    '!fb':      'https://www.facebook.com/s.php?q={}',
    '!gh':      'https://github.com/search?o=desc&q={}&s=stars',
    '!gist':    'https://gist.github.com/search?q={}',
    '!gi':      'https://www.google.com/search?tbm=isch&q={}&tbs=imgo:1',
    '!gn':      'https://news.google.com/search?q={}',
    '!ig':      'https://www.instagram.com/explore/tags/{}',
    '!m':       'https://www.google.com/maps/search/{}',
    '!p':       'https://pry.sh/{}',
    '!r':       'https://www.reddit.com/search?q={}',
    '!sd':      'https://slickdeals.net/newsearch.php?q={}&searcharea=deals&searchin=first',
    '!t':       'https://www.thesaurus.com/browse/{}',
    '!tw':      'https://twitter.com/search?q={}',
    '!w':       'https://en.wikipedia.org/wiki/{}',
    '!yelp':    'https://www.yelp.com/search?find_desc={}',
    '!yt':      'https://www.youtube.com/results?search_query={}'
}



config.bind('xb', 'config-cycle statusbar.show always never')
config.bind('xt', 'config-cycle tabs.show always never')
config.bind('xx', 'config-cycle statusbar.show always never;; config-cycle tabs.show always never')

c.url.default_page = 'https://google.com/'
c.url.start_pages = 'https://google.com/'


c.aliases = {'q': 'quit', 'w': 'session-save', 'wq': 'quit --save'}

config.bind('M', 'hint links spawn mpv {hint-url}')
config.bind('Z', 'hint links spawn st -e youtube-dl {hint-url}')
config.bind('t', 'set-cmd-text -s :open -t')


c.fonts.default_family = '11pt "SauceCodePro Nerd Font"'
c.fonts.statusbar = '11pt "SauceCodePro Nerd Font"'
c.fonts.debug_console = '11pt "SauceCodePro Nerd Font"'
c.fonts.completion.entry = '11pt "SauceCodePro Nerd Font"'
c.fonts.default_size = '11pt'
c.fonts.prompts = '11pt "SauceCodePro Nerd Font"'
c.fonts.web.size.default = 20

import subprocess
import os
from qutebrowser.api import interceptor

"""
qutebrowser settings for video
for more settings check out
https://qutebrowser.org/doc/help/settings.html
"""

# ================== Youtube Add Blocking ======================= {{{
def filter_yt(info: interceptor.Request):
    """Block the given request if necessary."""
    url = info.request_url
    if (
        url.host() == "www.youtube.com"
        and url.path() == "/get_video_info"
        and "&adformat=" in url.query()
    ):
        info.block()


interceptor.register(filter_yt)
# }}}


c.content.blocking.adblock.lists = [ \
        "https://easylist.to/easylist/easylist.txt", \
        "https://easylist.to/easylist/easyprivacy.txt", \
        "https://secure.fanboy.co.nz/fanboy-cookiemonster.txt", \
        "https://easylist.to/easylist/fanboy-annoyance.txt", \
        "https://secure.fanboy.co.nz/fanboy-annoyance.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/annoyances.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters-2020.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/unbreak.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/resource-abuse.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/privacy.txt", \
        "https://github.com/uBlockOrigin/uAssets/raw/master/filters/filters.txt" \
        ]

c.content.blocking.enabled = True
c.content.blocking.hosts.lists = [ \
        "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts", \
        "https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt", \
        "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts", \
        "https://v.firebog.net/hosts/static/w3kbl.txt", \
        "https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt", \
        "https://someonewhocares.org/hosts/zero/hosts", \
        "https://raw.githubusercontent.com/VeleSila/yhosts/master/hosts", \
        "https://winhelp2002.mvps.org/hosts.txt", \
        "https://adaway.org/hosts.txt", \
        "https://v.firebog.net/hosts/AdguardDNS.txt", \
        "https://v.firebog.net/hosts/Admiral.txt", \
        "https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt", \
        "https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt", \
        "https://v.firebog.net/hosts/Easylist.txt", \
        "https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext", \
        "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts", \
        "https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts", \
        "https://v.firebog.net/hosts/Easyprivacy.txt", \
        "https://v.firebog.net/hosts/Prigent-Ads.txt", \
        "https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts", \
        "https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt", \
        "https://hostfiles.frogeye.fr/firstparty-trackers-hosts.txt", \
        "https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt" \
        ]
c.content.blocking.method = 'both'