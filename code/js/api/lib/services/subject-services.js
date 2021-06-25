'use strict'

const repo = require('../repo/subject-repo.js')
const sectionService = require('./section-services.js')
const error = require('../common/error.js')
// eslint-disable-next-line no-unused-vars
const model = require('../common/model.js')


/**
 * @param {String} sectionName
 * @returns {Promise<Array<model.Subject>>}
 */
const getSubjects = (sectionName) => repo.getSubjects(sectionName)

/**
 * 
 * @param {String} sectionName 
 * @param {String} subjectId 
 * @returns {Promise<model.Subject>}
 */
const getSubject = (sectionName, subjectId) => repo.getSubject(sectionName, subjectId)

/**
  * @param {model.SubjectInputModel} subject
  * @returns {Promise<Void>}
  */
const addSubject = (subject) => repo.insertSubject(subject)

/**
  * @param {model.SubjectUpdateInputModel} subject
  * @returns {Promise<Void>}
  */
const updateSubject = (subject) => 
    sectionService.getSection(subject.sectionId)
        .then(section => getSubjects(section.name))
        .then(async subjects => {
            const subjectInfo = await getSubject(subject.sectionId, subject.name)
            if(subject.priority === undefined) subject.priority = subjectInfo.priority
            if(!subject.subject) subject.subject = subjectInfo.subject
            if(!subject.desks) subject.desks = subjectInfo.desks
            if(subject.priority && !subjectInfo.priority && subjects.find(s => s.priority)) 
                throw error.CustomException('Cannot have more than one priority queue', error.ALREADY_EXISTS)
            return repo.updateSubject(subject)
        })
/**
 * @param {String} sectionId
 * @param {String} subjectId
 * @returns {Promise<Void>}
 */
const deleteSubject = (sectionId, subjectId) =>
    repo.deleteSubject(sectionId, subjectId)
    

module.exports = {
    getSubjects,
    getSubject,
    addSubject,
    updateSubject,
    deleteSubject
}