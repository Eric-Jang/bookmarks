// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var totalBookmarks = 0;
var bookmarks = [];
var bookmarkNodes = null;

// Search the bookmarks when entering the search keyword.
/* change this to update using bookmarkNodes, so we don't have to query for the bookmark collection every time */
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
        totalBookmarks = 0;
        bookmarkNodes = bookmarkTreeNodes[0].children;
        var rootNode = $("#bookmarks").dynatree("getRoot");
        dumpTreeNodes(rootNode, bookmarkNodes, query);
        var msg = $('<div>').append("Total bookmarks = " + totalBookmarks);
        $('#bookmarks').prepend(msg);

    });
}


function dumpTreeNodes(tree, bookmarkNodes, query) {
  for (var i = 0; i < bookmarkNodes.length; i++) {
    dumpNode(tree, bookmarkNodes[i], query);
  }
}

function dumpNode(tree, bookmark, query) {
    totalBookmarks++;

    if (bookmark.title) {

        var childNode = tree.addChild({
            title: bookmark.title,
            href: bookmark.url,
            isLazy: true,
            isFolder: false
 //           isFolder: bookmark.url == undefined
        });

        /*
        var anchor = $('<a>');
        anchor.attr('href', bookmark.url);
        anchor.text(bookmark.title);
        anchor.click(function() {
            chrome.tabs.create({url: bookmark.url});
        });

        /*

        if (query && !bookmarkNode.children) {
            if (String(bookmarkNode.title.search("/" + query + "/i"))) {
                $(li).append(anchor);
            }
        } else {
        */


//        $('#bookmarks').append(anchor);

    }

    if (bookmark.children && bookmark.children.length > 0) {
        dumpTreeNodes(childNode, bookmark.children, query);
    }

}

document.addEventListener('DOMContentLoaded', function () {
    $('#bookmarks').dynatree({
        onActivate: function(node) {
            if (node.data.href != "") {
                chrome.tabs.create({url: node.data.href});
                //console.log("You activated " + node);
                console.log(node);
            }
        },
        persist: true
    });

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
