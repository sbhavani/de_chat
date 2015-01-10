var client = new Peer({key:'vwvudf4vt9sh5mi'});

// Provide basic id data for unconnected state
client.on('open', function(id) {
      $('.my-id').html("<p>Your Id: " + id + "</p>")
});

// Called when connected to
client.on('connection', function(new_connection) {
      setConnectionListeners(new_connection);
});

// Handles building connections to other users
$("button#connect").click(function() {
      var id_sel = $("input[name='con-id']");
      var id = id_sel.val();
      id_sel.val('');
      new_conn = client.connect(id);
      setConnectionListeners(new_conn);
});

// Callback for synchronizing connections
var sync = function(data) {
      // filterConnections(data.connections);

      // ids = peer.connections;
      // con = $(".connections");
      // cons.html("");
      // for(var i = 0; i < ids.length; i++) {
            // con.append("<li>" + ids[i] + "</li>");
      // }
};

// Prepare sync data to be send to new connection
var getSyncData = function() {
      return {
            "connections": Object.keys(client.connections)
      };
};

// Broadcasts a connection to all peers
var sendData = function(type, payload) {
      console.log("Sending", payload);
      peers = client.connections;
      Object.keys(peers).forEach(function(key) {
            peer_arr = peers[key];
            peer = peer_arr[0];
            peer.send(JSON.stringify({"id": client.id, "type": type, "load": payload}));
      });
};

// Searches For Any New Connections And Connects
// var filterConnections = function(connections) {
      // for (var i = 0; i < connections.length; i++) {
            // id = connections[i];
            // if (!$.inArray(id, connections)) {
                  // connections.push(id);
            // }
      // }
// });

var setConnectionListeners = function(connection) {
      // Called when a connection is accepted
      connection.on('open', function() {

            console.log("Connected to peer: " + connection.peer);
            $('.connections').append("<li>" + connection.peer + "</li>");

            connection.on('data', function(data) {
                  data = JSON.parse(data);
                  if (data.type == 'sync') {
                        sync(data.load);
                  } else if (data.type == 'msg') {
                        appendMsg(data.id, data.load);
                  } else {
                        console.error("Undefined type: " + data.type);
                  }
            });

            connection.on('error', function(err) {
                  console.error(err);
            });

            sendData('sync', getSyncData());
      });
}
