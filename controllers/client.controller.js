// c:\Users\ADMIN\Desktop\Node js\formapp_db\controllers\clientController.js
import mongoose from 'mongoose';
import Client from '../models/client.model.js';

// create client
export const createClient = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { clientID } = req.body;
    const existingClient = await Client.findOne({ clientID: clientID });

    if(existingClient) {
      const error = new Error("Client with this ID already exists");
      error.statusCode = 400;
      throw error;  
    }

    const systemData = {
        ...req.body,        
        btsStatus: 'ACTIVE',
        btsOpenDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        btsCreatedBy: 'ADMIN',
        btsCreatedOn: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        
        btsModifiedBy: '---',
        btsModifiedOn: '---',
        btsSupervisedBy: '---',
        btsSupervisedOn: '---'
    };

    const newClient = await Client.create([systemData], { session });

    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json({
        success: true,
        message: "Client created successfully",
        data: {
            client: newClient[0],
        }
    })

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

// update Client
export const updateClient = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (Object.keys(req.body).length === 0) {
            const error = new Error("Data to update cannot be empty");
            error.statusCode = 400;
            throw error;
        }

        // 1. Check if client exists first
        const client = await Client.findById(req.params.id);
        if (!client) {
            const error = new Error("Client not found");
            error.statusCode = 404;
            throw error;
        }

        let updates = {};
        
        // Allowed fields whitelist
        const allowedFields = [
            "clientType", "segmentType", "subSegment", "appID", "clientClass", "clientName", "baseID",
            "companyName", "lineOfBusiness", "lobInfo", "natureOfBusiness", "idType", "regNo", "regDate", 
            "registeredAt", "registeredOffice", "businessStarted", "employees", "comments", "website",
            "openedBy", "relationManager", "openedOn", "tinNumber",
            "resAddress", "busAddress", "offAddress", "mailAddress", "homeCountryAddress", 
            "address2", "region1", "street", "country", "zipCode", "region2", "ward", "district",
            "phoneHome", "phoneWork", "mobile", "fax", "email", "landMark",
            // Booleans
            "canSendGreetings", "canSendAssocOffers", "canSendOurOffers", "statementOnline", "mobileAlert",
            "btsStatus", "btsOpenDate", "btsClosedDate", "btsCreatedBy", "btsModifiedBy", "btsSupervisedBy", 
            "btsCreatedOn", "btsModifiedOn", "btsSupervisedOn"
        ];

        for (const key in req.body) {
            if (allowedFields.includes(key)) {
                updates[key] = req.body[key];
            }
        }


        updates.btsModifiedBy = 'ADMIN'; 
        updates.btsModifiedOn = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

        // 4. Perform the Update
        await Client.updateOne(
            { _id: req.params.id },
            { $set: updates },
            { session }
        );

        await session.commitTransaction();

        const newUpdateClient = await Client.findById(req.params.id);

        session.endSession();
        
        res.status(200).json({
            success: true,
            message: "Client Updated successfully",
            data: {
                client: newUpdateClient,
            },
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

// Fetch Details by ID
export const getClientDetails = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id)

    if (!client) {
      const error = new Error("client does not exist");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: client });
  } catch (error) {
    next(error);
  }
};

// Get All Clients
export const getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ success: true, data: clients });
  } catch (error) {
    next(error);
  }
};

// delete client
export const deleteClient = async (req, res, next) => { 
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedClient = await Client.deleteOne({ _id: req.params.id })

        const { deletedCount } = deletedClient

        if(deletedCount === 0) {
            const error = new Error('Client not found')
            error.statusCode = 404
            throw error
        }

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Client was deleted successfully"
        })

    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}