// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // ค้นหา user จากฐานข้อมูล
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            include: {
              department: true
            }
          })

          if (!user || !user.is_active) {
            return null
          }

          // ตรวจสอบรหัสผ่าน
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          )

          if (!isPasswordValid) {
            return null
          }

          // อัพเดท last_login
          await prisma.user.update({
            where: { id: user.id },
            data: { last_login: new Date() }
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name || null,
            role: user.role,
            department: user.department?.name || null,
            departmentId: user.department_id,
            position: user.position || null,
            phone: user.phone || null
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.department = user.department
        token.departmentId = user.departmentId
        token.position = user.position
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.department = token.department as string | null
        session.user.departmentId = token.departmentId as string | null
        session.user.position = token.position as string | null
        session.user.phone = token.phone as string | null
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
}

// Type definitions for session
declare module "next-auth" {
  interface User {
    role: string
    department?: string | null
    departmentId?: string | null
    position?: string | null
    phone?: string | null
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: string
      department?: string | null
      departmentId?: string | null
      position?: string | null
      phone?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    department?: string | null
    departmentId?: string | null
    position?: string | null
    phone?: string | null
  }
}