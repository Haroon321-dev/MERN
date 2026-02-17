
// import User from "../models/user-model.js";
// import Contact from "../models/contact-model.js";

// const getAllUsers = async (req, res, next) => {
//     try {
//         const users = await User.find({}, { password: 0 });

//         if (!users || users.length === 0) {
//             return res.status(404).json({ message: "No User Found!" });
//         }

//         return res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// };

// const getUserById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const data = await User.findById(id, { password: 0 });

//         if (!data) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json(data);
//     } catch (error) {
//         next(error);
//     }
// };

// const updateUserById = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const updatedUserData = req.body;

//         const updatedData = await User.updateOne(
//             { _id: id },
//             { $set: updatedUserData }
//         );

//         return res.status(200).json(updatedData);
//     } catch (error) {
//         next(error);
//     }
// };

// const deleteUserById = async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         await User.deleteOne({ _id: id });

//         return res
//             .status(200)
//             .json({ message: "User Deleted Successfully!" });
//     } catch (error) {
//         next(error);
//     }
// };

// const getAllContacts = async (req, res, next) => {
//     try {
//         const contacts = await Contact.find();

//         if (!contacts || contacts.length === 0) {
//             return res.status(404).json({ message: "No Contact Found!" });
//         }

//         return res.status(200).json(contacts);
//     } catch (error) {
//         next(error);
//     }
// };

// export {
//     getAllUsers,
//     getAllContacts,
//     deleteUserById,
//     getUserById,
//     updateUserById,
// };

import {
    fetchAllUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    fetchAllContacts,
} from "../services/admin.service.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await fetchUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        await deleteUser(req.params.id);
        res.status(200).json({ message: "User Deleted Successfully!" });
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await fetchAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
};
