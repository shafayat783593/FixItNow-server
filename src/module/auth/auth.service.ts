import { ref } from "node:process"
import config from "../../config"
import { prisma } from "../../lib/prisma"
import { createToken, veryfyToken, } from "../../utils/jwt"
import { ILogin, RegisterUserPayload } from "./auth.interface"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { Role } from "../../../generated/prisma/enums"
const userRegisterInDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, phone, role } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
   role: role || Role.CUSTOMER,
      // তোমার enum অনুযায়ী value দাও
      // status না দিলেও হবে, default ACTIVE
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: createdUser.id },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  return user;
};

const userLoginInDB = async (payload: ILogin) => {
    const { email, password } = payload
    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    const IsPasswordMatch = await bcrypt.compare(password, user.password)
    if (!IsPasswordMatch) {
        throw new Error("Password is Incorrected")
    }


    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const accessToken = await createToken(jwtPayload, config.jwt_accessToken, config.jwt_accessToken_Expire as SignOptions)
    const refreshToken =await createToken(jwtPayload, config.jwt_refreshToken, config.jwt_refreshToken_Expire as SignOptions)
    return {
        accessToken,
        refreshToken
    }
}




const refreshTokenSave = async (token: string) => {
    const veryToken = await veryfyToken(token, config.jwt_refreshToken)
    if (!veryToken.success) {
        throw new Error("Token is not valied")
    }

    const { id } = veryToken.data as JwtPayload

    const user = await prisma.user.findUniqueOrThrow({
        where: { id }
    })

    const jwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }

    const accessToken = await createToken(jwtPayload, config.jwt_accessToken, config.jwt_accessToken_Expire as SignOptions)
    return {
        accessToken
    }

}

export const authService = {
    userRegisterInDB,
    userLoginInDB,
    refreshTokenSave,
}