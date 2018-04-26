# menu-demo

Based on [menus API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/menus/).

Current test is using the `menus` namespace to access the functions it needs to create menu items. (Not Chrome compatible). Use `contextMenus` namespace, to make this extension work with other browsers, use `contextMenus`.**

## What it does

This add-on adds several items to the browser's context menu:

* Logs highlighted text to the browser console when clicked.
* Removes highlighted content via radio button
* Radio button to open the SIFT sidebar.

## TO DO ##
* Understand content scripts --> background scripts
* Write a content script to highlight text 
* Send highlighted text to sidebar panel (dynamically update)
* Store contents locally
* Styling
# sift_ext_test
