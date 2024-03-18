import { Application, ApplicationStatus } from "../../../../interfaces/Application";

export const mockApplications: Application[] = [
    {
        id: "1",
        userID: "2",
        grantID: "1",
        grantTitle: "Community Accessibility Grant",
        grantCategory: "Community Development", 
        submitted: true,
        submissionDate: new Date(new Date().getDate() - 1),
        status: ApplicationStatus.submitted,
        awarded: 0,
        responses: [],
    },
    {
        id: "2",
        userID: "2",
        grantID: "2",
        grantTitle: "Educational Accessibility Initiative",
        grantCategory: "Education", 
        submitted: true,
        submissionDate: new Date(),
        status: ApplicationStatus.submitted,
        awarded: 0, 
        responses: [],
    },
    {
        id: "3",
        userID: "1",
        grantID: "3",
        grantTitle: "Accessible Technology Research Grant",
        grantCategory: "Technology", 
        submitted: true,
        submissionDate: new Date(),
        status: ApplicationStatus.submitted,
        awarded: 0, 
        responses: [],
    },
    {
        id: "4",
        userID: "1",
        grantID: "2",
        grantTitle: "Educational Accessibility Initiative",
        grantCategory: "Education", 
        submitted: true,
        submissionDate: new Date(),
        status: ApplicationStatus.inProgress,
        awarded: 0, 
        responses: [],
    },
    {
        id: "5",
        userID: "3",
        grantID: "4",
        grantTitle: "Employment Accessibility Grant",
        grantCategory: "Employment", 
        submitted: true,
        submissionDate: new Date(),
        status: ApplicationStatus.submitted,
        awarded: 0, 
        responses: [],
    },
    {
        id: "6",
        userID: "3",
        grantID: "5",
        grantTitle: "Accessible Healthcare Services Grant",
        grantCategory: "Healthcare", 
        submitted: true,
        submissionDate: new Date(),
        status: ApplicationStatus.inProgress,
        awarded: 0, 
        responses: [],
    },
    {
        id: "7",
        userID: "5",
        grantID: "6",
        grantTitle: "UTAPS",
        grantCategory: "Education", 
        submitted: false,
        submissionDate: new Date(),
        status: ApplicationStatus.inProgress,
        awarded: 0, 
        responses: [],
    },
]