const username = process.env.username;
const password = process.env.password;
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.wfueq9j.mongodb.net/adminDB?retryWrites=true&w=majority&appName=Cluster0`;
const mongoURL1= `mongodb+srv://${username}:${password}@cluster0.wfueq9j.mongodb.net/jobsDB?retryWrites=true&w=majority&appName=Cluster0`;
export {mongoURL,mongoURL1};