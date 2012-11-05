

$(function() {

});


function bookmarks(data) {
    this.bookmarkTreeNodes = data;

    this.OrderedList = function () {
        return dumpList(this.bookmarkTreeNodes);
    }

    this.dumpList = function(nodes) {

    }


}

function loadBookmarks() {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
            bookmarks = bookmarkTreeNodes[0].children;
            translateBookmarks();

            $('#bookmarks').append(dumpTreeNodes(bookmarkNodes, query));
            /*        $('#bookmarks').dynatree({
             onActivate: function(node) {
             if (node.data.href != "") {
             chrome.tabs.create({url: node.data.href});
             }
             //console.log(node.data.href);
             //console.log("You activated" + node + " (" + node.href + ")");
             }
             });
             */
            var msg = $('<div>').append("Total bookmarks = " + totalBookmarks);
            $('#bookmarks').prepend(msg);

        });
}


function translateBookmarks() {
    foreach (var i=0; i < bookmarks)
}