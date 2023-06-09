const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto",{})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo("localhost:40000",
grpc.credentials.createInsecure())

client.createTodo({
    "id":-1,
    "text":"Do-Laundry"
},(err ,response)=>{
    console.log("Recieved from server" + JSON.stringify(response))
})