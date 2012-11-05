// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
      $('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
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
    var li = $('<li>');
    if (bookmarkNode.title) {
        /*
        if (query && !bookmarkNode.children) {
          if (String(bookmarkNode.title).indexOf(query) == -1) {
            return $('<span></span>');
          }
        }
        */
        var anchor = $('<a>');
        anchor.attr('href', bookmarkNode.url);
        anchor.text(bookmarkNode.title);

        $(li).append(anchor);
    }
    if (bookmarkNode.children && bookmarkNode.children.length > 0) {
        li.append(dumpTreeNodes(bookmarkNode.children, query));
    }
    return li;
}

document.addEventListener('DOMContentLoaded', function () {
  dumpBookmarks();


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


});
