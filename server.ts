import express, { Response, Application, Request} from "express";

const app: Application = express();
const port = 3000;

app.use(express.json()); //needed to parse JSon bodies

interface User {
    id: number;
    FirstName: string;
    email: string;
    password: string;
    createdAt?: Date;
}

let user: User[] = [];

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Users gotten successfully", data: user});
});

app.post("/",(req: Request<{}, {}, User>, res: Response) => {
    const {FirstName, email, password} = req.body;

    const userExists = user.find((e) => e.email === email);

    if (userExists) {
        return res.status(400).json({ message: "User already exists"});
    }
    
    if (FirstName && email && password) {
        const newUser: User = {
            id: user.length + 1,
            FirstName,
            email,
            password,
            createdAt: new Date()
        };
        user.push(newUser);
        return res.status(201).json({ message: "User created successfully", data: newUser})
    }
    else {
        return res.status(201).json({ message: "All fields are required"});
    }    
});

app.listen(port, () => {
    console.log (`Server is running on http://localhost:${port}`);
});
