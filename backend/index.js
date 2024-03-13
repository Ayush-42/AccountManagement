import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { checkEmployeeCredential, createClaim, createLevel, createUser, fetchClaimData, fetchEmployeesData, updateClaimInfo } from './config/controller.js';
import Connnection from './config/db.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/', upload.none(), createUser);
app.post('/claim', upload.none(), createClaim);
app.post('/dashboard/level', createLevel);
app.post('/signin', upload.none(), checkEmployeeCredential);
app.post('/claim-update', upload.none(), updateClaimInfo);
app.get('/dashboard', upload.none(), fetchEmployeesData);
app.get('/dashboard/claim', upload.none(), fetchClaimData);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

Connnection()