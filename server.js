const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("Failed to bind server:", err);
        return;
    }
    console.log("Server started on port:", port);
    server.start();
});

server.addService(todoPackage.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos
});

const todos = [];

function createTodo(call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text
    };
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodos(call, callback) {
    /// temp
    // callback(null, { items: todos });
}
