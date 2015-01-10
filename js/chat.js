// Handles building connections to other users
$("button#send-msg").click(function() {
    var msg = $("input[name='msg']");
    console.log("Sending msg " + msg.val());
    sendData('msg', msg.val());
    appendMsg(client.id, msg.val());
    msg.val('');
});

var appendMsg = function(id, msg) {
    if (id == client.id) {
        id = "You";
    }

    $(".chat").append("<p>" + id + ": " + msg + "</p>");
};
