enum EUserStatus {
    ACTIVE = "ACTIVE",
    UNACTIVE = "UNACTIVE",
    BANNED = "BANNED",
}
enum EUserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    EXPERT = "EXPERT",
}
enum ECouseStatus {
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
}
enum ECourseLevel {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}
enum ELessonType {
    VIDEO = "VIDEO",
    TEXT = "TEXT",
}

export {EUserStatus, EUserRole, ECouseStatus, ECourseLevel, ELessonType};