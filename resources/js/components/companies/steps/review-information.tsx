import { format } from 'date-fns';
import { SubmitCompanyInterface } from '../submit-company-button';

export default function ReviewInformationStep({ data }: { data: SubmitCompanyInterface }) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h3 className="text-sm font-medium">Company Name</h3>
                    <p>{data.name}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium">Industry</h3>
                    <p>{data.industry}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium">CEO</h3>
                    <p>{data.ceo}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium">Employee Count</h3>
                    <p>{data.employee_count}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium">Founded Year</h3>
                    <p>{data.founded_year ? format(data.founded_year, 'PPP') : 'Not specified'}</p>
                </div>
                <div>
                    <h3 className="text-sm font-medium">Company Type</h3>
                    <p>{data.type}</p>
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium">Description</h3>
                <p className="text-sm">{data.description}</p>
            </div>
        </div>
    );
}
