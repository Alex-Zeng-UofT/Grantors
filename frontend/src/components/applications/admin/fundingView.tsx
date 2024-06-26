import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApplicationsController from "../../../controllers/ApplicationsController";
import GrantsController from "../../../controllers/GrantsController";
import { Application } from "../../../interfaces/Application";
import { Grant } from "../../../interfaces/Grant";
import { useUserContext } from "../../contexts/userContext";
import { Modal } from '../../modal/Modal';


const ApplicationFunding = () => {
    const { applicationID } = useParams();
    const [application, setApplication] = useState<Application | undefined>();
    const [grant, setGrant] = useState<Grant | undefined>();
    const [fundingAmount, setFundingAmount] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const { user } = useUserContext();

    const handleCloseModalAndNavigate = () => {
        setShowModal(false);
        navigate('/');
    };

    useEffect(() => {
        if (applicationID) {
            ApplicationsController.fetchApplication(applicationID).then((fetchedApplication: Application | undefined) => {
                if (fetchedApplication) {
                    setApplication(fetchedApplication);
                    GrantsController.fetchGrant(fetchedApplication.grantID).then((fetchedGrant: Grant | undefined) => {
                        if (fetchedGrant) {
                            setGrant(fetchedGrant);
                            setFundingAmount(fetchedGrant.minAmount.toString());                        }
                    });
                }
            });
        } else {
            console.error("Application ID is undefined.");
            navigate("/error");
        }
    }, [applicationID, navigate]);
    

    const handleFundingSubmission = async () => {
        const numericFundingAmount = Number(fundingAmount);
        if (!applicationID || !application || !grant || numericFundingAmount < Number(grant.minAmount) || numericFundingAmount > Number(grant.maxAmount)) {
            alert("Please specify a valid funding amount within the grant's limits.");
            return;
        }
    
        if (!user) {
            console.error("No user context available");
            return;
        }
    
        const success = await ApplicationsController.updateAwardedAmount(user, applicationID, numericFundingAmount);
        if (success) {
            setShowModal(true);
        } else {
            console.error("Error updating application with funding amount.");
        }
    };

    return (
        <div className="py-10">
            <div className="container mx-auto p-6 bg-white border-4 border-primary shadow-2xl
                rounded-2xl shadow-black hover:border-black">
                <h1 className="text-2xl font-bold mb-4">Assign Funding Amount</h1>
                {grant && (
                    <div className="mb-4">
                        <p><span className="font-bold text-base">Grant Name:</span> &nbsp; {grant.title}</p>
                        <p><span className="font-bold text-base">Funding Range:</span> &nbsp; $ {Number(grant.minAmount)} - {Number(grant.maxAmount)}</p>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="fundingAmount" className="block text-md font-semibold text-gray-700">Funding Amount</label>
                    <input
                        type="number"
                        id="fundingAmount"
                        name="fundingAmount"
                        value={fundingAmount}
                        onChange={(e) => setFundingAmount(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2
                         border-secondary rounded-md p-2"
                    />
                </div>
                <button
                    onClick={handleFundingSubmission}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-semibold rounded-md text-white
                     bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 text-base"
                >
                    Submit Funding Amount
                </button>
            </div>
            <Modal showModal={showModal} closeModal={handleCloseModalAndNavigate} openModal={() => setShowModal(true)}>
			<div className='flex h-[100vh] w-[100vw] justify-center items-center'>
				<div className='bg-white h-fit w-2/5 border-4 border-blue-400 border-solid rounded-lg'>
					<div className='h-full w-full'>
						<p className='text-xl text-center font-semibold'>
							{`You have successfully reviewed the grant.`}
						</p>
						<div className='flex flex-row justify-center'>
							<button className='p-2 px-5 m-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700
								text-white font-bold rounded-lg shadow-md transition-colors duration-150 ease-in
								text-base text-center justify-center align-middle flex pb-1'
								onClick={handleCloseModalAndNavigate}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Modal>
        </div>
    );
};

export default ApplicationFunding;