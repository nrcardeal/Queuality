'use strict'

const Joi = require('joi')

/**
 * @typedef {Object} AppointmentWorkingHours
 * @property {String} begin Hours of the day when should start all appointments. Format should be HH:mm.
 * @property {String} end Hours of the day when should end all appointments. Format should be HH:mm.
 * @property {Number} duration Duration of an appointment in minutes.
 */
const appointmentWorkingHoursSchema = {
    begin: Joi.string().required(),
    end: Joi.string().required(),
    duration: Joi.number().required(),
}

/**
 * @typedef {Object} Subject
 * @property {String} _id Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Number} currentTicket The number of the ticket that is being answered
 * @property {Number} totalTicket The number of the tickets that have been taken
 * @property {Date} date The current day 
 * @property {Array<String>} desks
 */
 const subjectSchema = {
    _id: Joi.string().required(),
    subject: Joi.string().required(),
    priority: Joi.boolean().required(),
    currentTicket: Joi.number().required(),
    totalTickets: Joi.number().required(),
    date: Joi.date().required(),
    desks: Joi.array().items(Joi.string()).required()
}
const subject = Joi.object(subjectSchema)

/**
 * @typedef {Object} Section
 * @property {String} _id The name of the section is unique.
 * @property {Array<String>} employees The employees working in this section.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 * @property {Array<String>} queue Array with the order for the next tickets to be answered.
 * @property {Array<Subject>} subjects Array with all the subjects of this section.
 */
const section = Joi.object({
    _id: Joi.string().required(),
    employees: Joi.array().items(Joi.string()).required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema).required(),
    queue: Joi.array().items(Joi.string()).required(),
    subjects: Joi.array().items(Joi.object(subjectSchema)).required()
})

/**
 * @typedef {Object} Employee
 * @property {String} _id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
const employee = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    roles: Joi.array().items(Joi.string()).required(),
    sections: Joi.array().items(Joi.string()).required(),
    desk: Joi.string()
})
/**
 * @typedef {Object} Appointment
 * @property {ObjectId} _id
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */
const appointment = Joi.object({
    _id: Joi.object().required(),
    subject: Joi.string().required,
    desk: Joi.string().required,
    date: Joi.date().required,
    section: Joi.string().required
})

/**
 * @typedef {Object} AppointmentInputModel
 * @property {String} subject
 * @property {String} desk
 * @property {Date} date
 * @property {String} section
 */
const appointmentInputModel = Joi.object({
    subject: Joi.string().required(),
    desk: Joi.string(),
    date: Joi.date().required(),
    section: Joi.string().required()
})
/**
 * @typedef {Object} EmployeeInputModel
 * @property {String} _id
 * @property {String} name
 */
const employeeInputModel = Joi.object({ 
    _id: Joi.string().required(),
    name: Joi.string().required()
})
/**
 * @typedef {Object} EmployeeUpdateInputModel
 * @property {String} _id
 * @property {String} name
 * @property {Array<String>} roles
 * @property {Array<String>} sections
 * @property {String} desk
 */
const employeeUpdateInputModel = Joi.object({ 
    _id: Joi.string().required(),
    name: Joi.string(),
    roles: Joi.array().items(Joi.string()),
    section: Joi.array().items(Joi.string()),
    desk: Joi.string()
})
/**
 * @typedef {Object} SectionInputModel
 * @property {String} _id The name of the section is unique.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
*/
const sectionInputModel = Joi.object({
    _id: Joi.string().required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema).required(),
    employees: Joi.array().default([]),
    queue: Joi.array().default([]),
    subjects: Joi.array().default([])
})
/**
 * @typedef {Object} SectionUpdateInputModel
 * @property {String} _id The name of the section is unique.
 * @property {AppointmentWorkingHours} workingHours Details of hours and duration of an appointment in this section.
 */
const sectionUpdateInputModel = Joi.object({
    _id: Joi.string().required(),
    workingHours: Joi.object(appointmentWorkingHoursSchema)
})
/**
 * @typedef {Object} SubjectInputModel
 * @property {String} _id Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 */
const subjectInputModel = Joi.object({
    _id: Joi.string().required(),
    subject: Joi.string().required(),
    priority: Joi.boolean().required()
})
/**
 * @typedef {Object} SubjectUpdateInputModel
 * @property {String} _id Name of the subject is unique.
 * @property {String} subject Subject
 * @property {Boolean} priority Priority of the subject
 * @property {Array<String>} desks
 */
const subjectUpdateInputModel = Joi.object({
    _id: Joi.string().required(),
    subject: Joi.string(),
    priority: Joi.boolean(),
    desks: Joi.array().items(Joi.string())
})

module.exports = {
    section,
    subject,
    employee,
    appointment,
    sectionInputModel,
    sectionUpdateInputModel,
    subjectInputModel,
    subjectUpdateInputModel,
    employeeInputModel,
    employeeUpdateInputModel,
    appointmentInputModel
}