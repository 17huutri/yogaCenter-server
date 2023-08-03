import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';
import { sendMail } from './mailer.js';
import GradeModel from '../model/Grade.model.js';

/** middleware for verify user */


export async function verifyUser(req, res, next) {
    try {

        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await UserModel.findOne({ username });
        debugger
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        debugger
        next();
        // res.status(200).json({
        //     msg : 'Verify success'
        // })
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
}


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {

    try {
        const { username, password, profile, email } = req.body;

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err))
                if (user) reject({ error: "Please use unique username" });

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err))
                if (email) reject({ error: "Please use unique Email" });

                resolve();
            })
        });

        // send email


        Promise.all([existUsername, existEmail])
            .then(() => {
                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {

                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email,
                                roleId: 1,
                                isActive: 0,
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(201).send({ msg: "User Register Successfully" }))
                                .catch(error => res.status(500).send({ error }));
                            // req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
                            // let text = `Welcome you to join with us, here your OTP ${req.app.locals.OTP}.`;
                            // sendMail(username, email, text, "Registration OTP");
                            // let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
                            // let subject = "Password Recovery OTP";                         
                        }).catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                return res.status(500).send(error)
            })


    } catch (error) {
        return res.status(500).send(error);
    }

}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {

    const { username, password } = req.body;

    try {

        UserModel.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(404).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username
                        }, ENV.JWT_SECRET, { expiresIn: "1h" });
                        if (user.isActive == 1) {
                            return res.status(200).send({
                                msg: "Login Successful...!",
                                username: user.username,
                                roleId: user.roleId,
                                id: user._id,
                                token,
                                fullName: user.fullName
                            });
                        } else return res.status(400).send({ error: "Account is not actived" });


                    })
                    .catch(error => {
                        return res.status(404).send({ error: "Not found" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {

    const { username } = req.params;

    try {

        if (!username) return res.status(501).send({ error: "Invalid Username" });

        UserModel.findOne({ username }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}

export async function recoveryUser(req, res) {

    const username = req.query.username;

    try {
        UserModel.findOne({ username }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

            const email = user.email;
            debugger
            req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
            let text = `Your Password Recovery OTP is ${req.app.locals.OTP}. Verify and recover your password.`;
            sendMail(username, email, text, "Password Recovery OTP");

            return res.status(201).send();
        })

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {

        // const id = req.query.id;
        const { userId } = req.user

        if (userId) {
            const body = req.body;
            debugger
            // update the data
            UserModel.updateOne({ _id: userId }, body, function (err, data) {
                if (err) throw err;

                return res.status(201).send({ msg: "Record Updated...!" });
            })
            debugger
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}
export async function updateUser_1(req, res) {
    const id = req.params.id;
    const {
        roleId
    } = req.body;

    try {
        // debugger
        console.log(roleId);
        const updateUser = await UserModel.findById(id);
        updateUser.roleId = roleId ?? updateUser.roleId;
        await updateUser.save();
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({
            msg: "Failed"
        })
    }

}
export async function disableUser(req, res) {
    const id = req.params.id;

    try {

        const updateUser = await UserModel.findById(id);
        updateUser.isActive = 0;
        await updateUser.save();
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({
            msg: "Failed"
        })
    }

}
export async function ableUser(req, res) {
    const id = req.params.id;

    try {

        const updateUser = await UserModel.findById(id);
        updateUser.isActive = 1;
        await updateUser.save();
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({
            msg: "Failed"
        })
    }

}
export async function deleteUser(req, res) {
    const id = req.params.id
    try {
        await UserModel.deleteOne({ _id: id })
        res.status(202).json({
            msg: "Success"
        })
    } catch (error) {
        res.status(204).json({
            msg: "Failed"
        })
    }

}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
    clearTimeout(req.app.locals.timeoutOTP);
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({ code: req.app.locals.OTP })
    req.app.locals.timeoutOTP = setTimeout(() => {
        console.log('Expired !!!');
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
    }, "60000");

}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        clearTimeout(req.app.locals.timeoutOTP);
        return res.status(201).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { username, password } = req.body;

        try {

            UserModel.findOne({ username })
                .then(user => {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.updateOne({ username: user.username },
                                { password: hashedPassword }, function (err, data) {
                                    if (err) throw err;
                                    req.app.locals.resetSession = false; // reset session                                  
                                    return res.status(201).send({ msg: "Record Updated...!" })
                                });
                        })
                        .catch(e => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                })
                .catch(error => {
                    return res.status(404).send({ error: "Username not Found" });
                })

        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}
export async function confirmAccount(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { username } = req.body;

        try {

            UserModel.findOne({ username })
                .then(user => {
                    UserModel.updateOne({ username: user.username },
                        { isActive: 1 }, function (err, data) {
                            if (err) throw err;
                            req.app.locals.resetSession = false; // reset session
                            return res.status(201).send({ msg: "Record Updated...!" })
                        });
                })
                .catch(e => {
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })
                })
        } catch (error) {
            return res.status(500).send({ error })
        }

    } catch (error) {
        return res.status(401).send({ error })
    }
}
export async function getAllUser(req, res) {
    const active = req.query.active
    const username = req.query.username
    try {
        const users = await UserModel.find({ isActive: active, username: { $regex: username, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
export async function getAllUser_2(req, res) {
    const active = req.query.active
    const fullName = req.query.fullName
    try {
        const users = await UserModel.find({ isActive: active, fullName: { $regex: fullName, $options: 'i' } }).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
export async function studentInGrade(req, res) {
    const gradeId = req.params.gradeId
    try {
        // debugger
        // fullName: { $regex: fullName, $options: 'i' }
        const students = await UserModel.find({ roleId: 1, grade: { $regex: gradeId, $options: 'i' } })
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export async function kickoutStudent(req, res) {
    const id = req.params.id;
    try {
        const student = await UserModel.findById(id);
        // debugger
        const grade = await GradeModel.findById(student.grade.toString());
        const number = await UserModel.find({ grade: grade._id.toString() });

        grade.nOfStudent = number.length - 1;
        if (student.ex_grade) {
            student.ex_grade = student.ex_grade + " , " + grade.gradeName;
        } else student.ex_grade = grade.gradeName;
        student.grade = null;
        await student.save();
        await grade.save();
        res.status(200).json('Successfully !!!');
    } catch (error) {
        res.status(500).json({
            error: 'Server error',
        });
    }
}
// export async function searchUsers(req, res) {
//     const id = req.params.id;

//     try {

//         const updateUser = await UserModel.findById(id);
//         updateUser.isActive = 0;
//         await updateUser.save();
//         res.status(200).json(updateUser)
//     } catch (error) {
//         res.status(500).json({
//             msg: "Failed"
//         })
//     }

// }

