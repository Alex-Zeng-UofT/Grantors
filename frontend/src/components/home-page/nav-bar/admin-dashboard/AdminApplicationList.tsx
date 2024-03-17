import { useEffect, useState } from 'react';
import { useUserContext } from '../../../contexts/userContext';
import { AdminApplicationListProps } from './AdminApplicationListProps';
import { Application } from '../../../../interfaces/Application';
import { SERVER_PORT } from '../../../../constants/ServerConstants';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../../table/Table';
import { Column } from '../../../table/TableProps';

const AdminApplicationList = ({}: AdminApplicationListProps) => {
    const { user, setUser } = useUserContext();
    const [ applications, setApplications ] = useState<Application[]>([]);
    const { organization } = useParams();
    const navigate = useNavigate();

    const itemsPerPageOptions: number[] = [5,10,20,50,100];
    const columns: Column<Application>[] = [
        {
            title: "Grant Titlte",
            format: (application: Application) => application.grantTitle,
            sort: (app1: Application, app2: Application) => app1.grantTitle < app2.grantTitle ? -1 : 1,
        },
        {
            title: "Applicant",
            format: (application: Application) => String(application.userID),
            sort: (app1: Application, app2: Application) => app1.userID - app2.userID,
        },
        {
            title: "Date",
            format: (application: Application) => {
                return application.submissionDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                })
            },
            sort: (app1: Application, app2: Application) => Number(app1.submissionDate) - Number(app2.submissionDate),
        },
    ];

    useEffect(() => {
        // Redirect user if they are not apart of this org
        if ( user?.organization != organization ) {
            navigate('/')
        }

        const fetchApplications = async () => {
            const res = await fetch(`http://localhost:${SERVER_PORT}/getOrgApplications/${organization}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user?.authToken}`
                },
              });

            if (res.ok) {
                await res.json().then((data) => {
                    const applications = data.response.map((application: Application) => {
                        return {...application, submissionDate: new Date(application.submissionDate)};
                    });
                    return setApplications(applications);
                });
            } else {
                // Bad response, logout the user and redirect
                console.log(res);
                setUser(null)
                navigate('/login')
            }
        }

        fetchApplications();
    }, [user, navigate]);

    return (
        <div className="flex flex-col h-full items-start justify-start px-5 bg-grantor-green">
            <span className="text-2xl pl-2">{organization} Grant Applications</span>
            <Table<Application> items={applications.filter((app) => app.submitted)}
                   columns={columns}
                   itemsPerPageOptions={itemsPerPageOptions}
                   defaultIPP={10}
                   defaultSort={columns[2]}
            />
        </div>
    )
};

export default AdminApplicationList;