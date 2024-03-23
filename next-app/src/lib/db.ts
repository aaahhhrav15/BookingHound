const username = process.env.username;
const password = process.env.password;
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.wfueq9j.mongodb.net/adminDB?retryWrites=true&w=majority&appName=Cluster0`;
console.log(mongoURL);
export default mongoURL;
