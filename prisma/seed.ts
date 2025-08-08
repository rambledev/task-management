// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 เริ่มต้น Seeding ข้อมูล...')

  // สร้างฝ่ายงาน
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        name: 'ฝ่ายบริหาร',
        code: 'ADM',
        description: 'ฝ่ายบริหารจัดการองค์กร',
        level: 1,
      }
    }),
    prisma.department.create({
      data: {
        name: 'ฝ่ายการตลาด',
        code: 'MKT',
        description: 'ฝ่ายการตลาดและประชาสัมพันธ์',
        level: 2,
      }
    }),
    prisma.department.create({
      data: {
        name: 'ฝ่าย IT',
        code: 'IT',
        description: 'ฝ่ายเทคโนโลยีสารสนเทศ',
        level: 2,
      }
    }),
    prisma.department.create({
      data: {
        name: 'ฝ่ายการเงิน',
        code: 'FIN',
        description: 'ฝ่ายการเงินและบัญชี',
        level: 2,
      }
    }),
    prisma.department.create({
      data: {
        name: 'ฝ่ายบุคคล',
        code: 'HR',
        description: 'ฝ่ายทรัพยากรบุคคล',
        level: 2,
      }
    })
  ])

  console.log('✅ สร้างฝ่ายงานเรียบร้อย')

  // สร้างผู้ใช้
  const hashedPassword = await bcrypt.hash('password123', 12)

  const users = await Promise.all([
    // ผู้อำนวยการ
    prisma.user.create({
      data: {
        email: 'director@company.com',
        name: 'ผู้อำนวยการ สมชาย',
        password_hash: hashedPassword,
        role: 'director',
        department_id: departments[0].id, // ฝ่ายบริหาร
        position: 'ผู้อำนวยการ',
        phone: '02-123-4567',
      }
    }),
    
    // หัวหน้าฝ่าย
    prisma.user.create({
      data: {
        email: 'header.marketing@company.com',
        name: 'หัวหน้าฝ่าย สมหญิง',
        password_hash: hashedPassword,
        role: 'header',
        department_id: departments[1].id, // ฝ่ายการตลาด
        position: 'หัวหน้าฝ่ายการตลาด',
        phone: '02-123-4568',
      }
    }),
    
    prisma.user.create({
      data: {
        email: 'header.it@company.com',
        name: 'หัวหน้า IT สมศักดิ์',
        password_hash: hashedPassword,
        role: 'header',
        department_id: departments[2].id, // ฝ่าย IT
        position: 'หัวหน้าฝ่าย IT',
        phone: '02-123-4569',
      }
    }),

    // พนักงาน
    prisma.user.create({
      data: {
        email: 'employee@company.com',
        name: 'พนักงาน สมปอง',
        password_hash: hashedPassword,
        role: 'employee',
        department_id: departments[1].id, // ฝ่ายการตลาด
        position: 'พนักงานการตลาด',
        phone: '02-123-4570',
      }
    }),

    prisma.user.create({
      data: {
        email: 'employee.it@company.com',
        name: 'พนักงาน IT สมใจ',
        password_hash: hashedPassword,
        role: 'employee',
        department_id: departments[2].id, // ฝ่าย IT
        position: 'พนักงาน IT',
        phone: '02-123-4571',
      }
    }),

    prisma.user.create({
      data: {
        email: 'employee.finance@company.com',
        name: 'พนักงานการเงิน สมรักษ์',
        password_hash: hashedPassword,
        role: 'employee',
        department_id: departments[3].id, // ฝ่ายการเงิน
        position: 'พนักงานการเงิน',
        phone: '02-123-4572',
      }
    })
  ])

  console.log('✅ สร้างผู้ใช้เรียบร้อย')

  // สร้างงานตัวอย่าง
  const tasks = await Promise.all([
    // งานจากผู้อำนวยการ
    prisma.task.create({
      data: {
        title: 'จัดทำรายงานประจำเดือน',
        description: 'จัดทำรายงานสรุปผลการดำเนินงานประจำเดือน มกราคม 2025',
        due_date: new Date('2025-02-15'),
        start_date: new Date('2025-01-25'),
        creator_id: users[0].id, // ผู้อำนวยการ
        assignee_id: users[1].id, // หัวหน้าฝ่ายการตลาด
        department_id: departments[1].id,
        assignment_status: 'in_progress',
        time_status: 'on_time',
        priority: 'high',
        progress: 65,
        assigned_at: new Date('2025-01-25'),
        acknowledged_at: new Date('2025-01-25'),
      }
    }),

    prisma.task.create({
      data: {
        title: 'ตรวจสอบระบบ IT',
        description: 'ตรวจสอบและอัพเกรดระบบเครือข่ายภายในองค์กร',
        due_date: new Date('2025-02-20'),
        start_date: new Date('2025-01-20'),
        creator_id: users[0].id, // ผู้อำนวยการ
        assignee_id: users[2].id, // หัวหน้าฝ่าย IT
        department_id: departments[2].id,
        assignment_status: 'submitted',
        time_status: 'on_time',
        priority: 'medium',
        progress: 100,
        assigned_at: new Date('2025-01-20'),
        acknowledged_at: new Date('2025-01-20'),
        submitted_at: new Date('2025-02-05'),
      }
    }),

    // งานจากหัวหน้าฝ่าย
    prisma.task.create({
      data: {
        title: 'อัพเดตฐานข้อมูลลูกค้า',
        description: 'ปรับปรุงข้อมูลลูกค้าในระบบ CRM ให้เป็นปัจจุบัน',
        due_date: new Date('2025-02-18'),
        start_date: new Date('2025-01-25'),
        creator_id: users[1].id, // หัวหน้าฝ่ายการตลาด
        assignee_id: users[3].id, // พนักงานการตลาด
        department_id: departments[1].id,
        assignment_status: 'submitted',
        time_status: 'on_time',
        priority: 'medium',
        progress: 100,
        assigned_at: new Date('2025-01-25'),
        acknowledged_at: new Date('2025-01-26'),
        submitted_at: new Date('2025-02-10'),
      }
    }),

    prisma.task.create({
      data: {
        title: 'จัดทำรายงานยอดขาย',
        description: 'สรุปยอดขายประจำเดือน มกราคม 2025',
        due_date: new Date('2025-02-10'),
        start_date: new Date('2025-01-15'),
        creator_id: users[1].id, // หัวหน้าฝ่ายการตลาด
        assignee_id: users[3].id, // พนักงานการตลาด
        department_id: departments[1].id,
        assignment_status: 'in_progress',
        time_status: 'delayed',
        priority: 'high',
        progress: 70,
        assigned_at: new Date('2025-01-15'),
        acknowledged_at: new Date('2025-01-16'),
      }
    }),

    prisma.task.create({
      data: {
        title: 'เตรียมเอกสารประชุม',
        description: 'จัดเตรียมเอกสารและข้อมูลสำหรับการประชุมรายเดือน',
        due_date: new Date('2025-02-08'),
        start_date: new Date('2025-02-05'),
        creator_id: users[0].id, // ผู้อำนวยการ
        assignee_id: users[3].id, // พนักงานการตลาด
        department_id: departments[0].id,
        assignment_status: 'assigned',
        time_status: 'on_time',
        priority: 'medium',
        progress: 0,
        assigned_at: new Date('2025-02-05'),
      }
    }),

    prisma.task.create({
      data: {
        title: 'แก้ไขระบบบัญชี',
        description: 'แก้ไขข้อผิดพลาดในระบบบัญชีและทดสอบการทำงาน',
        due_date: new Date('2025-02-25'),
        start_date: new Date('2025-02-01'),
        creator_id: users[2].id, // หัวหน้าฝ่าย IT
        assignee_id: users[4].id, // พนักงาน IT
        department_id: departments[2].id,
        assignment_status: 'in_progress',
        time_status: 'on_time',
        priority: 'high',
        progress: 30,
        assigned_at: new Date('2025-02-01'),
        acknowledged_at: new Date('2025-02-01'),
      }
    })
  ])

  console.log('✅ สร้างงานตัวอย่างเรียบร้อย')

  // สร้าง Task Updates
  await Promise.all([
    prisma.taskUpdate.create({
      data: {
        task_id: tasks[0].id,
        user_id: users[1].id,
        update_type: 'progress_update',
        old_value: '0',
        new_value: '30',
        progress: 30,
        notes: 'เริ่มจัดเก็บข้อมูลและวิเคราะห์ผลการดำเนินงาน',
      }
    }),
    prisma.taskUpdate.create({
      data: {
        task_id: tasks[0].id,
        user_id: users[1].id,
        update_type: 'progress_update',
        old_value: '30',
        new_value: '65',
        progress: 65,
        notes: 'เสร็จสิ้นการรวบรวมข้อมูล กำลังจัดทำรายงาน',
      }
    }),
    prisma.taskUpdate.create({
      data: {
        task_id: tasks[1].id,
        user_id: users[2].id,
        update_type: 'status_change',
        old_value: 'in_progress',
        new_value: 'submitted',
        progress: 100,
        notes: 'ตรวจสอบระบบเสร็จสิ้น พร้อมใช้งาน',
      }
    })
  ])

  console.log('✅ สร้าง Task Updates เรียบร้อย')

  console.log('🎉 Seeding ข้อมูลเสร็จสิ้น!')
  console.log('\n📋 ข้อมูลผู้ใช้สำหรับทดสอบ:')
  console.log('👨‍💼 ผู้อำนวยการ: director@company.com / password123')
  console.log('👩‍💼 หัวหน้าฝ่ายการตลาด: header.marketing@company.com / password123')
  console.log('👨‍💻 หัวหน้าฝ่าย IT: header.it@company.com / password123')
  console.log('👤 พนักงานการตลาด: employee@company.com / password123')
  console.log('👤 พนักงาน IT: employee.it@company.com / password123')
  console.log('👤 พนักงานการเงิน: employee.finance@company.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดในการ Seed ข้อมูล:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })