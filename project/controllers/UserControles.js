const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');

//Token Generator
const generatetToken = (Users) => {
    return Jwt.sign({ Users }, process.env.JWT_SEC, {
        expiresIn: "40d"
    })
}

//==========================Registertion start============================>


const Registertion = async (req, res) => {
    try {
        const { fname, lname, email, password, phone, address } = req.body;


        if (!fname || !lname || !email || !password || !phone || !address) {
            res.json({
                status: "Something is worng",
                message: "please Checking Data"
            });
            return;

        }
        const salt = bcrypt.genSaltSync(10)
        const Hidepassword = bcrypt.hashSync(password, salt)
        const Newuser = await prisma.Users.create({
            data: {
                firstname: fname,
                lastname: lname,
                U_email: email,
                U_password: Hidepassword,
                U_phone: phone,
                U_Address: address
            },
        });
        res.json({
            status: "Success",
            message: "Sucessfully save",
            Newuser
        })
        const token = generatetToken(Newuser.userID)
        res.json({
            user: { ...Newuser },
            token,
            status: "Success",
        });
    } catch (error) {
        res.json({
            error
        })
    }


};





//=========================================================Loging=========================================================================>

const Login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({
            status: "Error",
            message: "email or password is wrong"
        })
        return;
    }

    const UserExisting = await prisma.users.findFirst({
        where: {
            U_email: email
        },
    });

    if (!UserExisting) {
        res.json({
            status: "Error",
            message: " Wrong credentails"
        });
        return;
    }

    const dehshepassword = bcrypt.compareSync(password, UserExisting.U_password);
    if (dehshepassword) {
        const token = generatetToken(UserExisting.userID);
        res.json({
            status: "SuccessFully",
            message: "You  Are Login",
            token,
            user: UserExisting,
        });


    } else {
        res.json({
            status: "Error",
            message: "Something is wrong"
        })
    }
}





//========================================================update ==========================================================================>

const UpdateUser = async (req, res, next) => {
    try {
        const { fname, lname, email, password, phone, address } = req.body;
        const { userID } = req.params
        if (!fname || !lname || !email || !password || !phone || !address) {
            res.json({
                status: "Erorr",
                message: "please checking Data "
            })
            return;
        }
        const FINDUser = await prisma.users.findFirst({
            where: {
                userID: + userID,
            }
        });
        if (!FINDUser) {
            res.json({
                status: "Erorr",
                message: "User Is not Found In Database"
            })
            return
        }
        const updateusers = await prisma.users.update({
            where: {
                userID: parseInt(userID)
            },
            data: {
                firstname: fname,
                lastname: lname,
                U_email: email,
                U_password: password,
                U_phone: phone,
                U_Address: address
            },
        });
        res.status(200).json({
            status: "Sucess",
            message: "Update Sucessfully",
            updateusers
        })
    } catch (error) {
        res.json({
            status: "Erorr",
        });
    }
};


//=========================================================Get one user =================================================================>

const GetOneuser = async (req, res) => {
    try {
        const { userID } = req.params;
        const user = await prisma.users.findFirst({
            where: {
                userID: +userID,
            },
        });
        if (!user) {
            res.json({
                status: "Erorr",
                message: "user is not fount in Database Now"
            });
        } else {
            res.json({
                status: "Success",
                user
            })
        }
    } catch (error) {
        res.json({
            Error
        });
    };
}








//=========================================================Delete Users===================================================================>
const DeleteUser = async (req, res,) => {
    const { userID } = req.params;

    const USRER = await prisma.users.delete({
        where: {
            userID: parseInt(userID)
        },
    });
    res.json({
        status: "Success",
        message: "Users Delete SuccessFull!",
        USRER
    })
}







//=========================================================Geting Data====================================================================>
const Getallusers = async (req, res) => {
    try {
        const USERS = await prisma.users.findMany();
        res.json({
            USERS
        });
    } catch (error) {
        res.json({
            status: "Error",
            message: "Data is not Found"
        });
    }
};







//=========================================================Exports=======================================================================>

module.exports = {
    Registertion,
    Login,
    Getallusers,
    GetOneuser,
    DeleteUser,
    UpdateUser
}