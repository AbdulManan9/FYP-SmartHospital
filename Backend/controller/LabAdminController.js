import labAdminModel from "../models/LabAdminModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// api that is used to add lab Admin
const addLabAdmin = async (req, resp) => {
    try {
        const { name, Email, phone, password, cnic } = req.body;

        // Check if Ward Admin already exists (await is missing in your code)
        const labAdmin = await labAdminModel.findOne({ cnic });
        if (labAdmin) {
            return resp.json({
                success: false,
                message: "The Lab Admin already exists",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newLabAdmin = new labAdminModel({
            name,
            Email,
            phone,
            password: hashedPassword, // Store hashed password
            cnic,
        });

        await newLabAdmin.save();

        return resp.json({
            success: true,
            message: "The Lab Admin was added successfully",
        });
    } catch (error) {
        console.error("Error in API:", error);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const loginLabAdmin = async (req, resp) => {
    const { Email, password } = req.body;

    try {
        const labAdmin = await labAdminModel.findOne({ Email });
        if (!labAdmin) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Email",
            });
        }

        const isMatch = await bcrypt.compare(password, labAdmin.password);
        if (!isMatch) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Password",
            });
        }

        const token = createToken(labAdmin._id);
        return resp.json({      // <<< Also return here (good habit)
            success: true,
            message: "Login Successfully",
            data: labAdmin,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return resp.json({       // <<< Return even in catch
            success: false,
            message: "Error in api",
            error: error,
        });
    }
};
export {addLabAdmin,loginLabAdmin}