// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var totalBookmarks = 0;

// Search the bookmarks when entering the search keyword.
$(function() {
  $('#search').change(function() {
     $('#bookmarks').empty();
     dumpBookmarks($('#search').val());
  });
});

// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
        $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes[0].children, query));
        $('#bookmarks').dynatree({
            onActivate: function(node) {
                if (node.data.href != undefined) {
                    chrome.tabs.create({url: node.data.href});
                }
                //console.log(node.data.href);
                //console.log("You activated" + node + " (" + node.href + ")");
            },
            persist: true,
            dnd: {
                onDragStart: function(node) {
                    /** This function MUST be defined to enable dragging for the tree.
                     *  Return false to cancel dragging of node.
                     */
                    logMsg("tree.onDragStart(%o)", node);
                    return true;
                },
                onDragStop: function(node) {
                  logMsg("tree.onDragStop(%o)", node);
                },
                onDrop: function(node, sourceNode, hitMode, ui, draggable) {
                    /** This function MUST be defined to enable dropping of items on
                     * the tree.
                     */
                    logMsg("tree.onDrop(%o, %o, %s)", node, sourceNode, hitMode);
                    sourceNode.move(node, hitMode);
                }
            }
        });
        var msg = $('<div>').append("Total bookmarks = " + totalBookmarks);
        $('#bookmarks').prepend(msg);

    });
}
function dumpTreeNodes(bookmarkNodes, query) {
  var list = $('<ul>');
  var i;
  for (i = 0; i < bookmarkNodes.length; i++) {
    list.append(dumpNode(bookmarkNodes[i], query));
  }
  return list;
}
function dumpNode(bookmarkNode, query) {
    totalBookmarks++;

    var li = $('<li>');
    if (bookmarkNode.title) {

        var anchor = $('<a>');
        anchor.attr('href', bookmarkNode.url);
        anchor.text(bookmarkNode.title);
        anchor.click(function() {
            chrome.tabs.create({url: bookmarkNode.url});
        });

        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title.search("/" + query + "/i"))) {
                $(li).append(anchor);
            }
        } else {
            $(li).append(anchor);
        }
    }

    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        li.attr("class", "folder");
        li.append(dumpTreeNodes(bookmarkNode.children, query));
    }
    return li;
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();

    /*
    $("#tree").dynatree({
        onActivate: function(node) {
            console.log("You activated " + node);
        }
    });


    $("#bookmarks").dynatree({
        onActivate: function(node) {
            console.log("You activated " + node);
        }
    });
    */
});
