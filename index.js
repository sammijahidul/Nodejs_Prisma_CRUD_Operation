import express from 'express';
const app = express();
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
app.use(express.json());

// Create a user api for sending data to database
app.post("/api/v1/user", async (req, res) => {
    try {
        const {firstName, lastName, age} = req.body;
        const newUser = await prisma.User.create({ data : req.body
        });       
        res.status(201).json({
            status: "success",
            data: newUser,
        })              
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Something went wrong while creating user"
        })        
    }
});

// Get request api for fetching data from database
app.get("/api/v1/users", async (req, res) => {
    try {
        const allUsers = await prisma.User.findMany();
        res.status(200).json({
            status: "success",
            data: allUsers,
        })       
    } 
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong while getting data"
        })
    }
});

// Update a user api for sending updated data to database
app.patch("/api/v1/user/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const {firstName, lastName, age} = req.body;
        const updatedUser = await prisma.User.update({ 
            where: {id: parseInt(id)}, 
            data: req.body
        });
        res.status(201).json({
            status: "success",
            data: updatedUser,
        })                     
    }  
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong while updating user"
        })        
    }
});

// Delete a user api for deleting user data from database
app.delete("/api/v1/user/remove/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await prisma.User.delete({
            where : {
                id: parseInt(id)
            }
        })
        res.status(200).json({
            status: "successful",
            data: deleteUser,
        })       
    } 
    catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Something went wrong while updating user"
        })                
    }
})

// Creating a house api 
app.post("/api/v1/house/create", async (req, res) => {
    try {
        const {address, wifiPassword, ownerId, builtById} = req.body;
        const newHouse = await prisma.House.create({ data: req.body })
        res.status(201).json({
            status: 'success',
            data: {
                newHouse
            }
        })
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error while creating a house"
        })
    }
})

app.listen(3001, ()=> {
    console.log(`Server is listening at http://localhost:${3001}`);
})